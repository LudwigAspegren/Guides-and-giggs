<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	import { session } from '$app/stores';
	import { queries } from '$lib/data/queries';
	import { TicketMessageValidator, type TicketMessage } from '$lib/data/validation';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { z } from 'zod';

	export let ticketId: number;
	let loading = false;
	let content: string;
	export let ticketMessage: TicketMessage;

	const createMessgeValidator = z.object({
		content: z.string().min(1, "Comment can't be empty")
	});

	const { form, reset, createSubmitHandler } = createForm<z.infer<typeof createMessgeValidator>>({
		validate: validateSchema(createMessgeValidator),
		extend: reporter(),

		onSubmit: async (values) => {
			try {
				loading = true;
				if (!supabaseClient) throw 'supabase clinet not instantiated';
				const { data, error } = await supabaseClient
					.from('ticket_messages')
					.insert([
						{
							ticket_id: ticketId,
							content: values.content,
							date_created: new Date().toISOString(),
							user_id: $session.user.id
						}
					])
					.select(queries.fullTicketMessageQuery)
					.single();
				if (data) console.log(data);
				if (error) throw error.message;
				ticketMessage = TicketMessageValidator.parse(data);
			} catch (e: any) {
				console.log(e);
			} finally {
				loading = false;
				reset();
			}
		}
	});
	const disableEnter = (event: KeyboardEvent) => {
		if (event.code === 'Enter' && loading) event.preventDefault();
	};
</script>

<form use:form class="flex flex-col gap-2 pb-16">
	<input
		type="text"
		placeholder="Type here"
		class="textarea w-full"
		name="content"
		aria-describedby="content-validation"
		on:submit|preventDefault
		bind:value={content}
		on:keypress={disableEnter}
	/>
	<div class="flex justify-between">
		<input class="btn" type="submit" disabled={loading} value="Comment" />
		<ValidationMessage for="content" let:messages>
			{messages?.[0] || ''}
		</ValidationMessage>
	</div>
</form>
