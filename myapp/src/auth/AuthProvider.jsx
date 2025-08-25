// src/auth/AuthProvider.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("id_token");
    if (!token) return null;
    try {
      const payload = jwtDecode(token);
      // opcional: checar expiração
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("id_token");
        return null;
      }
      return { token, profile: payload };
    } catch {
      localStorage.removeItem("id_token");
      return null;
    }
  });

  const loginWithIdToken = (token) => {
    localStorage.setItem("id_token", token);
    const payload = jwtDecode(token);
    setUser({ token, profile: payload });
  };

  const logout = () => {
    localStorage.removeItem("id_token");
    setUser(null);
  };

  const value = useMemo(() => ({ user, loginWithIdToken, logout }), [user]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}
