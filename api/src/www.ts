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
		const context: any = {}
		const token: string|null = getToken(req.headers.cookie);
		if (token) {
			context.token = token;
		}
		const query: any = req.body.query;
		if (typeof query === 'string' && query.includes('mutation')) {
			if (!token) throw new AuthenticationError("���� ����");

			try {
				const decoded = await decode(token);
			} catch (e: any) {
				throw new Error(e);
			}
		}
		return context;
    }
});

server.listen({ port: 8080 })
.then(() => {
	console.log(`4senc-api server running`);
});
