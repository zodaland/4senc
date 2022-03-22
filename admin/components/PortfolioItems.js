import css from 'styled-jsx/css';

const PortfolioItems = ({ portfolio, handleDetail, idx }) => (
	<>
		<article className="portfolio" onClick={() => handleDetail(idx)}>
			<div className="image-box">
				<img
                    className="thumbnail"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/view/${portfolio.files[0]}`}
                    alt="thumbnail"
                    onError={(e) => {e.target.src = process.env.NEXT_PUBLIC_ERROR_IMAGE}}
                />
			</div>
			<div className="title-box"> {/*content*/}
				<h4>{portfolio.title}</h4>{/*title*/}
			</div>
			<div className="description-box">
				<p>{portfolio.content}</p> {/*description*/}
			</div>
			<div className="date-box">
				<span>{portfolio.date}</span> {/*date*/}
			</div>
		</article>
		<style jsx>{style}</style>
	</>
);

const style = css`
	.portfolio { vertical-align: top; width: calc(33.3% - 30px); max-height: 600px; border-radius: 7px; margin: 15px; margin-bottom: 80px; cursor: pointer; }
	.image-box { width: calc(100% - 30px); height: 300px; padding: 15px; box-shadow: 5px 5px 7px #bbb; border-radius: 7px; }
	.thumbnail { width: 100%; height: 300px; border-radius: 7px; }
	.title-box { width: 100%; box-shadow: 5px 5px 7px #bbb; border-radius: 7px; margin-top: 15px; background: rgba(232, 232, 234, 0.9); }
	h4 { font-size: 32px; word-break: break-word; overflow: hidden; max-height: 2.4em; line-height: 1.2em; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; padding: 0 10px; }
	.description-box { width: 100%; box-shadow: 5px 5px 7px #bbb; border-radius: 7px; margin-top: 15px; background: rgba(232, 232, 234, 0.9); }
	p { font-weight: 500; font-size: 18px; overflow: hidden; text-overflow: ellipsis; max-height: 3.6em; line-height: 1.2em; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; padding: 0 10px; }
	.date-box { display: inline-block; box-shadow: 5px 5px 7px #bbb; border-radius: 7px; margin-top: 15px; padding: 0 5px; background: rgba(232, 232, 234, 0.9); }
	span { font-weight: 300; width: 70px; font-size: 13px; }

	@media all and (max-width: 1023px) {
		.portfolio { width: calc(50% - 30px); margin-bottom: 150px; }
	}
	@media all and (max-width: 768px) {
		.portfolio { width: calc(100% - 30px); }
	}
`

export default PortfolioItems;
