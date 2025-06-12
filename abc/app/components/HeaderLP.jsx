"use client";

import Link from "next/link";

export default function HeaderLP() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#703596] shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between text-sm sm:text-base text-white">
        <div className="font-bold text-xl tracking-wide">ABC</div>
        <ul className="flex flex-wrap gap-4 sm:gap-6 font-medium">
          <li>
            <Link href="/" className="hover:underline hover:text-yellow-300 transition-colors">
              Página Inicial
            </Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:underline hover:text-yellow-300 transition-colors">
              Sobre o site
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:underline hover:text-yellow-300 transition-colors">
              Login
            </Link>
          </li>
          <li>
            <Link href="/cadastro" className="hover:underline hover:text-yellow-300 transition-colors">
              Cadastro
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}