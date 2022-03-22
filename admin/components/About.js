import css from 'styled-jsx/css';

const About = ({company, handleCompany, submitCompany, companyRef, businesses, briefs, handleDown, carouselRef}) => {
    const comment = company.comment.join('\n');
	return (
		<>
			<section className="about-wrap">
				<div className="box bullet">
					<h2 className="text">대표 소개</h2>
				</div>
				<article className="rept">
					<form className="rept-form" onSubmit={submitCompany}>
						<div className="box face-wrap">
							<div
								ref={companyRef}
								className="face"
								style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_SERVER}/view/${process.env.NEXT_PUBLIC_PRESIDENT_IMAGE}), url(${process.env.NEXT_PUBLIC_ERROR_IMAGE})`}}
							/>
						</div>
						<div className="flex-wrap">
							<div className="box name-wrap">
								<input
									className="company-input"
									type="text"
									name="president"
									value={company.president}
									onChange={handleCompany}
								/>
							</div>
							<div className="box text-wrap">
							<textarea
								className="company-textarea"
								name="comment"
								value={comment}
								onChange={handleCompany}
							/>
							</div>
						</div>
						<div>
							<button className="box" type="submit">적용</button>
						</div>
					</form>
			   </article>
				<div className="box bullet">
					<h2 className="text">업종 소개</h2>
				</div>
			   <article className="busi">
					<div className="carousel" ref={carouselRef}
					>
						{businesses && businesses.map((business, index) => (
						<div className="box carousel-item" key={index}>
							<img
                                className="carousel-image"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/view/${business.image}`}
                                alt="item"
                                onError={(e) => {e.target.src = process.env.NEXT_PUBLIC_ERROR_IMAGE}}
                            />
							<h4 className="carousel-title gray">{business.name}</h4>
						</div>
						))}
					</div>
					<div
						className="carousel-arrow no-drag"
						onMouseDown={handleDown}
						onTouchStart={handleDown}
					>
						<span className="left">＜</span>
						<span className="right">＞</span>
					</div>
			   </article>
				<div className="box bullet">
					<h2 className="text">회사 연혁</h2>
				</div>
			   <article className="brief">
					<div className="box line-wrap">
						<div className="line"></div>
					</div>
					<ul className="brief-list">
					{briefs && briefs.map((brief, index) => (
						<ol className="brief-item" key={index}>
							<li className="brief-indent">-</li>
							<li className="box brief-year">
								<span className="brief-content">{brief.date.substr(0, 5)}</span>
							</li>
							<li className="box brief-date">
								<span className="brief-content">{brief.date.substring(5)}</span>
							</li>
							<li className="box brief-summary">
								<span className="brief-content">{brief.summary}</span>
							</li>
							<li className="box brief-line"><hr/></li>
						</ol>
					))}
					</ul>
				</article>
			</section>
			<style jsx>{style}</style>
		</>
    )
}

