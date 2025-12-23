import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Mapa from "./pages/Mapa";
import Podcast from "./pages/Podcast";
import Laboratorio from "./pages/Laboratorio";
import Corpus from "./pages/Corpus";
import CorpusDetail from "./pages/CorpusDetail";
import NotFound from "./pages/NotFound";
import EpisodePage from "./pages/Episode";
import Auth from "./pages/Auth";
import { NavigationProvider } from "./lib/navigation";
import ScrollAndFocus from "./components/ScrollAndFocus";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <NavigationProvider>
            <ScrollAndFocus />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/mapa" element={<Mapa />} />
              <Route path="/map" element={<Navigate to="/mapa" replace />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/podcast/:id" element={<EpisodePage />} />
              <Route path="/laboratorio" element={<Laboratorio />} />
              <Route path="/lab" element={<Navigate to="/laboratorio" replace />} />
              <Route path="/corpus" element={<Corpus />} />
              <Route path="/corpus/:slug" element={<CorpusDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NavigationProvider>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
