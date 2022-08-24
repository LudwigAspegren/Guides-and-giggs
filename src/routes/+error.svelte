<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.error}
	<h1 class="h1">Error</h1>
	<h1>{$page.status} : {$page.error.message}</h1>
{/if}
