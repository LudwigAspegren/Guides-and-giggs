<script lang="ts" context="module">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { createUser, getUser } from '$lib/data/users';
	import { AuthModule } from '$lib/stores/msalStore';
	import { get } from 'svelte/store';

	export const prerender = false;
	const createUserFromAccountInfo = async (token: string): Promise<any> => {
		const account = AuthModule.getAccount();
		if (account === null) {
			return;
		}
		const id = account.idTokenClaims?.oid;
		const email = account.username;
		const name = account.name;

		if (id === undefined || name === undefined || email === undefined) {
			return;
		}
		let currentUser = await getUser(id);
		if (currentUser) {
			AuthModule.user.set(currentUser);
			return;
		}

		currentUser = {
			id,
			email,
			name
		};
		AuthModule.user.set(currentUser);
		return await createUser(currentUser);
	};
	const code = AuthModule.code;
	console.log('heeeej');
	if (browser) {
		AuthModule.loadAuthModule();
		AuthModule.accuireToken(get(code)).then((result) => {
			if (result) {
				return createUserFromAccountInfo(result.accessToken).then(() => {
					console.log(get(AuthModule.afterAuthenticationUrl));
					goto(get(AuthModule.afterAuthenticationUrl));
				});
			}
		});
	}
</script>
