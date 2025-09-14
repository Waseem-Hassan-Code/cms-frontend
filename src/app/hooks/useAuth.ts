import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // TODO: temp hardcoded
  const [loading, setLoading] = useState<boolean>(false); // false for now

  // 🔜 Swap this with your real API call
  // Example:
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/auth/session", { credentials: "include" })
  //     .then(async (res) => {
  //       if (!res.ok) throw new Error("Not authorized");
  //       const data = await res.json();
  //       setIsAuthenticated(!!data?.user);
  //     })
  //     .catch(() => setIsAuthenticated(false))
  //     .finally(() => setLoading(false));
  // }, []);

  return { isAuthenticated, loading };
}
