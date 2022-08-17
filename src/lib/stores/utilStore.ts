import { supabaseClient } from '$lib/supabaseClient';
import { writable, type Writable } from 'svelte/store';
import { z } from 'zod';

const StatusValidator = z.object({
	id: z.number(),
	name: z.string()
});
const CourseValidator = z.object({
	id: z.number(),
	name: z.string()
});
const LocationValidator = z.object({
	id: z.number(),
	name: z.string()
});
const ComputerValidator = z.object({
	id: z.number(),
	name: z.string(),
	locations: LocationValidator
});

type Status = z.infer<typeof StatusValidator>;
type Course = z.infer<typeof CourseValidator>;
type Computer = z.infer<typeof ComputerValidator>;

export const statuses: Writable<Status[]> = writable();
export const courses: Writable<Course[]> = writable();
export const computers: Writable<Computer[]> = writable();

export const setUtils = async () => {
	const coursePromise = supabaseClient.from<Course>('courses').select('*');
	const statusPromise = supabaseClient.from<Status>('statuses').select('*');
	const computerPromise = supabaseClient
		.from<Computer>('computers')
		.select('id,name, locations(id,name)');
	const responses = await Promise.all([coursePromise, statusPromise, computerPromise]);
	courses.set(z.array(CourseValidator).parse(responses[0].data));
	statuses.set(z.array(StatusValidator).parse(responses[1].data));
	computers.set(z.array(ComputerValidator).parse(responses[2].data));
};

