import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-10">
        
        {/* Cabeçalho */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Plataforma de Conformidade
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecione abaixo a área de diagnóstico que deseja acessar. O nosso sistema irá guiá-lo por todo o processo.
          </p>
        </div>

        {/* Grelha de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Módulo Ambiental (Ativo) */}
          <Link 
            href="/ambiental" 
            className="block p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border-t-4 border-emerald-500 text-left cursor-pointer group"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
              Ambiental
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Iniciar diagnóstico de conformidade ambiental e gerar laudo de adequação.
            </p>
          </Link>

          {/* Módulo Saúde (Em breve) */}
          <div className="block p-8 bg-gray-100 rounded-2xl border-t-4 border-gray-300 opacity-60 cursor-not-allowed text-left">
            <h2 className="text-2xl font-bold text-gray-500 mb-3">
              Saúde
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Módulo de conformidade sanitária e de saúde ocupacional.
            </p>
            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-500 text-xs font-semibold rounded-full">
              Em breve
            </span>
          </div>

          {/* Módulo Segurança (Em breve) */}
          <div className="block p-8 bg-gray-100 rounded-2xl border-t-4 border-gray-300 opacity-60 cursor-not-allowed text-left">
            <h2 className="text-2xl font-bold text-gray-500 mb-3">
              Segurança
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Módulo de segurança do trabalho e prevenção de riscos.
            </p>
            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-500 text-xs font-semibold rounded-full">
              Em breve
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}