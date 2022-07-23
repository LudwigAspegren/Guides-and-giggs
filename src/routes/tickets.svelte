<script context="module" lang="ts">
	export const load: Load = async () => {
		const { data, error } = await supabase.from('tickets').select(queries.fullTicketQuery);
		const tickets = TicketValidator.array().parse(data);
		return {
			props: {
				tickets
			}
		};
	};
</script>

<script lang="ts">
	import { queries } from '$lib/data/queries';
	import { TicketValidator, type Ticket } from '$lib/data/validation';
	import { supabase } from '$lib/supabaseClient';
	import type { Load } from '@sveltejs/kit';
	export let tickets: Ticket[];
</script>

{#each tickets as ticket}
	<h2>
		{ticket.title}
	</h2>
	<b>
		{#if ticket.ticket_messages.length > 0}
			{ticket.ticket_messages[0].content}
		{/if}
	</b>
	<p>
		{ticket.date_created}
	</p>
{/each}
