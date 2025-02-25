import { useRef, useState } from "react";
import { sendCode, getToken } from "@/lib/api";
import Router from "next/router";
import Button from "@/components/ui/Button";
import { Mail, Lock } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [codeExists, setCodeExists] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  async function handleEmailForm(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    setEmail(email);
    await sendCode(email);
    setCodeExists(true);
    setIsEmailSent(true);
    if (emailInputRef.current) {
      emailInputRef.current.value = "";
    }
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

  const formStyle = {
    display: isEmailSent ? "none" : "block",
  };

  const codeStyle = {
    display: isEmailSent ? "block" : "none",
  };

  return (
    <div className="w-full">
      <div className="max-w-md mx-auto">
        <h2 className="text-4xl  text-gray-100 text-center mb-12">
          Sign <span className="text-amber-200">up</span>{" "}
        </h2>
        {!codeExists ? (
          <form
            onSubmit={handleEmailForm}
            className="shadow-md rounded-lg"
            style={formStyle}
          >
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
                  ref={emailInputRef}
                  className="pl-10 w-full border-1 border-gray-300 px-4 py-2 rounded-md !bg-transparent"
                  placeholder="you@example.com"
                  style={formStyle}
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-gray cursor-pointer hover:!bg-amber-200"
            >
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
                  style={codeStyle}
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-gray cursor-pointer  hover:!bg-amber-200"
            >
              Login
            </Button>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-gray-500">
          {isEmailSent ? (
            <button
              onClick={() => setIsEmailSent(false)}
              className="text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              <p>I didn&apos;t receive a code</p>
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
