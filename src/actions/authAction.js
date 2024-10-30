"use server";

import { loginService, registerService, verifyEmailService } from "@/services/auth/auth.service";

export const registerAction = async (req) => {
    console.log("registerActionSeavlang",req);
    const res = await registerService(req);
    console.log("object",res);
    return res;
}

export const verifyEmailAction = async (req) => {
    const res = await verifyEmailService(req.code, req.email);
    return res;
}

