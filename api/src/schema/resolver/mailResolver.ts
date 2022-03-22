import mailer from '../../lib/mail';

interface IResult {
    success: boolean,
    message: string
}

interface IMailInput {
    name: string,
    email: string,
    subject: string,
    content: string
}

const mailResolver = {
    Mutation: {
        mail: async (_: any, args: any): Promise<IResult> => {
            const info: IMailInput = args.info;
            let result: any

			const nameRegExp: RegExp = /^[a-zA-Z가-힣]+$/;
			if (!nameRegExp.test(info.name)) {
				result = setResult(false, '부적절한 이름 입니다.');
				return result;
			}

			const emailRegExp: RegExp = /^[a-zA-Z0-9-_]{2,}@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
			if (!emailRegExp.test(info.email)) {
				result = setResult(false, '부적절한 이메일 주소 입니다.');
				return result;
			}

			const stringRegExp: RegExp = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣!?.]{2,}$/;
			if (!stringRegExp.test(info.subject)
			|| !stringRegExp.test(info.content)) {
				result = setResult(false, '제목이나 내용이 적절하지 않습니다.');
				return result;
			}

            const isComplete = await mailer.send(info);

            if (!isComplete) {
				result = setResult(false, '메일 전송 실패');
            }
			result = setResult(true, '');

            return result;
        }
    }
}

const setResult = (success: boolean, message: string): IResult => {
	const result: IResult = {
		success: success,
		message: message
	};

	return result;
}

export default mailResolver;