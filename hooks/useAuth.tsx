// lib/useAuth.ts
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Adicionado o parâmetro opcional 'requiredRole'
export function useAuth(requiredRole?: "client" | "admin") {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            const role = data.role || "client";
            
            setUserData({
              name: data.name || "",
              role: role
            });

            // Se a página exigir 'admin' e o usuário for 'client'
            if (requiredRole && role !== requiredRole) {
              // Expulsa o cliente intruso imediatamente para o painel dele
              router.push(role === "admin" ? "/admin" : "/client");
              return;
            }
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, requiredRole]);

  return { user, userData, loading };
}
