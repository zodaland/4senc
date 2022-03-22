import { execute } from '../../lib/db';

const testQueryResolver = {
	Query: {
		test: () => { return 'testOk'; },
		test2: async () => {
			const qo: any = { sql: "select * from portfolio where idx=?", values: ["1"] };

			try {
				const result: any = await execute(qo);
	console.log(result)
				return result[0].title;
			} catch (error) {
				global.log('db', error, 'error');
				return 'error';
			}
		}
	},
    Mutation: {
		test: async (_: any, args: any): Promise<string> => {
			const qo: any = {
				sql: 'insert into portfolio(title, content) values (?)',
				values: [ args ] //이거안됨
			};
			try {
				const result = await execute(qo);

				global.log('db', result);

				return 'insert complete';
			} catch (error) {
				global.log('db', error, 'error');

				return 'insert fail';
			}
		}
	}
};

export default testQueryResolver;