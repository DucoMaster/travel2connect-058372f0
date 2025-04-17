
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CreateProfile from "./pages/Profile/CreateProfile";
import PackageDetail from "./pages/PackageDetail";
import Credits from "./pages/Credits";
import NotFound from "./pages/NotFound";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import SubmitEvent from "./pages/SubmitEvent";

const queryClient = new QueryClient();

// Auth route guard for private routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:id" element={<GuideDetail />} />
            <Route path="/submit-event" element={<SubmitEvent />} />
            
            {/* Protected routes */}
            <Route 
              path="/profile/create" 
              element={
                <ProtectedRoute>
                  <CreateProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/credits" 
              element={
                <ProtectedRoute>
                  <Credits />
                </ProtectedRoute>
              } 
            />
            
            {/* Package routes */}
            <Route path="/packages/:id" element={<PackageDetail />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
