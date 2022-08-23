import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(...handleAuth({ logout: { returnTo: '/logout' } }));
