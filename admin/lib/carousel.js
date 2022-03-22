import { useEffect } from 'react';

/*
 * attribute :
 *     pc, tablet, mobile(화면 사이즈별로 나눈 플랫폼 pc: 1024 ~, tablet: 768 ~ 1023, mobile: ~ 767
 *         width(carousel이 적용될 회면 너비 비율 기본값: 1), volume(화면에 보일 carousel의 갯수 기본값: 1)
 *     length : carousel item 총 갯수
 *     ref : 클릭해서 움직이게 만들 dom 레퍼런스
 *
 * return : ref에 적용할 이벤트 함수
 */
export const startCarousel = (attribute) => {
    
    const ref = attribute.ref;
    
	const beforeX = 0;
	const movementX = 0;
	const boundary = 0;
	const onMove = false;
	
	const handleDown = (e) => {
		const width = window.innerWidth;
        const platform = (width > 767) ? ((width > 1023) ? 'pc' : 'tablet') : 'mobile';
        const carouselWidth = (attribute[platform]?.width) ? width * attribute[platform].width : width;
        const carouselVolume = attribute[platform]?.volume ?? 1;
        
        boundary = (attribute.quantity >= carouselVolume) ? -(carouselWidth * attribute.quantity / carouselVolume) + carouselWidth : 0;
		
		beforeX = e.screenX ?? e.touches[0].screenX;
		onMove = true;

	}
	
	const handleUp = (e) => {
		handleAfterMove();
		movementX = 0;
		onMove = false;
	}
	
	const handleMove = (e) => {
		if (onMove) {
			const afterX = e.screenX ?? e.touches[0].screenX;
			const currentX = Number(ref.current.style.transform.replace(/[^-0-9.]/g, ''));
			movementX = afterX - beforeX;
			const nextX = ((currentX + movementX) > 1 || (currentX + movementX) < boundary)
			? currentX + (movementX / 5)
			: currentX + movementX;
			ref.current.style.transform = "translateX(" + nextX + "px)"
			beforeX = afterX;
		}
	}
	
	const handleAfterMove = () => {
		const currentX = Number(ref.current.style.transform.replace(/[^-0-9.]/g, ''));
		const nextX = currentX + (movementX * 5);
		const destX = (nextX <= 0) ? ((nextX >= boundary) ? nextX : boundary) : 0;
		ref.current.style.transition = 'all 0.2s ease-out';
		ref.current.style.transform = "translateX(" + destX + "px)"
		setTimeout(() => {if (ref.current !== null) ref.current.style.transition = '0s';}, 100);
	}
	
	useEffect(() => {
		window.addEventListener('mousemove', handleMove);
		window.addEventListener('touchmove', handleMove);
		window.addEventListener('mouseup', handleUp);
		window.addEventListener('touchend', handleUp);

		return () => {
			window.removeEventListener('mousemove', handleMove);
			window.removeEventListener('touchmove', handleMove);
			window.removeEventListener('mouseup', handleUp);
			window.removeEventListener('touchend', handleUp);
		};
	});
    
    return handleDown;
}
