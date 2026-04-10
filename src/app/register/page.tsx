"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, AtSign, Lock, User } from "lucide-react";
import { Card } from "@/components/common";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email || !username || !password || !confirmPassword) {
      setError("Renseigne tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(data.message ?? "Impossible de creer le compte.");
        return;
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/app",
      });

      if (!signInResult || signInResult.error) {
        // Si la connexion auto echoue, on renvoie vers la page de login avec un message de succes inscription
        const params = new URLSearchParams({
          registered: "1",
          email,
        });
        router.push(`/login?${params.toString()}`);
        return;
      }

      router.push(signInResult.url ?? "/app");
    } catch {
      setError("Impossible de creer le compte pour le moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-16">
      <div className="max-w-md mx-auto px-6">
        <Card glow glowColor="#00D1FF" className="p-7 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Inscription</h1>
            <p className="text-sm text-white/60 mt-2">
              Cree ton compte pour sauvegarder ta progression et ton profil joueur.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-white/70 mb-2 inline-flex items-center gap-2">
                <AtSign className="w-4 h-4 text-[#00D1FF]" />
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D1FF]/50"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white/70 mb-2 inline-flex items-center gap-2">
                <User className="w-4 h-4 text-[#00D1FF]" />
                Pseudo
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ton pseudo"
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D1FF]/50"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white/70 mb-2 inline-flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00D1FF]" />
                Mot de passe
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Au moins 8 caracteres"
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D1FF]/50"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white/70 mb-2 inline-flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00D1FF]" />
                Confirmation
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repete ton mot de passe"
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D1FF]/50"
              />
            </label>

            {error && <p className="text-sm text-[#F59E0B]">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-xl bg-[#00D1FF] text-black font-semibold hover:bg-[#00D1FF]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {submitting ? "Creation..." : "Creer mon compte"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-sm text-white/60">
            Deja inscrit ?{" "}
            <Link href="/login" className="text-[#00D1FF] hover:underline">
              Se connecter
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
