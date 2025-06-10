
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Processos from "./pages/Processos";
import Financeiro from "./pages/Financeiro";
import Agenda from "./pages/Agenda";
import Documentos from "./pages/Documentos";
import Equipe from "./pages/Equipe";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import CalculadorasJuridicas from "./pages/CalculadorasJuridicas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ProtectedLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/processos" element={<Processos />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/documentos" element={<Documentos />} />
              <Route path="/equipe" element={<Equipe />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/calculadoras" element={<CalculadorasJuridicas />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProtectedLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
