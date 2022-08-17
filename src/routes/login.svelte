<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { createForm } from 'felte';

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
	afterNavigate((navigation) => {
		previousPage = navigation.from ? navigation.from.pathname : '/';
	});

	const { form } = createForm<LoginForm>({
		async onSubmit(values) {
			loading = true;
			values.previousPage = previousPage;
			const response: Response = await fetch($page.url.pathname + '.json', {
				method: 'post',
				body: JSON.stringify(values),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			if (!response.ok) throw data.error as string;
		},
		onSuccess() {
			isError = false;
			modalTitle = 'Check your mail!';
			modalContent = 'You can now close this tab';
			isOpen = true;
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
			<form use:form method="post">
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
