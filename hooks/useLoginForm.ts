"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

// Definição do Schema de validação com Zod centralizado
export const loginSchema = z.object({
  email: z.email("Insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const formMethods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    try {
      // 1. Efetua a autenticação inicial com e-mail e senha
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // 2. Busca o perfil e permissões salvos no Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // 3. Redirecionamento condicional baseado na role
        if (userData.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/client");
        }
      } else {
        setAuthError("Perfil não encontrado nas tabelas do banco.");
      }
    } catch (error) {
      console.error(error);
      setAuthError("E-mail ou senha incorretos.");
    }
  };

  return {
    register: formMethods.register,
    handleSubmit: (e?: React.BaseSyntheticEvent) => formMethods.handleSubmit(handleLoginSubmit)(e),
    errors: formMethods.formState.errors,
    isSubmitting: formMethods.formState.isSubmitting,
    authError,
  };
}
