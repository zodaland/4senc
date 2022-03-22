import { encode, decode } from '../../lib/jwt';
import { readPassword, writePassword } from '../../models/yml';

interface IResult {
    success: boolean,
    message: string|null
}

interface IAuthResult extends IResult {
    token: string|null
}

const authResolver = {
    Query: {
        getAuth: async (_: any, args: any, context: any): Promise<IAuthResult> => {
            const result: IAuthResult = {
                success:    true,
                message:    null,
                token:       null
            }
            const { password } = args;
            const currentPassword: string|null = await readPassword();
            if (!currentPassword) {
                result.success = false;
                result.message = "설정 미완료";
                return result;
            }
            if (password !== currentPassword) {
                result.success = false;
                result.message = "패스워드 불일치";
                return result;
            }
            try {
                const data: any = {
                    data: { },
                    expire: '1h',
                    subject: '4senc'
                }
                const payLoad: string = await encode(data);
                result.token = payLoad;
            } catch (e: any) {
                result.success = false;
                result.message = e;
            } finally {
                return result;
            }
        },
        verifyAuth: async (_: any, args: any, context: any): Promise<IResult> => {
            const result: IResult = {
                success:    true,
                message:    null
            }
            const { token } = context;
            try {
                //decoded type is JwtPayload or undefined or VerifyErrors
                const decoded: any = await decode(token);
            } catch (e: any) {
                result.message = e;
                result.success = false;
            } finally {
                return result;
            }
        }
    },

    Mutation: {
        password: async (_: any, args: any, context: any): Promise<IResult> => {
            const result: IResult = {
                success:    true,
                message:    null
            }
            const { info } = args;
            const { token } = context;

            const currentPassword: string|null = await readPassword();
            if (currentPassword && info.currentPassword !== currentPassword) {
                result.success = false;
                result.message = "패스워드 불일치";
                return result;
            }
            await writePassword(info.password);
            
            return result;
        }
    }
}

export default authResolver;
