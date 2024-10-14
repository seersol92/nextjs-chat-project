import Image from "next/image";

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

export default Message;