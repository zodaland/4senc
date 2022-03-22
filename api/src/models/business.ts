import { execute } from '../lib/db';

interface IBusiness {
	idx: string | null,
    name: string | null,
	image: string | null
}

const businessModel: any = {
	getAll: async (): Promise<any[]|null> => {
		const queryOption: any = {
			sql: 'select idx, name, image from business order by image asc'
		};
		try {
			const rows: any = await execute(queryOption);

			return rows;
		} catch (error) {
			global.log('model', 'business - getAll', 'error');

			return null;
		}
	},

	setOne: async (info: IBusiness): Promise<number | null> => {
		const { name, image } = info;
		const queryOption = {
			sql: 'insert into business(name, image) values(?, ?)',
			values: [name, image]
		};

		try {
			const { insertId } = await execute(queryOption);

			return insertId ?? null
		} catch (error) {
			global.log('model', 'business - setOne', 'error');

			return null
		}
	},

	updateOne: async (info: IBusiness): Promise<boolean> => {
		const { name, image, idx } = info;

		const queryOption: any = {
			sql: 'update business set name = ?, image = ? where idx = ?',
			values: [name, image, idx]
		};
		try {
			const { affectedRows } = await execute(queryOption);

			return affectedRows === 1 ? true : false;
		} catch (error) {
			console.log(error);
			global.log('model', 'business - upimageOne', 'error');

			return false;
		}
	},

	deleteOne: async (no: number): Promise<boolean> => {
		const queryOption: any = {
			sql: 'delete from business where idx = ?',
			values: [no]
		};

		try {
			const { affectedRows } = await execute(queryOption);

			return affectedRows === 1 ? true : false;
		} catch (error) {
			console.log(error);
			global.log('model', 'business - deleteOne', 'error');

			return false;
		}
	}
}

export default businessModel;
