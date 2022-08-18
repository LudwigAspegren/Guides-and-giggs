<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { username } from '$lib/stores/userStore';

	$: if (browser) {
		if ($username === null) {
			goto('/register/');
		}
	}
	let isOpen = true;
	$: console.log(isOpen);
</script>

<section>
	<!-- Put this part before </body> tag -->
	<input type="checkbox" id="my-modal" class="modal-toggle" bind:checked={isOpen} />
	<div class="modal">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
			<p class="py-4">
				You've been selected for a chance to get one year of subscription to use Wikipedia for free!
			</p>
			<div class="modal-action">
				<label for="my-modal" class="btn">Yay!</label>
			</div>
		</div>
	</div>
</section>
