"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Crown, CheckCircle, XCircle, Loader } from "lucide-react";

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Processing authentication...");

  const safeNext = useMemo(() => {
    const next = searchParams.get("next") || "/";
    return next.startsWith("/") ? next : "/";
  }, [searchParams]);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlHash = window.location.hash?.replace(/^#/, "") || "";
        const hashParams = new URLSearchParams(urlHash);
        const queryParams = new URLSearchParams(window.location.search);

        const access_token =
          hashParams.get("access_token") ||
          queryParams.get("access_token") ||
          hashParams.get("accessToken") ||
          queryParams.get("accessToken");

        const refresh_token =
          hashParams.get("refresh_token") ||
          queryParams.get("refresh_token") ||
          hashParams.get("refreshToken") ||
          queryParams.get("refreshToken");

        if (access_token && refresh_token) {
          setMessage("Setting up your session...");

          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) throw error;

          if (data.session) {
            setStatus("success");
            setMessage("Login successful. Redirecting...");

            const cleanUrl = window.location.pathname + window.location.search;
            window.history.replaceState(null, "", cleanUrl);

            setTimeout(() => router.replace(safeNext), 900);
            return;
          }
        }

        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setStatus("success");
          setMessage("Welcome back. Redirecting...");
          setTimeout(() => router.replace(safeNext), 700);
          return;
        }

        throw new Error("No authentication tokens found");
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setMessage(error?.message || "Authentication failed");
        setTimeout(() => router.replace("/?login=failed"), 2000);
      }
    };

    handleCallback();
  }, [router, safeNext]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        {status === "loading" && (
          <>
            <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <Crown className="w-8 h-8 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connecting to Crowbar</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <Crown className="w-8 h-8 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login successful</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => router.replace("/")}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}