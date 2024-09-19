"use client";
import React, { useState } from "react";
import MobileOperators from "./MobileOperators";
import { operatorsList } from "@/lib/operatorsList";
import QuestionWithOptions from "../QuestionWithOptions";

const AbMobile: React.FC = () => {
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);

  const [selectedDuration, setSelectedDuration] = useState<string>("");

  const [selectedDispleasure, setSelectedDispleasure] = useState<string>("");

  const [selectedCost, setSelectedCost] = useState<string>("");

  const [selectedEngagement, setSelectedEngagement] = useState<string>("");

  const handleSelectOperator = (id: string) => {
    setSelectedOperator(id);
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
  };

  const handleDispleasureChange = (value: string) => {
    setSelectedDispleasure(value);
  };

  const handleCostChange = (value: string) => {
    setSelectedCost(value);
  };

  const handleEngagementChange = (value: string) => {
    setSelectedEngagement(value);
  };
  return (
    <div>
      <p className="mb-5">
        Pour commencer, quel est <b>votre opérateur mobile</b> actuel ?* (Call
        to action sur la marque de l’opérateur.
      </p>

      <MobileOperators
        operators={operatorsList}
        selectedOperator={selectedOperator}
        onSelectOperator={handleSelectOperator}
      />
      <QuestionWithOptions
        question="Depuis quand êtes-vous chez votre opérateur ? *"
        options={[
          {
            id: "less-than-one-year",
            value: "moins-dun-an",
            label: "Moins d’1 an",
          },
          {
            id: "more-than-one-year",
            value: "plus-dun-an",
            label: "Plus d’1 an",
          },
          {
            id: "not-sure",
            value: "je-ne-sais-pas",
            label: "Je ne sais pas",
          },
        ]}
        selectedValue={selectedDuration}
        onChange={handleDurationChange}
      />

      <QuestionWithOptions
        question="Qu’est-ce qui vous déplaît le plus chez votre opérateur ? *"
        options={[
          {
            id: "price-too-high",
            value: "prix-abonnement-trop-cher",
            label: "Prix de l’abonnement trop cher",
          },
          {
            id: "slow-network",
            value: "lenteur-reseau",
            label: "La lenteur du réseau",
          },
          {
            id: "customer-service",
            value: "service-clientele-peu-joignable",
            label: "Service clientèle peu joignable",
          },
          { id: "other", value: "autre", label: "Autre" },
        ]}
        selectedValue={selectedDispleasure}
        onChange={handleDispleasureChange}
      />

      <QuestionWithOptions
        question="Combien vous coûte votre abonnement par mois ? *"
        options={[
          {
            id: "less-than-40",
            value: "moins-de-40-chf",
            label: "Moins de 40 CHF",
          },
          {
            id: "40-to-50",
            value: "entre-40-et-50-chf",
            label: "Entre 40 et 50 CHF",
          },
          {
            id: "more-than-50",
            value: "plus-de-50-chf",
            label: "Plus de 50 CHF",
          },
          { id: "dont-know", value: "je-ne-sais-pas", label: "Je ne sais pas" },
        ]}
        selectedValue={selectedCost}
        onChange={handleCostChange}
      />

      <QuestionWithOptions
        question="Êtes-vous encore engagés chez votre opérateur ? *"
        options={[
          { id: "yes", value: "oui", label: "Oui" },
          { id: "no", value: "non", label: "Non" },
        ]}
        selectedValue={selectedEngagement}
        onChange={handleEngagementChange}
      />
    </div>
  );
};

export default AbMobile;
