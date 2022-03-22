import log from './lib/log';
//배포 환경에 따른 설정 파일 로드
const config = ( () => {
    return (process.env.NODE_ENV === 'production')
        ? require('../config/production')
        : require('../config/development');
})();

declare global {
    namespace NodeJS {
        interface Global {
            config: any,
			log: any
        }
    }
}

global.config = { ...config };
global.log = log;

export {};