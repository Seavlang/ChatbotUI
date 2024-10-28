import { authUrl } from "@/app/utils/constants";


export const registerService = async (req) => {
    console.log("authurl: " + authUrl);
    try {
        const res = await fetch(`http://110.74.194.123:9080/api/v1/auth/register`, {
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

  export const verifyEmailService = async (code, email) => {
    // console.log("verify service",code);
    try {
      const res = await fetch(
        `http://110.74.194.123:9080/api/v1/auth/code-verify?code=${code}&email=${email}`,
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

  export const loginService = async (req) => {
    try {
      const res = await fetch(`${loginUrl}`, {
        method: "POST",
        body: new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID,
          client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
          grant_type: "password",
          username: req?.email,
          password: req?.password,
        }),
        headers: {
          accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const token = await res.json();
      return token;
    } catch (e) {
      console.log("err: ", e);
    }
  };