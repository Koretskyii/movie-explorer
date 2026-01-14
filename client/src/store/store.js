import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthModes } from "@/constants/constants";

const initialState = () => ({
  movies: [],
  popularMovies: [],
  moviesByGenre: [],
  filters: {
    query: "",
    page: 1,
  },
  movieDetails: {},
});

const appStore = (set, get) => ({
  ...initialState(),
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },
  setMovies: (movies) => {
    set({
      movies,
    });
  },
  setPopularMovies: (popularMovies) => {
    set({
      popularMovies,
    });
  },
  setMoviesByGenre: (moviesByGenre) => {
    set({
      moviesByGenre,
    });
  },
  setMovieDetails: (movieDetails) => {
    set({
      movieDetails,
    });
  },
  reset: () => set(() => ({ ...initialState() })),
});

const AuthStore = (set, get) => ({
  access_token: null,
  isLoginModalOpen: false,
  isAuthenticated: false,
  user: null,
  authMode: AuthModes.LOGIN,
  setAccess_Token: (token) =>
    set({ access_token: token, isAuthenticated: !!token }),
  setAuthMode: (mode) => set({ authMode: mode }),
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null, access_token: null }),
  setLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
});

const useAppStore = create(appStore);
const useAuthStore = create(
  persist(AuthStore, {
    name: "auth-store",
    partialize: (state) => ({
      access_token: state.access_token,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      authMode: state.authMode,
    }),
  })
);

export { useAppStore, useAuthStore };
