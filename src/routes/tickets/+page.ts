import { queries } from "$lib/data/queries";
import { TicketValidator } from "$lib/data/validation";
import { supabaseClientV2 } from "$lib/supabaseClientV2";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const { data } = await supabaseClientV2.from('tickets').select(queries.fullTicketQuery);
    const tickets = TicketValidator.array().parse(data);
    return { tickets }
}