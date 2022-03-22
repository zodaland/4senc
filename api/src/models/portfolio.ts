import { execute } from '../lib/db';

interface IPortfolio {
	idx: string | null,
    title: string | null,
    content: string | null,
	date: string | null
}

const portfolioModel: any = {
    getOneByNo: async (no: number): Promise<IPortfolio | null> => {
        const queryOption: any = {
            sql: 'select idx, title, content, date from portfolio where idx = ?',
            values: [ no ]
        };
        try {
            let [ row ] = await execute(queryOption);
			if (!row) return null;
            row.content = Buffer.isBuffer(row.content) ? row.content.toString() : row.content;
            return row;
        } catch (error) {
            global.log('model', 'portfolio - getOneByNo', 'error');
            return null;
        }
    },
    setOne: async (info: IPortfolio): Promise<number | null> => {

        const { title, content, date } = info;
        const queryOption: any = {
            sql: 'insert into portfolio(title, content, date) values(?, ?, ?)',
            values: [title, content, date]
        };

        try {
            const { insertId } = await execute(queryOption);
			return insertId ?? null;
        } catch (error) {
            global.log('model', 'portpolio - setOne', 'error');
            return null;
        }
    },
	getAll: async (): Promise<any[] | null> => {
		const queryOption: any = {
			sql: 'select idx, title, content, date from portfolio'
		}
		try {
			const rows: any = await execute(queryOption);
			rows.forEach((row: any, index: number) => rows[index].content = Buffer.isBuffer(row.content) ? row.content.toString() : row.content);

			return rows;
		} catch (error) {
			global.log('model', error, 'error');
			return null;
		}
	},
	updateOne: async (info: IPortfolio): Promise<boolean> => {
		const { title, content, date, idx } = info;
		const queryOption: any = {
			sql: 'update portfolio set title = ?, content = ?, date = ? where idx = ?',
			values: [title, content, date, idx]
		};
		try {
			const { affectedRows } = await execute(queryOption);
			return (affectedRows === 1) ? true : false;
		} catch (error) {
			global.log('model', error, 'error');
			return false;
		}
	},
	deleteOne: async (no: number): Promise<boolean> => {
		const queryOption: any = {
			sql: 'delete from portfolio where idx = ?',
			values: [no]
		};
		try {
			const { affectedRows } = await execute(queryOption);
			return (affectedRows === 1) ? true : false;
		} catch (error) {
			global.log('model', error, 'error');
			return false;
		}
	}
}

export default portfolioModel;