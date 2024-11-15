'use server'

import { getCurrentUserService } from "@/services/auth/user.service";
import { revalidateTag } from "next/cache";

export const getCurrentUserAction = async () => {
    console.log("user action")
    const res = await getCurrentUserService();
    revalidateTag("user")
    return res;
}