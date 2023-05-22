/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hook";

export const SignUp = () => {
  const validateInformation = ({
    name,
    email,
    phone,
    password,
    confirm_password,
  }) => {
    if (!name.trim()) {
      return {
        ok: false,
        error: "name is missing!",
      };
    }
    if (!/^[a-z A-Z]+$/.test(name)) {
      return {
        ok: false,
        error: "Invalid name!",
      };
    }
    if (!email.trim()) {
      return {
        ok: false,
        error: "Email is missing!",
      };
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return {
        ok: false,
        error: "Invalid email!",
      };
    }
    if (!/^\d{10}$/.test(phone)) {
      return {
        ok: false,
        error: "Invalid phone!",
      };
    }
    if (!phone.trim()) {
      return {
        ok: false,
        error: "Phone is missing!",
      };
    }
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      return {
        ok: false,
        error: "Password is missing!",
      };
    }
    if (password !== confirm_password) {
      return {
        ok: false,
        error: "Password and confirm password is not same",
      };
    }
    return {         
      ok: true,
      error: "Every thing is fine!",
    };
  };
  const navigate = useNavigate();
  const {updateNotification} = useNotification()
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = ({ target }) => {
    setUserInfo({
      ...userInfo,
      [target.id]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateInformation(userInfo);
    if (!ok) {
      updateNotification('error',error);
    }
    if (ok) {
      const response = await createUser(userInfo);
      if (response.error) {
        updateNotification('error',response.error);
      }
      navigate("/email-verification", {
        state: { user: response.user },
        replace: true,
      });
      updateNotification('success',"Please verify your Email");
    }
    
  };
  return (
    <div className="fixed inset-0 dark:bg-primary -z-10">
      <Container>
        <div className="flex justify-center items-center h-screen">
          <form
            className="dark:bg-secondary rounded p-6 mt-20 space-y-6"
            onSubmit={handleSubmit}
          >
            <Title>Sign Up</Title>
            <FormInput
              name="name"
              placeholder="john123"
              label="User Name"
              value={userInfo.name}
              onChange={handleChange}
            />
            <FormInput
              name="email"
              placeholder="john@gmail.com"
              label="Email"
              value={userInfo.email}
              onChange={handleChange}
            />
            <FormInput
              name="phone"
              placeholder="0123456789"
              label="Phone"
              value={userInfo.phone}
              onChange={handleChange}
            />
            <FormInput
              name="password"
              placeholder="***********"
              label="Password"
              value={userInfo.password}
              onChange={handleChange}
            />
            <FormInput
              name="confirm_password"
              placeholder="***********"
              label="Confirm Password"
              value={userInfo.confirm_password}
              onChange={handleChange}
            />
            <SubmitButton value="Sign Up " />
            <div className="flex justify-between">
              <a
                href="/forgot-password"
                className="text-sm dark:text-dark-subtle text-black dark:hover:text-white transition"
              >
                Forgot Password?
              </a>
              <a
                href="/login"
                className="text-sm dark:text-dark-subtle text-black dark:hover:text-white transition"
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
