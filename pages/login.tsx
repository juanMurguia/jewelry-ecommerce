import React from "react";
import { Login } from "@/components/login";
import Layout from "@/components/layout";

const LoginPage = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col gap-8 justify-center items-center mx-auto text-center h-[90dvh] sm:h-[80dvh] py-16 my-16 px-16">
        <Login />
      </div>
    </Layout>
  );
};

export default LoginPage;
