import { UsersResponse } from "@/lib/pocketbase-types";
import { pb } from "@/lib/pocketbase";

export const login = async (email: string, password: string) => {
  return await pb.collection("users").authWithPassword(email, password);
};

export const register = async (
  email: string,
  password: string,
  passwordConfirm: string
) => {
  return await pb
    .collection("user")
    .create<UsersResponse>({ email, password, passwordConfirm });
};

export const logout = () => pb.authStore.clear();

export const getUser = () => pb.authStore.model;

export type Login = typeof login;
export type Register = typeof register;
export type Logout = typeof logout;
export type GetUser = typeof getUser;
