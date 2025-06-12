"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function JogoPalavras() {
  const [palavra, setPalavra] = useState(gerarPalavra());
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState("");
  const [pontos_portugues, setpontos_portugues] = useState(0);

  useEffect(() => {
    const score = localStorage.getItem("score_palavras") || "0";
    setpontos_portugues(parseInt(score));
  }, []);

  useEffect(() => {
    localStorage.setItem("score_palavras", pontos_portugues.toString());
  }, [pontos_portugues]);

  function gerarPalavra() {
    const palavras = ["casa", "livro", "mesa", "caneta", "sol", "carro", "gato", "janela"];
    const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
    return {
      palavra: palavraSorteada,
      dica: `Dica: começa com "${palavraSorteada[0]}" e tem ${palavraSorteada.length} letras`,
    };
  }

  function verificarResposta() {
    if (resposta.toLowerCase().trim() === palavra.palavra) {
      setFeedback("✔️ Correto!");
      setpontos_portugues((prev) => prev + 1);
    } else {
      setFeedback(`❌ Errado. A resposta era "${palavra.palavra}"`);
    }
    setResposta("");
    setPalavra(gerarPalavra());
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center p-6 sm:p-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-[#0095d2] mb-4">🔤 Jogo de Palavras</h1>

        {/* Instruções */}
        <p className="mb-6 text-gray-700 max-w-md text-center">
          Adivinhe a palavra com base na dica. Você ganha 1 ponto por acerto!
        </p>

        {/* Caixa principal */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center w-full max-w-md">
          {/* Dica */}
          <div className="text-xl font-semibold mb-4 text-[#0095d2]">
            {palavra.dica}
          </div>

          {/* Campo de entrada */}
          <input
            type="text"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            placeholder="Digite sua resposta"
            className="border border-[#0095d2] rounded px-4 py-2 mb-2 w-full text-center focus:outline-none focus:border-blue-700"
            style={{ color: "#0095d2" }}
          />

          {/* Botão Verificar */}
          <button
            onClick={verificarResposta}
            className="bg-[#0095d2] text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 transition w-full"
          >
            Verificar
          </button>

          {/* Feedback */}
          <div className="mt-4 text-lg font-medium">{feedback}</div>
        </div>

        {/* Pontuação */}
        <p className="mt-6 text-sm text-gray-600">Pontuação: {pontos_portugues}</p>
      </main>

      <Footer />
    </div>
  );
}