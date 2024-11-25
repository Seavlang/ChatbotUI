'use server'
import { getAllModelsService, getAllProvidersService, getLMService } from "@/services/model/model.service";
import { revalidateTag } from "next/cache";

export const getLM = async () => {
    const res = await getLMService();
    revalidateTag('lm')
    return res;
}

export const getModelsAction = async () => {
    const res = await getAllModelsService();
    revalidateTag('models')
    return res;
}

export const getProvidersAction = async () => {
    const res =await getAllProvidersService();
    revalidateTag('providers')
    return res;
}
