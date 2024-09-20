import Image from "next/image";
import React from "react";

interface Operator {
  id: string;
  name: string;
  image: string;
}

// Define the props for the MobileOperators component
interface MobileOperatorsProps {
  operators: Operator[];
  selectedOperator: string | null;
  onSelectOperator: (id: string) => void;
}

const MobileOperators: React.FC<MobileOperatorsProps> = ({
  operators,
  selectedOperator,
  onSelectOperator,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {operators.map((operator) => (
        <div
          key={operator.id}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-[50px] border p-4 transition-shadow duration-300 ease-in-out ${selectedOperator === operator.id ? "border-blue-600 bg-blue-100" : "border-gray-300"} hover:shadow-lg`}
          onClick={() => onSelectOperator(operator.id)}
        >
          <Image
            src={operator.image} // Use .src to get the URL
            alt={operator.name}
            className="mb-2 h-20 w-20 object-contain" // Adjust size as needed
          />
          <p
            className={`text-gray-700 mt-2 text-center ${selectedOperator === operator.id ? "font-bold" : ""}`}
          >
            {operator.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MobileOperators;
