import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "i-Learn - Votre Academy sur Internet",
  description: "Plateforme d'apprentissage en ligne - Cours, exercices et ressources éducatives pour tous les niveaux",
  keywords: "éducation, cours en ligne, exercices, apprentissage, i-learn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}