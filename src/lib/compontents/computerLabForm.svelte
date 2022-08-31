<script lang="ts">
	import { computers } from '$lib/stores/utilStore';

	import { supabaseClientV2 } from '$lib/supabaseClientV2';

	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { z } from 'zod';
	const ticketId = getContext('ticketId') as Writable<number | null>;
	export const computerLabValidator = z.object({
		computerId: z.string().min(1, 'A computer must be choosen')
	});
	let { form, createSubmitHandler, isValid } = createForm<z.infer<typeof computerLabValidator>>({
		extend: reporter
	});
	export const valid = isValid;
	export const submitHandler = createSubmitHandler({
		validate: validateSchema(computerLabValidator),
		onSubmit: async (values) => {
			if (!$ticketId) throw 'no ticketId';
			const { error: labTicketError } = await supabaseClientV2.from('school_tickets').insert({
				ticket_id: $ticketId,
				computer_id: parseInt(values.computerId)
			});
			if (labTicketError) throw labTicketError;
		}
	});
</script>

<form use:form class="flex flex-col gap-2" id="copmuterLabForm">
	<select class="select select-bordered w-64" name="computerId" id="computerId" form="ticket-form">
		<option disabled selected value="">Choose computer</option>
		{#if $computers}
			{#each $computers as computer}
				<option value={computer.id}>{computer.locations.name}-{computer.name}</option>
			{/each}
		{/if}
	</select>
	<label class="label" for="computerId">
		<span class="label-text-alt text-red-500 h-4">
			<ValidationMessage for="computerId" let:messages>
				{messages?.[0] || ''}
			</ValidationMessage>
		</span>
		{#key $ticketId}
			<input type="hidden" name="ticketId" value={$ticketId ?? ''} />
		{/key}
	</label>
</form>
