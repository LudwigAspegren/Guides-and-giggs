<script context="module">
	import { user } from '$lib/stores/userStore';

	import { supabase } from '$lib/supabaseClient';
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		user.set(null);
	};
	signOut();
</script>
