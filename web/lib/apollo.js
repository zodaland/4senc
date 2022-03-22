import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = createHttpLink({
	uri: process.env.NEXT_PUBLIC_API_SERVER + '/graphql',
	credentials: 'same-origin'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache
});

export default ApolloProvider;
export { client };