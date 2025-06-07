export default {
	async fetch(request, env, ctx) {
		// CORS 预检请求
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, OPTIONS',
					'Access-Control-Allow-Headers': '*',
				},
			});
		}

		const json = { test: 'hello world!' };
		return new Response(JSON.stringify(json), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
	},
};
