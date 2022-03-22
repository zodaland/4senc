import nodemailer from 'nodemailer';

interface IMailInput {
    name: string,
    email: string,
    subject: string,
    content: string
}

const mailer = {
	send: async (info: IMailInput): Promise<boolean> => {
		const smtpInfo = {
			host: global.config.mail.smtp.host,
			secure: false,
			port: global.config.mail.smtp.port,
			auth: {
				user: global.config.mail.smtp.auth.user,
				pass: global.config.mail.smtp.auth.pass
			},
			tls: {
				rejectUnauthorized: false
			}
		};
		const body = {
			from: global.config.mail.body.from,
			to: global.config.mail.body.to,
			cc: global.config.mail.body.cc,
			subject: '4senc.com에서 발송된 메일입니다.',
			text: `
제목 : ${info.subject}
이름 : ${info.name}
이메일 : ${info.email}
문의 내용 : ${info.content}
`
		};

		const transporter = nodemailer.createTransport(smtpInfo);

		const result = await transporter.sendMail(body);

		return (result.response || result.response.split(' ')[0] != '250') ? true : false;
	}
};

export default mailer;