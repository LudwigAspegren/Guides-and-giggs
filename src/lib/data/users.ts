import { AuthModule } from "$lib/stores/msalStore";
import type { ApiResponse, CreateUserDto, User } from "$lib/types";
import { get } from "svelte/store";


export const createUser = async (createUser: CreateUserDto) => {
    const token = get(AuthModule.token)
    try {
        const url = 'https://localhost:7207/User'
        const request: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token

            },
            body: JSON.stringify(createUser)

        }
        const response = await fetch(url, request);
        if (response.ok) {
            return response
        }
        throw new Error(await response.text())
    } catch (e) {
        console.warn(e)
    }

}
export const getUser = async (guid: string): Promise<User | undefined> => {
    const token = get(AuthModule.token)

    try {
        const url = `https://localhost:7207/User/${guid}`
        const request: RequestInit = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        const response = await fetch(url, request)
        const json: ApiResponse<User> = (await response.json())
        const user: User = json.data
        return user

    } catch (e) {
        console.log(e)
    }
}