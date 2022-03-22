import { useState, useEffect, useCallback } from 'react';
import Contact from '../components/Contact';

import { useMutation } from '@apollo/react-hooks';
import { SEND_MAIL } from '../lib/queries';
import { gql } from 'apollo-boost';

const ContactPage = ({status, handleStatus}) => {
	//graphql mutation 실행 초기화
    const [ sendMail, { loading }] = useMutation(SEND_MAIL, {
		//완료시 status변경, 일정시간 이후 초기화
		onCompleted: ({ mail }) => {
			if (mail.success) {
				const message = `
전송이 완료 되었습니다.
빠른 시일내에 답변드리겠습니다.
감사합니다.
`;
				handleStatus({
					processing: true,
					message: message
				});
			} else {
				handleStatus({
					processing: true,
					message: mail.message
				});
			}

			setTimeout(() => {
				handleStatus({
					...status,
					processing: false
				});
			}, 2000);
		},
		//에러 발생시 status 변경, 일정시간 이후 초기화
		onError: () => {
			const message = `
전송 중 에러가 발생했습니다.
다시 시도해주세요.
`;
			handleStatus({
				processing: true,
				message: message
			});
			setTimeout(() => {
				handleStatus({
					...status,
					processing: false
				});
			}, 2000);
		}
	});

	//메일 전송에 필요한 상태값, input값과 동기화 된다.
    const [ info, setInfo ] = useState({
        name: '',
        email: '',
        subject: '',
        content: ''
    });
	
	//email 1, 2로 나누어 입력받는 input의 상태값
    const [ emails, setEmails ] = useState({
        email1: '',
        email2: ''
    })
	
	//select 태그 내 이메일 기본값
    const emailOptions = ['naver.com', 'gmail.com', 'hanmail.net', 'daum.net', 'nate.com'];

	//select 값 변경시 email 상태값과 동기화
    const handleSelect = e => {
        const selectEmail = e.target.value;
        setEmails({ ...emails, email2: selectEmail});
    };

	//input 값 변경시 info, emails상태값과 동기화
    const handleChange = e => {
        const { name, value } = e.target;
        
        if (e.target.name.indexOf('email') !== -1) {
            setEmails({ ...emails, [name]: value });
        } else {
            setInfo({ ...info, [name]: value });
        }
    };
	
	//채워진 값 확인 후 전송한다.
    const handleSubmit = e => {
        const isEmtpy = Object.values(info).includes('');
        
        if (isEmtpy) {
            alert('값을 모두 채워주세요.');
            return;
        }

        sendMail({ variables: { info } });
        return;
    };

	//email1, 2변경시 하나로 합친 후 info email로 저장한다.
    useEffect(() => {
        const email = emails.email1 + '@' + emails.email2;
        setInfo(info => ({ ...info, email: email }));
    }, [emails]);
	
	//로딩시 부모 컴포넌트 status 상태값 변경
	const setLoading = useCallback(() => {
		if (loading) {
			const message = `전송 중 입니다.
잠시만 기다려주세요.
`;
			handleStatus({
				processing: true, 
				message: message
			});
		}
	}, [handleStatus, loading]);
	useEffect(() => {
		setLoading();
	}, [setLoading]);
	
	return (
		<Contact
			info={info}
			emails={emails}
			emailOptions={emailOptions}
			handleChange={handleChange}
			handleSelect={handleSelect}
			handleSubmit={handleSubmit}
		/>
	)
}

export default ContactPage;