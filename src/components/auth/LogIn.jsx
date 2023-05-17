import React from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";

const LogIn = () => {
  return <div className="fixed inset-0 bg-primary -z-10">
    <Container>
      <div className="flex justify-center items-center h-screen">
        <form className="bg-secondary rounded p-6 space-y-6">
          <Title>Log In</Title>
          <FormInput name='email' placeholder='john@gmail.com' label='Email'/>
          <FormInput name='password' placeholder='Your password' label='Password'/>
          <SubmitButton value='Log In'/>
          <div className="flex justify-between">
            <a href="/forgot-password" className="text-sm text-dark-subtle hover:text-white transition">Forgot Password?</a>
            <a href="/signup" className="text-sm text-dark-subtle hover:text-white transition">Sign Up</a>
          </div>
        </form> 
      </div>
    </Container>
  </div>;
};

export default LogIn;
