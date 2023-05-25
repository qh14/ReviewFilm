import React, { useEffect, useState } from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";
import { useAuth, useNotification } from "../../hook";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";

const LogIn = () => {
  const validateUserInfo = ({ email, password }) => {

    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email))
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
  let isPending, isLogIn;
  const { updateNotification } = useNotification();
  const { handleLogIn, authInfo } = useAuth();

  if (authInfo) {
    isPending = authInfo.isPending;
    isLogIn = authInfo.isLogIn;
  }
  console.log(authInfo);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (isLogIn) {
      navigate("/");
    }
  }, [isLogIn, navigate]);
  return (
    <div className="fixed inset-0 dark:bg-primary -z-10">
      <Container>
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={handleSubmit}
            className="dark:bg-secondary rounded p-6 space-y-6"
          >
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
            <SubmitButton value="Log In" busy={isPending} />
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
