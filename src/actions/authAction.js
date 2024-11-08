"use server";

import { resetPasswordService, registerService, verifyEmailService,resendService, resetPasswordVerifyService } from "@/services/auth/auth.service";

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

export const resendVerificationCodeAction = async (req) => {
    const res = await resendService(req.email);
    return res;
}

export const resetPasswordAction = async (req) => {
    const res = await resetPasswordService(req.email,req.password);
    return res;
}

export const resetPasswordVerifyAction = async (req) => {
    console.log("resetPasswordActionSeavlang",req);
    const res = await resetPasswordVerifyService(req.email,req.code);
    return res;
}
