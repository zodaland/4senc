import businessModel from '../../models/business';

interface IBusiness {
    idx: number | null,
	name: string | null,
	image: string | null
}
interface IResult {
    success: boolean,
    message: string | null
}

interface IIdxResult extends IResult {
    idx: number | null
}

const businessResolver = {
    Query: {
		businesses: async (_: any, args: any): Promise<IBusiness[]> => {
			const rows: any = await businessModel.getAll();

			return rows;
		}
    },
    Mutation: {
        business: async (_: any, args: any): Promise<IResult> => {
            const { info } = args;
            const result: IIdxResult = { success: true, message: null, idx: null};

            const idx: number = await businessModel.setOne(info);

            if (idx) {
				result.idx = idx;
            } else {
                result.success = false;
				result.message = "저장 실패";
            }
            
            return result;
        },
		updateBusiness: async (_: any, args: any): Promise<IResult> => {
			const { info } = args;
			const result: IResult = { success: true, message: null};

			const isSuccess: boolean = await businessModel.updateOne(info);

			if (!isSuccess) {
				result.success = false;
				result.message = "업데이트 실패";
			}

			return result;
		},
		deleteBusiness: async (_: any, args: any): Promise<IResult> => {
			const { idx } = args;
			const result: IResult = { success: true, message: null};

			const isSuccess: boolean = await businessModel.deleteOne(idx);

			if (!isSuccess) {
				result.success = false;
				result.message = "삭제 실패";
			}

			return result;
		}
    }
}

export default businessResolver;