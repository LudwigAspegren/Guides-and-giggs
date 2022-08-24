import { queries } from "$lib/data/queries";
import { TicketValidator } from "$lib/data/validation";
import { supabaseClientV2 } from "$lib/supabaseClientV2";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
	const { user } = await event.parent()

	const ticketId = event.params.ticketId;
	const { data, error } = await supabaseClientV2
		.from('tickets')
		.select(queries.fullTicketQuery)
		.eq('id', ticketId)
		.single();
	console.log(data);
	let ticket = TicketValidator.parse(data);
	return { ticket };
};
