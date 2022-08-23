export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            computers: {
                Row: {
                    name: string;
                    location_id: number;
                    id: number;
                };
                Insert: {
                    name: string;
                    location_id: number;
                    id?: number;
                };
                Update: {
                    name?: string;
                    location_id?: number;
                    id?: number;
                };
            };
            courses: {
                Row: {
                    name: string;
                    id: number;
                };
                Insert: {
                    name: string;
                    id?: number;
                };
                Update: {
                    name?: string;
                    id?: number;
                };
            };
            home_tickets: {
                Row: {
                    ticket_id: number;
                    operating_system: string | null;
                    id: number;
                };
                Insert: {
                    ticket_id: number;
                    operating_system?: string | null;
                    id?: number;
                };
                Update: {
                    ticket_id?: number;
                    operating_system?: string | null;
                    id?: number;
                };
            };
            ticket_messages: {
                Row: {
                    user_id: string;
                    ticket_id: number;
                    content: string;
                    date_created: string;
                    date_updated: string | null;
                    id: number;
                };
                Insert: {
                    user_id: string;
                    ticket_id: number;
                    content: string;
                    date_created: string;
                    date_updated?: string | null;
                    id?: number;
                };
                Update: {
                    user_id?: string;
                    ticket_id?: number;
                    content?: string;
                    date_created?: string;
                    date_updated?: string | null;
                    id?: number;
                };
            };
            locations: {
                Row: {
                    name: string;
                    seats: number | null;
                    id: number;
                };
                Insert: {
                    name: string;
                    seats?: number | null;
                    id?: number;
                };
                Update: {
                    name?: string;
                    seats?: number | null;
                    id?: number;
                };
            };
            profiles: {
                Row: {
                    id: string;
                    updated_at: string | null;
                    username: string | null;
                };
                Insert: {
                    id: string;
                    updated_at?: string | null;
                    username?: string | null;
                };
                Update: {
                    id?: string;
                    updated_at?: string | null;
                    username?: string | null;
                };
            };
            school_tickets: {
                Row: {
                    ticket_id: number;
                    computer_id: number;
                    id: number;
                };
                Insert: {
                    ticket_id: number;
                    computer_id: number;
                    id?: number;
                };
                Update: {
                    ticket_id?: number;
                    computer_id?: number;
                    id?: number;
                };
            };
            statuses: {
                Row: {
                    name: string;
                    id: number;
                };
                Insert: {
                    name: string;
                    id?: number;
                };
                Update: {
                    name?: string;
                    id?: number;
                };
            };
            tickets: {
                Row: {
                    user_id: string;
                    title: string;
                    course_id: number;
                    status_id: number;
                    date_created: string;
                    date_updated: string | null;
                    at_computer_lab: boolean;
                    id: number;
                };
                Insert: {
                    user_id: string;
                    title: string;
                    course_id: number;
                    status_id: number;
                    date_created: string;
                    date_updated?: string | null;
                    at_computer_lab: boolean;
                    id?: number;
                };
                Update: {
                    user_id?: string;
                    title?: string;
                    course_id?: number;
                    status_id?: number;
                    date_created?: string;
                    date_updated?: string | null;
                    at_computer_lab?: boolean;
                    id?: number;
                };
            };
        };
        Functions: {
            citextin: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            citextout: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            citextrecv: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            citextsend: {
                Args: Record<string, unknown>;
                Returns: string;
            };
            citext: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            citext_eq: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_ne: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_lt: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_le: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_gt: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_ge: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_cmp: {
                Args: Record<string, unknown>;
                Returns: number;
            };
            citext_hash: {
                Args: Record<string, unknown>;
                Returns: number;
            };
            citext_smaller: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            citext_larger: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            min: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            max: {
                Args: Record<string, unknown>;
                Returns: unknown;
            };
            texticlike: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            texticregexeq: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            texticregexne: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            texticnlike: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            regexp_match: {
                Args: Record<string, unknown>;
                Returns: string[];
            };
            regexp_matches: {
                Args: Record<string, unknown>;
                Returns: string[];
            };
            regexp_replace: {
                Args: Record<string, unknown>;
                Returns: string;
            };
            regexp_split_to_array: {
                Args: Record<string, unknown>;
                Returns: string[];
            };
            regexp_split_to_table: {
                Args: Record<string, unknown>;
                Returns: string;
            };
            strpos: {
                Args: Record<string, unknown>;
                Returns: number;
            };
            replace: {
                Args: Record<string, unknown>;
                Returns: string;
            };
            split_part: {
                Args: Record<string, unknown>;
                Returns: string;
            };
            translate: {
                Args: Record<string, unknown>;
                Returns: string;
            };
            citext_pattern_lt: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_pattern_le: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_pattern_gt: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_pattern_ge: {
                Args: Record<string, unknown>;
                Returns: boolean;
            };
            citext_pattern_cmp: {
                Args: Record<string, unknown>;
                Returns: number;
            };
            citext_hash_extended: {
                Args: Record<string, unknown>;
                Returns: number;
            };
        };
    };
}

