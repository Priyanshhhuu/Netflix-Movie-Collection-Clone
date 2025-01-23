import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLogginIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(`/api/v1/auth/signup`, credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account Created successful!");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLogginIn: true });
    try {
      const response = await axios.post(`/api/v1/auth/login`, credentials);
      set({ user: response.data.user, isLogginIn: false });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      set({ user: null, isLogginIn: false });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post(`/api/v1/auth/logout`);
      set({ user: null, isLoggingOut: false });
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`/api/v1/auth/authCheck`);
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
