import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import About from '../components/About';

import { client } from '../lib/apollo';
import { GET_ABOUT } from '../lib/queries';

import { startCarousel } from '../lib/carousel';

const AboutPage = (pageProps) => {
	const { company, businesses, briefs } = pageProps;

	const carouselRef = useRef();
    const carouselAttribute = {
        ref: carouselRef,
        quantity: businesses.length,
        pc: {
            volume: 3
        },
        tablet: {
            volume: 2
        }
    }

    const handleDown = startCarousel(carouselAttribute);
	
	return (
		<About
			company={company}
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