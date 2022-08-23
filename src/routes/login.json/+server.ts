import { supabaseClient } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	console.log(data);
	const email = data.email;
	const previousPage = data.previousPage;
	const values: Record<string, string> = { email, previousPage };
	console.log(values);
	const { error } = await supabaseClient.auth.signIn(
		{ email },
		{ redirectTo: `$/logging-in?previous_page=${previousPage}` }
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
