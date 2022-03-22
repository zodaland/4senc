import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolverPath: string = global.config.path.resolver;
const resolvers = loadFilesSync(path.join(resolverPath, '/*Resolver.ts'));

export default resolvers;