import type { Profile } from '$lib/data/validation';
import { supabaseClient } from '$lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';
export const setProfile = async (userId: string) => {
	if (!supabaseClient) throw 'supabase clinet not instantiated';
	try {
		const { data, error } = await supabaseClient
			.from<Profile>('profiles')
			.select(`username,id`)
			.eq('id', userId)
			.single();
		if (data) username.set(data.username);

		if (error) throw error.code;
	} catch (e) {
		if (e === 'PGRST116') username.set(null);
		console.log(e);
	}
};
export const user: Writable<User | null> = writable(null);
export const username: Writable<string | null> = writable();
