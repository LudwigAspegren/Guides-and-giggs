import { supabaseClientV2 } from '$lib/supabaseClientV2';
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
	const coursePromise = supabaseClientV2.from('courses').select('*');
	const statusPromise = supabaseClientV2.from('statuses').select('*');
	const computerPromise = supabaseClientV2
		.from('computers')
		.select('id,name, locations(id,name)');
	const responses = await Promise.all([coursePromise, statusPromise, computerPromise]);
	courses.set(z.array(CourseValidator).parse(responses[0].data));
	statuses.set(z.array(StatusValidator).parse(responses[1].data));
	computers.set(z.array(ComputerValidator).parse(responses[2].data));
};

