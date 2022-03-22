import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Main from '../components/Main';
import { GET_INTRO, SET_INTRO } from '../lib/queries';
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
    
    //관리자
    const router = useRouter();
    //관리자 menu 정보
    const { info, handleInfo, submitInfo } = pageProps;
    //관리자 intro 정보
    const [ intro, setIntro ] = useState(phrases);
    
    const handleIntro = (index, e) => {
        const newIntro = [...intro];
        newIntro[index] = e.target.value;
        setIntro(newIntro);
    };
    
    const submitIntro = async (e) => {
        if (e.key !== 'Enter' || !confirm('전체 인트로 정보가 수정됩니다.')) return;
        try {
            const introResponse = await client.mutate({mutation: SET_INTRO, variables: {info: intro}});
            console.log(introResponse);
            if (!introResponse.data.intro) {
                alert('인트로 반영 실패');
                return;
            }
            alert('성공');
            return;
        } catch (e) {
            if (e.networkError) {
                alert(e.networkError.result.errors[0].message);
                router.reload(window.location.pathname);
            } else {
                alert('실패');
                return;
            }
        }
    }
	
	return (
		<>
			<Main 
				phraseAniNum={phraseAniNum}
				menuAniNum={menuAniNum}
                
                info={info}
                handleInfo={handleInfo}
                submitInfo={submitInfo}
                
                intro={intro}
                handleIntro={handleIntro}
                submitIntro={submitIntro}
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