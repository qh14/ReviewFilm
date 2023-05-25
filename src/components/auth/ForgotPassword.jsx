import React, { useState } from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";
import { isValidEmail } from "../../utils/helper";
import { useNotification } from "../../hook";
import { forgetPassword } from "../../api/auth";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const {updateNotification} = useNotification();
  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!isValidEmail(email)) {
      updateNotification("error","Invalid Email");
    }
    const {error, message} = await forgetPassword(email);
    if (error) {
      updateNotification("error", error);
    }
    updateNotification("success", message);
  }
  return (
    <div className="fixed inset-0 dark:bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form onSubmit={handleSubmit} className="dark:bg-secondary rounded p-6 w-96 space-y-6">
          <Title>Please Enter Your Email</Title>
          <FormInput
            label="Email"
            placeholder="john@email.com"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <SubmitButton value="Send Link" />

          <div className="flex justify-between">
            <a
              href="/forgot-password"
              className="text-sm dark:text-dark-subtle hover:text-white transition"
            >
              Sign Up ?
            </a>
            <a
              href="/login"
              className="text-sm dark:text-dark-subtle hover:text-white transition"
            >
              Sign In
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
}
