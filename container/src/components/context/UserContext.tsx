import * as React from "react";

export const UserContext = React.createContext<{
  userName: string;
  setUserName: (username: string) => void;
}>({} as any);
