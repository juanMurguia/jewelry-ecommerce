import { useEffect } from "react";
import { useRouter } from "next/router";
import RootLayout from "@/components/layout";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("auth_token");
    router.push("/");
  }, [router]);

  return (
    <RootLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 items-center mx-auto text-center">
          <h1 className="text-4xl text-red-500 mb-4">Logged out</h1>
        </div>
      </div>
    </RootLayout>
  );
};

export default Logout;
