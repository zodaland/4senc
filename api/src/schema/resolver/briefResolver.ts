import briefModel from '../../models/brief';

interface IBrief {
    idx: number | null,
	summary: string | null,
	date: string | null
}
interface IResult {
    success: boolean,
    message: string | null
}

interface IIdxResult extends IResult {
    idx: number | null
}

const briefResolver = {
    Query: {
		briefs: async (_: any, args: any): Promise<IBrief[]> => {
			const rows: any = await briefModel.getAll();

			return rows;
		}
    },
    Mutation: {
        brief: async (_: any, args: any): Promise<IResult> => {
            const { info } = args;
            const result: IIdxResult = { success: true, message: null, idx: null};

            const idx: number = await briefModel.setOne(info);

            if (idx) {
				result.idx = idx;
            } else {
                result.success = false;
				result.message = "저장 실패";
            }
            
            return result;
        },
		updateBrief: async (_: any, args: any): Promise<IResult> => {
			const { info } = args;
			const result: IResult = { success: true, message: null};

			const isSuccess: boolean = await briefModel.updateOne(info);

			if (!isSuccess) {
				result.success = false;
				result.message = "업데이트 실패";
			}

			return result;
		},
		deleteBrief: async (_: any, args: any): Promise<IResult> => {
			const { idx } = args;
			const result: IResult = { success: true, message: null};

			const isSuccess: boolean = await briefModel.deleteOne(idx);

			if (!isSuccess) {
				result.success = false;
				result.message = "삭제 실패";
			}

			return result;
		}
    }
}

export default briefResolver;