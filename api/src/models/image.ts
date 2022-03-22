import { execute, transact } from '../lib/db';

const imageModel: any = {
	getPortfolioFiles: async (no: number): Promise<string[]|null> => {
		const queryOption: any = {
			sql: 'select name from image where portfolio_idx = ?',
			values: [ no ]
		};
		try {
			const rows: any = await execute(queryOption);

			const rowArray: string[] = rows.map((row: any) => (row.name));

			return rowArray;
		} catch (error) {
			global.log('model', error, 'error');
			return null;
		}
	},
	getAll: async (): Promise<any|null> => {
		const queryOption: any = {
			sql: 'select portfolio_idx, name from image'
		};
		try {
			const rows: any = await execute(queryOption);
			let result: any = {};

			rows.forEach((row: any) => {
				if (typeof result[row.portfolio_idx] === 'undefined') {
					result[row.portfolio_idx] = [];
				}
				result[row.portfolio_idx].push(row.name)
			});
			return result;
		} catch (error) {
			global.log('model', error, 'error');
			return null;
		}
	},
	setPortfolioFiles: async (files: string[], no: number): Promise<boolean> => {
		try {
			const sql: string = 'insert into image(portfolio_idx, name) values(?, ?)';
			const values: any[] = await files.map((file) => [no, file]);
			
			const isSuccess = await transact(sql, values);

			return isSuccess;
		} catch (error) {
			global.log('model', error, 'error');
			return false;
		}
	},
	deletePortfolioFiles: async (no: number): Promise<boolean> => {
		const queryOption: any = {
			sql: 'delete from image where portfolio_idx = ?',
			values: [no]
		};
		try {
			const { affectedRows } = await execute(queryOption);
			
			return affectedRows ? true : false;
		} catch (error) {
			global.log('model', error, 'error');
			return false;
		}
	}
}

export default imageModel;