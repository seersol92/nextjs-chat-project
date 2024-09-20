"use client";
import React, { useState } from "react";
import MobileOperators from "./MobileOperators";
import { operatorsList } from "@/lib/operatorsList";
import QuestionWithOptions from "../QuestionWithOptions";
import { toast } from "react-toastify";

const AbMobile: React.FC = () => {
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedDispleasure, setSelectedDispleasure] = useState<string>("");
  const [selectedCost, setSelectedCost] = useState<string>("");
  const [selectedEngagement, setSelectedEngagement] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loader state
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    const leadData = {
      operator: selectedOperator,
      duration: selectedDuration,
      displeasure: selectedDispleasure,
      cost: selectedCost,
      engagement: selectedEngagement,
      name,
      surname,
      email,
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
        toast.success("Lead soumis avec succès !");
        setSubmissionStatus(
          "Merci, nous allons vous contacter prochainement pour vous proposer la meilleure offre.",
        );
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
    <div>
      <p className="mb-5">
        Pour commencer, quel est <b>votre opérateur mobile</b> actuel ?*
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
          { id: "not-sure", value: "je-ne-sais-pas", label: "Je ne sais pas" },
        ]}
        selectedValue={selectedDuration}
        onChange={handleDurationChange}
        name="duration"
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
        name="displeasure"
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
        name="cost"
      />
      <QuestionWithOptions
        question="Êtes-vous encore engagés chez votre opérateur ? *"
        options={[
          { id: "yes", value: "oui", label: "Oui" },
          { id: "no", value: "non", label: "Non" },
        ]}
        selectedValue={selectedEngagement}
        onChange={handleEngagementChange}
        name="engagement"
      />
      <p className="mb-5 font-bold">Formulaire de contact :</p>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="text-gray-700 block text-sm font-medium"
        >
          Nom *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-gray-300 mt-1 block w-full rounded-md border p-2 shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="surname"
          className="text-gray-700 block text-sm font-medium"
        >
          Prénom *
        </label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="border-gray-300 mt-1 block w-full rounded-md border p-2 shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="text-gray-700 block text-sm font-medium"
        >
          Adresse mail *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-gray-300 mt-1 block w-full rounded-md border p-2 shadow-sm"
          required
        />
      </div>
      <div className="my-4 flex items-center">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
          className="mr-2"
        />
        <span>
          Nous comprenons l'importance de la confidentialité de vos informations
          personnelles. Soyez assuré(e), vos coordonnées sont strictement
          confidentielles et ne seront utilisées que dans le but de vous envoyer
          un devis adapté. En validant ma demande j'accepte de transmettre mes
          informations afin de recevoir gratuitement un devis ou d'être contacté
          par téléphone ou par email par un professionnel du site
          comparateurabonnement.ch du lundi au samedi, de 9h à 20h. Mes données
          sont protégées par la règlementation européenne LPD en Suisse.
          Mentions Légales
        </span>
      </div>
      <div className="mt-4 flex justify-center">
        {loading ? (
          <div className="loader">Loading...</div> // Add your loading indicator style
        ) : submissionStatus ? (
          <p className="text-lg font-bold text-green-600">{submissionStatus}</p>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!acceptedTerms}
            className={`rounded-lg px-4 py-2 font-semibold text-white shadow-md transition duration-200 ${
              acceptedTerms
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-blue-400"
            }`}
          >
            Valider
          </button>
        )}
      </div>
    </div>
  );
};

export default AbMobile;
