<script lang="ts">
	import { goto } from '$app/navigation';
	import { queries } from '$lib/data/queries';
	import { TicketValidator, type Ticket } from '$lib/data/validation';
	import { supabaseClient } from '$lib/supabaseClient';

	export let tickets: Ticket[];
	async function loadData() {
		if (!supabaseClient) throw 'supabase clinet not instantiated';
		const { data } = await supabaseClient.from('tickets').select(queries.fullTicketQuery);
		tickets = TicketValidator.array().parse(data);
	}

	loadData();

	const gotoTicket = (id: number) => {
		goto(`/tickets/${id}`);
	};

	const chunkArray = (ticketPerPage: number, list: Array<Ticket>) => {
		const chunks: Array<Array<Ticket>> = [];
		for (let i = 0; i < list.length; i += ticketPerPage) {
			const chunk = list.slice(i, i + ticketPerPage);
			chunks.push(chunk);
		}
		return chunks;
	};
	let TicketsChunks: Array<Array<Ticket>>;
	$: {
		if (tickets) {
			console.log(tickets);

			TicketsChunks = chunkArray(50, tickets);
		}
	}
</script>

<h1 class="h1">Tickets</h1>
{#if tickets}
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
		</tbody>
	</table>
{/if}
