"use client";
import Link from "next/link";
import Image from "next/image";
import Tab from "../Tab";
import AbMobile from "./AbMobile";
import ChatBot from "../ChatBot";

const LandingPage: React.FC = () => {
  // Define your tab data
  const tabs = [
    {
      id: "abonnement-mobile",
      label: "Abonnement Mobile",
      content: <AbMobile tabType="Abonnement Mobile" />,
    },
    {
      id: "mobile-fibre",
      label: "Mobile + Fibre",
      content: <AbMobile tabType="Mobile + Fibre" />,
    },
    {
      id: "mobile-fibre-tv",
      label: "Mobile + Fibre + TV",
      content: <AbMobile tabType="Mobile + Fibre + TV" />,
    },
  ];
  return (
    <>
      <div className=" min-h-screen">
        {/* Header */}
        <header className="bg-custom-gradient  text-white shadow-md">
          <div className="flex items-center justify-between pl-6">
            {/* Logo */}
            <div className="pt-2 pb-2">
              <Link href="/" className="hover:underline">
                <Image
                  src="/images/logo.jpeg"
                  alt="Logo"
                  width={95} // Adjust width as needed
                  height={43} // Adjust height as needed
                  className="object-contain rounded-full"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className="hidden space-x-4">
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
        <div className="mainImage">
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Use the Tab Component
             */}
            <ChatBot />
          </main>
        </div>
        {/* Footer */}
        <footer className="bg-custom-gradient p-4 text-white">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
