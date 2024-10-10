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
      <div className=" min-h-screen bg-blue-200">
        {/* Header */}
        <header className="text-white shadow-md">
          <div className="flex items-center flex-col md:flex-row justify-between md:pl-6">
            {/* Logo */}
            <div className="pb-2 pt-2 ">
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

            <div className="pb-2 pt-2">
              <div className="md:ml-3 flex flex-col gap-5 rounded-lg border border-white p-5 shadow-xl shadow-white/30 md:flex-row">
                <div className="flex  gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                    />
                  </svg>
                  <div className="text-md flex flex-col text-black">
                    <h5 className="font-bold">Comparatif des abonnements</h5>
                    <p>Séléction des meilleurs abonnements</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-black"
                    viewBox="0 0 34 34"
                    stroke="currentColor"
                  >
                    <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
                  </svg>
                  <div className="text-md flex flex-col text-black">
                    <h5 className="font-bold">
                      Économisez en changeant de forfait
                    </h5>
                    <p>Profitez des actions</p>
                  </div>
                </div>
                <div className="flex  gap-1">
                  <Image
                    src={"/images/copy.png"}
                    width={38}
                    height={10}
                    alt=""
                  />
                  <div className="text-md flex flex-col text-black">
                    <h5 className="font-bold">
                      100% indépendant et transparent
                    </h5>
                    <p>Conseil et clarté</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className=" hidden space-x-4">
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
