import css from 'styled-jsx/css';

const Status = ({ message }) => {
	return (
		<>
			<div className="active">
				<h1 className="status">{message}</h1>
			</div>
			<style jsx>{style}</style>
		</>
	);
};

const style = css`
	.active { position: fixed; padding-top: 30%; z-index: 102; width: 100vw; height: 100vh; background-color: #000; opacity: 0.2; }
	.status { top:50%; text-align: center; color: #fff; white-space: pre; }
`

export default Status