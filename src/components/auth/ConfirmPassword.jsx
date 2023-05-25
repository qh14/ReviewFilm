import React, { useEffect, useState } from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { FormInput } from "../form/FormInput";
import { SubmitButton } from "../form/SubmitButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { resetPassword, verifyResetToken } from "../../api/auth";
import { useNotification } from "../../hook";

export const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const token = searchParam.get("token");
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const handleChange = ({ target }) => {
    const { id, value } = target;
    setPassword({ ...password, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.one !== password.two) {
      updateNotification("error", "Two password is not match");
    }
    if (password.one.trim().length < 8) {
      updateNotification("error", "Password is invalid");
    }
    const {message} = await resetPassword({
      newPassword: password.one,
      userID: id,
      token,
    });
    if (message) {
      updateNotification("success",message);
    }
    navigate("/login", { replace: true })
  };
  useEffect(() => {
    isValidToken();
  }, []);
  const isValidToken = async () => {
    const { error, valid } = await verifyResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);
      setIsVerifying(false);
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
  };
  console.log(id, token);
  if (isVerifying) {
    return (
      <div className="fixed inset-0 dark:bg-primary -z-10 flex justify-center items-center">
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we verify your token
            </h1>
            <ImSpinner3 className="animate-spin text-4xl font-semibold dark:text-white text-primary" />
          </div>
        </Container>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="fixed inset-0 dark:bg-primary -z-10 flex justify-center items-center">
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid
          </h1>
        </Container>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 dark:bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="dark:bg-secondary rounded p-6 w-96 space-y-6"
        >
          <Title>Confirm Password</Title>
          <FormInput
            label="New Password"
            placeholder="******"
            name="one"
            value={password.one}
            onChange={handleChange}
          />
          <FormInput
            label="Confirm Password"
            placeholder="******"
            name="two"
            value={password.two}
            onChange={handleChange}
          />
          <SubmitButton value="Confirm" />

          <div className="flex justify-end">
            <a
              href="/login"
              className="text-sm dark:text-dark-subtle dark:hover:text-white text-primary transition"
            >
              Sign In
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
};
