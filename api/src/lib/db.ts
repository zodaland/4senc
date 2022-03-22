import mysql, { Pool, PoolOptions, QueryOptions, PoolConnection, Query } from 'mysql2/promise';

const option: PoolOptions = {
		host: global.config.mysql.host,
		user: global.config.mysql.user,
		password: global.config.mysql.password,
		port: global.config.mysql.port,
		database: global.config.mysql.database,
        multipleStatements: true,
        typeCast: true
}

const pool: Pool = mysql.createPool(option);


export const execute: any = async (queryOptions: QueryOptions): Promise<any> => {
	const connection = await pool.getConnection();
	try {
        const [rows, fields] = await connection.execute(queryOptions);
        
        return rows;
	} catch (error: any) {
		global.log('db', error, 'error');
		throw error;
	} finally {
		connection.release();
	}
}

export const transact: any = async (sql: string, values: any[]): Promise<boolean> => {
	const connection = await pool.getConnection();
	try {		
		const queries: any = await values.map((value) => {
			const queryOptions: QueryOptions = {
				sql: sql,
				values: value
			};
			return connection.execute(queryOptions);
		});
		
		const queryResults = await Promise.all(queries);
		
		await connection.commit();
		
		return true;
	} catch (error: any) {
		connection.rollback();
		global.log('db', error, 'error');
		return false;
	} finally {
		connection.release();
	}
}
