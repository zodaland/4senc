import jwt, { JwtPayload, VerifyErrors, Secret } from 'jsonwebtoken';

type TEncoder = {
	data: object,
	expire: string,
	subject: string
}

const key: Secret = global.config.key;

export const encode = (encoder: TEncoder): Promise<any> =>  {
    return new Promise((resolve, reject) => {
        jwt.sign(
            encoder.data,
            key,
            {
                expiresIn: encoder.expire,
                issuer: '4senc.com',
                subject: encoder.subject
            },
            (err: Error|null, token: string|undefined) => {
                if (err) {
					global.log('jwt', err, 'error');
                    reject("토큰 발급 실패");
                } else if (typeof token === 'undefined') {
					reject("토큰 발급 실패");
				}
                resolve(token);
            }
        );
    });
}

export const decode = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            key,
            (err: VerifyErrors|null, decoded: JwtPayload|undefined) => {
                if (err) {
					switch(err.name) {
						case 'TokenExpiredError':
							reject("토큰 유효기간 만료");
							break;
						case 'JsonWebTokenError':
						case 'SyntaxError':
							reject("올바르지 않은 토큰");
							break;
						default:
							global.log('jwt', err, 'error');
							reject("올바르지 않은 토큰");
							break;
					}
                } else if (typeof decoded === 'undefined') {
					reject("올바르지 않은 토큰");
				}
                resolve(decoded);
            }
        );
    });
}
