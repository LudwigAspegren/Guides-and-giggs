<script lang="ts" context="module">
	import '../app.css';

	const supaUser = supabase.auth.user();
	supabase.auth.onAuthStateChange((_, session) => {
		if (session) user.set(session.user);
	});
	user.set(supaUser);
	if (browser && !get(courses)) setUtils();
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import Auth from '$lib/compontents/auth.svelte';
	import Navbar from '$lib/compontents/navbar.svelte';
	import { user, username } from '$lib/stores/userStore';
	import { courses, setUtils } from '$lib/stores/utilStore';
	import { supabase } from '$lib/supabaseClient';
	import { get } from 'svelte/store';

	interface data {
		username: string;
		id: string;
	}
	const loadProfile = async () => {
		try {
			if (!$user) throw 'no user found';
			let { data, error } = await supabase
				.from<data>('profiles')
				.select(`username,id`)
				.eq('id', $user.id)
				.single();

			if (data) username.set(data.username);
			if (error) throw error;
		} catch (e) {
			console.log(e);
		}
	};
	loadProfile();
</script>

{#if $user}
	<Navbar />
	<main class="container mx-auto max-w-5xl mt-32">
		<slot />
	</main>
{:else}
	<Auth />
{/if}
