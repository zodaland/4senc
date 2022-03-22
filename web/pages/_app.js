import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Status from '../components/Status';
import ApolloProvider, { client } from '../lib/apollo';
import '../styles/global.css';

import { gql } from 'apollo-boost';
import { GET_4SINFO } from '../lib/queries';

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

	return (
		<ApolloProvider client={client}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{pageProps.title}</title>
			</Head>
			<Layout {...pageProps} scroll={scroll} urlPath={urlPath}>
				{status.processing && <Status message={status.message} />}
				<Component { ...pageProps} status={status} handleStatus={setStatus}/>
			</Layout>
		</ApolloProvider>
	)
}

App.getInitialProps = async (context) => {
	const { ctx, Component } = context;
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const _4sInfoResponse = await client.query({ query: GET_4SINFO });
	const _4sInfo = {
		footer: _4sInfoResponse.data.footer,
		title: _4sInfoResponse.data.title,
		menus: _4sInfoResponse.data.menu
	};
	
	return {
		pageProps: {
			...pageProps,
			..._4sInfo
		}
	}
};

export default App;