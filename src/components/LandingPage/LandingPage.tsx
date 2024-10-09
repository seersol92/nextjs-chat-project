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
      <div className=" min-h-screen bg-[#0F9DE8]">
        {/* Header */}
        <header className="text-white shadow-md">
          <div className="flex items-center justify-between pl-6">
            {/* Logo */}
            <div className="pb-2 pt-2">
              <Link href="/" className="hover:underline">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={100} // Adjust width as needed
                  height={50} // Adjust height as needed
                  className="rounded-full object-contain"
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
        <div className="">
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Use the Tab Component
             */}
            <ChatBot />
          </main>
        </div>
        {/* Footer */}
        <footer className=" p-5 text-white">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
