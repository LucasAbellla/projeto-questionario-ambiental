import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conformidades",
  description: "Sistema inteligente de auditoria e conformidade ambiental para empresas.",
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/2923/2923058.png", // Ícone de folha verde provisório
  },
  openGraph: {
    title: "EnvCheck | Diagnóstico",
    description: "Avalie a conformidade ambiental da sua empresa em minutos.",
    siteName: "EnvCheck",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}