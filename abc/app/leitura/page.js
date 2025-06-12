"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Leitura() {
  const [dificuldade, setDificuldade] = useState("todos");
  const [tema, setTema] = useState("todos");
  const [velocidade, setVelocidade] = useState(1);
  const [textoSelecionado, setTextoSelecionado] = useState("");
  const [leiturasFeitas, setLeiturasFeitas] = useState(0);

  // Carrega a contagem de leituras do localStorage ao montar o componente
  useEffect(() => {
    const leiturasSalvas = parseInt(localStorage.getItem("leituras_feitas")) || 0;
    setLeiturasFeitas(leiturasSalvas);
  }, []);

  // Troca automática ao mudar filtro
  useEffect(() => {
    const textosFiltrados = textos.filter((t) => {
      return (
        (dificuldade === "todos" || t.dificuldade === dificuldade) &&
        (tema === "todos" || t.tema === tema)
      );
    });

    if (textosFiltrados.length > 0) {
      const aleatorio = Math.floor(Math.random() * textosFiltrados.length);
      setTextoSelecionado(textosFiltrados[aleatorio].conteudo);
    } else {
      setTextoSelecionado("Nenhum texto encontrado para o filtro selecionado.");
    }
  }, [dificuldade, tema]);

  // Função para trocar o texto selecionado
  const trocarTexto = () => {
    const textosFiltrados = textos.filter((t) => {
      return (
        (dificuldade === "todos" || t.dificuldade === dificuldade) &&
        (tema === "todos" || t.tema === tema)
      );
    });

    if (textosFiltrados.length > 0) {
      const aleatorio = Math.floor(Math.random() * textosFiltrados.length);
      setTextoSelecionado(textosFiltrados[aleatorio].conteudo);
    } else {
      setTextoSelecionado("Nenhum texto encontrado para o filtro selecionado.");
    }
  };

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const selection = document.getSelection();
      let textoParaLer =
        selection && selection.toString().trim() !== ""
          ? selection.toString()
          : textoSelecionado;

      const utterance = new SpeechSynthesisUtterance(textoParaLer);
      utterance.lang = "pt-BR";
      utterance.rate = velocidade;
      speechSynthesis.speak(utterance);

      // Incrementa a contagem de leituras feitas e salva no localStorage
      setLeiturasFeitas((prev) => {
        const novoValor = prev + 1;
        localStorage.setItem("leituras_feitas", novoValor.toString());
        return novoValor;
      });
    } else {
      alert("Seu navegador não suporta leitura automática.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-[#703596] mb-4">📖 Leitura</h1>

        <p className="mb-6 text-gray-700 max-w-md text-center">
          Escolha o texto e tema desejado e ative a leitura automática.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-lg">
          <div>
            <label htmlFor="dificuldade" className="block text-sm font-medium mb-1">
              Dificuldade
            </label>
            <select
              id="dificuldade"
              value={dificuldade}
              onChange={(e) => setDificuldade(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="todos">Todos</option>
              <option value="fácil">Fácil</option>
              <option value="médio">Médio</option>
              <option value="difícil">Difícil</option>
            </select>
          </div>
          <div>
            <label htmlFor="tema" className="block text-sm font-medium mb-1">
              Tema
            </label>
            <select
              id="tema"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="todos">Todos</option>
              <option value="ciência">Ciência</option>
              <option value="história">História</option>
              <option value="literatura">Literatura</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={trocarTexto}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            🔄 Trocar Frase
          </button>
          <button
            onClick={() => setVelocidade((v) => Math.max(0.5, v - 0.1))}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded"
          >
            ⏪ Diminuir Velocidade
          </button>
          <button
            onClick={() => setVelocidade((v) => Math.min(2, v + 0.1))}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded"
          >
            ⏩ Aumentar Velocidade
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Velocidade atual: {velocidade.toFixed(1)}x
        </div>

        <div className="bg-white rounded shadow p-4 mb-4 w-full max-w-xl h-40 overflow-y-auto">
          <textarea
            value={textoSelecionado}
            onChange={(e) => setTextoSelecionado(e.target.value)}
            className="w-full h-full resize-none focus:outline-none"
            placeholder="Selecione uma parte do texto para ler..."
          ></textarea>
        </div>

        <button
          onClick={speakText}
          className="bg-[#0095d2] hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          🔊 Ler em voz alta
        </button>

        <p className="mt-4 text-gray-700">
          Leituras feitas: <strong>{leiturasFeitas}</strong>
        </p>
      </main>

      <Footer />
    </div>
  );
}


// Base de textos (6 por tema: 2 fácil, 2 médio, 2 difícil)
const textos = [
  // CIÊNCIA
  {
    dificuldade: "fácil",
    tema: "ciência",
    conteudo:
      "A água cobre 70% da superfície da Terra e é fundamental para todas as formas de vida conhecidas, incluindo plantas, animais e humanos.",
  },
  {
    dificuldade: "fácil",
    tema: "ciência",
    conteudo:
      "O corpo humano é composto por cerca de 60% de água. Ela ajuda na digestão, circulação e regulação da temperatura.",
  },
  {
    dificuldade: "médio",
    tema: "ciência",
    conteudo:
      "A fotossíntese é o processo pelo qual as plantas convertem luz solar em energia química, essencial para manter a vida na Terra.",
  },
  {
    dificuldade: "médio",
    tema: "ciência",
    conteudo:
      "Os ecossistemas são comunidades de organismos que interagem entre si e com o ambiente, mantendo o equilíbrio natural do planeta.",
  },
  {
    dificuldade: "difícil",
    tema: "ciência",
    conteudo:
      "A teoria da relatividade de Einstein revolucionou o entendimento do tempo e do espaço, sugerindo que ambos são maleáveis e influenciados pela gravidade.",
  },
  {
    dificuldade: "difícil",
    tema: "ciência",
    conteudo:
      "A mecânica quântica estuda o comportamento das partículas subatômicas e desafia conceitos tradicionais da física clássica.",
  },

  // HISTÓRIA
  {
    dificuldade: "fácil",
    tema: "história",
    conteudo:
      "Pedro Álvares Cabral chegou ao Brasil em 1500. Ele era um navegador português e sua viagem marcou o início da colonização do país.",
  },
  {
    dificuldade: "fácil",
    tema: "história",
    conteudo:
      "A independência do Brasil foi proclamada por Dom Pedro I em 1822, às margens do rio Ipiranga, em São Paulo.",
  },
  {
    dificuldade: "médio",
    tema: "história",
    conteudo:
      "Durante o Império Romano, uma vasta rede de estradas foi construída, conectando todas as partes do império e permitindo o crescimento econômico e militar.",
  },
  {
    dificuldade: "médio",
    tema: "história",
    conteudo:
      "A Revolução Francesa, ocorrida em 1789, foi um marco importante na luta por igualdade, liberdade e fraternidade, influenciando outras revoluções ao redor do mundo.",
  },
  {
    dificuldade: "difícil",
    tema: "história",
    conteudo:
      "A Guerra Fria foi um período de tensão geopolítica entre Estados Unidos e União Soviética, caracterizado por disputas ideológicas, tecnológicas e militares, mas sem confronto direto.",
  },
  {
    dificuldade: "difícil",
    tema: "história",
    conteudo:
      "O Iluminismo foi um movimento intelectual do século XVIII que defendia o uso da razão, da ciência e dos direitos humanos como pilares da organização social.",
  },

  // LITERATURA
  {
    dificuldade: "fácil",
    tema: "literatura",
    conteudo:
      "Monteiro Lobato foi um dos principais autores de literatura infantil do Brasil, conhecido pela criação do Sítio do Picapau Amarelo.",
  },
  {
    dificuldade: "fácil",
    tema: "literatura",
    conteudo:
      "O Pequeno Príncipe é uma obra de Antoine de Saint-Exupéry que fala sobre amizade, amor e o valor das coisas simples.",
  },
  {
    dificuldade: "médio",
    tema: "literatura",
    conteudo:
      "Machado de Assis escreveu Dom Casmurro, uma obra marcante do realismo brasileiro, que traz reflexões profundas sobre amor, ciúme e memória.",
  },
  {
    dificuldade: "médio",
    tema: "literatura",
    conteudo:
      "Clarice Lispector é conhecida por sua escrita introspectiva e existencial, que mergulha nos pensamentos mais profundos de seus personagens.",
  },
  {
    dificuldade: "difícil",
    tema: "literatura",
    conteudo:
      "O romance 'Grande Sertão: Veredas', de Guimarães Rosa, utiliza uma linguagem complexa e inovadora para retratar o sertão brasileiro e os dilemas humanos.",
  },
  {
    dificuldade: "difícil",
    tema: "literatura",
    conteudo:
      "A poesia concreta brasileira rompeu com as formas tradicionais de escrita, explorando a disposição visual das palavras como elemento expressivo.",
  },
];