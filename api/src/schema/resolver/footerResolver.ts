import { readFooter, writeFooter } from '../../models/yml';

const footerResolver = {
	Query: {
		footer: async () => {
			try {
				const footerInfo: string|null = await readFooter();

				return footerInfo;
			} catch (error) {
				return null;
			}
		}
	},

	Mutation: {
		footer: async (_: any, args: any) => {
			try {
				const info: string = args.info;
				await writeFooter(info);

				return true;
			} catch (error) {
				global.log('resolver', error, 'error');
				
				return false;
			}
		}
	}
}

export default footerResolver;