import { queries } from "$lib/data/queries";
import { TicketValidator } from "$lib/data/validation";
import { supabaseClientV2 } from "$lib/supabaseClientV2";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

const parse = (x: string) => {
    const parsed = parseInt(x);
    if (isNaN(parsed)) { return 1; }
    return parsed;
}

export const load: LayoutLoad = async ({ params }) => {
    const ticketsPage = parse(params.rest)
    const itemsPerPage = 20
    const start = (ticketsPage - 1) * itemsPerPage
    const end = ticketsPage * itemsPerPage - 1
    const { data: ticketsData, count, error: ticketsError } = await supabaseClientV2.from('tickets').select(queries.fullTicketQuery, { count: 'estimated' }).range(start, end);
    if (ticketsError) console.log(ticketsError)
    const tickets = TicketValidator.array().nullish().parse(ticketsData);
    const range = [...Array(Math.ceil((count ?? 0) / itemsPerPage)).keys()].map(n => n + 1)
    if (tickets?.length === 0 || !tickets) throw error(404, 'No more tickets!')
    return { tickets, ticketsPage, range }
}