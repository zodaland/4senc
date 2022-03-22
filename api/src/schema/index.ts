import typeDefs from './type';
import resolvers from './resolver';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const schema = makeExecutableSchema({
	typeDefs: mergeTypeDefs(typeDefs),
	resolvers: mergeResolvers(resolvers)
});

export default schema;