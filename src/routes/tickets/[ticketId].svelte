<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async (event) => {
		const ticketId = event.params.ticketId;
		if (!supabaseClient) throw 'supabase clinet not instantiated';
		const { data, error } = await supabaseClient
			.from('tickets')
			.select(queries.fullTicketQuery)
			.eq('id', ticketId)
			.single();
		console.log(data);
		let ticket = TicketValidator.parse(data);
		return { props: { ticket } };
	};
</script>

<script lang="ts">
	export let ticket: Ticket;
	let ticketMessage: TicketMessage;
	console.log(ticket);
	import MessageForm from '$lib/compontents/messageForm.svelte';
	import { queries } from '$lib/data/queries';
	import { TicketValidator, type Ticket, type TicketMessage } from '$lib/data/validation';
	import { supabaseClient } from '$lib/supabaseClient';
	$: if (ticketMessage) {
		console.log('jag');
		ticket.ticket_messages = [...ticket.ticket_messages, ticketMessage];
	}
</script>

<main class="flex gap-4 flex-col">
	{#if ticket}
		<div class="card bg-base-100 w-full shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{ticket.title}</h2>
				{#if ticket.ticket_messages.length > 0}
					<p>{ticket.ticket_messages[0].content}</p>
				{/if}
			</div>
		</div>
		{#each ticket.ticket_messages as message, i}
			{#if i !== 0}
				<div class="card w-full bg-base-100 shadow-sm">
					<div class="card-body">
						<h2 class="card-title">{message.profiles.username}</h2>
						<p>{message.content}</p>
						<p>{message.date_updated ?? message.date_created}</p>
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Reply</button>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</main>
<MessageForm bind:ticketMessage ticketId={ticket.id} />
