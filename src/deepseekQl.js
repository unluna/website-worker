import { createSchema, createYoga } from 'graphql-yoga';

const yoga = createYoga({
	schema: createSchema({
		typeDefs: /* GraphQL */ `
			type DeepSeekAskResult {
				errno: Int!
				result: String
				error: String
			}
			type Query {
				ask(prompt: String!): DeepSeekAskResult!
			}
		`,
		resolvers: {
			Query: {
				ask: async (_, { prompt }) => {
					let json = {};

					try {
						const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer sk-13e0db35827f4de080d8312f28e3513c`
							},
							body: JSON.stringify({
								model: 'deepseek-chat',
								messages: [{ role: 'user', content: prompt }]
							})
						});

						if (!response.ok) {
							json = {
								errno: 1,
								error: await response.text()
							};
						} else {
							const data = await response.json();
							json = {
								errno: 0,
								result: data.choices?.[0]?.message?.content ?? ''
							};
						}
					} catch (err) {
						console.error('fetch error', err);
						json = {
							errno: 2,
							error: err?.message || String(err)
						};
					}

					return json;
				}
			}
		}
	}),
	landingPage: false, // 禁用默认的登陆页
	cors: false, // 禁用内置的 CORS 处理，我们自己处理
	// graphiql: !isProduction, // 在非生产环境启用 GraphQL
	graphqlEndpoint: '/graphql', // 使用请求的实际路径
	logging: true // 启用日志记录
});

export default yoga;
