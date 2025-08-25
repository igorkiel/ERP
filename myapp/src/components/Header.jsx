import { useAuth } from "../auth/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();
  if (!user) return null;
  const name = user.profile?.name || user.profile?.email;
  return (
    <header style={{ padding: "12px 16px", display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid #eee" }}>
      <strong>Pristine ERP</strong>
      <span style={{ marginLeft: "auto" }}>Olá, {name}</span>
      <button onClick={logout}>Sair</button>
    </header>
  );
}
