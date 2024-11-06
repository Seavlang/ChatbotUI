import { authUrl } from "@/app/utils/constants";

export const registerService = async (req) => {
  console.log("authurl: " + authUrl);
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      console.error("Failed to register:", res.statusText);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.log("Error: ", e);
  }
};


export const resendService = async (email) => {
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/auth/resend-code?email=${email}`,
        {
          method: "POST",
        }
      )
        .then((r) => r?.json())
        .catch((e) => console.log(e));
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  export const resetPasswordService = async (email,password) => {
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/auth/reset-password?password=${password}&email=${email}`,
        {
          method: "POST",
        }
      )
        .then((r) => r?.json())
        .catch((e) => console.log(e));
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  export const verifyEmailService = async (code,email) => {
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/auth/account-verify?code=${code}&email=${email}`,
        {
          method: "POST",
        }
      )
        .then((r) => r?.json())
        .catch((e) => console.log(e));
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  };



export const resetPasswordVerifyService = async (email, code) => {
    console.log("verify service",code,email);
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/auth/code-verify?code=${code}&email=${email}`,
        {
          method: "POST",
        }
      )
        .then((r) => r?.json())
        .catch((e) => console.log(e));
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  };