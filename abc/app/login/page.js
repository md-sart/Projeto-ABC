"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HeaderLP from "../components/HeaderLP";
import Footer from "../components/Footer";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("usuario"));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.senha === formData.senha
    ) {
      alert("Login efetuado com sucesso!");
      router.push("/home");
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2dc] font-sans">
      <HeaderLP />

      <main className="flex-grow flex flex-col gap-10 items-center text-center p-6 sm:p-10 max-w-md mx-auto w-full">
        <h1 className="text-4xl font-bold text-[#703596] mb-6">Login do Jogador</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full text-left text-gray-700">
          <label className="flex flex-col">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#703596]"
              placeholder="exemplo@dominio.com"
            />
          </label>

          <label className="flex flex-col">
            Senha
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className="mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#703596]"
              placeholder="Senha"
            />
          </label>

          <button
            type="submit"
            className="rounded-xl bg-[#703596] hover:bg-purple-800 text-white text-md py-3 px-6 font-semibold transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-gray-700">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="text-[#703596] hover:underline">
            Cadastre-se
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}