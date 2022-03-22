import { readIntro, writeIntro } from '../../models/yml';

const introResolver = {
	Query: {
		intro: async () => {
			try {
				const introInfo: string[]|null = await readIntro();

				return introInfo;
			} catch (error) {
				return null;
			}
		}
	},

	Mutation: {
		intro: async (_: any, args: any) => {
			try {
				const info: string[] = args.info;
				await writeIntro(info);

				return true;
			} catch (error) {
				global.log('resolver', error, 'error');
				
				return false;
			}
		}
	}
}

export default introResolver;