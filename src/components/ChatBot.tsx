import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { operatorsList } from "@/lib/operatorsList";
import LocationForm from "./LocationForm";
import { toast } from "react-toastify";
import Options from "./Options";
import Loader from "./Loader";

interface MessageProps {
  sender: "user" | "bot"; // Define possible values for sender
  text: string | React.ReactNode; // Allow string or React node
}

const Message: React.FC<MessageProps> = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex items-center gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {sender === "bot" && (
        <Image
          src="/images/chat-bot.jpg"
          alt="Bot"
          width={45}
          height={40}
          className="rounded-full object-contain"
        />
      )}
      <div
        className={`rounded-lg p-2 ${sender === "bot" ? "rounded-bl-none bg-blue-200 font-normal text-black" : "rounded-br-none bg-green-200"}`}
        dangerouslySetInnerHTML={
          typeof text === "string" ? { __html: text } : undefined
        }
      >
        {typeof text !== "string" ? text : null}
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [currentMsg, setCurrentMsg] = useState<any>({});
  const [waitingForUser, setWaitingForUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null); // Ref for chat container
  const [userData, setUserData] = useState({
    type: "",
    operator: "",
    duration: "",
    displeasure: "",
    cost: "",
  });

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const botMessages = [
    {
      text: "En plus de faire des économies, pourquoi changez-vous de fournisseur ?",
      options: [
        "Un top réseau",
        "Un bouquet adapté",
        "Des conseillers disponibles",
        "Mon déménagement",
        "Je n’ai pas de fournisseur",
        "Autre",
      ],
      images: false,
      key: "type",
    },
    {
      text: "De quel type d'offre souhaitez-vous profiter ?",
      options: ["Abonnement Mobile", "Mobile + Fibre", "Fibre + TV + mobile"],
      images: false,
      key: "type",
    },
    {
      text: "Pour commencer, quel est votre opérateur mobile actuel ?*",
      options: operatorsList,
      images: true,
      key: "operator",
    },

    {
      text: "Depuis quand êtes-vous chez votre opérateur ? *",
      options: ["Moins d’1 an", "Plus d’1 an", "Je ne sais pas"],
      images: false,
      key: "duration",
    },

    {
      text: "Qu’est-ce qui vous déplaît le plus chez votre opérateur ? *",
      options: [
        "Prix de l’abonnement trop cher",
        "La lenteur du réseau",
        "Service clientèle peu joignable",
        "Je ne sais pas",
        "Autre",
      ],
      key: "displeasure",
      images: false,
    },
    {
      text: "Combien vous coûte votre abonnement par mois ? *",
      options: [
        "Moins de 40 CHF",
        "Entre 40 et 50 CHF",
        "Plus de 50 CHF",
        "Je ne sais pas",
      ],
      images: false,
      key: "cost",
    },
    {
      text: "Êtes-vous encore engagés chez votre opérateur ? ",
      options: ["Oui", "Non", "Je ne sais pas"],
      key: "confirm",
      images: false,
    },
    {
      text: "Pour vérifier votre éligibilité à la fibre, j'ai besoin de votre adresse postale 📍",
      input: true,
      key: "contact",
      images: false,
    },
  ];

  useEffect(() => {
    if (waitingForUser || currentMessageIndex >= botMessages.length) return;
    setLoading(true);
    const timer = setTimeout(() => {
      const currentMessage = botMessages[currentMessageIndex];
      setCurrentMsg(currentMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", ...currentMessage },
      ]);

      // Set waitingForUser state if the message has options or input
      if (currentMessage.options || currentMessage.input) {
        setWaitingForUser(true);
      } else {
        setWaitingForUser(false);
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      }

      setLoading(false);
    }, 1500); // Delay for each bot message

    return () => clearTimeout(timer);
  }, [currentMessageIndex, waitingForUser]);

  const handleOptionClick = (option: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: option },
    ]);

    setUserData((prevData) => ({
      ...prevData,
      [currentMsg.key]: option, // Dynamically update the specific key
    }));

    // Play sound when a bot message is displayed
    const audio = new Audio("/sound/new-notification.mp3");
    audio.volume = 0.5; // Set volume if needed

    setLoading(true);
    setWaitingForUser(false);
    setTimeout(() => {
      setCurrentMessageIndex((prevIndex) => prevIndex + 1); // Move to the next question
      const currentMessage = botMessages[currentMessageIndex + 1];
      setCurrentMsg(currentMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", ...currentMessage },
      ]);
      audio.play().catch((err) => console.error("Audio play failed:", err));
      setLoading(false);
      setWaitingForUser(true); // Wait for the next user interaction
    }, 1000);
  };

  const handleFormSubmit = async (data: {
    street: string;
    postalCode: string;
    city: string;
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
  }) => {
    const leadData = {
      type: userData.type,
      operator: userData.operator,
      duration: userData.duration,
      displeasure: userData.displeasure,
      cost: userData.cost,
      name: data.firstName,
      surname: data.lastName,
      email: data.email,
      phone: data.phoneNumber,
      city: data.city,
      street: data.street,
      postal: data.postalCode,
    };

    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });
      const data = await response.json(); // Get the response body as JSON
      if (response.ok) {
        toast.success(
          "Merci, nous allons vous contacter prochainement pour vous proposer la meilleure offre.",
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "user",
            text: `${leadData.name}, ${leadData.email}, ${leadData.city}, ${leadData.street}`,
          },
        ]);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "Merci, nous allons vous contacter prochainement pour vous proposer la meilleure offre.",
          },
        ]);
        setCurrentMessageIndex((prevIndex) => prevIndex + 1); // Move to the next question
      } else {
        toast.error(data.message || "Échec de la soumission du lead.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du lead :", error);
      toast.error("Une erreur est survenue lors de la soumission du lead.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div className="bg-gray-100 mt-10 flex min-h-screen flex-col items-center">
      <div className="w-[90%] rounded-lg bg-white shadow-md md:w-[70%] lg:w-[40%]">
        {/* Chat Heading */}
        <div className="bg-custom-gradient-hover relative mb-4 flex items-center rounded-tl-lg rounded-tr-lg p-3">
          <div className="relative">
            <Image
              src="/images/chat-bot.jpg"
              alt="Thomas"
              width={50}
              height={50}
              className="rounded-full"
            />
            {/* Online Indicator */}
            <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-2 flex items-center">
            <h2 className="font-semibold italic text-white">
              Thomas de Lausanne
            </h2>
          </div>
        </div>

        <div
          ref={chatRef}
          className="scrollbar flex max-h-[700px] flex-col space-y-4 overflow-y-auto p-2"
        >
          <div className="ml-3 flex flex-col gap-2">
            <div className="flex items-end gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                />
              </svg>
              <p className="text-md text-black ">
                Comparatif des abonnements : Séléction des meilleurs abonnements
              </p>
            </div>
            <div className="flex items-end gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-black"
                viewBox="0 0 34 34"
                stroke="currentColor"
              >
                <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
              </svg>
              <p className="text-md text-black ">
                Économisez en changeant de forfait : Profitez des actions
              </p>
            </div>
            <div className="flex items-end gap-1">
              <Image src={"/images/copy.png"} width={38} height={40} alt="" />
              <p className="text-md text-black ">
                100% indépendant et transparent : Conseil et clarté{" "}
              </p>
            </div>
          </div>
          <Message
            sender="bot"
            text={
              <div className="flex flex-col gap-2">
                <div>
                  <span className=" font-bold italic">Thomas de Lausanne,</span>
                  vient de rejoindre la conversation.
                </div>
                <div>
                  J'ai besoin de quelques informations pour vous trouver l’offre
                  la plus économique et adaptée à vos besoins disponibles à
                  votre adresse.
                </div>
              </div>
            }
          />
          {messages.map((message, index) => (
            <div key={index}>
              {message.key === "contact" &&
              userData.type === "Abonnement Mobile" ? (
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      handleFormSubmit({
                        street: "",
                        postalCode: "",
                        city: "",
                        lastName: "",
                        firstName: "",
                        email: "",
                        phoneNumber: "",
                      })
                    }
                    disabled={loading}
                    type="submit"
                    className={` bg-custom-gradient-hover hover:bg-custom-gradient w-90 rounded-md p-2  text-white  transition duration-500`}
                  >
                    Valider
                  </button>
                </div>
              ) : (
                <Message sender={message.sender} text={message.text} />
              )}
            </div>
          ))}
          {loading && <Loader />}

          {/* Render options if available */}
          { 
            waitingForUser &&
            currentMessageIndex < botMessages.length && (
              
                (currentMsg.key === "contact" && userData.type === "Abonnement Mobile")
                ? ""
                :  <>
                {botMessages[currentMessageIndex].options && (
                  <Options
                    options={botMessages[currentMessageIndex].options || []}
                    onOptionClick={handleOptionClick}
                    hasImages={
                      botMessages[currentMessageIndex].images ? true : false
                    }
                  />
                )}
                {/* Handle input separately if needed */}
                {botMessages[currentMessageIndex].input && (
                  <LocationForm
                    onSubmit={handleFormSubmit}
                    isLoading={loading}
                  />
                )}
              </>
              
            )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
