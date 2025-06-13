"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLeituraStore } from "../store/useLeituraStore";
import Parse from "parse/dist/parse.min.js";

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  "Gb7IEa3uD4HZ3H3cxY3Hgc7axbVoE4l34awX2pxZ",
  "zbuHnfdGnYdzu5X0G39CnIrTvPOEayhmwZIXWXXI"
);

export default function Leitura() {
  const [dificuldade, setDificuldade] = useState("todos");
  const [tema, setTema] = useState("todos");
  const [velocidade, setVelocidade] = useState(1);
  const [textoSelecionado, setTextoSelecionado] = useState("");
  const [leiturasFeitas, setLeiturasFeitas] = useState(0);
  const { textos, setTextos, showFormulario, toggleFormulario } = useLeituraStore();
  const [form, setForm] = useState({ dificuldade: "", tema: "", conteudo: "" });

  const carregarTextos = async () => {
    const query = new Parse.Query("Leitura");
    const resultados = await query.find();
    const formatados = resultados.map((t) => ({
      id: t.id,
      dificuldade: t.get("Dificuldade"),
      tema: t.get("Tema"),
      conteudo: t.get("Texto"),
    }));
    setTextos(formatados);
  };

  useEffect(() => {
    carregarTextos();
    const leiturasSalvas = parseInt(localStorage.getItem("leituras_feitas")) || 0;
    setLeiturasFeitas(leiturasSalvas);
  }, []);

  useEffect(() => {
    const filtrados = textos.filter((t) => {
      return (
        (dificuldade === "todos" || t.dificuldade === dificuldade) &&
        (tema === "todos" || t.tema === tema)
      );
    });
    if (filtrados.length > 0) {
      const aleatorio = Math.floor(Math.random() * filtrados.length);
      setTextoSelecionado(filtrados[aleatorio].conteudo);
    } else {
      setTextoSelecionado("Nenhum texto encontrado para o filtro selecionado.");
    }
  }, [dificuldade, tema, textos]);

  const trocarTexto = () => {
    const filtrados = textos.filter((t) => {
      return (
        (dificuldade === "todos" || t.dificuldade === dificuldade) &&
        (tema === "todos" || t.tema === tema)
      );
    });
    if (filtrados.length > 0) {
      const aleatorio = Math.floor(Math.random() * filtrados.length);
      setTextoSelecionado(filtrados[aleatorio].conteudo);
    } else {
      setTextoSelecionado("Nenhum texto encontrado.");
    }
  };

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const selection = document.getSelection();
      const textoParaLer =
        selection && selection.toString().trim() !== ""
          ? selection.toString()
          : textoSelecionado;

      const utterance = new SpeechSynthesisUtterance(textoParaLer);
      utterance.lang = "pt-BR";
      utterance.rate = velocidade;
      speechSynthesis.speak(utterance);

      setLeiturasFeitas((prev) => {
        const novoValor = prev + 1;
        localStorage.setItem("leituras_feitas", novoValor.toString());
        return novoValor;
      });
    } else {
      alert("Seu navegador não suporta leitura automática.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarTexto = async () => {
    try {
      // Se já estiver editando um texto, vamos atualizar
      if (form.id) {
        const query = new Parse.Query("Leitura");
        const objeto = await query.get(form.id);
        objeto.set("Dificuldade", form.dificuldade);
        objeto.set("Tema", form.tema);
        objeto.set("Texto", form.conteudo);
        await objeto.save();
      } else {
        // Caso contrário, cria um novo
        const Leitura = Parse.Object.extend("Leitura");
        const novo = new Leitura();
        novo.set("Dificuldade", form.dificuldade);
        novo.set("Tema", form.tema);
        novo.set("Texto", form.conteudo);
        await novo.save();
      }

      setForm({ dificuldade: "", tema: "", conteudo: "" });
      toggleFormulario();
      await carregarTextos();
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-[#703596] mb-4">📖 Leitura</h1>

        <button
          onClick={toggleFormulario}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ {showFormulario ? "Fechar Formulário" : "Editar textos"}
        </button>

        {showFormulario && (
          <div className="w-full max-w-xl mb-6 space-y-6">
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Novo Texto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Dificuldade</label>
                  <select
                    name="dificuldade"
                    value={form.dificuldade}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Selecione</option>
                    <option value="fácil">Fácil</option>
                    <option value="médio">Médio</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Tema</label>
                  <select
                    name="tema"
                    value={form.tema}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Selecione</option>
                    <option value="ciência">Ciência</option>
                    <option value="história">História</option>
                    <option value="literatura">Literatura</option>
                  </select>
                </div>
              </div>
              <textarea
                name="conteudo"
                value={form.conteudo}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 h-28 mb-4"
                placeholder="Digite o conteúdo..."
              />
              <button
                onClick={salvarTexto}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                💾 Salvar Texto
              </button>
            </div>

            {/* Lista de Textos Cadastrados */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Textos Cadastrados</h2>
              {textos.length === 0 ? (
                <p className="text-gray-600">Nenhum texto cadastrado ainda.</p>
              ) : (
                textos.map((texto) => (
                  <div
                    key={texto.id}
                    className="border rounded p-3 mb-3 bg-gray-50 shadow-sm"
                  >
                    <p>
                      <strong>Dificuldade:</strong> {texto.dificuldade}
                    </p>
                    <p>
                      <strong>Tema:</strong> {texto.tema}
                    </p>
                    <p className="whitespace-pre-wrap mt-1 mb-2 text-sm text-gray-800">
                      {texto.conteudo}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setForm({
                            id: texto.id,
                            dificuldade: texto.dificuldade,
                            tema: texto.tema,
                            conteudo: texto.conteudo,
                          })
                        }
                        className="text-blue-600 hover:underline"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const Leitura = new Parse.Object("Leitura");
                            Leitura.set("objectId", texto.id);
                            await Leitura.destroy();
                            await carregarTextos();
                          } catch (error) {
                            console.error("Erro ao excluir:", error);
                          }
                        }}
                        className="text-red-600 hover:underline"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Filtros e controles */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Dificuldade</label>
            <select
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
            <label className="block text-sm font-medium mb-1">Tema</label>
            <select
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
