<script context="module" lang="ts">
	import { getUser } from '$lib/data/users';
	export const load: Load = async (event) => {
		const userId = event.params.userId;
		const user = await getUser(userId);
		return {
			props: {
				user
			}
		};
	};
</script>

<script lang="ts">
	import { getTicketsByUserId } from '$lib/data/tickets';
	import type { User } from '$lib/types';
	import type { Load } from '@sveltejs/kit';
	export let user: User;
	const ticketPromise = getTicketsByUserId(user.id);
</script>

<h1 class="h1">{user.name}</h1>
<div class="">{user.email}</div>
<div class="divider" />
<h2 class="h2">Open tickets</h2>
{#await ticketPromise}
	<p>loading...</p>
{:then tickets}
	{#if tickets && tickets.length > 0}
		{#each tickets as ticket}
			<div class="card">
				<div class="card-title">{ticket.title}</div>
				<div class="card-body">{ticket.user.name}</div>
				<div class="card-body">{ticket.status.name}</div>
				<div class="card-body">{ticket.course.name}</div>
			</div>
			<div class="space-y-4" />
		{/each}
	{:else}
		<p>no tickets found</p>
	{/if}
{/await}
