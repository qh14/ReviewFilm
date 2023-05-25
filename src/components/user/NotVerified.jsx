import React from 'react'
import { useAuth } from '../../hook';
import { useNavigate } from 'react-router-dom';

export default function NotVerified() {
    const { authInfo } = useAuth();
    const { isLogIn } = authInfo;
    const isVerified = authInfo.profile?.isVerified;
    const navigate = useNavigate();
    const NavigateToVerification = () => {
      navigate("/email-verification",{state: {
        user : authInfo.profile
      }});
    }
    return (
      <div>
        {!isVerified && isLogIn ? (
          <div>
            <p className="text-lg bg-blue-50 text-center p-2">
              It look like you haven't verified your email, {" "}
              <button onClick={NavigateToVerification} className="text-blue-503 font-semibold hover:underline">
                Click here to verify your email.
              </button>
            </p>
          </div>
        ) : null}
      </div>
    );
}
