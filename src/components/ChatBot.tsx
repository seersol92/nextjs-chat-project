import Image from "next/image";
import { useState, useEffect } from "react";
import { operatorsList } from "@/lib/operatorsList";
import LocationForm from "./LocationForm";
import { toast } from "react-toastify";
import Options from "./Options";
import Loader from "./Loader";

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [currentMsg, setCurrentMsg] = useState<any>({});
  const [waitingForUser, setWaitingForUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    type: "",
    operator: "",
    duration: "",
    displeasure:"",
    cost:"",
  });

  const botMessages = [
    { text: "Bonjour, je suis Thomas !" },
    { text: "Commençons dès maintenant !" },
    {
      text: "De quel type d'offre souhaitez-vous profiter ?",
      options: ["Fibre", "Fibre + TV", "Fibre + TV + mobile"],
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
      key: "cost"
    },
    {
      text: "Êtes-vous déjà équipé(e) de la fibre ? *",
      options: ["Oui", "Non"],
      images: false,
    },
    {
      text: "Pour vérifier votre éligibilité à la fibre, j'ai besoin de votre adresse postale 📍",
      input: true,
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
      const currentMessage = botMessages[currentMessageIndex+1];
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
      <div className="w-[550px] rounded-lg bg-white p-4 shadow-md">
        <div className="flex max-h-[700px] flex-col space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index}>
              <div
                className={`flex items-center gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Image
                    src={"/images/avatar-landbot.png"}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                )}
                <div
                  className={`rounded-lg  p-2 ${message.sender === "bot" ? "rounded-bl-none bg-blue-200 font-medium text-black" : "rounded-br-none bg-green-200"}`}
                >
                  {message.text}
                </div>
              </div>
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
                  hasImages={botMessages[currentMessageIndex].images ? true : false}
                />
              )}
              {/* Handle input separately if needed */}
              {botMessages[currentMessageIndex].input && (
                <LocationForm onSubmit={handleFormSubmit} isLoading={loading} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
