<script lang="ts" context="module">
	import '../app.css';

	const supaUser = supabase.auth.user();
	supabase.auth.onAuthStateChange((_, session) => {
		if (session) user.set(session.user);
	});
	user.set(supaUser);
	const loadProfile = async () => {
		try {
			let { data, error } = await supabase
				.from<Profile>('profiles')
				.select(`username,id`)
				.eq('id', supaUser?.id ?? '')
				.single();

			if (data) username.set(data.username);
			if (error) throw error;
		} catch (e) {
			console.log(e);
		}
	};
	if (browser) {
		if (!get(courses)) setUtils();
		if (!get(username)) loadProfile();
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import type { Profile } from '$lib/data/validation';
	import { user, username } from '$lib/stores/userStore';
	import { courses, setUtils } from '$lib/stores/utilStore';
	import { supabase } from '$lib/supabaseClient';
	import { get } from 'svelte/store';
</script>

<!-- Drawer -->
<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center justify-start">
		<!-- Navbar -->
		<div
			class=" sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm"
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
					<a class="normal-case text-xl lg:hidden" href="/">PUG-2022</a>
				</div>
				<div class="flex gap-4">
					<div>
						{#if $user}
							<a class="btn btn-sm btn-primary" href="/tickets/create"> Create ticket </a>
						{:else}
							<a class="btn btn-sm btn-primary" href="/login"> Login </a>
						{/if}
					</div>
					<div class="flex-none">
						<ul class="menu menu-horizontal p-0">
							<li tabindex="0">
								{#if $user && $username}
									<p>
										{$username}
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
										<li><a href="/profiles/{$user?.id}">Profile</a></li>
										<li><a href="/logout">Log out</a></li>
									</ul>
								{/if}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- Main content -->
		<main class="container mx-auto max-w-5xl mt-32">
			<slot />
		</main>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<aside class="menu p-4 overflow-y-auto w-80 bg-base-200 shadow-inner sh text-base-content">
			<!-- Sidebar content here -->
			<div class="hidden lg:flex pb-4">
				<a class="normal-case text-xl" href="/">PUG-2022</a>
			</div>
			<ul>
				<li><a href="/tickets">Tickets</a></li>
			</ul>
		</aside>
	</div>
</div>
