"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Calendar, Clock, Scissors, LogOut, User as UserIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function ClientDashboard() {
  const router = useRouter();
  
  const { user, userData, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Topbar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Scissors className="h-5 w-5 text-blue-600" />
            <span>BarberSpace</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <UserIcon className="h-4 w-4" />
              {/* Puxando o nome direto do objeto do hook */}
              <span className="truncate max-w-[150px] font-medium">{userData?.name || user?.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 gap-2 cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="space-y-2">
            {/* Puxando o nome aqui também */}
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              Olá, {userData?.name || "Cliente"}! <Sparkles className="h-6 w-6 text-yellow-300 fill-yellow-300" />
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-md">
              Agende seus horários com seus profissionais favoritos de forma rápida e prática.
            </p>
            <div className="pt-2">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl cursor-pointer">
                Agendar Novo Horário
              </Button>
            </div>
          </div>
        </div>

        {/* Grade de Informações */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Próximos Agendamentos */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg font-bold">Próximos Agendamentos</CardTitle>
                <CardDescription>Seus horários reservados</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent className="h-40 flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
              <Clock className="h-8 w-8 stroke-[1.5]" />
              <p>Você não tem nenhum agendamento ativo.</p>
            </CardContent>
          </Card>

          {/* Histórico Recente */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg font-bold">Histórico Recente</CardTitle>
                <CardDescription>Últimos serviços realizados</CardDescription>
              </div>
              <Scissors className="h-5 w-5 text-slate-500" />
            </CardHeader>
            <CardContent className="h-40 flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
              <p>Nenhum serviço registrado nos últimos 30 dias.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
