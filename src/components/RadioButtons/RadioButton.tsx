import React from "react";

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked = false,
  label,
  onChange,
}) => {
  return (
    <div className="border-gray-200 dark:border-gray-700 flex items-center rounded border ps-4">
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
      />
      <label
        htmlFor={id}
        className="text-gray-900 dark:text-gray-300 ms-2 w-full py-4 text-sm font-medium"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
