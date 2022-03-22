import { execute } from '../lib/db';

interface IBrief {
	idx: string | null,
    summary: string | null,
	date: string | null
}

const briefModel: any = {
	getAll: async (): Promise<any[]|null> => {
		const queryOption: any = {
			sql: 'select idx, summary, date from brief order by date asc'
		};
		try {
			const rows: any = await execute(queryOption);

			return rows;
		} catch (error) {
			global.log('model', 'brief - getAll', 'error');

			return null;
		}
	},

	setOne: async (info: IBrief): Promise<number | null> => {
		const { summary, date } = info;
		const queryOption = {
			sql: 'insert into brief(summary, date) values(?, ?)',
			values: [summary, date]
		};

		try {
			const resultSetHeader = await execute(queryOption);

			return resultSetHeader.insertId ?? null
		} catch (error) {
			global.log('model', 'brief - setOne', 'error');

			return null
		}
	},

	updateOne: async (info: IBrief): Promise<boolean> => {
		const { summary, date, idx } = info;

		const queryOption: any = {
			sql: 'update brief set summary = ?, date = ? where idx = ?',
			values: [summary, date, idx]
		};
		try {
			const resultSetHeader = await execute(queryOption);

			return resultSetHeader.affectedRows === 1 ? true : false;
		} catch (error) {
			console.log(error);
			global.log('model', 'brief - updateOne', 'error');

			return false;
		}
	},

	deleteOne: async (no: number): Promise<boolean> => {
		const queryOption: any = {
			sql: 'delete from brief where idx = ?',
			values: [no]
		};

		try {
			const resultSetHeader = await execute(queryOption);

			return resultSetHeader.affectedRows === 1 ? true : false;
		} catch (error) {
			console.log(error);
			global.log('model', 'brief - deleteOne', 'error');

			return false;
		}
	}
}

export default briefModel;
