import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Status from '../components/Status';
import ApolloProvider, { client } from '../lib/apollo';
import '../styles/global.css';

import { gql } from 'apollo-boost';
import { GET_4SINFO, VERIFY_AUTH, GET_AUTH, SET_INFO, SET_MENU } from '../lib/queries';

const App = ({Component, pageProps}) => {
	const [ status, setStatus ] = useState({
		processing: false,
		message: ''
	});
	
	const router = useRouter();
	const urlPath = router.pathname.substr(1);

	const [ scroll, setScroll ] = useState(false);

	const handleScroll = () => {
		if (window.scrollY !== 0) {
			setScroll(true);
		} else {
			setScroll(false);
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);

	//관리자 로직
	const [ password, setPassword ] = useState("");

	const handlePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const submitPassword = async (e) => {
		if (e.key !== 'Enter') return
        const authResponse = await client.query({
            query: GET_AUTH,
            variables: { password: password
        }});

        if (!authResponse.data.getAuth.success) {
            return;
        }
        const token = authResponse.data.getAuth.token;
        const expire = new Date(Date.now() + (1000 * 60 * 60));
        document.cookie = `token=${token}; domain=.4senc.com; path=/; expire=${expire}; sameSite=none; secure=true;`;

        router.reload(window.location.pathname);
        return;
	};
    //타이틀, 푸터
	const [ info, setInfo ] = useState({
		footer: pageProps.footer,
		title: pageProps.title
	});
	const handleInfo = (e) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		});
	};
    const submitInfo = async (e) => {
        if (e.key !== 'Enter' || !confirm('상단 타이틀과 하단 주소정보가 함께 변합니다.')) return;
        try {
            const infoResponse = await client.mutate({
                mutation: SET_INFO,
                variables: {
                    title: info.title,
                    footer: info.footer
                }
                
            });
            if (!infoResponse.data.title) {
                alert('타이틀 정보 반영 실패');
                return;
            }
            if (!infoResponse.data.footer) {
                alert('하단 정보 반영 실패');
                return;
            }
            alert('성공');
            return;
        } catch (e) {
            if (e.networkError) {
                alert(e.networkError.result.errors[0].message);
            } else {
                alert('실패');
                return;
            }
        }
    }

    //메뉴 정보
    const [ menuInfo, setMenuInfo ] = useState(pageProps.menus);
    const handleMenu = (index, e) => {
        const newMenuInfo = [...menuInfo];
        const name = e.target.name;
        const value = e.target.value;
        
        if (name === 'comments') value = value.split('\n');
        newMenuInfo[index][name] = value;
        setMenuInfo(newMenuInfo);
    }
    const submitMenu = async (e) => {
        if (e.key !== 'Enter' || !confirm('모든 메뉴 설정이 함께 저장 됩니다.')) return;
        try {
            const newMenu = menuInfo.reduce((prev, cur) => {
                delete cur.__typename;
                prev.push(cur);
                return prev;
            }, []);
            const infoResponse = await client.mutate({
                mutation: SET_MENU,
                variables: {
                    info: newMenu
                }
            });
            if (!infoResponse.data.menu) {
                alert('메뉴 반영 실패');
                return;
            }
            alert('성공');
            return
        } catch (e) {
            if (e.networkError) {
                alert(e.networkError.result.errors[0].message);
            } else {
                alert('실패');
                return;
            }
        }
    }
	return (
		<ApolloProvider client={client}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{pageProps.title}</title>
			</Head>
			<Layout {...pageProps}
				scroll={scroll}
				urlPath={urlPath}

				submitPassword={submitPassword}
				handlePassword={handlePassword}
				password={password}
				info={info}
				handleInfo={handleInfo}
                submitInfo={submitInfo}
			>
				{status.processing && <Status message={status.message} />}
				<Component { ...pageProps}
                    status={status}
                    handleStatus={setStatus}
                    info={menuInfo}
                    handleInfo={handleMenu}
                    submitInfo={submitMenu}
                />
			</Layout>
		</ApolloProvider>
	);
}

App.getInitialProps = async (context) => {
	const { ctx, Component } = context;
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

    const cookie = getCookie(ctx);
    const tokenResponse = await client.query({ query: VERIFY_AUTH, context: { headers: { cookie } }, fetchPolicy:'no-cache' });
	
	const authentication = tokenResponse.data.verifyAuth.success;

	const _4sInfoResponse = await client.query({ query: GET_4SINFO });
	const _4sInfo = {
		footer: _4sInfoResponse.data.footer,
		title: _4sInfoResponse.data.title,
		menus: _4sInfoResponse.data.menu
	};
	
	return {
		pageProps: {
			...pageProps,
			..._4sInfo,
			authentication
		}
	}
};

const getCookie = (ctx) => {
    if (typeof ctx.req !== 'undefined') {
        return ctx.req.headers.cookie ?? null;
    }
}

export default App;