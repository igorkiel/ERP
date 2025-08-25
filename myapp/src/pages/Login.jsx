// src/pages/Login.jsx
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { loginWithIdToken } = useAuth();

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ padding: 24, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,.1)" }}>
        <h1 style={{ marginBottom: 16 }}>Entrar</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            // credential é um JWT (ID token)
            const idToken = credentialResponse.credential;
            if (idToken) {
              loginWithIdToken(idToken);
            }
          }}
          onError={() => {
            alert("Falha no login com Google. Tente novamente.");
          }}
          useOneTap // opcional: “One Tap” habilitado
        />
      </div>
    </div>
  );
}
