export interface CreateUserDto {
    id: string
    name: string
    email: string
}

export interface ApiResponse<T> {
    Sucess: string,
    Message: string,
    data: T
}
export interface User {
    id: string
    name: string
    email: string
}
export interface Status {
    id: int,
    name: string
}
export interface Course {
    id: int,
    name: string
}
export interface Computer {
    id: int,
    name: string
}
export interface Ticket {
    id: number,
    user: User,
    status: Status,
    course: Course
    title: string,
    dateCreated: Date,
    dateUpdated: Date,
    atComputerLab: boolean
}
export interface TicketMessage {
    id: number,
    content: string,
    user: User,
    dateCreated: Date,
    dateUpdated: Date
}

export interface Thread {
    ticket: Ticket,
    ticketMessages: TicketMessage[]

}