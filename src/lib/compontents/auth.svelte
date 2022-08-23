<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import { supabaseClient } from '$lib/supabaseClient';

	let loading = false;
	let email: string;
	let previousPage: string;
	afterNavigate((navigation) => {
		if (navigation.from) previousPage = navigation.from.pathname;
		else previousPage = '/';
	});
	const handleLogin = async () => {
		try {
			loading = true;
			if (!supabaseClient) throw 'supabase client not instantiated';
			const { error } = await supabaseClient.auth.signIn(
				{
					email
				},
				{ redirectTo: 'http://127.0.0.1:3000/welcome', queryParams: { previous_page: 'tickets' } }
			);
			if (error) throw error.message;
			alert('Check your email for the login link!');
		} catch (error: any) {
			alert(error);
		} finally {
			loading = false;
		}
	};
</script>

<main class="">
	<div class="card shadow-md px-10 md:max-w-lg">
		<div class="card-body">
			<div class="width" />
			<h2 class="card-title">Welcome to PUG-2022</h2>
			<form action="" class="flex flex-col gap-2" on:submit|preventDefault={handleLogin}>
				<div>
					<input class="input" type="email" placeholder="Your email" bind:value={email} />
				</div>
				<div>
					<input
						type="submit"
						class="btn btn-primary"
						value={loading ? 'Loading' : 'Send login link'}
						disabled={loading}
					/>
				</div>
			</form>
		</div>
	</div>
</main>
