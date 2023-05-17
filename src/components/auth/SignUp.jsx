/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";

export const SignUp = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10">
      <Container>
        <div className="flex justify-center items-center h-screen">
          <form className="bg-secondary rounded p-6 space-y-6">
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
            <Title>OR Sign Up By :</Title>
            <div className="flex justify-between text-3xl">
              <span class="bg-transparent rounded-full p-2 ">
                  <a href="https://www.google.com.vn/?hl=vi"><i class="fab fa-google text-white"/></a>
              </span>
              <span class="bg-transparent rounded-full p-2 ">
                  <a href="https://www.google.com.vn/?hl=vi"><i class="fab fa-facebook text-white"/></a>
              </span>
              <span class="bg-transparent rounded-full p-2 ">    
                  <a href="https://www.google.com.vn/?hl=vi"><i class="fab fa-twitter text-white"/></a>
              </span>
            </div>
            <div className="flex justify-between">
            <a href="/forgot-password" className="text-sm text-dark-subtle hover:text-white transition">Forgot Password?</a>
            <a href="/login" className="text-sm text-dark-subtle hover:text-white transition">Sign In</a>
          </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
