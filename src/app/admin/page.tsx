import { Metadata } from "next";
import { getAuthSession } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard/page";

export const metadata: Metadata = {
  title: "ChatBot | Admin",
  description: "ChatBot | Admin",
};
``
export default async function Home() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <>
      <Dashboard />
    </>
  );
}
