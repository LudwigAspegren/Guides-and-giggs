<script lang="ts">
	import { page } from '$app/stores';
	import MessageForm from '$lib/compontents/messageForm.svelte';
	import TicketMessage from '$lib/compontents/ticketMessage.svelte';
	import type { TicketMessage as TicketMessage2 } from '$lib/data/validation';
	import type { PageData } from './$types';
	export let data: PageData;
	let newTicketMessage: TicketMessage2;
	$: if (newTicketMessage) {
		data.ticket.ticket_messages = [...data.ticket.ticket_messages, newTicketMessage];
	}
</script>

<main class="flex gap-4 flex-col max-w-3xl">
	{#if data.ticket}
		<div class="flex justify-between w-full">
			<h1 class="h1 ">{data.ticket.title}</h1>
		</div>
		{#if data.ticket.ticket_messages.length > 0}
			<TicketMessage ticket={data.ticket} ticketMessage={data.ticket.ticket_messages[0]} />
		{/if}
		{#each data.ticket.ticket_messages as message, i}
			{#if i !== 0}
				<TicketMessage ticket={data.ticket} ticketMessage={message} />
			{/if}
		{/each}
	{/if}
	{#if $page.data.user && $page.data.user.id}
		<MessageForm ticketId={data.ticket.id} bind:ticketMessage={newTicketMessage} />
	{/if}
</main>
