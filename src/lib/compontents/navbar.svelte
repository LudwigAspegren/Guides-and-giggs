<script lang="ts">
	import { AuthModule } from '$lib/stores/msalStore';
	const user = AuthModule.user;
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="normal-case text-xl" href="/">PUG-2022</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal p-0">
			<li tabindex="0">
				<p>
					{$user?.name}
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
					<li><a href="/users/{$user?.id}">Profile</a></li>
					<li><a href="/logout">Log out</a></li>
				</ul>
			</li>
		</ul>
	</div>
</div>
