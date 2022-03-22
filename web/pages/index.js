import { useState, useEffect, useCallback } from 'react';
import Main from '../components/Main';
import { GET_INTRO } from '../lib/queries';
import { client } from '../lib/apollo';

const IndexPage = (pageProps) => {
	const { phrases, phraseDelay, menuDelay, menus } = pageProps;
	const [ phraseAniNum, setPhraseAniNum ] = useState(0);
	const [ menuAniNum, setMenuAniNum ] = useState(0);
	
	useEffect(() => {
		const phraseNum = phrases.length;
		if (phraseAniNum <= phraseNum) {
			setTimeout(() => {
				setPhraseAniNum(phraseAniNum + 1);
			}, phraseDelay);
		}
	}, [phraseAniNum]);
	const setMenuAni = useCallback(() => {
		const menuNum = menus.length;
		const menuFirstDelay = (phraseDelay * 4);
		
		if (menuAniNum === 0) {
			setTimeout(() => {
				setMenuAniNum(menuAniNum + 1);
			}, menuFirstDelay);
		} else if (menuAniNum < menuNum) {
			setTimeout(() => {
				setMenuAniNum(menuAniNum + 1);
			}, menuDelay);
		}
	}, [menuAniNum, menus]);
	useEffect(() => {
		setMenuAni();
	}, [setMenuAni]);
	useEffect(() => {
		return () => {
			setMenuAniNum(0);
			setPhraseAniNum(0);
		}
	}, []);
	
	return (
		<>
			<Main 
				phrases={phrases}
				phraseAniNum={phraseAniNum}
				menus={menus}
				menuAniNum={menuAniNum}
			/>
		</>
	)
}

IndexPage.getInitialProps = async () => {
	const phrasesResponse = await client.query({ query: GET_INTRO });
	const phrases = phrasesResponse.data.intro;
	const phraseDelay = 100;
	const menuDelay = 100;
	return {
		phrases,
		phraseDelay,
		menuDelay
	}
}

export default IndexPage;