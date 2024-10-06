import { Metadata } from "next";
import LandingPage from "@/components/LandingPage/LandingPage";

export const metadata: Metadata = {
  title: "App",
  description: "App",
};

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
