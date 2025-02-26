import { atom } from "jotai";
type User = {
  userData: {
    email: string;
    userId?: string;
  };
};
export const userAtom = atom<User | null>(null);
