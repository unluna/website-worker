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
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return cors204;
		}
		const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.API_KEY}`
				// Authorization: `Bearer ${'sk-13e0db35827f4de080d8312f28e3513c'}`
			},
			body: JSON.stringify({
				model: 'deepseek-chat',
				messages: [{ role: 'user', content: '嗨' }]
			})
		});
		let json = {};

		if (!response.ok) {
			json.test = await response.text();
		} else {
			const data = (await response.json());
			if (data.choices?.length && data.choices[0].message) {
				json.test = data.choices[0].message?.content;
			}
		}

		return new Response(JSON.stringify(json), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	}
};
