import { useCallback, useEffect, useState, useRef } from 'react';
import Portfolio from '../components/Portfolio';
import PortfolioDetail from '../components/PortfolioDetail';

import { GET_PORTFOLIOS } from '../lib/queries';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { startCarousel } from '../lib/carousel';

const PortfolioPage = (pageProps) => {
	const { status, handleStatus } = pageProps;
	const [ detail, setDetail ] = useState(null);
    const { loading, error, data } = useQuery(GET_PORTFOLIOS);
	
	const handleDetail = (no, e) => {
		const isWrap = e.target.className.includes('wrap');
		const isExit = e.target.className.includes('exit');
		if (isWrap || isExit) setDetail(no);
	}
	
	//로딩시 부모 컴포넌트 status 상태값 변경
	const setLoading = useCallback(() => {
		if (loading && !status.processing) {
			if (!status.processing) {
				const message = `잠시만 기다려주세요.`;
				handleStatus({
					processing: true, 
					message: message
				});
			}
		} else if (error) {
			if (!status.processing) {
				const message = `에러가 발생하였습니다.`;
				handleStatus({
					processing: true,
					message: message
				});
			}
		} else {
			handleStatus({
				...status,
				processing: false
			});
		}
	}, [loading, error]);
	useEffect(() => {
		setLoading();
	}, [setLoading]);
    
	return (
		<>
			{detail !== null &&
			<PortfolioDetailPage
				handleDetail={handleDetail}
				portfolio={data.portfolios[detail]}
			/>
			}
			{data &&
			<Portfolio data={data} handleDetail={setDetail} />
			}
		</>
	)
}

const PortfolioDetailPage = (pageProps) => {
	const { handleDetail, portfolio } = pageProps;
    
    const carouselRef = useRef();
    const carouselAttribute = {
        ref: carouselRef,
        quantity: portfolio.files.length,
        pc: {
            width: 0.6
        },
        tablet: {
            width: 0.6
        }
    }
    
    const handleDown = startCarousel(carouselAttribute); 
    
	return (
		<PortfolioDetail
            handleDetail={handleDetail}
            portfolio={portfolio}
            carouselRef={carouselRef}
            handleDown={handleDown}
        />
	)
}

export default PortfolioPage;