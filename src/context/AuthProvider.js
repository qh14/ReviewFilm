/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { getIsAuth, signIn } from "../api/auth";
import { useNotification } from "../hook";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const defaultUserInfo = {
  profile: "",
  isLogIn: false,
  isPending: false,
  error: "",
};
export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultUserInfo });
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const handleLogIn = async (email, password) => {
    const { message, user } = await signIn({ email, password });
    if (message) {
      updateNotification("error", message);
      return setAuthInfo({ ...user, isPending: false, message });
    }
    navigate("/", { replace: true });
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
    setAuthInfo({ ...defaultUserInfo, isPending: true });
    const { message, user } = await getIsAuth(token);
    if (message) {
      updateNotification("error", message);
      return setAuthInfo({
        ...defaultUserInfo,
        isPending: false,
        error: message,
      });
    }
    setAuthInfo({
      profile: { ...user },
      isLogIn: true,
      isPending: false,
      error: "",
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultUserInfo });
  };
  useEffect(() => {
    isAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogIn, isAuth, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
  //, handleLogOut, isAuth
}
