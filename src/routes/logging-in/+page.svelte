<script lang="ts">
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	$: {
		if (browser) {
			const redirectTo = $page.url.searchParams.get('previous_page');
			if ($page.data.profile && $page.data.user && redirectTo) goto(redirectTo);
			if ($page.data.user) goto('/register');
		}
	}
</script>
