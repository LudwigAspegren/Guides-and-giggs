import { browser } from '$app/env';
import { ProfileValidator, type Profile } from '$lib/data/validation';
import { supabaseClientV2 } from '$lib/supabaseClientV2';
import type { LayoutLoad } from './$types';


export const load: LayoutLoad = async (event) => {
    if (!browser) return {}
    const { data, error } = await supabaseClientV2.auth.getSession()
    console.log(data.session)
    let loggedInProfile: Profile | null | undefined
    if (!data.session) throw new Error('No session found')
    loggedInProfile = await setProfile(data.session.user.id)


    return { user: data.session?.user, loggedInProfile }

}
const setProfile = async (userId: string): Promise<Profile | undefined> => {
    try {
        const { data, error } = await supabaseClientV2
            .from('profiles')
            .select(`username,id`)
            .eq('id', userId)
            .single();
        if (error) throw error;
        if (data) return ProfileValidator.parse(data);
    } catch (e) {
        console.log(e)
    }
}