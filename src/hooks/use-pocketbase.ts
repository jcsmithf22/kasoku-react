import { useContext } from "react";
import { PocketbaseContext } from "@/context/PocketbaseContext";

export const usePocketbase = () => {
  const context = useContext(PocketbaseContext);
  if (!context) {
    throw new Error("usePocketbase must be used within a PocketbaseProvider");
  }
  return context;
};
