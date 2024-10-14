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
            hasImages ? "mb-4 flex flex-col items-center justify-center" : ""
          }`}
        >
          {hasImages && option.image ? (
            <div
              className="relative flex h-25 w-25 cursor-pointer flex-col items-center justify-between gap-3 rounded-lg border border-blue-400 p-3 shadow-lg shadow-blue-500 transition-transform duration-300 hover:scale-105 hover:shadow-blue-600 md:h-30 md:w-30 md:p-5"
              onClick={() => onOptionClick(option.name)}
            >
              <Image
                src={option.image}
                alt={option.name}
                width={100}
                quality={100}
                height={100}
                className=" mb-1 h-12 w-12 object-contain md:h-15 md:w-15"
              />
              <span className="bg-custom-gradient absolute bottom-0 left-0 right-0 rounded-lg rounded-tl-none rounded-tr-none p-1 text-center text-white  md:text-lg">
                {option.name}
              </span>
            </div>
          ) : (
            <button
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-2  w-70 rounded-lg px-5 py-2
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