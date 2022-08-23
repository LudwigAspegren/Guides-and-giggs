import { queries } from '$lib/data/queries';
import {
	ProfileValidator,
	TicketValidator
} from '$lib/data/validation';
import type { PageLoad } from './$types';

import { supabaseClient } from '$lib/supabaseClient';
export const load: PageLoad = async (event) => {
	const profileId = event.params.profileId;
	const profilePromise = supabaseClient
		.from('profiles')
		.select(queries.fullProfileQuery)
		.eq('id', profileId)
		.single();
	const ticketsPromise = supabaseClient
		.from('tickets')
		.select(queries.fullTicketQuery)
		.eq('user_id', profileId);

	const responses = await Promise.all([profilePromise, ticketsPromise]);
	const profile = ProfileValidator.parse(responses[0].data);
	const tickets = TicketValidator.array().parse(responses[1].data);
	return {
		profile,
		tickets
	};
};
