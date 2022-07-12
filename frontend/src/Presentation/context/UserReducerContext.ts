import { createContext } from "react";

export const UserReducerContext = createContext({
  user: {
    _id: "",
    username: "",
    email: "",
  },
  setUser: (user: User) => {},
});
