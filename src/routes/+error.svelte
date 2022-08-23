<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors, PageData } from './$types';
	export let data: PageData;
	export let errors: Errors;
</script>

{#if $page.error}
	<h1 class="h1">Error</h1>
	<h1>{$page.status} : {$page.error.message}</h1>
{/if}
