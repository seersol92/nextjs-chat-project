const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const botMessages = [
  {
    text: "En plus de faire des économies, pourquoi changez-vous de fournisseur ?",
    options: [
      "Un top réseau",
      "Un bouquet adapté",
      "Des conseillers disponibles",
      "Mon déménagement",
      "Je n’ai pas de fournisseur",
      "Autre",
    ],
    images: false,
    key: "type",
  },
  {
    text: "De quel type d'offre souhaitez-vous profiter ?",
    options: ["Abonnement Mobile", "Mobile + Fibre", "Fibre + TV + mobile"],
    images: false,
    key: "type",
  },
  {
    text: "Pour commencer, quel est votre opérateur mobile actuel ?*",
    options: [
      { id: "swisscom", name: "Swisscom" },
      { id: "yallo", name: "Yallo" },
      { id: "sunrise", name: "Sunrise" },
      { id: "salt", name: "Salt" },
      { id: "talktalk", name: "Talktalk" },
      { id: "teleboy", name: "Teleboy" },
      { id: "postmobile", name: "Post Mobile" },
      { id: "wingo", name: "Wingo" },
      { id: "lebara", name: "Lebara" },
      { id: "autre", name: "Autre" },
    ],
    images: true,
    key: "operator",
  },
  {
    text: "Depuis quand êtes-vous chez votre opérateur ? *",
    options: ["Moins d’1 an", "Plus d’1 an", "Je ne sais pas"],
    images: false,
    key: "duration",
  },
  {
    text: "Qu’est-ce qui vous déplaît le plus chez votre opérateur ? *",
    options: [
      "Prix de l’abonnement trop cher",
      "La lenteur du réseau",
      "Service clientèle peu joignable",
      "Je ne sais pas",
      "Autre",
    ],
    key: "displeasure",
    images: false,
  },
  {
    text: "Combien vous coûte votre abonnement par mois ? *",
    options: [
      "Moins de 40 CHF",
      "Entre 40 et 50 CHF",
      "Plus de 50 CHF",
      "Je ne sais pas",
    ],
    images: false,
    key: "cost",
  },
  {
    text: "Êtes-vous encore engagés chez votre opérateur ? ",
    options: ["Oui", "Non", "Je ne sais pas"],
    key: "confirm",
    images: false,
  },
  {
    text: "Pour vérifier votre éligibilité à la fibre, j'ai besoin de votre adresse postale 📍",
    options: [],
    input: true,
    key: "contact",
    images: false,
  },
];

async function main() {
  for (const message of botMessages) {
    await prisma.message.create({
      data: {
        text: message.text,
        options: message.options.map((option) =>
          typeof option === "string" ? option : option.name,
        ), // Assuming options are either strings or objects
        images: message.images,
        key: message.key,
      },
    });
  }
  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
