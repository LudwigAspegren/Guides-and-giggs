<script lang="ts">
	import { invalidate } from '$app/navigation';

	import { page } from '$app/stores';
	import { supabaseClientV2 } from '$lib/supabaseClientV2';
	const logout = async () => {
		await supabaseClientV2.auth.signOut();
		invalidate();
	};
</script>

<div
	class=" sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transaition-all duration-100 bg-base-100 text-base-content shadow-sm"
>
	<div class="navbar max-w-full z-10">
		<div class="flex justify-center">
			<label for="my-drawer-2" class="cursor-pointer lg:hidden pr-2"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				></label
			>
			<a class="normal-case text-xl lg:hidden" href="/">Guides & Gigs</a>
		</div>
		<div class="flex gap-4">
			{#if $page.data.user}
				<div>
					<a class="btn btn-sm btn-primary" href="/tickets/create"> Create ticket </a>
				</div>
				<div class="flex-none">
					<ul class="menu menu-horizontal p-0">
						<li tabindex="0">
							<p>
								{$page.data.loggedInProfile?.username}
								<svg
									class="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
								>
							</p>
							<ul class="p-2 bg-base-100">
								<li><a href="/profiles/{$page.data.user?.id}">Profile</a></li>
								<li><button class="a" on:click={logout} href="/tickets">Log out</button></li>
							</ul>
						</li>
					</ul>
				</div>
			{:else if !$page.data.user}
				<a class="btn btn-sm btn-primary mr-4" href="/login"> Login </a>
			{/if}
		</div>
	</div>
</div>
<!-- Main content -->
<slot />
