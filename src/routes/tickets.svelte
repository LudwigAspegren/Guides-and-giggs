<script context="module" lang="ts">
	export const load: Load = async () => {
		const { data, error } = await supabase.from('tickets').select(queries.fullTicketQuery);
		console.log(data);
		const tickets = TicketValidator.array().parse(data);
		return {
			props: {
				tickets
			}
		};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import { queries } from '$lib/data/queries';
	import { TicketValidator, type Ticket } from '$lib/data/validation';
	import { supabase } from '$lib/supabaseClient';
	import type { Load } from '@sveltejs/kit';
	export let tickets: Ticket[];
	const gotoTicket = (id: number) => {
		goto(`/tickets/${id}`);
	};
</script>

<table class="table w-full">
	<thead>
		<tr>
			<th>Title</th>
			<th>Name</th>
			<th>Status</th>
			<th>Course</th>
		</tr>
	</thead>
	<tbody>
		{#if tickets}
			{#each tickets as ticket}
				<tr class="hover:bg-gray-50 hover:cursor-pointer" on:click={() => gotoTicket(ticket.id)}>
					<th>{ticket.title}</th>
					<td
						><a href="/users/{ticket.profiles.id}">
							{ticket.profiles.username}
						</a>
					</td>
					<td>{ticket.statuses.name}</td>
					<td>{ticket.courses.name}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>
