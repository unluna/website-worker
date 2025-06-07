/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const json = {
			test: 'hello world!'
		};
		return new Response(JSON.stringify(json), {
			status: 200,
			headers: {
				'content-type': 'application/json',
				'Content-Type': 'application/json',
				// 'Access-Control-Allow-Origin': 'https://www.unluna.com',
				// 'Access-Control-Allow-Methods': 'GET, OPTIONS',
				// 'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Allow-Headers': '*',
			}
		});
	}
};
