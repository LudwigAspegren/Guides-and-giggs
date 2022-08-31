<script lang="ts">
	import { modalMessage, modalTitle } from '$lib/stores/notificationStore';
	$: console.log($modalMessage);
</script>

{#if $modalMessage}
	<div class="my-modal">
		<div class="modal-box h-48">
			<h3 class="font-bold text-lg">{$modalTitle}</h3>
			<p class="py-4">
				{$modalMessage}
			</p>
		</div>
	</div>
{/if}

<style>
	.my-modal {
		pointer-events: auto;
		position: fixed;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		display: grid;
		place-items: center;
		z-index: 999;
		background-color: hsl(var(--nf, var(--n)) / var(--tw-bg-opacity));
		--tw-bg-opacity: 0.4;
		transition-duration: 200ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-property: transform, opacity;
		overflow-y: hidden;
		overscroll-behavior: contain;
	}
</style>
