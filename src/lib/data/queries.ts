export const queries = (() => {
    const fullProfileQuery = `
        id,
        username
    `;
    const fullTicketMessageQuery = `
        id,
        content,
        date_updated,
        date_created,
        profiles (${fullProfileQuery})
    `;
    const fullTicketQuery = `
        id,      
        title,
        date_updated,
        date_created,
        profiles ( ${fullProfileQuery} ),
        statuses ( name ),
        courses ( name ),
        ticket_messages (
        ${fullTicketMessageQuery}
        )
    `;

    return {
        fullTicketQuery,
        fullTicketMessageQuery,
        fullProfileQuery
    };
})();

