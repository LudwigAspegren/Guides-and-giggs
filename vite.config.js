import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs'
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@popperjs/core']
	  },
	server:{
		// https: {
		// 	key: fs.readFileSync('./.cert/key.pem'),
		// 	cert: fs.readFileSync('./.cert/cert.pem'),
			
		// },
		host:'127.0.0.1',
		port:3000,
	}
};

export default config;
