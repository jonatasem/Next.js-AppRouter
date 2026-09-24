"use client";

import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string; // passar dinamicamente no futuro
}

export function LoadingScreen({ message = "Carregando..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-2 animate-in fade-in duration-200">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
        {message}
      </p>
    </div>
  );
}
