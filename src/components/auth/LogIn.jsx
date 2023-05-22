import React, { useState } from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";
import { useAuth, useNotification } from "../../hook";

const LogIn = () => {
  const validateUserInfo = ({ email, password }) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail.test(email))
      return { ok: false, error: "Invalid email!" };

    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
      return { ok: false, error: "Password must be 8 characters long!" };

    return { ok: true };
  };
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { updateNotification } = useNotification();
  const { handleLogIn, authInfo } = useAuth();
  console.log(authInfo);

  const handleChange = ({ target }) => {
    setUserInfo({
      ...userInfo,
      [target.id]: target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    handleLogIn(userInfo.email, userInfo.password);
  };
  return (
    <div className="fixed inset-0 dark:bg-primary -z-10">
      <Container>
        <div className="flex justify-center items-center h-screen">
          <form onSubmit={handleSubmit} className="dark:bg-secondary rounded p-6 space-y-6">
            <Title>Log In</Title>
            <FormInput
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="john@gmail.com"
              label="Email"
            />
            <FormInput
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              placeholder="Your password"
              label="Password"
            />
            <SubmitButton value="Log In" />
            <div className="flex justify-between">
              <a
                href="/forgot-password"
                className="text-sm dark:text-dark-subtle text-black hover:text-blue-950 transition"
              >
                Forgot Password?
              </a>
              <a
                href="/signup"
                className="text-sm dark:text-dark-subtle text-black hover:text-blue-950 transition"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LogIn;
