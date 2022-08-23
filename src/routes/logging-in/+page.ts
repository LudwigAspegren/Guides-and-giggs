import { supabaseClientV2 } from "$lib/supabaseClientV2";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const { data, error } = await supabaseClientV2.auth.getUser()
}