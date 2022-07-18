import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(),
	basicSsl()],
	ssr: {
		noExternal: ['@popperjs/core']
	  },
	server:{
		port:3000
	}
};

export default config;
