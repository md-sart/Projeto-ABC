"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderLP from "../components/HeaderLP";
import Footer from "../components/Footer";

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <HeaderLP />

      {/* Conteúdo Principal */}
      <main className="flex flex-col gap-10 items-center text-center p-6 sm:p-10 max-w-4xl mx-auto">
        {/* Logo */}
        <Image
          src="/lampada.svg"
          alt="Logo da Plataforma"
          width={120}
          height={120}
          priority
          className="rounded-full"
        />

        {/* Título */}
        <h1 className="text-4xl font-bold text-[#703596] mb-4">Sobre o Projeto</h1>

        {/* Resumo do projeto */}
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Este projeto trata da exclusão educacional enfrentada por crianças em territórios periféricos, onde o acesso à educação de qualidade ainda é um desafio persistente. A negligência das políticas públicas e a adoção de um modelo educacional tecnicista — descolado da realidade social e cultural desses estudantes — resultam em defasagens graves no processo de alfabetização e letramento.
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4">
          Como consequência, há altos índices de evasão escolar, baixo desempenho acadêmico e a perpetuação de desigualdades sociais. Segundo dados do UNICEF (2021), a exclusão escolar no Brasil atinge principalmente crianças negras e pobres das periferias urbanas, afetando diretamente o seu direito à educação plena. Além disso, o INEP (2022) aponta que mais de 20% dos alunos da rede pública apresentam defasagem idade-série, dificultando ainda mais o aprendizado de leitura e compreensão textual.
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4">
          Diante desse cenário, o projeto propõe o desenvolvimento de um aplicativo educativo voltado para crianças entre 6 e 12 anos residentes em comunidades periféricas. A solução tecnológica será construída com base em recursos lúdicos, elementos da oralidade e referências culturais dos territórios de origem das crianças, de forma a tornar o processo de aprendizagem mais significativo e acessível. A proposta é alinhada a estudos que apontam a eficácia de tecnologias educacionais interativas no desenvolvimento da leitura e escrita em contextos de vulnerabilidade social.
        </p>

        {/* Desenvolvedoras */}
        <section className="mt-10 w-full max-w-md text-left">
          <h2 className="text-2xl font-semibold text-[#703596] mb-4">Desenvolvedoras</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
            <li>Adrielly Campos Soares</li>
            <li>Marcela Milleny Barreto Aragão</li>
            <li>Maria Eduarda Felipe do Nascimento da Silva</li>
            <li>Maria Eduarda Correia Santos</li>
            <li>Marília Albuquerque De Lima Ribeiro</li>
          </ul>
        </section>

        {/* Link para voltar à Home */}
        <Link
          href="/"
          className="mt-12 rounded-xl bg-[#703596] hover:bg-purple-800 text-white text-md py-3 px-8 font-semibold transition inline-block"
        >
          Voltar para a Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}