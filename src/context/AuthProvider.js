import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { getIsAuth, signIn } from "../api/auth";

export const AuthContext = createContext();
const defaultUserInfo = {
  profile: "",
  isLogIn: false,
  isPending: false,
  error: "",
};
export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultUserInfo });
  const handleLogIn = async (email, password) => {
    const { error, user } = await signIn({ email, password });
    if (error) {
      return setAuthInfo({ ...user, isPending: true, error });
    }
    setAuthInfo({
      profile: { ...user },
      isLogIn: true,
      isPending: false,
      error: "",
    });
    console.log(user);
    if (user) {
      localStorage.setItem("auth-token", user.jwt_token);
    }
  };
  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      return;
    }
    setAuthInfo({ ...defaultUserInfo, isPending: true});
    const {error, user} = await getIsAuth(token);
    if (error) {
      setAuthInfo({ ...defaultUserInfo, isPending: true,error});
    }
    setAuthInfo({
      profile: { ...user },
      isLogIn: true,
      isPending: false,
      error: "",
    });    
  };
  const handleLogout = () =>{
    localStorage.removeItem("auth-token");
    setAuthInfo({...defaultUserInfo});
  }
  useEffect( () => {
      isAuth();}
  ,[]);
  return (
    <AuthContext.Provider value={{ authInfo, handleLogIn, isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
  //, handleLogOut, isAuth
}
