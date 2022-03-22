import { readMenu, writeMenu } from '../../models/yml';

interface IMenu {
	path: string,
	name: string,
	comments: string[]
}

const menuResolver = {
	Query: {
		menu: async (): Promise<IMenu[]|null> => {
			try {
				const menuInfo: IMenu[]|null = await readMenu();

				return menuInfo;
			} catch (error) {
				return null;
			}
		}
	},

	Mutation: {
		menu: async (_: any, args: any) => {
			try {
				const info: IMenu[] = args.info;

				await writeMenu(info);

				return true;
			} catch (error) {
				global.log('resolver', error, 'error');
				
				return false;
			}
		}
	}
}

export default menuResolver;