const style = css`
	.about-wrap { display: flex; flex-direction: column; width: 100%; margin-bottom: 100px; animation: main 0.3s forwards; margin: 90px 0 100px 0; }

	.bullet { margin-top: 105px; width: 30%; height: 55px; }
	.bullet .text { margin-left: 15px; margin-top: 5px; font: 45px "Black Han Sans" }
	.rept { display: flex; }
	.flex-wrap { display: flex; flex-direction: column; width: 70%; }
	.face-wrap { width: calc(30% - 60px); height: calc(30vw - 30px); padding: 15px; }
	.face { height: 100%; border-radius: 7px; background-size: 100% 100%; }
	.name-wrap { width: 200px; padding: 10px; }
	.name { font-weight: 700; font-size: 40px; }
	.text-wrap { width: calc(70vw - 60px); min-height: calc(30vw - 108px); }
	.text { font-size: 23px; font-weight: 400; }

	.busi { position: relative; overflow: hidden; }
	.carousel { display: flex; justify-content: flex-start; }
	.carousel-item { position: relative; display: inherit; height: calc((100vw - 180px) / 3); padding: 15px; }
	.carousel-image { border-radius: 7px; width: calc((100vw - 180px) / 3); }
	.carousel-title { position: absolute; top: 50%; left: 50%; transform: translate(-50%); width: 287px; font-family: 'Black Han Sans', serif; font-size: 44px; letter-spacing: 5px; text-align: center; text-shadow: -1px 0 black, 1px 0 black, 0 -1px black, 0 1px black; color: rgba(232, 232, 234); }
	.carousel-arrow { position: absolute; font-size: 45px; top: 0%; text-shadow: -1px 0 white, 1px 0 white, 0 -1px white, 0 1px white; width: 100%; height: 100%; cursor: grab; }
	.carousel-arrow .right { position: absolute; top: 35%; right: 0%; }
	.carousel-arrow .left { position: absolute; top: 35%; left: 0%; }

	.brief { display: flex; }
	.line-wrap { width: calc(5% - 40px); padding: 5px; }
	.line { background: rgba(0, 0, 0, 0.5); width: 100%; height: 100%; border-radius: 7px; }
	.brief-list { width: 100%; }
	.brief-item { position: relative; height: 130px; }
	.brief-item li { float: left; }
	.brief-indent { position: absolute; height: 55px; left: -30px; top: 15px; color: #fff; font-size: 30px;}
	.brief-year { display: flex; align-items: center; font-size: 35px; font-weight: 300; width: calc(25% - 30px); height: 55px; }
	.brief-date { display: flex; align-items: center; font-size: 25px; font-weight: 500; margin-top: 12px; width: calc(20% - 30px); height: 55px; }
	.brief-summary { display: flex; align-items: center; font-size: 23px; margin-top: 14px; margin-top: 15px; width: calc(55% - 30px); height: 55px; white-space: nowrap; overflow: hidden;}
	.brief-content { margin-left: 15px; }
	.brief-line { display: flex; align-items: center; height: 10px; width: calc(100% - 30px); }
	.brief-line hr { width: calc(100% - 30px); border-top: 1px dashed #000; margin: 0 15px; }

	@media all and (max-width: 1023px) {
		.carousel-item { height: calc((100vw - 120px) / 2) }
		.carousel-image	{ width: calc((100vw - 120px) / 2); }

		.line-wrap { width: 15px; }
		.brief-year { width: calc(15% - 30px); font-size: 20px; }
		.brief-date { width: calc(15% - 30px); font-size: 15px; }
		.brief-summary { width: calc(70% - 30px); font-size: 15px; }
	}

	@media all and (max-width: 768px) {
		.bullet { width: calc(100% - 30px); }
		
		.rept { display: block; }
		.face-wrap { width: calc(50vw - 30px); height: calc(50vw - 30px); margin-left: 50%; transform: translate(-50%); padding: 15px; }
		.flex-wrap { align-items: center; width: 100%; }
		.name-wrap { width: 28vw;  height: 5vw; padding: 2vw; }
		.name { font-size: 4.9vw; }
		.text-wrap { width: calc(100vw - 60px); min-height: 200px; }
		.text { font-size: 20px; }

		.carousel-item { height: calc(100vw - 60px); }
		.carousel-image	{ width: calc(100vw - 60px); }
			
		
		.line-wrap { margin: 5px 5px 35px 15px; } 
		.brief-indent { left: -20px; }
		.brief-year { width: 65px; font-size: 15px; margin: 5px;}
		.brief-date { width: 65px; font-size: 12px; margin: 5px; }
		.brief-summary { width: calc(100% - 170px); font-size: 12px; margin: 5px; }
		.brief-line { width: calc(100% - 20px); margin-left: 5px; }
	}
    
	.rept-form { display: inherit; flex-wrap: wrap; }
    .company-input { width: 100px; }
    .company-textarea { width: 100%; height: 200px; }
`

export default About;
