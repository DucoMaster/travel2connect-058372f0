import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CreateProfile from "./pages/Profile/CreateProfile";
import PackageDetail from "./pages/PackageDetail";
import BookPackage from "./pages/BookPackage";
import Credits from "./pages/Credits";
import NotFound from "./pages/NotFound";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import SubmitEvent from "./pages/SubmitEvent";
import QueryProvider from "./lib/query-provider";
import { Spinner } from "./components/spinner";
import Success from "./pages/Payment/success";
import PackageNotFound from "./components/package/PackageNotFound";
import PaymentError from "./pages/Payment/error";
import EventCheckIn from "./pages/EventCheckIn";
import SuccessEventPayment from "./pages/Payment/success-topup";

// Auth route guard for private routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryProvider>
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

              <Route
                path="/success"
                element={
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/successTopUp"
                element={
                  <ProtectedRoute>
                    <SuccessEventPayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/error"
                element={
                  <ProtectedRoute>
                    <PaymentError />
                  </ProtectedRoute>
                }
              />

              {/* Package routes */}
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/packages/:id/book" element={<BookPackage />} />

              {/* QR code route */}
              <Route path="/event-checkin" element={<EventCheckIn />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryProvider>
  );
};

export default App;
