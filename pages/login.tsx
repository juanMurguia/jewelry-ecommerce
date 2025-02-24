import React from "react";
import { Login } from "@/components/login";
import Layout from "@/components/layout";

const LoginPage = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col gap-8 justify-center items-center mx-auto text-center min-h-dvh">
        <Login />
      </div>
    </Layout>
  );
};

export default LoginPage;
