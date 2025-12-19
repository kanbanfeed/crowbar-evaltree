  "use client";

  import { createContext, useContext, useEffect, useState } from "react";
  import { supabase } from "@/lib/supabaseClient";
  import { User } from "@supabase/supabase-js";

  type AuthCtx = {
    user: User | null;
    loading: boolean;
    signInWithCrowbar: () => void;
    signOutUser: () => Promise<void>;
  };

  const AuthContext = createContext<AuthCtx | null>(null);

  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const signInWithCrowbar = () => {
      
       const callbackUrl = `${window.location.origin}/auth/callback`;

      window.location.href = `https://www.crowbarltd.com/login?redirect_to=${encodeURIComponent(callbackUrl)}`;
    };

    const signOutUser = async () => {
      await supabase.auth.signOut();
      setUser(null);
      
    };

    useEffect(() => {
      let mounted = true;

      (async () => {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setUser(data.session?.user ?? null);
        setLoading(false);
      })();

      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        mounted = false;
        sub.subscription.unsubscribe();
      };
    }, []);

    return (
      <AuthContext.Provider value={{ user, loading, signInWithCrowbar, signOutUser }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
  };
