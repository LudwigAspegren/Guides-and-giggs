import { supabaseClient } from '$lib/supabaseClient';
import type { RequestHandler } from '@sveltejs/kit';

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
		return {
			status: 400,

			body: {
				error: error.message
				//values
			}
		};
	}
	return {
		status: 200
	};
};
