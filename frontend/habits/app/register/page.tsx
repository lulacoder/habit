"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/spinner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await authClient.signUp.email({ email, password, name });

    if (error) {
      setError(error.message ?? "Unable to create account. Please try again.");
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30">
        <h1 className="text-2xl font-semibold text-white">Create your account</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Start tracking your habits in minutes.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="flex flex-col gap-2 text-sm text-zinc-200">
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white"
              placeholder="Jordan Lee"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white"
              placeholder="••••••••"
              required
            />
          </label>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Spinner className="h-4 w-4 border-2" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <Link
          href="/login"
          className="mt-4 inline-flex text-sm text-emerald-300 hover:text-emerald-200"
        >
          Already have an account? Sign in
        </Link>
        <Link
          href="/landing"
          className="mt-6 inline-flex text-sm text-emerald-300 hover:text-emerald-200"
        >
          Back to home page
        </Link>
      </div>
    </main>
  );
}
