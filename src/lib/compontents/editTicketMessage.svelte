<script lang="ts">
	import type { Ticket, TicketMessage } from '$lib/data/validation';
	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import type { Database } from 'src/databaseDefintions';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { z } from 'zod';
	import { deltaDate, getAuthor } from './utils';
	export let ticket: Ticket;
	export let ticketMessage: TicketMessage;
	export let isEditing = true;
	let textArea: HTMLTextAreaElement;
	onMount(() => {
		textArea.focus();
		textArea.selectionStart = textArea.textLength;
	});
	const validator = z.object({
		content: z.string().min(1, "Message can't be empty")
	});
	const { form } = createForm<z.infer<typeof validator>>({
		validate: validateSchema(validator),
		onSubmit: async (values) => {
			const messageInsert: Database['public']['Tables']['ticket_messages']['Update'] = {
				id: ticketMessage.id,
				content: values.content,
				date_updated: new Date().toISOString()
			};
			const { error: messageError } = await supabaseClientV2
				.from('ticket_messages')
				.update(messageInsert);

			if (messageError) throw messageError;
			return messageInsert;
		},
		onError: (e) => {
			console.log(e);
		},
		onSuccess: (response) => {
			ticketMessage.content =
				(response as Database['public']['Tables']['ticket_messages']['Update']).content ?? '';
			ticketMessage.date_updated =
				(response as Database['public']['Tables']['ticket_messages']['Update']).date_updated ?? '';
			ticketMessage = ticketMessage;
			isEditing = false;
		}
	});
</script>

<div class="card bg-base-100 card-bordered mr-12 overflow-auto">
	<div class="card-body py-2 px-4">
		<div class="flex gap-2 pb-2 align-middle">
			<a href="/profiles/{ticketMessage.profiles.id}">
				<h2 class="card-title text-base mb-0">{ticketMessage.profiles.username}</h2></a
			>
			<p class="inline-block flex-grow-0">
				{deltaDate(ticketMessage.date_updated ?? ticketMessage.date_created)}
			</p>
			{#if getAuthor(ticketMessage.profiles, ticket.profiles)}
				<div class="badge badge-ghost ml-2 self-center">
					{getAuthor(ticketMessage.profiles, ticket.profiles)}
				</div>
			{/if}
		</div>
		<form use:form class="flex flex-col gap-4 pb-2" id="message">
			<textarea
				class="textarea text-base p-0"
				in:scale={{ duration: 200, start: 0.98 }}
				value={ticketMessage.content}
				bind:this={textArea}
				name="content"
			/>
			<input type="submit" value="submit" name="messageId" class="btn w-32 self-end" />
		</form>
	</div>
</div>
