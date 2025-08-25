// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Login from "./pages/Login";

// Páginas do app
function Home() {
  return <div style={{ padding: 24 }}>Dashboard inicial (após login)</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* adicione mais rotas protegidas aqui */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
