<script lang="ts">
	import { AuthModule } from '$lib/stores/msalStore';
	const currentUrl = AuthModule.afterAuthenticationUrl;
</script>

<main class="grid place-content-center h-screen">
	<div class="card shadow-md px-10 md:max-w-lg">
		<div class="card-body">
			<div class="width" />
			<h2 class="card-title">Welcome to PUG-2022</h2>
			<div class="h-32" />
			<div class="card-actions justify-end">
				<div class="btn btn-primary self-end">
					<a href="/auth/?callback={$currentUrl}">Log In </a>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
</style>
