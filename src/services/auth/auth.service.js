import { authUrl } from "@/app/utils/constants";

export const registerService = async (req) => {
  try {
    const res = await fetch(`${authUrl}/auth/register`, {
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
        `${authUrl}/auth/resend-code?email=${email}`,
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
        `${authUrl}/auth/reset-password?password=${password}&email=${email}`,
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
        `${authUrl}/auth/account-verify?code=${code}&email=${email}`,
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
        `${authUrl}/auth/code-verify?code=${code}&email=${email}`,
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