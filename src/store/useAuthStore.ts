import { create } from "zustand";
import axiosInstance from "../lib/axios";
import type { LoginFormData, SignUpFormData } from "../lib/types";
import toast from "react-hot-toast";
interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  profile_pic: any;
  created_at: string;
  updated_at: string;
}
interface AuthStore {
  authUser: AuthUser | null;
  isLoading: boolean;
  error: Record<string, any> | null;
  checkAuth: () => void;
  signup: (data: SignUpFormData) => void;
  login: (data: LoginFormData) => void;
  isCheckingAuth: boolean;
}
export const useAuthStore = create<AuthStore>((set, _) => ({
  isCheckingAuth: true,
  authUser: null,
  isLoading: false,
  error: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null, error: error as Record<string, any> });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data: SignUpFormData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (data: LoginFormData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("LoggedIn successfully!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
