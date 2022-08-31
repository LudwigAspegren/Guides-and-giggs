<script lang="ts">
	import { page } from '$app/stores';
	import Alert from '$lib/compontents/alert.svelte';

	import Drawer from '$lib/compontents/drawer.svelte';
	import LoginModal from '$lib/compontents/loginModal.svelte';
	import Navbar from '$lib/compontents/navbar.svelte';
	import Transition from '$lib/compontents/transition.svelte';
	import { courses, setUtils } from '$lib/stores/utilStore';
	import { setContext } from 'svelte';
	import { get, writable } from 'svelte/store';
	import '../app.css';
	import type { LayoutData } from './$types';
	const shouldAnimate = writable(true);

	setContext('shouldAnimate', shouldAnimate);
	export let data: LayoutData;
	data.loggedInProfile;
	const loadData = async () => {
		if (!get(courses)) await setUtils();
	};
	$: if (data.user && data.user.id) {
		loadData();
	}
</script>

<Drawer>
	<Navbar>
		{#if $shouldAnimate}
			<main class="main">
				<Transition url={$page.url}>
					<slot />
				</Transition>
			</main>
		{:else}
			<main class="main">
				<slot />
			</main>
		{/if}
	</Navbar>
	<Alert />
</Drawer>
<LoginModal />
