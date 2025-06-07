import { createSchema, createYoga } from 'graphql-yoga';

const yoga = createYoga({
	schema: createSchema({
		typeDefs: /* GraphQL */ `
			type Query {
				ask(prompt: String!): String!
			}
		`,
		resolvers: {
			Query: {
				ask: async (_, { prompt }) => {
					try {
						const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
							},
							body: JSON.stringify({
								model: 'deepseek-chat',
								messages: [{ role: 'user', content: prompt }],
							}),
						});

						if (!response.ok) {
							const errMsg = await response.text();
							console.error('DeepSeek errMsg:', response.status, errMsg);
						}else {
							const data = (await response.json());
							console.log('DeepSeek errMsg:', JSON.stringify(data).substring(0, 100) + '...');

							// 使用类型安全的访问方式
							if (data.choices?.length > 0 && data.choices[0].message) {
								return data.choices[0].message?.content;
							}
						}
						return '无返回内容';
					} catch (error) {
						console.error('请求 DeepSeek API 时出错:', error);
						throw new Error(`处理请求时出错: ${error.message}`);
					}
				},
			},
		},
	}),
	// landingPage: false, // 禁用默认的登陆页
	cors: false, // 禁用内置的 CORS 处理，我们自己处理
	// graphiql: !isProduction, // 在非生产环境启用 GraphQL
	// graphqlEndpoint: path, // 使用请求的实际路径
	logging: true, // 启用日志记录
});
