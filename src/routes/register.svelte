<script lang="ts" context="module">
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import { user, username } from '$lib/stores/userStore';
	import { supabaseClient } from '$lib/supabaseClient';
	import { reporter } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { get } from 'svelte/store';
	import { z } from 'zod';
	$: if (browser) {
		if ($username) {
			goto('/');
		}
	}
	const createProfileValidator = z.object({
		username: z.string()
	});
	let loading = false;
	const { form, data } = createForm<z.infer<typeof createProfileValidator>>({
		validate: validateSchema(createProfileValidator),
		extend: reporter(),
		onSubmit: async (values) => {
			loading = true;
			console.log(values);
			try {
				if (!supabaseClient) throw 'supabase clinet not instantiated';
				const { data, error } = await supabaseClient.from('profiles').upsert({
					username: values.username,
					id: get(user)?.id
				});
				if (error) throw error;
				return { data };
			} catch (e: any) {
				console.log(e.message);
			} finally {
				loading = false;
			}
		}
	});
</script>

<section>
	<div class="form-control w-full max-w-xl">
		<form use:form class="flex flex-col gap-2 py-2">
			<input name="username" class="text" placeholder="your name here" />
			<div>
				<button class="btn" type="submit" disabled={loading}>Register</button>
			</div>
		</form>
	</div>
</section>
