
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/processos" element={<div className="text-white">Página de Processos - Em desenvolvimento</div>} />
            <Route path="/financeiro" element={<div className="text-white">Página Financeiro - Em desenvolvimento</div>} />
            <Route path="/agenda" element={<div className="text-white">Página Agenda - Em desenvolvimento</div>} />
            <Route path="/documentos" element={<div className="text-white">Página Documentos - Em desenvolvimento</div>} />
            <Route path="/equipe" element={<div className="text-white">Página Equipe - Em desenvolvimento</div>} />
            <Route path="/relatorios" element={<div className="text-white">Página Relatórios - Em desenvolvimento</div>} />
            <Route path="/configuracoes" element={<div className="text-white">Página Configurações - Em desenvolvimento</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
