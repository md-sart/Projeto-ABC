"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function JogoMatematica() {
  const [pergunta, setPergunta] = useState(gerarPergunta());
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState("");
  const [pontos_matematica, setpontos_matematica] = useState(0);

  useEffect(() => {
    const score = localStorage.getItem("score_matematica") || "0";
    setpontos_matematica(parseInt(score));
  }, []);

  useEffect(() => {
    localStorage.setItem("score_matematica", pontos_matematica.toString());
  }, [pontos_matematica]);

  function gerarPergunta() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const operacoes = ["+", "-", "*"];
    const op = operacoes[Math.floor(Math.random() * operacoes.length)];
    // Usar Function para evitar warnings do eval
    const resultado = Function(`return ${a} ${op} ${b}`)();
    return { a, b, op, resultado };
  }

  function verificarResposta() {
    if (parseInt(resposta) === pergunta.resultado) {
      setFeedback("✔️ Correto!");
      setpontos_matematica((prev) => prev + 1);
    } else {
      setFeedback(`❌ Errado. A resposta era ${pergunta.resultado}`);
    }
    setResposta("");
    setPergunta(gerarPergunta());
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center p-6 sm:p-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-[#703596] mb-4">🎯 Jogo de Matemática</h1>

        {/* Instruções */}
        <p className="mb-6 text-gray-700 max-w-md text-center">
          Resolva as operações abaixo. Você ganha 1 ponto para cada resposta correta!
        </p>

        {/* Caixa principal */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center w-full max-w-md">
          {/* Pergunta */}
          <div className="text-xl font-semibold mb-4 text-[#703596]">
            Quanto é {pergunta.a} {pergunta.op} {pergunta.b}?
          </div>

          {/* Campo de entrada */}
          <input
            type="number"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            className="border border-[#703596] rounded px-4 py-2 mb-2 w-full text-center focus:outline-none focus:border-purple-800"
            style={{ color: "#703596" }}
          />

          {/* Botão Verificar */}
          <button
            onClick={verificarResposta}
            className="bg-[#703596] text-white px-4 py-2 mt-2 rounded hover:bg-purple-800 transition w-full"
          >
            Verificar
          </button>

          {/* Feedback */}
          <div className="mt-4 text-lg font-medium">{feedback}</div>
        </div>

        {/* Pontuação */}
        <p className="mt-6 text-sm text-gray-600">Pontuação: {pontos_matematica}</p>
      </main>

      <Footer />
    </div>
  );
}