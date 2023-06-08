import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/create", userInfo);
    return data;
  } catch (error) {
    console.log(error.response?.data);
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const verifyEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verify-email", userInfo);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data);
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
export const signIn = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data);
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/user/forget-password", { email });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data);
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const verifyResetToken = async (token, userID) => {
  try {
    const { data } = await client.post("/user/verify-reset-password-token", {
      token,
      userID,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data);
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const resetPassword = async (passwordInfo) => {
  try {
    const { data } = await client.post("/user/reset-password", passwordInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const resendEmailVerification = async (userId) => {
  try {
    const data = await client.post("/user/resend-email-verify", { userId });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
