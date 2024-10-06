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
    <div className="flex flex-row flex-wrap items-center justify-center gap-2">
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
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-2  w-90 flex-1 rounded-lg px-5 py-2
               text-white md:w-auto"
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