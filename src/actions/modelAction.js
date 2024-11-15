'use server'
import { getLMService } from "@/services/model/model.service";
import { revalidateTag } from "next/cache";

export const getLM = async () => {
    const res = await getLMService();
    revalidateTag('lm')
    return res;
}