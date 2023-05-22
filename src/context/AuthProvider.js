import React, { createContext } from "react";
import { useState } from "react";
import { signIn } from "../api/auth";

export const AuthContext = createContext();
const defaultUserInfo = {
  profile: "",
  isLogIn: false,
  isPending: false,
  error: "",
};
export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({ ...defaultUserInfo });
  console.log(userInfo);
  const handleLogIn = async (email, password) => {
    const { error, user } = await signIn({ email, password });
    if (error) {
      setUserInfo({ ...user, isPending: true, error });
    }
    setUserInfo({
      profile: { ...user },
      isLogIn: true,
      isPending: false,
      error: "",
    });
    console.log(user);
    if (user) {
        localStorage.setItem('auth-token',user.token)
    }
  };
  return (
    <AuthContext.Provider value={{userInfo, handleLogIn}}>
      {children}
    </AuthContext.Provider>
  );
  //, handleLogOut, isAuth
}
