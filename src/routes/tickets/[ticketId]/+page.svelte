<script lang="ts">
	import { page } from '$app/stores';
	import MessageForm from '$lib/compontents/messageForm.svelte';
	import TicketMessage from '$lib/compontents/ticketMessage.svelte';
	import type { TicketMessage as TicketMessage2 } from '$lib/data/validation';
	import type { PageData } from './$types';

	export let data: PageData;

	let newTicketMessage: TicketMessage2;
	console.log(data.ticket);
	$: if (newTicketMessage) {
		data.ticket.ticket_messages = [...data.ticket.ticket_messages, newTicketMessage];
	}
</script>

<main class="flex gap-4 flex-col">
	{#if data.ticket}
		<div class="flex justify-between">
			<h1 class="h1 ">{data.ticket.title}</h1>
			{#if $page.data.user && data.ticket.profiles.id === $page.data.user.id}
				<a class="grid place-items-center" href="/tickets/{data.ticket.id}/edit ">
					<span class="material-symbols-outlined border-gray-500 "> edit</span>
				</a>
			{/if}
		</div>
		<div class="card bg-base-100 w-full shadow-xl">
			{#if data.ticket.ticket_messages.length > 0}
				<TicketMessage ticket={data.ticket} bind:ticketMessage={data.ticket.ticket_messages[0]} />
			{/if}
		</div>
		{#each data.ticket.ticket_messages as message, i}
			{#if i !== 0}
				<div class="card w-full bg-base-100">
					<TicketMessage ticket={data.ticket} ticketMessage={message} />
				</div>
			{/if}
		{/each}
	{/if}
	{#if $page.data.user && $page.data.user.id}
		<MessageForm ticketId={data.ticket.id} bind:ticketMessage={newTicketMessage} />
	{/if}
</main>
