"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

// O Schema do Zod fica centralizado aqui no Hook
export const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.email("Insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const formMethods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        role: "client",
        createdAt: new Date().toISOString()
      });
      
      router.push("/client");
    } catch (error) {
      const authError = error as AuthError;
      console.error(authError);
      
      if (authError.code === "auth/email-already-in-use") {
        setAuthError("Este e-mail já está em uso por outra conta.");
      } else if (authError.code === "auth/invalid-email") {
        setAuthError("O formato do e-mail é inválido.");
      } else if (authError.code === "auth/weak-password") {
        setAuthError("A senha escolhida é muito fraca.");
      } else {
        setAuthError("Ocorreu um erro ao criar a conta. Tente novamente.");
      }
    }
  };

    return {
    register: formMethods.register,
    handleSubmit: formMethods.handleSubmit(handleRegisterSubmit),
    errors: formMethods.formState.errors,
    isSubmitting: formMethods.formState.isSubmitting,
    authError,
  };
}