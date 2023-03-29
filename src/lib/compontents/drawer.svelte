<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Navbar content -->
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<aside class="menu p-4 w-64 bg-base-200 shadow-inner text-base-content">
			<!-- Sidebar content here -->
			<div class="hidden lg:flex pb-4">
				<a class="normal-case text-xl" href="/">Guides & Gigs</a>
			</div>
			<ul>
				<li><a sveltekit:prefetch href="/tickets">Tickets</a></li>
			</ul>
		</aside>
	</div>
</div>
