<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { AuthModule } from '$lib/stores/msalStore';

	export let code: string;
	export let callback: string;
	if (browser) {
		AuthModule.afterAuthenticationUrl.set(callback);
		AuthModule.code.set(code);
		goto('/auth/client-redirect');
	}
</script>
