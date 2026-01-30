"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/spinner";

const VISITED_KEY = "habit-tracker-visited";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(VISITED_KEY);

    if (storedValue === null) {
      window.localStorage.setItem(VISITED_KEY, "true");
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }

    setHasCheckedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasCheckedStorage || isSessionPending) {
      return;
    }

    if (isFirstVisit) {
      router.replace("/landing");
      return;
    }

    if (session) {
      router.replace("/dashboard");
      return;
    }

    router.replace("/login");
  }, [hasCheckedStorage, isSessionPending, isFirstVisit, router, session]);

  if (!hasCheckedStorage || isSessionPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner className="h-10 w-10 border-4 border-emerald-200 border-t-emerald-500" />
      </main>
    );
  }

  return null;
}
