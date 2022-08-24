import { browser } from "$app/env";
import { goto } from "$app/navigation";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, parent }) => {
    const data = await parent()
    if (browser) {
        if (!data.user) throw new Error('User not set')
        const redirectTo = url.searchParams.get('previous_page') ?? '/';
        if (data.loggedInProfile) goto(redirectTo);
        else goto('/register');
    }
}