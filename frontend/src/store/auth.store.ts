import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user:{
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
          },
          isAuthenticated: true,
        }),
      clearToken: () =>
        set({
          token: null,
          isAuthenticated: false,
        }),
      setToken: (token: string) =>
        set({
          token,
          isAuthenticated: true,
        }),
    }),
    {
      name: "auth-store",
    }
  )
);