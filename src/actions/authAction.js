"use server";

import { registerService } from "@/services/auth/auth.service";

export const registerAction = async (req) => {
    console.log("registerActionSeavlang",req);
    const res = await registerService(req);
    console.log("object",res);
    return res;
}
