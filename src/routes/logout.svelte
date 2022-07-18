<script context="module">
	import { browser } from '$app/env';
	import { AuthModule } from '$lib/stores/msalStore';
	AuthModule.loadAuthModule();
	if (browser) {
		AuthModule.logout();
	}
</script>
