import { supabaseClientV2 } from "$lib/supabaseClientV2";
import type { Database } from "src/databaseDefintions";
import { z } from "zod";



export const submitHomeTicket = async (ticketId: number, operatingSystem: string) => {
    const { error: homeTicketError } = await supabaseClientV2.from('home_tickets').insert({
        ticket_id: ticketId,
        operating_system: operatingSystem
    });
    if (homeTicketError) throw homeTicketError;
}
export const submitComputerLab = async (ticketId: number, computerId: number) => {
    const { error: labTicketError } = await supabaseClientV2.from('school_tickets').insert({
        ticket_id: ticketId,
        computer_id: computerId
    });
    if (labTicketError) throw labTicketError;
};
export const computerLabValidator = z.object({
    computerId: z.string().min(1, 'A computer must be choosen')
});
export const createTicketValidator = z.object({
    title: z.string().min(1, "Title can't be empty"),
    courseId: z.string().min(1, 'A course must be choosen'),
    content: z.string().min(1, 'Description cant be empty'),
    userId: z.string({ required_error: 'Must be logged in' }),
});

export const submitTicket = async (ticketSubmit: z.infer<typeof createTicketValidator>) => {

    const ticketInsert: Database['public']['Tables']['tickets']['Insert'] = {
        title: ticketSubmit.title,
        date_created: new Date().toISOString(),
        user_id: ticketSubmit.userId,
        course_id: parseInt(ticketSubmit.courseId),
        status_id: 1
    };
    const { data: ticketData, error: ticketError } = await supabaseClientV2
        .from('tickets')
        .insert(ticketInsert)
        .select('id')
        .single();

    if (ticketError) throw ticketError.message;

    const messageInsert: Database['public']['Tables']['ticket_messages']['Insert'] = {
        ticket_id: ticketData.id,
        content: ticketSubmit.content,
        date_created: new Date().toISOString(),
        user_id: ticketSubmit.userId
    };
    const { error: messageError } = await supabaseClientV2
        .from('ticket_messages')
        .insert(messageInsert);

    if (messageError) throw messageError;
    return ticketData
}