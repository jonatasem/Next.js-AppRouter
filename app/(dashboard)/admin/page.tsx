"use client";

import { useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Scissors, LogOut, Users, DollarSign, CalendarCheck2, TrendingUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminDashboard() {
  const router = useRouter();

  // 🔒 BARREIRA DE SEGURANÇA: Passando o parâmetro "admin" para obrigar a verificação no Firestore
  const { userData, loading } = useAuth("admin");

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // Enquanto o Firebase faz a leitura assíncrona da role no banco, exibe o feedback profissional
  if (loading) {
    return <LoadingScreen message="Validando permissões administrativas..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Header Corporativo */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Scissors className="h-5 w-5 text-amber-500" />
            <span>BarberSpace</span>
            <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">Admin</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Exibe o nome do administrador de forma reativa caso queira */}
            <div className="hidden md:block text-xs text-slate-400 font-medium">
              Logado como: <span className="text-slate-200 font-semibold">{userData?.name || "Administrador"}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-full cursor-pointer">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white gap-2 rounded-xl cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Sair do Painel</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Grid Administrativo */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Visão Geral do Negócio</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Monitore o faturamento, agendamentos e filas em tempo real.</p>
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Receita Estimada</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 1.240,00</div>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +12% em relação a ontem
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cortes Agendados</CardTitle>
              <CalendarCheck2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-slate-500 mt-1">6 concluídos, 12 pendentes</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Novos Clientes</CardTitle>
              <Users className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24</div>
              <p className="text-xs text-slate-500 mt-1">Cadastrados esta semana</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Barbeiros Ativos</CardTitle>
              <Scissors className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4 / 5</div>
              <p className="text-xs text-slate-500 mt-1">Profissionais trabalhando agora</p>
            </CardContent>
          </Card>
        </div>

        {/* Gerenciamento Operacional Abaixo */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Agenda Consolidada do Dia</CardTitle>
            <CardDescription>Monitore os horários ocupados por profissional.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col items-center justify-center text-slate-400 text-sm gap-2 border-t border-slate-100 dark:border-slate-800 mt-4">
            <CalendarCheck2 className="h-8 w-8 stroke-[1.5] text-slate-300" />
            <p>Nenhum agendamento listado para a data de hoje.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
