<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	import { createForm } from 'felte';
	import type { Errors, PageData } from './$types';

	let modalTitle: string;
	let modalContent: string;
	let isError = false;
	let isOpen = false;
	let loading = false;
	let previousPage = '/';
	interface LoginForm {
		previousPage: string;
		email: string;
	}
	export let data: PageData;
	export let errors: Errors;

	$: console.log(errors);
	$: console.log(data);
	afterNavigate((navigation) => {
		previousPage = navigation.from ? navigation.from.pathname : '/';
	});

	const { form } = createForm<LoginForm>({
		async onSubmit(values) {
			loading = true;
			values.previousPage = previousPage;
			console.log($page.url.origin + `/logging-in?previous_page=${previousPage}`);
			const { data, error } = await supabaseClientV2.auth.signInWithOtp({
				email: values.email,
				options: {
					emailRedirectTo: $page.url.origin + `/logging-in?previous_page=${previousPage}`
				}
			});
			if (error) throw error.message;
			if (data) return data.session;
		},
		onSuccess(value) {
			isError = false;
			modalTitle = 'Check your mail!';
			modalContent = 'You can now close this tab';
			isOpen = true;
			console.log(value);
		},
		onError(error) {
			isError = true;
			loading = false;
			modalTitle = 'Unexpected Error';
			modalContent = error as string;
			isOpen = true;
		}
	});
</script>

<main class="">
	<div class="card shadow-md px-10 md:max-w-lg">
		<div class="card-body">
			<div class="width" />
			<h2 class="card-title">Welcome to PUG-2022</h2>
			<form use:form>
				<div class="field">
					<label for="email" class="label">
						<span class="label-text">Email</span>
					</label>
					<p class="control">
						<input
							id="email"
							name="email"
							class="input input-bordered w-full"
							type="email"
							placeholder="type here"
						/>
					</p>
				</div>
				<div class="field my-2">
					<p class="control">
						<input
							type="submit"
							disabled={loading}
							class="btn is-fullwidth is-link"
							value="Login"
						/>
					</p>
				</div>
			</form>
		</div>
	</div>
</main>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" bind:checked={isOpen} />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">{modalTitle}</h3>
		<p class="py-4">
			{modalContent}
		</p>
		<div class="modal-action">
			{#if isError}
				<label for="my-modal" class="btn">Close</label>
			{/if}
		</div>
	</div>
</div>
