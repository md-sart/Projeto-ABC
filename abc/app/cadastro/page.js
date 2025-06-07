"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setErro("As senhas não conferem");
      return;
    }
    setErro("");
    alert("Cadastro realizado com sucesso!");
    
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-sm bg-[#fff2de] rounded-2xl p-6 shadow-lg border-4 border-purple-700">
        <button className="absolute -left-4 top-4 bg-purple-600 text-white p-2 rounded-full">
          ←
        </button>

        <div className="flex justify-center mb-4">
          <div className="bg-yellow-300 rounded-full p-2">
            <span className="text-4xl font-bold text-purple-700">💡</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-center text-gray-800 mb-2">Cadastro</h1>
        <p className="text-sm text-center text-gray-600 mb-4">
          É novo no aplicativo? Chame a pessoa responsável por você para preencher o seu cadastro!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-xs font-semibold text-gray-700">E-mail (Responsável)*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full px-4 py-2 bg-yellow-100 focus:outline-none"
            required
          />

          <label className="text-xs font-semibold text-gray-700">Nome (da criança)*</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-full px-4 py-2 bg-yellow-100 focus:outline-none"
            required
          />

          <label className="text-xs font-semibold text-gray-700">Data de nascimento*</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="rounded-full px-4 py-2 bg-yellow-100 focus:outline-none"
            required
          />

          <label className="text-xs font-semibold text-gray-700">Cadastrar Senha*</label>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-full px-4 py-2 bg-yellow-100 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-4 top-2.5 text-gray-600"
            >
              {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="text-xs font-semibold text-gray-700">Repita a senha*</label>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full rounded-full px-4 py-2 bg-yellow-100 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-4 top-2.5 text-gray-600"
            >
              {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button
            type="submit"
            className={`mt-2 py-2 rounded-full font-bold ${
              senha && confirmarSenha && senha === confirmarSenha
                ? "bg-yellow-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={senha !== confirmarSenha}
          >
            Cadastrar
          </button>

          <div className="text-center text-gray-500 text-sm mt-2 font-semibold">ou</div>

          <div className="flex justify-center gap-4 text-xl mt-1">
            <span className="text-purple-600 cursor-pointer">🟣 G</span>
            <span className="text-purple-600 cursor-pointer">🍎</span>
            <span className="text-purple-600 cursor-pointer">📘</span>
          </div>

          <div className="text-center text-sm mt-2">
            Já tem uma conta?{" "}
            <a href="/login" className="font-semibold text-purple-700">
              Faça o login
            </a>
          </div>
        </form>

        <div className="flex justify-center mt-4">
          <button className="bg-purple-700 text-white rounded-full px-4 py-1">←</button>
        </div>
      </div>
    </div>
  );
}