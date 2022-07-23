<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import { supabase } from '$lib/supabaseClient';

	import { queries } from '$lib/data/queries';
	import { TicketMessageValidator, type TicketMessage } from '$lib/data/validation';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { z } from 'zod';

	export let ticketId: number;
	let content: string;
	export let ticketMessage: TicketMessage;
	$: ticketMessage, console.log('hej');

	const createMessgeValidator = z.object({
		content: z.string().min(1, "Comment can't be empty")
	});

	const { form } = createForm<z.infer<typeof createMessgeValidator>>({
		validate: validateSchema(createMessgeValidator),
		extend: reporter(),

		onSubmit: async (values) => {
			try {
				const { data, error } = await supabase
					.from('ticket_messages')
					.insert([
						{
							ticket_id: ticketId,
							content: values.content,
							date_created: new Date().toISOString(),
							user_id: $user?.id
						}
					])
					.select(queries.fullTicketMessageQuery)
					.single();
				if (data) console.log(data);
				if (error) throw error;
				ticketMessage = TicketMessageValidator.parse(data);
			} catch (e: any) {
				console.log(e.message || e);
			}
		}
	});
</script>

<form use:form class="flex flex-col gap-2 pb-16">
	<input
		type="text"
		placeholder="Type here"
		class="textarea w-full"
		name="content"
		aria-describedby="content-validation"
		bind:value={content}
	/>
	<div class="flex justify-between">
		<button class="btn" type="submit" disabled={!content}>Comment</button>
		<ValidationMessage for="content" let:messages>
			{messages?.[0] || ''}
		</ValidationMessage>
	</div>
</form>
