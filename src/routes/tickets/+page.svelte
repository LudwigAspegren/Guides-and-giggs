<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Ticket } from '$lib/data/validation';
	import type { PageData } from './$types';

	export let data: PageData;
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
		if (data.tickets) {
			console.log(data.tickets);

			TicketsChunks = chunkArray(50, data.tickets);
		}
	}
</script>

<h1 class="h1">Tickets</h1>
{#if data.tickets}
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
			{#each data.tickets as ticket}
				<tr class="hover:bg-gray-50 hover:cursor-pointer" on:click={() => gotoTicket(ticket.id)}>
					<th>{ticket.title}</th>
					<td
						><a href="/profiles/{ticket.profiles.id}">
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
