import { AuthModule } from "$lib/stores/msalStore";
import type { ApiResponse } from "$lib/types";
import { variables } from "$lib/variables";
import { get } from "svelte/store";

export const getRequest = async <T,>(endpoint: string): Promise<T | undefined> => {
    const url = variables.apiUri + endpoint
    const token = get(AuthModule.token);
    try {

        const res = await fetch(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        const json: ApiResponse<T> = await res.json();
        return json.data;
    }
    catch (e) {
        console.log(e)
    }
}
