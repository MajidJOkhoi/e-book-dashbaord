import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define the shape of the token store state and actions
export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
}

// Create the token store using Zustand, with devtools and persist middleware
const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        token: "",
        // Action to update the state
        setToken: (data: string) => set({ token: data }),
      }),
      {
        name: "token-store", // Key for persisting the state in local storage
      }
    )
  )
);

export default useTokenStore;
