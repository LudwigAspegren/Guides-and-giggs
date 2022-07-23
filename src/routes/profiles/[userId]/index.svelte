<script context="module" lang="ts">
	import { queries } from '$lib/data/queries';
	import {
		ProfileValidator,
		TicketValidator,
		type Profile,
		type Ticket
	} from '$lib/data/validation';

	import { supabase } from '$lib/supabaseClient';
	export const load: Load = async (event) => {
		const userId = event.params.userId;
		const userPromise = supabase
			.from('profiles')
			.select(queries.fullUserQuery)
			.eq('id', userId)
			.single();
		const ticketsPromise = supabase
			.from('tickets')
			.select(queries.fullTicketQuery)
			.eq('user_id', userId);
		const responses = await Promise.all([userPromise, ticketsPromise]);
		console.log(responses[0].data);
		const user = ProfileValidator.parse(responses[0].data);
		const tickets = TicketValidator.array().parse(responses[1].data);
		return {
			props: {
				user,
				tickets
			}
		};
	};
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit';
	export let user: Profile;
	export let tickets: Ticket[];
</script>

<h1 class="h1">{user.username}</h1>
<!-- <div class="">{user.email}</div> -->
<div class="divider" />
<h2 class="h2">Open tickets</h2>

{#if tickets && tickets.length > 0}
	{#each tickets as ticket}
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
