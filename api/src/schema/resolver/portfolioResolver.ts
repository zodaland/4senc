import portfolioModel from '../../models/portfolio';
import imageModel from '../../models/image';
import crypto from 'crypto';

interface IPortfolio {
	idx: string | null,
    title: string | null,
    content: string | null,
	date: string | null
}

interface IPortfolioWithFile extends IPortfolio {
	files: string[] | null
}

interface IResult {
    success: boolean,
    message: string | null
}

interface IIdxResult extends IResult {
	idx: number | null
}

const portfolioResolver = {
    Query: {
        portfolio: async (_: any, args: any): Promise<IPortfolio | null> => {
			const { idx } = args;

			const row: any = await portfolioModel.getOneByNo(idx);
			if (!row) return null;
			const files = await imageModel.getPortfolioFiles(idx);
			const rowWithFile: IPortfolioWithFile = {
				...row,
				files
			}

			return rowWithFile;
        },
		portfolios: async (_: any, args: any): Promise<IPortfolio[]> => {
			const rows: IPortfolio[] = await portfolioModel.getAll();
			const files: string[] = await imageModel.getAll();

			rows.forEach((row: any) => row.files = typeof files[row.idx] !== 'undefined' ? files[row.idx] : null);

			return rows;
		}
    },
    Mutation: {
        portfolio: async (_: any, args: any): Promise<IIdxResult> => {
            const { info } = args;
			const files = info.files;
			delete info.files;
            const result: IIdxResult = { success: true, message: null, idx: null};
			
			//파일 유효성 확인
			const isValidFiles = files.every((file: string) => /^[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(file));
			if (!isValidFiles) {
				result.success = false;
				result.message = "파일 이상해";
				return result;
			}
			
			/*
			const encFiles: string[] = files.map((file: string) => {
				const filePiece = file.split('.');
				const date = new Date();
				const epochTime: string = Number(date.getTime()).toString();
				const encFile = crypto.createHmac('md5', epochTime).update(file).digest('hex') + '.' + filePiece[1];
				return encFile;
			});
			*/

            const idx: number = await portfolioModel.setOne(info);
			const isSuccess: boolean = await imageModel.setPortfolioFiles(files, idx);

            if (idx && isSuccess) {
                result.idx = idx;
            } else {
                result.success = false;
				result.message = "저장 실패";
            }
            
            return result;
        },
		updatePortfolio: async(_: any, args: any): Promise<IResult> => {
			const { info } = args;
			const result: IResult = { success: true, message: null };
			
			const isPortfolioSuccess: boolean = await portfolioModel.updateOne(info);
			
			if (!isPortfolioSuccess) {
				result.success = false;
				result.message = "업데이트 실패";
			}
			
			return result;
		},
		deletePortfolio: async(_: any, args: any): Promise<IResult> => {
			const { idx } = args;
			const result: IResult = { success: true, message: null };
			
			const isPortfolioSuccess: boolean = await portfolioModel.deleteOne(idx);
			const isImageSuccess: boolean = await imageModel.deletePortfolioFiles(idx);
			
			if (!isPortfolioSuccess || !isImageSuccess) {
				result.success = false;
				result.message = "업데이트 실패";
			}
			
			return result;
		}
    }
}

export default portfolioResolver;