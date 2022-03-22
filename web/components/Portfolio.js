import PortfolioItems from './PortfolioItems';
import css from 'styled-jsx/css';

const Portfolio = ({data, handleDetail}) => {
    return (
		<>
			<section className="block-wrap">
				<div className="portfolio-wrap">
				{typeof data !== 'undefined' && data.portfolios.map((portfolio, index) => (
					<PortfolioItems
						key={index}
						portfolio={portfolio}
						handleDetail={handleDetail}
						idx={index}
					/>
				))}
				</div>
			</section>
			<style jsx>{style}</style>
		</>
    )
}

const style = css`
	.block-wrap { width: 100%; min-height: 100vh; margin-top: 180px; }
	.portfolio-wrap { display: flex; flex-wrap: wrap; animation: main 0.3s forwards; }

`

export default Portfolio;