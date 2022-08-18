<script lang="ts">
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';

	import { page, session } from '$app/stores';
	import { username } from '$lib/stores/userStore';

	$: {
		if (browser) {
			const redirectTo = $page.url.searchParams.get('previous_page');
			// check if user has been set in session store then redirect
			if ($username && redirectTo) goto(redirectTo);
			if ($session?.user?.id) goto('/register');
		}
	}
</script>
