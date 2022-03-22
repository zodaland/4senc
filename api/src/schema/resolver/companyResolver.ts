import { readCompany, writeCompany } from '../../models/yml';

interface ICompany {
	president: string,
	comment: [string]
}

const companyResolver = {
	Query: {
		company: async (): Promise<ICompany|null> => {
			try {
				const companyInfo: ICompany|null = await readCompany();

				return companyInfo;
			} catch (error) {
				return null;
			}
		}
	},

	Mutation: {
		company: async (_: any, args: any) => {
			try {
				const info: ICompany = args.info;

				await writeCompany(info);

				return true;
			} catch (error) {
				global.log('resolver', error, 'error');
				
				return false;
			}
		}
	}
}

export default companyResolver;