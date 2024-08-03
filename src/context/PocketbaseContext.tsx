import React from "react";
import Pocketbase, { type AuthModel, RecordAuthResponse } from "pocketbase";
import type { TypedPocketBase, UsersResponse } from "@/lib/pocketbase-types";

const POCKETBASE_URL = "https://pocketbase.josiahsmith.dev";

type PocketbaseContextType = {
  pb: TypedPocketBase;
  token: string;
  user: AuthModel;
  logout: () => void;
  login: (
    email: string,
    password: string,
  ) => Promise<RecordAuthResponse<UsersResponse>>;
  register: (email: string, password: string) => Promise<UsersResponse>;
};

export const PocketbaseContext =
  React.createContext<PocketbaseContextType | null>(null);

type ContextProviderProps = {
  children: React.ReactNode;
};

export const PocketbaseProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const pb = React.useMemo(
    () => new Pocketbase(POCKETBASE_URL) as TypedPocketBase,
    [],
  );
  const [token, setToken] = React.useState<string>(pb.authStore.token);
  const [user, setUser] = React.useState<AuthModel>(pb.authStore.model);

  React.useEffect(() => {
    pb.authStore.onChange(() => {
      setToken(pb.authStore.token);
      setUser(pb.authStore.model);
    });
  }, [pb]);

  const logout = React.useCallback(() => {
    pb.authStore.clear();
  }, [pb]);

  const login = React.useCallback(
    async (email: string, password: string) => {
      return await pb.collection("users").authWithPassword(email, password);
    },
    [pb],
  );

  const register = React.useCallback(
    async (email: string, password: string) => {
      return await pb
        .collection("user")
        .create<UsersResponse>({ email, password, passwordConfirm: password });
    },
    [pb],
  );

  return (
    <PocketbaseContext.Provider
      value={{ pb, token, user, logout, login, register }}
    >
      {children}
    </PocketbaseContext.Provider>
  );
};
