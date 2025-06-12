"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Ranking() {
  const [usuario, setUsuario] = useState({
    nome: "João Silva",
    matematica: 0,
    palavras: 0,
    leituras: 0,
    total: 0,
  });

  const [historico, setHistorico] = useState([]);
  const [pontosHoje, setPontosHoje] = useState(0);

  useEffect(() => {
    // Recupera dados do localStorage (você pode adaptar o nome das chaves)
    const matematica = parseInt(localStorage.getItem("pontos_matematica")) || 0;
    const palavras = parseInt(localStorage.getItem("pontos_palavras")) || 0;
    const leituras = parseInt(localStorage.getItem("leituras_feitas")) || 0;
    const total = matematica + palavras + leituras;

    // Atualiza usuário
    setUsuario((prev) => ({
      ...prev,
      matematica,
      palavras,
      leituras,
      total,
    }));

    // ----- HISTÓRICO DE PONTUAÇÃO DIÁRIA -----
    const dataHoje = new Date().toLocaleDateString();
    const historicoAtual = JSON.parse(localStorage.getItem("historico_pontos")) || [];

    const atualizado = historicoAtual.map((dia) =>
      dia.data === dataHoje ? { ...dia, pontos: total } : dia
    );

    const existeHoje = atualizado.find((dia) => dia.data === dataHoje);
    if (!existeHoje) atualizado.push({ data: dataHoje, pontos: total });

    localStorage.setItem("historico_pontos", JSON.stringify(atualizado));
    setHistorico(atualizado);

    // Comparativo de pontos de hoje
    const pontosInicioHoje = historicoAtual.find((dia) => dia.data === dataHoje)?.pontos || 0;
    setPontosHoje(total - pontosInicioHoje);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-[#ec2b2a] mb-4">🚀 Seu Progresso</h1>

        <p className="text-center text-lg mb-6 text-gray-700">
          Cada passo conta! Continue se desafiando e aprendendo. 💡
        </p>

        {/* Informações do usuário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-10">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="font-semibold text-lg mb-2">Nome</h2>
            <p className="text-xl">{usuario.nome}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="font-semibold text-lg mb-2">Matemática</h2>
            <p className="text-xl">{usuario.matematica} pontos</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="font-semibold text-lg mb-2">Português</h2>
            <p className="text-xl">{usuario.palavras} pontos</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="font-semibold text-lg mb-2">Leituras feitas</h2>
            <p className="text-xl">{usuario.leituras}</p>
          </div>
        </div>

        {/* Pontuação Total e Comparativo */}
        <div className="bg-white shadow rounded w-full max-w-3xl p-6 text-center mb-10">
          <h2 className="text-2xl font-bold text-[#ec2b2a] mb-2">Total de Pontos</h2>
          <p className="text-3xl font-semibold mb-2">{usuario.total} pontos</p>
          <p className="text-green-600 font-medium">
            +{pontosHoje} pontos conquistados hoje! 🔥
          </p>
        </div>

        {/* Histórico de Pontuação */}
        <div className="w-full max-w-3xl bg-white rounded shadow p-6 mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#ec2b2a]">Histórico de Pontuação</h2>
          {historico.length > 0 ? (
            <ul className="space-y-2">
              {historico.map((dia, idx) => (
                <li key={idx} className="flex justify-between text-gray-700 border-b pb-1">
                  <span>{dia.data}</span>
                  <span>{dia.pontos} pts</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem dados ainda. Jogue algo hoje para ver seu progresso!</p>
          )}
        </div>

        {/* Mensagem final */}
        <p className="text-center text-md text-gray-600 mt-4">
          “O sucesso é a soma de pequenos esforços repetidos dia após dia.” – Robert Collier
        </p>
      </main>

      <Footer />
    </div>
  );
}