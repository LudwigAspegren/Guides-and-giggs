<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { displayalert, displayModal } from '$lib/stores/notificationStore';
	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	import { createForm } from 'felte';

	let loading = false;
	let previousPage = '/';
	interface LoginForm {
		previousPage: string;
		email: string;
	}
	let inputField: HTMLInputElement;
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
			inputField.blur();
			if (error) throw error.message;
			if (data) return;
		},
		onSuccess() {
			// isError = false;
			displayModal('Check your mail!', 'You can now close this tab');
		},
		onError(error) {
			// isError = true;
			loading = false;
			displayalert('Error', error as string, 'ERORR');
		}
	});
</script>

<main class="">
	<div class="card shadow-md px-10 md:max-w-lg">
		<div class="card-body">
			<div class="width" />
			<h2 class="card-title">Welcome to Guides & Gigs</h2>
			<form use:form>
				<div class="field">
					<label for="email" class="label">
						<span class="label-text">Email</span>
					</label>
					<p class="control">
						<input
							bind:this={inputField}
							id="email"
							name="email"
							class="input input-bordered w-full"
							type="email"
							placeholder="type here"
							required
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
