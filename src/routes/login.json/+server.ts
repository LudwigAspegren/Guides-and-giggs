import { supabaseClientV2 } from '$lib/supabaseClientV2';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	console.log(data);
	const email = data.email;
	const previousPage = data.previousPage;
	const values: Record<string, string> = { email, previousPage };
	console.log(values);
	const { error } = await supabaseClientV2.auth.signInWithOtp(
		{ email },
	);

	if (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error.message }), { status: 400 })
	}
	console.log('hej')
	return new Response(JSON.stringify({ data }), {
		status: 200,
		statusText: 'logging in',
	})
}
