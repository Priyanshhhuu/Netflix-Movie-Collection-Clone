import React from "react";
import { useAuthStore } from "../../store/authUser";
import Navbar from "../../components/Navbar";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default HomeScreen;
