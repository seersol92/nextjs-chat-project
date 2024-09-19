"use client";
import Link from "next/link";
import Tab from "../Tab";
import AbMobile from "./AbMobile";
import MobileFibre from "./MobileFibre";
import MobileFibreTv from "./MobileFibreTv";

const LandingPage: React.FC = () => {
  // Define your tab data
  const tabs = [
    {
      id: "abonnement-mobile",
      label: "Abonnement Mobile",
      content: <AbMobile />,
    },
    {
      id: "mobile-fibre",
      label: "Mobile + Fibre",
      content: <MobileFibre />,
    },
    {
      id: "mobile-fibre-tv",
      label: "Mobile + Fibre + TV",
      content: <MobileFibreTv />,
    },
  ];
  return (
    <>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="bg-primary p-4 text-white shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <Link href="/" className="hover:underline">
                CHATBOT APP
              </Link>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/about" className="hover:text-secondary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-secondary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {/* Main Content */}
        <div className="container">
          {/* Main Content */}
          <main className="flex-1 p-6">
            <h1 className="pb-4 text-2xl font-bold">
              De quel type d'offre souhaitez-vous profiter ?*
            </h1>

            <h3 className="pb-4">Choisissez une option</h3>

            {/* Use the Tab Component */}
            <Tab tabs={tabs} />
          </main>
        </div>
        {/* Footer */}
        <footer className="bg-primary p-4 text-white">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 CHATBOT APP. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
