<script lang="ts">
	import { goto } from '$app/navigation';

	import HomeTicketForm from '$lib/compontents/homeTicketForm.svelte';
	import TicketForm from '$lib/compontents/ticketForm.svelte';
	import { displayalert } from '$lib/stores/notificationStore';
	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	import { createForm } from 'felte';
	import { setContext } from 'svelte';
	import { get, writable } from 'svelte/store';

	const ticketId = writable<string | null>(null);
	setContext('ticketId', ticketId);

	let loading: boolean;
	let { form } = createForm({
		onSubmit: async () => {
			loading = true;
			let a = await ticketForm.submitHandler();
			console.log('awaited ticketForm');
			console.log(a);
			await homeForm.submitHandler();
		},
		onSuccess: () => {
			loading = false;
			if (get(ticketForm.valid) && get(homeForm.valid)) goto(`/tickets/ticket/${$ticketId}`);
		},
		onError: async (error) => {
			displayalert('Error', error as string, 'ERORR');
			loading = false;
			if (!$ticketId) return;
			const { data: deleteData, error: deleteError } = await supabaseClientV2
				.from('tickets')
				.delete()
				.eq('id', $ticketId);
		}
	});
	let ticketForm: TicketForm;
	let homeForm: HomeTicketForm;
</script>

<h1 class="h1">New Ticket</h1>
<div class="form-control w-full max-w-xl">
	<HomeTicketForm bind:this={homeForm} />
	<TicketForm bind:this={ticketForm} />
	<form use:form class="flex flex-col gap-2" id="form">
		<div class="flex justify-between">
			<button class="btn" type="submit" disabled={loading}>In page</button>
		</div>
	</form>
</div>
