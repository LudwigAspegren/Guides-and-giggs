<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { username } from '$lib/stores/userStore';

	$: if (browser) {
		if ($username) {
			goto('/');
		}
		if ($username === null) {
			goto('/register/');
		}
	}
</script>
