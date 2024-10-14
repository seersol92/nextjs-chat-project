
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Operator, operatorsList } from "@/lib/operatorsList";
import LocationForm from "./LocationForm";
import { toast } from "react-toastify";
import Options from "./Options";
import Loader from "./Loader";
import Message from "./Message";

interface msgSchema {
  id: string; 
  text: string;
  options: string[] | Operator[];
  images?: boolean;
  key: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [currentMsg, setCurrentMsg] = useState<any>({});
  const [waitingForUser, setWaitingForUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [botMessages, setBotMessages] = useState<msgSchema[]>([]);

  const [userData, setUserData] = useState({
    type: "",
    operator: "",
    duration: "",
    displeasure: "",
    cost: "",
  });

  useEffect(() => {
    if (chatRef.current) {
      const scrollHeight = chatRef.current.scrollHeight;
      const currentScrollTop = chatRef.current.scrollTop;

      if (currentMsg.key !== "contact") {
        // Scroll to the bottom
        chatRef.current.scrollTop = scrollHeight;
      } else {
        // Scroll 10% more from the current position
        const additionalScroll = scrollHeight * 0.18; // Change 0.1 to 0.15 for 15%
        chatRef.current.scrollTop = Math.min(
          currentScrollTop + additionalScroll,
          scrollHeight,
        );
      }
    }
  }, [messages]);

  /*
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
  ];*/

  // Fetch bot messages from API on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/message");
        const data = await response.json();
        setBotMessages(data);
        setCurrentMsg(data[0]);
        setCurrentMessageIndex(0)
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", ...data[0] },
        ]);
        setWaitingForUser(true);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    if(!loading) fetchMessages();
  }, []);

  useEffect(() => {
    if (waitingForUser || currentMessageIndex >= botMessages.length) return;
    console.log("heree 12");
    setLoading(true);
    const timer = setTimeout(() => {
      const currentMessage = botMessages[currentMessageIndex];
      setCurrentMsg(currentMessage);
      if (currentMessage.key === "operator")
         currentMessage.options = operatorsList;

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", ...currentMessage },
        ]);

      // Set waitingForUser state if the message has options or input
      if (currentMessage.options) {
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

  const goToPreviousMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex((prevIndex) => prevIndex - 1); // Move to the next question
      const currentMessage = botMessages[currentMessageIndex - 1];
      setCurrentMsg(currentMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", ...currentMessage },
      ]);
      setWaitingForUser(true); // Allow user interaction again
    }
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
              <Message sender={message.sender} text={message.text} />
            </div>
          ))}
          {loading && <Loader />}

          {/* Render options if available */}
          {waitingForUser && currentMessageIndex < botMessages.length && (
            <>
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
              {currentMsg.key == 'contact' && (
                <LocationForm
                  showAddress={userData.type !== "Abonnement Mobile"}
                  onSubmit={handleFormSubmit}
                  isLoading={loading}
                />
              )}
              {currentMessageIndex > 0 && (
                <div>
                  <button
                    className="mb-2 ml-4 mt-2 flex text-lg  text-blue-500 underline"
                    onClick={goToPreviousMessage}
                  >
                    <span> {"<- précédent"}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
