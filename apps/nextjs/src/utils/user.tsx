"use client";

import { createContext, useContext } from "react";

import type { User } from "@feprep/auth";

export const UserContext = createContext<{
  user: User | null;
}>({
  user: null,
});

export function useUser() {
  const { user } = useContext(UserContext);
  return user;
}

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
