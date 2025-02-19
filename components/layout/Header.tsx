import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMe } from "@/lib/hooks";
import SearchBar from "../searchBar/SearchBar";

export default function Header() {
  const user = useMe();
  const router = useRouter();

  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/logout");
  };

  return (
    <header className="sticky top-0 z-50 w-full py-2  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16 sm:px-6 lg:px-16">
      <div className="container mx-auto flex items-center justify-between h-14">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-extrabold sm:inline-block">
              MAI.LOVE
            </span>
          </Link>
        </div>

        <SearchBar></SearchBar>
        {!user?.userData && (
          <Button variant="outline">
            <Link href="/login">Log in</Link>
          </Button>
        )}

        {user?.userData && (
          <div className="flex flex-col items-end space-x-4">
            <span className="text-sm">{user?.userData?.email}</span>
            <button
              className="text-xs text-gray-400 hover:text-amber-200 cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
