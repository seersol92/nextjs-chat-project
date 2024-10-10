import React, { useState } from "react";

interface LocationFormProps {
  isLoading: boolean;
  showAddress: boolean;
  onSubmit: (data: {
    street: string;
    postalCode: string;
    city: string;
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
  }) => Promise<void>; // Pass only the formatted string
}

const LocationForm: React.FC<LocationFormProps> = ({
  isLoading,
  onSubmit,
  showAddress,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    street: "",
    postalCode: "",
    city: "",
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const formattedData = `${formData.firstName} ${formData.lastName}, ${formData.email}, ${formData.street}, ${formData.postalCode}, ${formData.city}, Phone: ${formData.phoneNumber}`;
    onSubmit(formData); // Pass the formatted string back to the parent
    /*setFormData({
      // Reset form
      street: "",
      postalCode: "",
      city: "",
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
    });*/
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
      {/* Address Section */}
      {showAddress && (
        <div>
          <div className="mb-2 hidden font-bold">
            Champs de formulaire de gestion de données :
          </div>
          <div>
            <label className="mb-1 block" htmlFor="street">
              Rue:
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="rue du Bourg"
              required
              className="border-gray-300 w-full rounded-md border p-2 transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-1 block" htmlFor="postalCode">
              Code postal:
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="1003"
              required
              className="border-gray-300 w-full rounded-md border p-2 transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-1 block" htmlFor="city">
              Ville:
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Lausanne"
              required
              className="border-gray-300 w-full rounded-md border p-2 transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
      )}

      {/* Contact Information Section */}
      <div>
        <div className="mb-2 font-bold">
          Merci d'indiquer maintenant vos coordonnées afin de vous proposer la
          meilleure offre du moment.
        </div>
        <div>
          <label className="mb-1 block" htmlFor="lastName">
            Nom:
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Ex: Thomas"
            required
            className="border-gray-300 w-full rounded-md border p-2 transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="mb-1 block" htmlFor="firstName">
            Prénom:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ex: Doe"
            required
            className="border-gray-300 w-full rounded-md border p-2 transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="mb-1 block" htmlFor="email">
            Adresse mail:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: Thomas@example.com"
            required
            className="border-gray-300 w-full rounded-md border p-2 transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Phone Number Section */}
      <div>
        <div className="mb-2 font-bold">
          Nous prendrons contact avec vous par téléphone dans quelques minutes.
          Pouvez-vous m'indiquer votre numéro de téléphone ?
        </div>
        <div>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Ex: +41 76 300 30 00"
            required
            className="border-gray-300 w-full rounded-md border p-2 transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
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

      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      ) : (
        <button
          type="submit"
          disabled={!acceptedTerms}
          className={`bg-custom-gradient-hover hover:bg-custom-gradient rounded-md p-2 text-white  transition duration-500  ${
            acceptedTerms
              ? "bg-custom-gradient"
              : "cursor-not-allowed bg-blue-400"
          }`}
        >
          Valider
        </button>
      )}
    </form>
  );
};

export default LocationForm;
