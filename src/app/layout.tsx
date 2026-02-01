import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GGHF - Gaming Growth & Happiness Framework",
    template: "%s | GGHF",
  },
  description:
    "Le premier compagnon intelligent qui décode votre ADN de joueur. Découvrez votre archétype, progressez avec des guides personnalisés et rejoignez une communauté bienveillante.",
  keywords: ["gaming", "archétype", "guides", "progression", "communauté", "jeux vidéo"],
  authors: [{ name: "GGHF" }],
  openGraph: {
    title: "GGHF - Gaming Growth & Happiness Framework",
    description: "Découvrez votre archétype de joueur et progressez avec des guides sur-mesure.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "GGHF - Gaming Growth & Happiness Framework",
    description: "Découvrez votre archétype de joueur et progressez avec des guides sur-mesure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#121212] text-white antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
