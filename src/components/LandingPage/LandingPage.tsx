"use client";
import Link from "next/link";
import Image from "next/image";
import Tab from "../Tab";
import AbMobile from "./AbMobile";

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
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="bg-[#d3d3d3]  text-white shadow-md">
          <div className="flex items-center justify-between pl-6">
            {/* Logo */}
            <div className="">
              <Link href="/" className="hover:underline">
                <Image
                  src="/images/logo.jpeg"
                  alt="Logo"
                  width={100} // Adjust width as needed
                  height={40} // Adjust height as needed
                  className="object-contain"
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
            <h1 className="pb-4 text-2xl font-bold">
              De quel type d&apos;offre souhaitez-vous profiter ?*
            </h1>

            <h3 className="pb-4">Choisissez une option</h3>

            {/* Use the Tab Component */}
            <Tab tabs={tabs} />
          </main>
        </div>
        {/* Footer */}
        <footer className="bg-[#d3d3d3] p-4 text-white">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
