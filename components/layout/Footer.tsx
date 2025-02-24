import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-16 bg-black opacity-50 py-10">
      <div className="container flex flex-col items-center justify-between gap-4  md:h-24 md:flex-row md:py-0">
        <div className="flex space-x-4 gap-4">
          <Link
            href="https://github.com/juanMurguia"
            target="_blank"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-gray-100" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/juan-cruz-murguia/"
            aria-label="LinkedIn"
            target="_blank"
          >
            <Linkedin className="h-5 w-5 text-gray-100" />
          </Link>
        </div>
        <p className="text-center text-gray-100 text-sm leading-loose text-muted-foreground md:text-left cursor-default">
          © 2025 Made by Juan Murguia. All rights reserved.
        </p>
      </div>
      <p className="text-center text-gray-500 text-xs  leading-loose  cursor-default">
        This e-commerce was developed as part of an educational project at
        @apx.school. It is not a real store, and transactions are not actual
        purchases.
      </p>
    </footer>
  );
}
