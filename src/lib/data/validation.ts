import { z } from "zod";

export const TicketMessageValidator = z.object({
    id: z.number().optional(),
    content: z.string(),
    profiles: z.object({ username: z.string() }),
    date_updated: z.string().nullable(),
    date_created: z.string()
});
export type TicketMessage = z.infer<typeof TicketMessageValidator>;

export const ProfileValidator = z.object({
    id: z.string().uuid(),
    username: z.string()
})

export const TicketValidator = z.object({
    id: z.number(),
    title: z.string(),
    date_created: z.string(),
    date_updated: z.string().nullable(),
    profiles: ProfileValidator,
    statuses: z.object({ name: z.string() }),
    courses: z.object({ name: z.string() }),
    ticket_messages: TicketMessageValidator.array()
});
export type Ticket = z.infer<typeof TicketValidator>;

export type Profile = z.infer<typeof ProfileValidator>;