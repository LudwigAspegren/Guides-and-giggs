import { queries } from "$lib/data/queries";
import { TicketValidator } from "$lib/data/validation";
import { supabaseClient } from "$lib/supabaseClient";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
	const { user } = await event.parent()

	const ticketId = event.params.ticketId;
	const { data, error } = await supabaseClient
		.from('tickets')
		.select(queries.fullTicketQuery)
		.eq('id', ticketId)
		.single();
	console.log(data);
	let ticket = TicketValidator.parse(data);
	return { ticket };
};
