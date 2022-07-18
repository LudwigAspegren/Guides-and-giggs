<script context="module" lang="ts">
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { getTickets } from '$lib/data/tickets';
	import { AuthModule } from '$lib/stores/msalStore';
	import type { Ticket } from '$lib/types';

	const token = AuthModule.token;
	let res: Promise<Array<Ticket>>;

	if (browser) {
		res = getTickets($token);
	}
</script>

{#await res}
	<p>loading</p>
{:then tickets}
	{#each tickets as ticket}
		<h2>
			{ticket.title}
		</h2>
		<b>
			{ticket.content}
		</b>
		<p>
			{ticket.date}
		</p>
	{/each}
{/await}
