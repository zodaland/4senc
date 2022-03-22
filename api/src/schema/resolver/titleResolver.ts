import { readTitle, writeTitle } from '../../models/yml';

const titleResolver = {
	Query: {
		title: async () => {
			try {
				const titleInfo: string|null = await readTitle();

				return titleInfo;
			} catch (error) {
				return null;
			}
		}
	},

	Mutation: {
		title: async (_: any, args: any) => {
			try {
				const info: string = args.info;
				await writeTitle(info);

				return true;
			} catch (error) {
				global.log('resolver', error, 'error');
				
				return false;
			}
		}
	}
}

export default titleResolver;