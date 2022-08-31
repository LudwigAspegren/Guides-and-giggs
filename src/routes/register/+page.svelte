<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	import { reporter } from '@felte/reporter-svelte';
	import { validateSchema } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { z } from 'zod';
	$: if (browser) {
		if ($page.data.loggedInProfile) {
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

			try {
				const { data, error } = await supabaseClientV2.from('profiles').upsert({
					username: values.username,
					id: $page.data.user.id
				});
				if (error) throw error;
				return { data };
			} catch (e: any) {
			} finally {
				loading = false;
			}
		},
		onSuccess: async (values) => {
			goto('/tickets');
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
