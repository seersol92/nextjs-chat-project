// lib/withAuthLayout.tsx
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";

interface WithAuthLayoutProps {
  children: ReactNode;
}

const WithAuthLayout = ({ children }: WithAuthLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (!session?.user) {
    router.push("/admin/login"); // Redirect to home or login page
    return null;
  }

  return <>{children}</>;
};

export default WithAuthLayout;
