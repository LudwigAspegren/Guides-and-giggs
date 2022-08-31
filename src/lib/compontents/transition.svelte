<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	export let url: URL;

	const shouldAnimate = getContext('shouldAnimate') as Writable<boolean>;
</script>

{#key url}
	<section in:fly={{ x: 50, duration: 300, delay: 100 }}>
		<slot />
	</section>
{/key}
