<script lang="ts">
	import { goto } from '$app/navigation';

	import { getTickets } from '$lib/data/tickets';

	const ticketPromise = getTickets();
	const gotoTicket = (id: number) => {
		goto(`/tickets/${id}`);
	};
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Title</th>
				<th>Name</th>
				<th>Status</th>
				<th>Course</th>
			</tr>
		</thead>
		<tbody>
			{#await ticketPromise}
				<progress class="progress w-56" />
			{:then tickets}
				{#if tickets}
					{#each tickets as ticket}
						<!-- row 1 -->
						<tr
							class="hover:bg-gray-50 hover:cursor-pointer"
							on:click={() => gotoTicket(ticket.id)}
						>
							<th>{ticket.title}</th>
							<td
								><a href="/users/{ticket.user.id}">
									{ticket.user.name}
								</a>
							</td>
							<td>{ticket.status.name}</td>
							<td>{ticket.course.name}</td>
						</tr>
					{/each}
				{/if}
			{/await}
		</tbody>
	</table>
</div>
