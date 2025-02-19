import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t px-16">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <div className="flex space-x-4 gap-4">
          <Link href="https://facebook.com" aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 Made by Juan Murguia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
