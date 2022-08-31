<script lang="ts">
	import { page } from '$app/stores';
	import Transition from '$lib/compontents/transition.svelte';
	import { getContext, onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';
	const shouldAnimate = getContext('shouldAnimate') as Writable<boolean>;
	shouldAnimate.set(false);
	$: disableLeft = () => {
		if ($page.data.range[0] === $page.data.ticketsPage) return 'btn-disabled';
	};
	$: disabeRight = () => {
		if ($page.data.range[$page.data.range.length - 1] === $page.data.ticketsPage)
			return 'btn-disabled';
	};
	onDestroy(() => {
		shouldAnimate.set(true);
	});
</script>

<h1 class="h1">Tickets</h1>
<Transition url={$page.url}>
	<slot />
</Transition>
<div class="h-32" />
<div class="grid place-items-center fixed top-[calc(100%-4rem)] w-[64rem] z-30">
	<div class="btn-group w-80 backdrop-blur-[3px] bg-base-100 bg-opacity-70">
		<a
			sveltekit:noscroll
			sveltekit:prefetch
			class="btn btn-outline {disableLeft()}"
			href="/tickets/{$page.data.range[0]}"
		>
			<span class="material-symbols-outlined border-gray-500 "> first_page</span>
		</a>
		<a
			sveltekit:noscroll
			sveltekit:prefetch
			class="btn btn-outline {disableLeft()}"
			href="/tickets/{$page.data.ticketsPage - 1}"
		>
			<span class="material-symbols-outlined border-gray-500 "> arrow_back</span>
		</a>
		<button class="btn btn-outline pointer-events-none" disabled={false}>
			Page {$page.data.ticketsPage}
		</button>
		<a
			sveltekit:noscroll
			sveltekit:prefetch
			class="btn btn-outline {disabeRight()}"
			href="/tickets/{$page.data.ticketsPage + 1}"
		>
			<span class="material-symbols-outlined border-gray-500 "> arrow_forward</span>
		</a>
		<a
			sveltekit:noscroll
			sveltekit:prefetch
			class="btn btn-outline {disabeRight()}"
			href="/tickets/{$page.data.range[$page.data.range.length - 1]}"
		>
			<span class="material-symbols-outlined border-gray-500 ">last_page</span>
		</a>
	</div>
</div>
