/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";

export const SignUp = () => {
  return (
    <div className="fixed inset-0 dark:bg-primary -z-10">
      <Container>
        <div className="flex justify-center items-center h-screen">
          <form className="dark:bg-secondary rounded p-6 mt-20 space-y-6">
            <Title>Sign Up</Title>
            <FormInput
              name="username"
              placeholder="john123"
              label="User Name"
            />
            <FormInput
              name="email"
              placeholder="john@gmail.com"
              label="Email"
            />
            <FormInput name="phone" placeholder="0123456789" label="Phone" />
            <FormInput
              name="password"
              placeholder="***********"
              label="Password"
            />
            <FormInput
              name="confirm_password"
              placeholder="***********"
              label="Confirm Password"
            />
            <SubmitButton value="Sign Up " />
            <div className="flex justify-between">
            <a href="/forgot-password" className="text-sm dark:text-dark-subtle dark:hover:text-white transition">Forgot Password?</a>
            <a href="/login" className="text-sm dark:text-dark-subtle dark:hover:text-white transition">Sign In</a>
          </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
