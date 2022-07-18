import type { Thread } from "$lib/types";
import { getRequest } from "./utils";



export const getThread = async (userId: string): Promise<Thread | undefined> => {
    const endpoint = `Thread/${userId}`
    return getRequest(endpoint);

}