<script lang="ts">
	import { page } from '$app/stores';

	import { courses } from '$lib/stores/utilStore';
	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import type { Database } from 'src/databaseDefintions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { z } from 'zod';
	const ticketId = getContext('ticketId') as Writable<number | null>;
	const createTicketValidator = z.object({
		title: z.string().min(1, "Title can't be empty"),
		courseId: z.string().min(1, 'A course must be choosen'),
		content: z.string().min(1, 'Description cant be empty'),
		userId: z.string({ required_error: 'Must be logged in' })
	});
	let { form, createSubmitHandler, isValid } = createForm<z.infer<typeof createTicketValidator>>({
		extend: reporter
	});
	export const valid = isValid;
	export const submitHandler = createSubmitHandler({
		validate: validateSchema(createTicketValidator),
		onSubmit: async (values) => {
			try {
				ticketId.set((await submitTicket(values)).id);

				await new Promise((r) => setTimeout(r, 100));
			} catch (e) {
				throw e;
			}
		},
		onError: (error) => {
			console.log(error);
		}
	});
	const submitTicket = async (ticketSubmit: z.infer<typeof createTicketValidator>) => {
		const ticketInsert: Database['public']['Tables']['tickets']['Insert'] = {
			title: ticketSubmit.title,
			date_created: new Date().toISOString(),
			user_id: ticketSubmit.userId,
			course_id: parseInt(ticketSubmit.courseId),
			status_id: 1
		};
		const { data: ticketData, error: ticketError } = await supabaseClientV2
			.from('tickets')
			.insert(ticketInsert)
			.select('id')
			.single();

		if (ticketError) throw ticketError.message;

		const messageInsert: Database['public']['Tables']['ticket_messages']['Insert'] = {
			ticket_id: ticketData.id,
			content: ticketSubmit.content,
			date_created: new Date().toISOString(),
			user_id: ticketSubmit.userId
		};
		const { error: messageError } = await supabaseClientV2
			.from('ticket_messages')
			.insert(messageInsert);

		if (messageError) throw messageError;
		return ticketData;
	};
</script>

<form use:form class="flex flex-col gap-2" id="ticket-form">
	<!-- {#if atComputerLab}
				<select class="select" bind:value={computerId}>
					<option disabled selected>Choose computer</option>
					{#if $computers}
						{#each $computers as computer}
							<option value={computer.id}>{computer.locations.name}-{computer.name}</option>
						{/each}
					{/if}
				</select>
			{:else}
				<input
					type="text"
					placeholder="Operativsystem"
					class="input input-bordered w-full"
					name="content"
					aria-describedby="content-validation"
					bind:value={operatingSystem}
				/>
			{/if} -->
	<div>
		<select class="select select-bordered  w-64" name="courseId" id="courseId" form="ticket-form">
			<option disabled selected value="">Choose course</option>
			{#if $courses}
				{#each $courses as course}
					<option value={course.id}>{course.name}</option>
				{/each}
			{/if}
		</select>
		<label class="label" for="courseId">
			<span class="label-text-alt text-red-500 h-4">
				<ValidationMessage for="courseId" let:messages>
					{messages?.[0] || ''}
				</ValidationMessage>
			</span>
		</label>
	</div>

	<div>
		<input
			type="text"
			placeholder="Title"
			class="input input-bordered w-full"
			name="title"
			aria-describedby="content-validation"
			id="title"
		/>
		<!-- bind:this={inputFields[0]} -->
		<!-- on:keypress={(e) => nextInput(e, inputFields, 0)} -->
		<label class="label" for="title">
			<span class="label-text-alt text-red-500 h-4">
				<ValidationMessage for="title" let:messages>
					{messages?.[0] || ''}
				</ValidationMessage>
			</span>
		</label>
	</div>
	<div>
		<textarea
			type="text"
			placeholder="Describe your problem!"
			class="textarea textarea-bordered h-64 w-full"
			name="content"
			aria-describedby="content-validation"
			id="content"
		/>
		<!-- bind:this={inputFields[1]} -->
		<!-- on:keypress={(e) => nextInput(e, inputFields, 1)} -->
		<label class="label" for="content">
			<span class="label-text-alt h-4 text-red-500">
				<ValidationMessage for="content" let:messages>
					{messages?.[0] || ''}
				</ValidationMessage>
			</span>
		</label>
	</div>
	<input type="hidden" name="userId" value={$page.data?.loggedInProfile?.id} />
</form>
