"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/home");
  };

  const handleLogout = () => {
    alert("Você foi deslogado.");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#703596] shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between text-sm sm:text-base text-white">
        {/* Logo ou título com ação de navegação */}
        <button
          onClick={goToHome}
          className="font-bold text-xl tracking-wide cursor-pointer select-none hover:text-yellow-300 transition-colors bg-transparent border-none p-0 m-0"
          title="Ir para Home"
        >
          Início
        </button>

        {/* Navegação */}
        <ul className="flex flex-wrap gap-4 sm:gap-6 font-medium items-center">
          <li>
            <Link href="/jogoMatematica" className="hover:underline hover:text-yellow-300 transition-colors">
              Jogo de Matemática
            </Link>
          </li>
          <li>
            <Link href="/jogoPalavras" className="hover:underline hover:text-yellow-300 transition-colors">
              Jogo de Palavras
            </Link>
          </li>
          <li>
            <Link href="/leitura" className="hover:underline hover:text-yellow-300 transition-colors">
              Leitura
            </Link>
          </li>
          <li>
            <Link href="/rankingPessoal" className="hover:underline hover:text-yellow-300 transition-colors">
              Ranking
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:underline hover:text-yellow-300 transition-colors bg-transparent border-none cursor-pointer font-medium text-white"
              type="button"
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}