import { queries } from "$lib/data/queries";
import { TicketValidator } from "$lib/data/validation";
import { supabaseClient } from "$lib/supabaseClient";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const { data } = await supabaseClient.from('tickets').select(queries.fullTicketQuery);
    const tickets = TicketValidator.array().parse(data);
    return { tickets }
}