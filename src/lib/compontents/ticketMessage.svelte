<script lang="ts">
	import type { Profile, Ticket, TicketMessage } from '$lib/data/validation';
	export let ticket: Ticket;
	export let ticketMessage: TicketMessage;
	const deltaDate = (date: string): string => {
		const msPerDay = 1000 * 60 * 60 * 24;
		const a = new Date(date);
		const b = new Date();
		const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
		const deltaDays = Math.floor((utc2 - utc1) / msPerDay);
		if (deltaDays === 0) return 'Today';
		if (deltaDays === 1) return 'Yesterday';
		return `${deltaDays} days ago`;
	};

	const getAuthor = (messageProfile: Profile, ticketProfile: Profile): string | null => {
		if (messageProfile.id === ticketProfile.id) return 'OP';
		// Check aditional claims
		return null;
	};
</script>

<div class="card-body py-2 px-4">
	<div class="flex gap-2 pb-2 align-middle">
		<a href="/profiles/{ticketMessage.profiles.id}">
			<h2 class="card-title text-base mb-0">{ticketMessage.profiles.username}</h2></a
		>
		<p class="inline-block flex-grow-0">
			{deltaDate(ticketMessage.date_updated ?? ticket.date_created)}
		</p>
		{#if getAuthor(ticketMessage.profiles, ticket.profiles)}
			<div class="badge badge-ghost ml-2 self-center">
				{getAuthor(ticketMessage.profiles, ticket.profiles)}
			</div>
		{/if}
	</div>
	<p class="pb-4">{ticketMessage.content}</p>
</div>
