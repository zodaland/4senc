import css from 'styled-jsx/css';

const PortfolioDetail = ({handleDetail, portfolio, carouselRef, handleDown}) => {
	return (
		<>
		<div className="detail-wrap" onMouseDown={(e) => handleDetail(null, e)}>
			<div className="title-wrap">
				<div className="box title">{portfolio.title}</div>
				<div className="right-wrap">
				<div className="box date">{portfolio.date}</div>
				<div className="box exit" onMouseDown={(e) => handleDetail(null, e)}>X</div>
				</div>
			</div>
			<div className="carousel-wrap">
				<div className="carousel" ref={carouselRef}>
				{portfolio.files.map((file, index) => (
					<div className="box carousel-item" key={index}>
						<div
                            style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_SERVER}${file}), url(${process.env.NEXT_PUBLIC_ERROR_IMAGE}`}}
                            className="image"
                        />
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
			</div>
			<div className="box content">{portfolio.content}</div>
		</div>
		<style jsx>{style}</style>
		</>
	)
};

const style = css`
	.box { box-shadow: 5px 5px 7px #888; background: #fff; margin-bottom: 0px; }
	.detail-wrap { position: fixed; display: flex; flex-direction: column; align-items: center; z-index: 100; width: 100%; height: 100%; background-color: rgba(121, 121, 121, .3);}
	.title-wrap { display: flex; justify-content: space-between; width: 100%; font-size: 30px; }
	.right-wrap { display: inherit; height: 59px; }
	.title { padding: 0 .6%; word-break: break-all; }
	.date { width: 175px; padding: 0 .6%; text-align: center; }
	.exit { width: 55px; text-align: center; background: #bbb; color: #fff; cursor: pointer; }
	.carousel-wrap { position: relative; width: 60vw; height: calc(75% - 168px); overflow: hidden; }
	.carousel { display: flex; margin-top: 15px; height: calc(100% - 15px); }
	.carousel-item { padding: 15px; margin: 0 15px; }
	.image { border-radius: 7px; width: calc(60vw - 60px); height: 100%; background-size: 100% 100%; }
	.carousel-arrow { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
	.left { float: left; height: 100%; padding-top: 25%; }
	.right { float: right; height: 100%; padding-top: 25%; }
	.content { max-width: 1000px; width: calc(100% - 60px); height: 25%; padding: 10px 20px 10px 10px; overflow-y: scroll; word-break: break-all; }
	
	@media all and (max-width: 768px) {
		.title-wrap { flex-direction: column-reverse; align-items: flex-end; }
		.title { width: calc(100% - 30px); }
		.carousel-wrap { width: 100%; height: calc(70vh - 237px); }
		.image { width: calc(100vw - 60px); }
		.content { height: 30%; }
	}
`;

export default PortfolioDetail;
