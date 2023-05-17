import React from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";

export function ForgotPassword() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title>Please Enter Your Email</Title>
          <FormInput label="Email" placeholder="john@email.com" name="email" />
          <SubmitButton value="Send Link" />

          <div className="flex justify-between">
            <a
              href="/forgot-password"
              className="text-sm text-dark-subtle hover:text-white transition"
            >
              Forgot Password?
            </a>
            <a
              href="/login"
              className="text-sm text-dark-subtle hover:text-white transition"
            >
              Sign In
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
}
