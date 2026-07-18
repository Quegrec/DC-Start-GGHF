"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Card } from "@/components/common";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredNotice, setRegisteredNotice] = useState(false);

  useEffect(() => {
    const registered = searchParams.get("registered");
    const presetEmail = searchParams.get("email");

    if (registered === "1") {
      setRegisteredNotice(true);
    }
    if (presetEmail) {
      setEmail(presetEmail);
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Renseigne ton email et ton mot de passe.");
      return;
    }

    setSubmitting(true);
    try {
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/app";
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("Identifiants invalides.");
        return;
      }

      router.push(result.url || callbackUrl);
    } catch (_e) {
      setError("Impossible de se connecter pour le moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white pt-28 pb-16">
      <div className="max-w-md mx-auto px-6">
        <Card glow glowColor="#34D399" className="p-7 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-sm text-white/60 mt-2">
              Connecte-toi pour retrouver ton profil, tes guides et ta progression.
            </p>
          </div>

          {registeredNotice && (
            <p className="mb-4 text-sm text-emerald-400">
              Compte cree avec succes. Tu peux maintenant te connecter.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-white/70 mb-2 inline-flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#34D399]" />
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#34D399]/50"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white/70 mb-2 inline-flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#34D399]" />
                Mot de passe
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#34D399]/50"
              />
            </label>

            {error && <p className="text-sm text-[#F59E0B]">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-xl bg-[#34D399] text-black font-semibold hover:bg-[#34D399]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {submitting ? "Connexion..." : "Se connecter"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-sm text-white/60">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-[#34D399] hover:underline">
              Creer un compte
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
