import React from "react";

interface Option {
  id: string;
  value: string;
  label: string;
}

interface QuestionWithOptionsProps {
  question: string;
  options: Option[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const QuestionWithOptions: React.FC<QuestionWithOptionsProps> = ({
  question,
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="mt-5">
      <p className="mb-4 text-lg font-semibold">{question}</p>
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        {options.map((option) => (
          <div
            key={option.id}
            className="border-gray-200 dark:border-gray-700 flex  items-center rounded border p-4 md:w-1/4"
          >
            <input
              id={option.id}
              type="radio"
              value={option.value}
              name={name}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <label
              htmlFor={option.id}
              className="text-gray-900 dark:text-gray-300 ms-2 w-full py-4 text-sm font-medium"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionWithOptions;
