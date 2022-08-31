import { browser } from "$app/env";
import { goto } from "$app/navigation";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, parent }) => {
    const data = await parent()
    const redirectTo = url.searchParams.get('previous_page') ?? '/';
    if (browser) {
        if (!data.user) throw error(400, 'User not set')
        if (data.loggedInProfile) goto(redirectTo);
        else goto('/register');
    }
}