
export const queries = (() => {
    const fullUserQuery = `
        id,
        username
    `
    const fullTicketQuery = `
        id,      
        title,
        date_updated,
        date_created,
        profiles ( ${fullUserQuery} ),
        statuses ( name ),
        courses ( name ),
        ticket_messages (
            content,
            profiles ( username ),
            date_updated,
            date_created
        )
    `
    const fullTicketMessageQuery = `
        id,
        content,
        date_updated,
        date_created,
        profiles (${fullUserQuery})
    `

    return {
        fullTicketQuery,
        fullTicketMessageQuery,
        fullUserQuery
    }
})()