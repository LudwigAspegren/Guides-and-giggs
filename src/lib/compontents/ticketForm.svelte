<script lang="ts">
	import { goto } from '$app/navigation';

	import { user } from '$lib/stores/userStore';

	import { computers, courses } from '$lib/stores/utilStore';
	import { supabaseClient } from '$lib/supabaseClient';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { z } from 'zod';

	let atComputerLab = true;
	let computerId: number;
	let ticketId: number;
	let operatingSystem: string;
	let loading: boolean;
	const TicketMessageValidator = z.object({
		content: z.string(),
		profiles: z.object({ username: z.string() }),
		date_updated: z.string().nullable(),
		date_created: z.string()
	});
	const TicketValidator = z.object({
		title: z.string(),
		date_created: z.string(),
		date_updated: z.string().nullable(),
		profiles: z.object({ username: z.string() }),
		statuses: z.object({ name: z.string() }),
		courses: z.object({ name: z.string() }),
		ticket_messages: z.array(TicketMessageValidator)
	});
	type Ticket = z.infer<typeof TicketValidator>;

	const createTicketValidator = z.object({
		title: z.string().min(1, "Title can't be empty"),
		// content: z.string().min(1, "Title can't be empty"),
		courseId: z.number(),
		content: z.string().min(1, 'Description cant be empty')
	});
	const { form, data } = createForm<z.infer<typeof createTicketValidator>>({
		validate: validateSchema(createTicketValidator),
		extend: reporter(),

		onSubmit: async (values) => {
			loading = true;
			try {
				if (!supabaseClient) throw 'supabase clinet not instantiated';
				const { data: ticketData, error: ticketError } = await supabaseClient
					.from('tickets')
					.insert({
						title: values.title,
						date_created: new Date().toISOString(),
						user_id: $user?.id,
						course_id: values.courseId,
						at_computer_lab: atComputerLab,
						status_id: 1
					})
					.select('id')
					.single();
				ticketId = ticketData.id;
				if (ticketError) throw ticketError;
				if (atComputerLab) {
					if (!supabaseClient) throw 'supabase clinet not instantiated';
					const { error: labTicketError } = await supabaseClient.from('school_tickets').insert({
						ticket_id: ticketData.id,
						computer_id: computerId
					});
					if (labTicketError) throw labTicketError;
				} else {
					if (!supabaseClient) throw 'supabase clinet not instantiated';
					const { error: homeTicketError } = await supabaseClient.from('home_tickets').insert({
						ticket_id: ticketData.id,
						operating_system: operatingSystem
					});
					if (homeTicketError) throw homeTicketError;
				}
				const { data: messageData, error: messageError } = await supabaseClient
					.from('ticket_messages')
					.insert({
						ticket_id: ticketData.id,
						content: values.content,
						date_created: new Date().toISOString(),
						user_id: $user?.id
					});
				if (messageError) throw messageError;
				goto(`/tickets/${ticketData.id}`);
			} catch (e: any) {
				alert(e.message);
				if (!ticketId) return;
				if (!supabaseClient) throw 'supabase clinet not instantiated';
				const { data: deleteData, error: deleteError } = await supabaseClient
					.from('tickets')
					.delete()
					.select('*')
					.eq('id', ticketId);
				if (deleteError) throw deleteError.message;
				if (deleteData) console.log(deleteData);
			} finally {
				loading = false;
			}
		}
	});
	$: console.log(atComputerLab);
</script>

<h1 class="h1">New Ticket</h1>
<div class="form-control w-full max-w-xl">
	<form use:form class="flex flex-col gap-2 py-2" id="ticket-form">
		<div class="flex flex-row max-w-full justify-end gap-4">
			<span>At computer lab</span>
			<input type="checkbox" class="toggle" bind:checked={atComputerLab} />
		</div>
		<div class="flex flex-row max-w-full justify-between gap-4">
			{#if atComputerLab}
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
			{/if}
			<select class="select" bind:value={$data.courseId}>
				<option disabled selected>Choose course</option>
				{#if $courses}
					{#each $courses as course}
						<option value={course.id}>{course.name}</option>
					{/each}
				{/if}
			</select>
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
			<label class="label" for="content">
				<span class="label-text-alt h-4 text-red-500">
					<ValidationMessage for="content" let:messages>
						{messages?.[0] || ''}
					</ValidationMessage>
				</span>
			</label>
		</div>
		<div class="flex justify-between">
			<button class="btn" type="submit" disabled={loading}>Comment</button>
		</div>
	</form>
</div>
