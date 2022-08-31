<script lang="ts">
	import { alertLevel, alertMessage, altertTitle } from '$lib/stores/notificationStore';
	import { fly } from 'svelte/transition';
</script>

{#if $alertMessage}
	<div
		class="alert alert-{$alertLevel} shadow-lg bottom-0  right-0 w-80 mr-4	 fixed"
		transition:fly={{ y: 50, duration: 300 }}
	>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{$altertTitle}! {$alertMessage}</span>
		</div>
	</div>
{/if}
