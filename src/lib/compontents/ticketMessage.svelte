<script lang="ts">
	import { page } from '$app/stores';

	import type { Profile, Ticket, TicketMessage } from '$lib/data/validation';
	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import type { Database } from 'src/databaseDefintions';
	import { quintOut } from 'svelte/easing';
	import { scale, slide } from 'svelte/transition';
	import { z } from 'zod';
	import { deltaDate } from './utils';
	export let ticket: Ticket;
	export let ticketMessage: TicketMessage;
	const authorCheck = (profileRef: Profile, profileTarget: Profile): boolean => {
		if (!profileRef || !profileTarget) return false;

		return profileRef.id === profileTarget.id;
	};
	// move this to a central location later
	const isOp = authorCheck(ticketMessage.profiles, ticket.profiles);

	$: isYou = authorCheck(ticketMessage.profiles, $page.data.loggedInProfile);
	let isEditing: boolean = false;
	console.log($page.data.loggedInProfile);

	const validator = z.object({
		content: z.string().min(1, "Message can't be empty")
	});
	const { form } = createForm<z.infer<typeof validator>>({
		validate: validateSchema(validator),
		onSubmit: async (values) => {
			console.log('hej');
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
	const changeEditing = () => {
		isEditing = !isEditing;
	};

	function focus(node: HTMLTextAreaElement) {
		setTimeout(() => {
			node.focus();
			node.selectionStart = node.textLength;
		}, 300);
	}
</script>

<div
	class="card bg-base-100 {isOp ? 'mr-12' : 'ml-12'} overflow-auto transition-all"
	in:slide={{ delay: 0, duration: 300, easing: quintOut }}
>
	<div class="card-body py-2 px-4 transition-all">
		<div class="flex gap-2 transition-all">
			<a href="/profiles/{ticketMessage.profiles.id}">
				<h2 class="card-title text-base mb-0 leading align-middle w-fit whitespace-nowrap">
					{ticketMessage.profiles.username}
				</h2></a
			>
			<p class="inline-block flex-grow-0 leading-normal align-middle whitespace-nowrap">
				{deltaDate(ticketMessage.date_created)}
			</p>
			{#if isOp}
				<div class="badge badge-ghost ml-2 self-center whitespace-nowrap">OP</div>
			{/if}
			{#if ticketMessage.date_updated}
				<div
					class="text-center text-sm align-middle leading-normal whitespace-nowrap"
					transition:scale={{ duration: 200, start: 0.8 }}
				>
					edited {deltaDate(ticketMessage.date_updated)}
				</div>
			{/if}
			<div class="w-full" />
		</div>
		<div class="transition-all">
			{#if !isEditing}
				<p>{ticketMessage.content}</p>
				{#if isYou}
					<div class="flex justify-end">
						<button on:click={changeEditing} class="font-medium uppercase text-xs"> edit </button>
					</div>
				{:else}
					<div class="h-2" />
				{/if}
			{:else}
				{#key isEditing}
					<form
						use:form
						class="flex flex-col gap-4 pb-2"
						transition:slide={{ duration: 300 }}
						id="message"
					>
						<textarea
							class="textarea text-base p-0"
							value={ticketMessage.content}
							use:focus
							name="content"
						/>
						<div class="self-end">
							<button
								class="font-medium uppercase text-xs pr-2"
								on:click|preventDefault={changeEditing}
							>
								Cancel
							</button>
							<input type="submit" value="submit" name="messageId" class="btn btn-xs w-24" />
						</div>
					</form>
				{/key}
			{/if}
		</div>
	</div>
</div>
