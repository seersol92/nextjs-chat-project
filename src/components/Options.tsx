import { Operator } from "@/lib/operatorsList";
import Image from "next/image";

interface OptionsProps {
  options: any[];
  hasImages: boolean;
  onOptionClick: (option: string) => void;
}

const Options: React.FC<OptionsProps> = ({
  options,
  hasImages,
  onOptionClick,
}) => {
  return (
    <div className="flex flex-wrap justify-center space-x-2">
      {options.map((option, index) => (
        <div
          key={index}
          className={`${
            hasImages
              ? "mb-4 flex w-1/4 flex-col items-center justify-center"
              : ""
          }`}
        >
          {hasImages && option.image ? (
            <div
              className="cursor-pointer"
              onClick={() => onOptionClick(option.name)}
            >
              <Image
                src={option.image}
                alt={option.name}
                width={50} // Adjust width as needed
                height={50} // Adjust height as needed
                className="object-contain"
              />
              <span className="mt-1 text-center">{option.name}</span>
            </div>
          ) : (
            <button
              className="mb-2   flex-1 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
              onClick={() => onOptionClick(option)}
            >
              {option}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Options;