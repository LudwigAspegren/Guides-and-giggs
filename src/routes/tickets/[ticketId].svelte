<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async (event) => {
		const ticketId = event.params.ticketId;
		const thread = await getThread(ticketId);
		return {
			props: {
				thread
			}
		};
	};
</script>

<script lang="ts">
	import { getThread } from '$lib/data/threads';
	import type { Thread } from '$lib/types';

	export let thread: Thread | undefined;
</script>

{#if thread}
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{thread.ticket.title}</h2>
			{#if thread.ticketMessages.length > 0}
				<p>{thread.ticketMessages[0].content}</p>
			{/if}
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Reply</button>
			</div>
		</div>
	</div>
	{#each thread.ticketMessages as message, i}
		{#if i !== 0}
			<div class="card w-96 bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{message.user.name}</h2>
					<p>{message.content}</p>
					<p>{message.dateUpdated ?? message.dateCreated}</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Reply</button>
					</div>
				</div>
			</div>
		{/if}
	{/each}
{/if}
