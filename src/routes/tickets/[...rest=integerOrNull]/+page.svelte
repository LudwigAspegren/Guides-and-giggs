<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const gotoTicket = (id: number) => {
		goto(`/tickets/ticket/${id}`);
	};
	// const chunkArray = (ticketPerPage: number, list: Array<Ticket>) => {
	// 	const chunks: Array<Array<Ticket>> = [];
	// 	for (let i = 0; i < list.length; i += ticketPerPage) {
	// 		const chunk = list.slice(i, i + ticketPerPage);
	// 		chunks.push(chunk);
	// 	}
	// 	return chunks;
	// };

	$: disableLeft = () => {
		if ($page.data.range[0] === $page.data.ticketsPage) return 'btn-disabled';
	};
	$: disabeRight = () => {
		if ($page.data.range[$page.data.range.length - 1] === $page.data.ticketsPage)
			return 'btn-disabled';
	};
</script>

{#if $page.data.tickets}
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
			{#each $page.data.tickets as ticket}
				<tr class="hover:bg-gray-50 hover:cursor-pointer" on:click={() => gotoTicket(ticket.id)}>
					<th>{ticket.title}</th>
					<td
						><a sveltekit:prefetch href="/profiles/{ticket.profiles.id}">
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
