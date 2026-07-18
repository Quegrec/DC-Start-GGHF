import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "GGHF - Good Games & Have Fun",
    template: "%s | GGHF",
  },
  description:
    "Le premier compagnon intelligent qui décode votre ADN de joueur. Découvrez votre archétype, progressez avec des guides personnalisés et rejoignez une communauté bienveillante.",
  keywords: ["gaming", "archétype", "guides", "progression", "communauté", "jeux vidéo"],
  authors: [{ name: "GGHF" }],
  openGraph: {
    title: "GGHF - Good Games & Have Fun",
    description: "Découvrez votre archétype de joueur et progressez avec des guides sur-mesure.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "GGHF - Good Games & Have Fun",
    description: "Découvrez votre archétype de joueur et progressez avec des guides sur-mesure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${jakarta.variable} min-h-screen bg-[#0B0F19] text-white antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
