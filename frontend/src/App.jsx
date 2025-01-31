import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { Loader } from "lucide-react";

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  React.useEffect(() => {
    authCheck();
  }, [authCheck]);
  if (isCheckingAuth) {
    return (
      <div className="h-screen bg-primary flex justify-center items-center">
        <Loader className="animate-spin text-red-800 w-10 h-10" />
      </div>
    );
  }
  return (
    <div className=" w-full overflow-hidden  text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
//4:25:35
