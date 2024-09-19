import { Metadata } from "next";
import LandingPage from "@/components/LandingPage/LandingPage";

export const metadata: Metadata = {
  title: "ChatBot Landing Page",
  description: "ChatBot Landing Page",
};

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
