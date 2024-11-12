'use server'
import { getLMService } from "@/services/model/model.service";

export const getLM = async () => {
    const res = await getLMService();
    return res;
}