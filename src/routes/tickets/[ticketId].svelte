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
	let newTicketMessage: TicketMessage2;
	console.log(ticket);
	import { session } from '$app/stores';
	import MessageForm from '$lib/compontents/messageForm.svelte';
	import TicketMessage from '$lib/compontents/ticketMessage.svelte';
	import { queries } from '$lib/data/queries';
	import {
		TicketValidator,
		type Ticket,
		type TicketMessage as TicketMessage2
	} from '$lib/data/validation';
	import { supabaseClient } from '$lib/supabaseClient';
	$: if (newTicketMessage) {
		ticket.ticket_messages = [...ticket.ticket_messages, newTicketMessage];
	}
</script>

<main class="flex gap-4 flex-col">
	{#if ticket}
		<div class="flex justify-between">
			<h1 class="h1 ">{ticket.title}</h1>
			{#if ticket.profiles.id === $session.user.id}
				<a class="grid place-items-center" href="/tickets/{ticket.id}/edit ">
					<span class="material-symbols-outlined border-gray-500 "> edit</span>
				</a>
			{/if}
		</div>
		<div class="card bg-base-100 w-full shadow-xl">
			{#if ticket.ticket_messages.length > 0}
				<TicketMessage {ticket} bind:ticketMessage={ticket.ticket_messages[0]} />
			{/if}
		</div>
		{#each ticket.ticket_messages as message, i}
			{#if i !== 0}
				<div class="card w-full bg-base-100">
					<TicketMessage {ticket} ticketMessage={message} />
				</div>
			{/if}
		{/each}
	{/if}
	{#if $session.user && $session.user.id}
		<MessageForm ticketId={ticket.id} bind:ticketMessage={newTicketMessage} />
	{/if}
</main>
