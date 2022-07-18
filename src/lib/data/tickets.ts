import type { Ticket } from "$lib/types";
import { getRequest } from "./utils";

type Tickets = Array<Ticket>

export const getTickets = async (): Promise<Tickets | undefined> => {
    const endpoint = "Ticket";
    return await getRequest(endpoint)
}
export const getTicketsByUserId = async (userId: string): Promise<Tickets | undefined> => {
    const endpoint = `Ticket/user/${userId}`;
    return await getRequest(endpoint)
}
export const getTicketByTicketID = async (ticketId: string): Promise<Tickets | undefined> => {
    const endpoint = `Ticket${ticketId}`;
    return await getRequest(endpoint);
}
