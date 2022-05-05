import 'source-map-support/register';
import './global';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import schema from './schema';
import path from 'path';
import { getToken } from './lib/tool';
import { decode } from './lib/jwt';

const server = new ApolloServer({ 
    cors: {
        origin: global.config.corsOrigin,
        credentials: true
    },
    schema,
    context: async ({ req }) => {
        if (process.env.NODE_ENV !== 'production') return;
		const context: any = {}
		const token: string|null = getToken(req.headers.cookie);
		if (token) {
			context.token = token;
		}
		const query: any = req.body.query;
		if (typeof query === 'string' && query.includes('mutation')) {
			if (!token) throw new AuthenticationError("인증 실패");

			try {
				const decoded = await decode(token);
			} catch (e: any) {
				throw new Error(e);
			}
		}
		return context;
    },
    introspection: process.env.NODE_ENV !== 'production',
});

server.listen({ port: 8080 })
.then(() => {
	console.log(`4senc-api server running`);
});
