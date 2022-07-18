<script lang="ts" context="module">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import '../app.css';

	export const load: Load = async () => {
		if (browser) {
			await AuthModule.silentTokenRequest();
		}
		return {};
	};
</script>

<script lang="ts">
	import Login from '$lib/compontents/login.svelte';
	import Navbar from '$lib/compontents/navbar.svelte';
	import { AuthModule } from '$lib/stores/msalStore';
	import type { Load } from '@sveltejs/kit';
	import { get } from 'svelte/store';
	AuthModule.afterAuthenticationUrl.set(get(page).url.pathname);
	const isAuthenticated = AuthModule.isAuthenticated;
</script>

{#if $isAuthenticated}
	<Navbar />
	<main class="container mx-auto max-w-5xl mt-32">
		<slot />
	</main>
{:else}
	<Login />
{/if}
