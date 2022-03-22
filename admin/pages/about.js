import { useState, useRef } from 'react';
import About from '../components/About';

import { client } from '../lib/apollo';
import { GET_ABOUT, SET_COMPANY } from '../lib/queries';

import { startCarousel } from '../lib/carousel';
import { startUpload } from '../lib/upload';
import { uploadFile } from '../lib/axios';

const AboutPage = (pageProps) => {
	const { company, businesses, briefs } = pageProps;

	const carouselRef = useRef();
    const carouselAttribute = {
        ref: carouselRef,
        quantity: (businesses) ? businesses.length : 0,
        pc: {
            volume: 3
        },
        tablet: {
            volume: 2
        }
    }

    const handleDown = startCarousel(carouselAttribute);
    
    //관리자
    const [ companyInfo, setCompanyInfo ] = useState(company);
	const [ companyImage, setCompanyImage ] = useState(null);
	const companyRef = useRef();
	startUpload(companyRef, setCompanyImage);
    const handleCompany = (e) => {
        const value = e.target.name === 'comment' ? e.target.value.split('\n') : e.target.value;
        setCompanyInfo({
            ...companyInfo,
            [e.target.name]: value
        });
    }
    const submitCompany = async (e) => {
		e.preventDefault();

        if (companyImage) {
            if (!/\.jpg$/.test(companyImage.name)) {
                alert('jpg만 첨부 가능합니다.');
                return;
            }
            try {
                const uploadResponse = await uploadFile(companyImage, process.env.NEXT_PUBLIC_PRESIDENT_IMAGE);
                
                const httpStatus = uploadResponse.status;
                if (httpStatus !== 200) {
                    throw Error();
                }
            } catch (e) {
                alert('사진 첨부 실패');
                return;
            }
        }
        try {
            const newCompany = companyInfo;
            delete newCompany.__typename;
            const companyResponse = await client.mutate({
                mutation: SET_COMPANY,
                variables: {
                    info: newCompany
                },
                refetchQueries: {
                    query: GET_ABOUT
                }
            });
            if (!companyResponse.data.company) {
                alert('대표 소개 반영 실패');
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
	
	return (
		<About
			company={companyInfo}
            handleCompany={handleCompany}
            submitCompany={submitCompany}
			companyRef={companyRef}
			businesses={businesses}
			handleDown={handleDown}
			carouselRef={carouselRef}
			briefs={briefs}
		/>
	)
}

AboutPage.getInitialProps = async () => {
	const aboutResponse = await client.query({ query: GET_ABOUT });
    const company = aboutResponse.data.company;
	const briefs = aboutResponse.data.briefs;
	const businesses = aboutResponse.data.businesses;
	
	return {
		company,
		briefs,
		businesses
	}
}

export default AboutPage;