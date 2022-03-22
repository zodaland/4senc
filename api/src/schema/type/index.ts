import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';

const typePath = global.config.path.type;
const typeDefs = loadFilesSync(path.join(typePath, '*.graphql'));

export default typeDefs;