import React from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { SubmitButton } from "../form/SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hook";

const OTP_LENGTH = 6;
const isValidOTP = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) {
      break;
    }
  }
  return valid;
};

export const EmailVerification = () => {
  const [otp, setOtp] = React.useState(new Array(OTP_LENGTH).fill(""));
  const otpRefs = Array.from({ length: 6 }, () => React.createRef());
  const { updateNotification } = useNotification();
  function handleOTPChange(event, index) {
    let value = event.target.value;
    value = value.substring(value.length - 1, value.length);
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      console.log(newOtp);
      return newOtp;
    });
  }
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuth, authInfo } = useAuth();
  const { isLogIn } = authInfo;
  const user = state?.user;
  useEffect(() => {
    if (!user) {
      navigate("/not-found");
    }
    if (isLogIn) {
      navigate("/");
    }
  }, [navigate, user, isLogIn]);
  const focusPrevInputField = (event, index) => {
    // Kiểm tra nếu phím được nhấn là phím Backspace
    if (event.keyCode === 8 && otp[index].length === 0 && index !== 0) {
      // Di chuyển tiêu điểm đến ô nhập trước đó
      otpRefs[index - 1].current.focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOTP(otp)) {
      console.log("Invalid OTP");
    }
    const {
      error,
      message,
      user: userResponse,
    } = await verifyEmail({
      OTP: otp.join(""),
      userId: user.user_id,
    });
    if (error) {
      updateNotification("error", error);
    }
    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse);
    isAuth();
  };
  return (
    <div className="fixed inset-0 dark:bg-primary  -z-10">
      <Container>
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={handleSubmit}
            className="dark:bg-secondary rounded p-6 space-y-6"
          >
            <div>
              <Title>Please Enter the OTP to verify your account. </Title>
              <p className="text-center dark:text-dark-subtle">
                The OTP has been sent to your email
              </p>
            </div>
            <div className="flex justify-center items-center space-x-4">
              {otp.map((_, index) => {
                return (
                  <div key={index}>
                    <input
                      ref={otpRefs[index]}
                      type="number"
                      value={otp[index] || ""}
                      onChange={(e) => handleOTPChange(e, index)}
                      className="w-12 h-12 border-2 dark:border-dark-subtle border:white dark:focus:border-white border-black rounded 
                    bg-transparent dark:text-white text-center text-xl font-semibold outline-none"
                      onKeyDown={(e) => focusPrevInputField(e, index)}
                    />
                  </div>
                );
              })}
            </div>
            <SubmitButton value="Send Link" />
          </form>
        </div>
      </Container>
    </div>
  );
};
