import type { Profile } from "$lib/data/validation";
import { writable, type Writable } from "svelte/store";

export const profile: Writable<Profile | null> = writable()