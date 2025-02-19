import { useState } from "react";
import { sendCode, getToken } from "@/lib/api";
import Router from "next/router";
import Button from "@/components/ui/Button";
import { Mail, Lock } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [codeExists, setCodeExists] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  async function handleEmailForm(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    setEmail(email);
    await sendCode(email);
    setCodeExists(true);
    setIsEmailSent(true);
    console.log("Formulario enviado");
  }

  async function handleCodeForm(e) {
    e.preventDefault();
    const code = e.target.code.value;
    try {
      getToken(email, code);
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl  text-gray-100 text-center mb-12">
          Login to Your Account
        </h2>
        {!isEmailSent ? (
          <form onSubmit={handleEmailForm} className="shadow-md rounded-lg p-8">
            <div className="pb-4">
              <label
                htmlFor="email"
                className="block text-sm text-left font-medium text-gray-400 pb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  className="pl-10 w-full border-1 border-gray-300 px-4 py-2 rounded-md bg-transparent"
                  placeholder="you@example.com"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
            </div>
            <Button type="submit" className="w-full text-gray cursor-pointer">
              Send Login Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleCodeForm} className="rounded-lg p-8">
            <div className="pb-4">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-400 pb-2"
              >
                Enter code that was sent to your email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="pl-10 w-full border-1 border-gray-300 px-4 py-2 rounded-md bg-transparent"
                  placeholder="Enter digit code"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <Button type="submit" className="w-full text-gray cursor-pointer">
              Login
            </Button>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          {isEmailSent ? (
            <button
              onClick={() => setIsEmailSent(false)}
              className="text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              I didn't receive a code
            </button>
          ) : (
            "We'll send a login code to your email"
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
