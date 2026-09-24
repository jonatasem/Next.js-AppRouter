"use client";

import { useLoginForm } from "@/hooks/useLoginForm"; // Importando o hook criado
import { Mail, Lock, LogIn, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  // Consumindo todas as propriedades do formulário diretamente do hook
  const { register, handleSubmit, errors, isSubmitting, authError } = useLoginForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-radial from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md border-slate-200/80 dark:border-slate-800/80 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:shadow-2xl z-10">
        <CardHeader className="space-y-1 text-center pt-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            <LogIn className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Acessar Conta
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 text-sm">
            Digite suas credenciais de acesso
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {authError && (
              <div className="flex items-center gap-3 p-3.5 text-sm text-red-600 bg-red-50/50 dark:bg-red-950/30 border border-red-200/60 dark:border-red-900/50 rounded-xl animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <p className="font-medium">{authError}</p>
              </div>
            )}

            {/* Campo E-mail */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                E-mail
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  className={`pl-10 h-11 rounded-xl transition-all ${
                    errors.email ? "border-red-500 focus-visible:ring-red-500 bg-red-50/10" : "focus-visible:ring-blue-500 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-3 w-3" /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Senha
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 h-11 rounded-xl transition-all ${
                    errors.password ? "border-red-500 focus-visible:ring-red-500 bg-red-50/10" : "focus-visible:ring-blue-500 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-3 w-3" /> {errors.password.message}
                </p>
              )}
            </div>

            {/* Botão de Envio de Login */}
            <Button type="submit" className="w-full h-11 rounded-xl font-medium transition-all active:scale-[0.98] shadow-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Entrando...
                </span>
              ) : "Entrar"}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">Ou</span>
              </div>
            </div>

            <div className="text-center text-sm text-slate-500">
              Não tem uma conta ainda?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-500 font-semibold underline-offset-4 hover:underline">
                Cadastrar-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
