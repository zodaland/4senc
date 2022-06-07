import path from 'path';

const defaultPath = path.join(__dirname, '/../');

module.exports = { 
    path: {
        type: path.join(defaultPath, '/src/schema/type'),
        resolver: path.join(defaultPath, '/src/schema/resolver'),
        data: path.join(defaultPath, '/data')
    },
    mysql: {
        host: 'db',
        user: '4senc',
        password: '4senc',
        port: 3306,
        database: '4senc'
    },
    mail: {
        smtp: {
            host: 'zodaland.com',
            port: '25',
            auth: {
                user: 'help@zodaland.com',
                pass: 'help'
            }
        },
        body: {
            from: `"4senc.com" <admin@zodaland.com>`,
            to: 'ekwhwhek@gmail.com',
            cc: 'admin@zodaland.com',
        }
    },
    key: 'zodaland',
	corsOrigin: '*'
};
