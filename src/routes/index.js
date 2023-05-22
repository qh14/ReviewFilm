import LogIn from "../components/auth/LogIn";
import { SignUp } from "../components/auth/SignUp";
import { ForgotPassword } from "../components/auth/ForgotPassword";
import { EmailVerification } from "../components/auth/EmailVerification";
import { ConfirmPassword } from "../components/auth/ConfirmPassword";
import NotFound from "../components/pages/NotFound";

export const ListRoutes = [
  {
    path: "/login",
    component: LogIn,
    isShowHeader: true,
  },
  {
    path: "/signup",
    component: SignUp,
    isShowHeader: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    isShowHeader: true,
  },
  {
    path: "/",
    component: NotFound,
    isShowHeader: true,
  },
  {
    path: "/email-verification",
    component: EmailVerification,
    isShowHeader: true,
  },
  {
    path: "/confirm-password",
    component: ConfirmPassword,
    isShowHeader: true,
  }
];
