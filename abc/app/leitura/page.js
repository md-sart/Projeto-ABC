"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Parse from "parse/dist/parse.min.js";

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  "Gb7IEa3uD4HZ3H3cxY3Hgc7axbVoE4l34awX2pxZ",
  "zbuHnfdGnYdzu5X0G39CnIrTvPOEayhmwZIXWXXI"
);

export default function LeituraCrud() {
  const [textos, setTextos] = useState([]);
  const [textoSelecionado, setTextoSelecionado] = useState(null);
  const [form, setForm] = useState({ dificuldade: "", tema: "", conteudo: "" });
  const [modoEdicao, setModoEdicao] = useState(false);

  const carregarTextos = async () => {
    const query = new Parse.Query("Leitura");
    const resultados = await query.find();
    const textosFormatados = resultados.map((t) => ({
      id: t.id,
      dificuldade: t.get("Dificuldade"),
      tema: t.get("Tema"),
      conteudo: t.get("Texto"),
    }));
    setTextos(textosFormatados);
  };

  useEffect(() => {
    carregarTextos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarTexto = async () => {
    try {
      const Leitura = Parse.Object.extend("Leitura");

      const texto = modoEdicao
        ? await new Parse.Query("Leitura").get(textoSelecionado.id)
        : new Leitura();

      texto.set("Dificuldade", form.dificuldade);
      texto.set("Tema", form.tema);
      texto.set("Texto", form.conteudo);

      await texto.save();
      setForm({ dificuldade: "", tema: "", conteudo: "" });
      setModoEdicao(false);
      setTextoSelecionado(null);
      await carregarTextos();
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  const editarTexto = (texto) => {
    setForm({
      dificuldade: texto.dificuldade,
      tema: texto.tema,
      conteudo: texto.conteudo,
    });
    setTextoSelecionado(texto);
    setModoEdicao(true);
  };

  const excluirTexto = async (id) => {
    try {
      const texto = await new Parse.Query("Leitura").get(id);
      await texto.destroy();
      await carregarTextos();
    } catch (err) {
      console.error("Erro ao excluir:", err);
    }
  };

  const cancelarEdicao = () => {
    setForm({ dificuldade: "", tema: "", conteudo: "" });
    setModoEdicao(false);
    setTextoSelecionado(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <Header />

      <main className="flex-grow p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#703596] mb-4">
          {modoEdicao ? "✏️ Editar Texto" : "➕ Adicionar Texto"}
        </h1>

        {/* Formulário */}
        <div className="bg-white shadow rounded p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="mt-4">
            <label className="block text-sm font-medium">Texto</label>
            <textarea
              name="conteudo"
              value={form.conteudo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-28"
              placeholder="Digite o conteúdo aqui..."
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={salvarTexto}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              💾 {modoEdicao ? "Atualizar" : "Salvar"}
            </button>
            {modoEdicao && (
              <button
                onClick={cancelarEdicao}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Lista de textos */}
        <h2 className="text-xl font-semibold mb-3">📚 Textos Cadastrados</h2>
        {textos.length === 0 ? (
          <p className="text-gray-600">Nenhum texto cadastrado ainda.</p>
        ) : (
          <ul className="space-y-4">
            {textos.map((t) => (
              <li
                key={t.id}
                className="bg-white rounded shadow p-4 flex flex-col gap-2"
              >
                <div>
                  <strong>Dificuldade:</strong> {t.dificuldade} |{" "}
                  <strong>Tema:</strong> {t.tema}
                </div>
                <div className="text-sm text-gray-700">{t.conteudo}</div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => editarTexto(t)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => excluirTexto(t.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
