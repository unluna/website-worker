import yoga from './deepseekQl';

// CORS 预检请求
const cors204 = new Response(null, {
	status: 204,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	}
});
export default {
	async fetch(req, env, ctx) {
		if (req.method === 'OPTIONS') {
			return cors204;
		}
		const res = await yoga.fetch(req, { req, env, ctx });
		return new Response(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				...res.headers
			}
		});
	}
};
