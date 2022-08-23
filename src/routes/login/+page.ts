import { goto } from "$app/navigation";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
    const data = await event.parent()
    if (data.user) goto('/')
}