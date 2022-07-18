/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
interface session {
	sid: string,
}
declare namespace App {
	interface RequestHandler {
		session: session
	}
	interface Params {
		userId: string
	}
	interface Locals {
		userid: string;
		isAuthenticated: boolean;
		code: string;
		sid: string;
		loginHint: string;
		preferredUsername: string;
		token: string;
	}

	// interface Platform {}

	interface Session {
		isAuthenticated: boolean;
		code: string;
		sid: string;
		loginHint: string;
		preferredUsername: string;
		token: string;

	}

	// interface Stuff {}
}
