import React from "react";
import { Container } from "../Container";
import { Title } from "../form/Title";
import { SubmitButton } from "../form/SubmitButton";

const OTP_LENGTH = 6;

export const EmailVerification = () => {
  const [otp, setOtp] = React.useState(new Array(OTP_LENGTH).fill(""));
  const otpRefs = Array.from({ length: 6 }, () => React.createRef());

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

  const focusPrevInputField = (event, index) => {
    // Kiểm tra nếu phím được nhấn là phím Backspace
    if (event.keyCode === 8 && otp[index].length === 0 && index !== 0) {
      // Di chuyển tiêu điểm đến ô nhập trước đó
      otpRefs[index - 1].current.focus();
    }
  };
  return (
    <div className="fixed inset-0 bg-primary -z-10">
      <Container>
        <div className="flex justify-center items-center h-screen">
          <form className="bg-secondary rounded p-6 space-y-6">
            <div>
              <Title>Please Enter the OTP to verify your account. </Title>
              <p className="text-center text-dark-subtle">
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
                      className="w-12 h-12 border-2 border-dark-subtle focus:border-white rounded 
                    bg-transparent text-white text-center text-xl font-semibold outline-none"
                      onKeyDown={(e) => focusPrevInputField(e, index)}
                    />
                  </div>
                );
              })}
              xl
            </div>
            <SubmitButton value="Send Link" />
          </form>
        </div>
      </Container>
    </div>
  );
};
