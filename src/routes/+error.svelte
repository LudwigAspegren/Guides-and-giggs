<script lang="ts">
	import { page } from '$app/stores';
	const goBack = () => window.history.go(-1);
</script>

{#if $page.error}
	<h1 class="h1">{$page.status}</h1>
	<p class="pb-2">{$page.error.message}</p>
	<button class="btn" on:click={goBack}>Go back</button>
{/if}
