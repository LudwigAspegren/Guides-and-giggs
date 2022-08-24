<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="h1">{data.profile.username}</h1>
<!-- <div class="">{user.email}</div> -->
<div class="divider" />
<h2 class="h2">Open tickets</h2>

{#if data.tickets && data.tickets.length > 0}
	{#each data.tickets as ticket}
		<div class="card">
			<div class="card-title">{ticket.title}</div>
			<div class="card-body">{ticket.profiles.username}</div>
			<div class="card-body">{ticket.statuses.name}</div>
			<div class="card-body">{ticket.courses.name}</div>
		</div>
		<div class="space-y-4" />
	{/each}
{:else}
	<p>no tickets found</p>
{/if}
