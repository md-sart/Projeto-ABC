import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 font-sans">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        
        { }
        <Image
          src="/logo.svg" 
          alt="Logo da Plataforma"
          width={140}
          height={140}
          priority
          className="rounded-full"
        />

        {/* Título e descrição */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Bem-vindo!</h1>
          <p className="text-md sm:text-lg text-gray-700 max-w-md">
            Aprenda de forma divertida com desafios, jogos e atividades personalizadas.
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <a
            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base h-10 sm:h-12 px-6 font-medium transition"
            href="/cadastro"
          >
            Cadastre-se
          </a>
          <a
            className="rounded-full border border-purple-600 text-purple-700 hover:bg-purple-100 text-sm sm:text-base h-10 sm:h-12 px-6 font-medium transition"
            href="/login"
          >
            Já tenho conta
          </a>
        </div>
      </main>

      {/* Rodapé opcional */}
      <footer className="row-start-3 text-xs text-gray-500 text-center">
        © 2025 Sua Plataforma Educacional
      </footer>
    </div>
  );
}
