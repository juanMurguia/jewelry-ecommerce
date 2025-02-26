import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMe } from "@/lib/hooks";
import SearchBar from "../searchBar/SearchBar";
import { MenuIcon, X } from "lucide-react";
import { userAtom } from "@/lib/Atoms/userAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { mutate } from "swr";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const fetchedUser = useMe(); // Fetch user data
  const router = useRouter();

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    mutate("/me", null, { revalidate: false });
    router.push("/logout");
  };

  const getUsername = (email) => email.split("@")[0];

  return (
    <header className="fixed px-8 w-full mx-32 sm:w-auto z-50 py-4 sm:py-0 sm:my-4 border-0 sm:border-1 border-gray-600 rounded-lg sm:rounded-full backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:px-10">
      <div className="mx-auto flex items-center justify-between h-10 sm:gap-16 gap-6">
        <Link
          href="/"
          className="font-serif hidden font-light cursor-pointer text-sm italic !stretch-150% sm:inline-block"
        >
          Mailove
        </Link>

        <div className="hidden sm:flex items-center justify-around gap-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/"
                className="flex items-center hover:!text-amber-200 text-sm"
              >
                <h2>Home</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="flex items-center hover:!text-amber-200 text-sm"
              >
                <h2>Products</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/#about-us"
                className="flex items-center hover:!text-amber-200 text-sm"
              >
                <h2>Our Story</h2>
              </Link>
            </li>
            <li>
              <SearchBar></SearchBar>
            </li>
          </ul>
        </div>

        <div className="sm:hidden flex items-center w-full justify-between">
          <button
            aria-label="Menu"
            className="text-gray-200 hover:text-amber-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>

          <SearchBar></SearchBar>
        </div>

        {!user?.userData && (
          <Link href="/login" className=" px-2 py-2">
            <button className="cursor-pointer whitespace-nowrap w-full border-0 text-sm !font-light !bg-transparent !text-gray-200 hover:!text-amber-200">
              Log in
            </button>
          </Link>
        )}

        {user?.userData && (
          <div className="gap-2 items-center hidden sm:flex">
            <span className="text-xs cursor-default">
              {"@"}
              {getUsername(user?.userData?.email)}
            </span>
            <button
              className="text-xs text-gray-400 hover:text-amber-200 cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="sm:hidden h-[95dvh] flex flex-col items-center  py-16 gap-16 ">
          <Link
            href="/"
            className="flex items-center hover:!text-amber-200 text-3xl"
          >
            <h2>Home</h2>
          </Link>
          <Link
            href="/products"
            className="flex items-center hover:!text-amber-200 text-3xl"
          >
            <h2>Products</h2>
          </Link>
          <Link
            href="/#about-us"
            className="flex items-center hover:!text-amber-200 text-3xl"
          >
            <h2>Our Story</h2>
          </Link>

          {user?.userData && (
            <div className="flex flex-col items-center mt-auto">
              <span className="text-xl cursor-default">
                {"@"}
                {getUsername(user?.userData?.email)}
              </span>
              <button
                className="text-lg text-gray-400 hover:text-amber-200 cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
