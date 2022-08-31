<script lang="ts">
	import { supabaseClientV2 } from '$lib/supabaseClientV2';

	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { z } from 'zod';
	const ticketId = getContext('ticketId') as Writable<number | null>;
	const homeTicketValidator = z.object({
		operatingSystem: z.string().min(1, 'An operating system must be provided'),
		ticketId: z.string().min(1, 'ticket id problem')
	});
	export let { form, createSubmitHandler, isValid } = createForm<
		z.infer<typeof homeTicketValidator>
	>({
		extend: reporter
	});
	export const valid = isValid;
	export const submitHandler = createSubmitHandler({
		validate: validateSchema(homeTicketValidator),
		onSubmit: async (values) => {
			console.log('inside home ticket');

			if (!$ticketId) throw 'no ticketId';
			const { error: homeTicketError } = await supabaseClientV2.from('home_tickets').insert({
				ticket_id: $ticketId,
				operating_system: values.operatingSystem
			});
			if (homeTicketError) throw homeTicketError;
		}
	});
</script>

<form use:form class="flex flex-col gap-2" id="homeForm">
	<div>
		<input
			type="text"
			placeholder="Operating System"
			class="input input-bordered w-full"
			name="operatingSystem"
			aria-describedby="content-validation"
			id="operatingSystem"
		/>
		<label class="label" for="operatingSystem">
			<span class="label-text-alt text-red-500 h-4">
				<ValidationMessage for="operatingSystem" let:messages>
					{messages?.[0] || ''}
				</ValidationMessage>
			</span>
		</label>
	</div>
	{#key $ticketId}
		<input type="hidden" name="ticketId" value={$ticketId ?? ''} />
	{/key}
</form>
