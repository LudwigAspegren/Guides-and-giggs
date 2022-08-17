export const queries = (() => {
	const fullUserQuery = `
        id,
        username
    `;
	const fullTicketMessageQuery = `
        id,
        content,
        date_updated,
        date_created,
        profiles (${fullUserQuery})
    `;
	const fullTicketQuery = `
        id,      
        title,
        date_updated,
        date_created,
        profiles ( ${fullUserQuery} ),
        statuses ( name ),
        courses ( name ),
        ticket_messages (
        ${fullTicketMessageQuery}
        )
    `;

	return {
		fullTicketQuery,
		fullTicketMessageQuery,
		fullUserQuery
	};
})();

