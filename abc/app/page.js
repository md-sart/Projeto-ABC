import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 sm:p-10 gap-12 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 font-sans">
      <main className="flex flex-col gap-10 row-start-2 items-center text-center">
        
        {/* Logo */}
        <Image
          src="/lampada.svg" // troque se quiser outro ícone
          alt="Logo da Plataforma"
          width={120}
          height={120}
          priority
          className="rounded-full"
        />

        {/* Título e Subtítulo */}
        <div>
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Olá, Duda!</h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-md">
            Aprenda de forma divertida com desafios, jogos e atividades personalizadas.
          </p>
        </div>

        {/* Botões Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          <a
            className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-md py-3 px-6 font-semibold transition"
            href="/desafios"
          >
            🎯 Desafios
          </a>
          <a
            className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-md py-3 px-6 font-semibold transition"
            href="/praticar"
          >
            📖 Praticar
          </a>
          <a
            className="rounded-xl bg-red-500 hover:bg-red-600 text-white text-md py-3 px-6 font-semibold transition"
            href="/atividades"
          >
            📝 Atividades
          </a>
          <a
            className="rounded-xl bg-green-500 hover:bg-green-600 text-white text-md py-3 px-6 font-semibold transition"
            href="/podio"
          >
            🏆 Pódio
          </a>
        </div>

        {/* Acesso / Login */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 text-sm sm:text-base h-10 sm:h-12 px-6 font-bold transition"
            href="/cadastro"
          >
            Cadastre-se
          </a>
          <a
            className="rounded-full border border-purple-600 text-purple-700 hover:bg-purple-100 text-sm sm:text-base h-10 sm:h-12 px-6 font-bold transition"
            href="/login"
          >
            Já tenho conta
          </a>
        </div>
      </main>

      <footer className="row-start-3 text-xs text-gray-500 text-center mt-4">
        © 2025 Sua Plataforma Educacional
      </footer>
    </div>
  );
}
