import css from 'styled-jsx/css';

const Auth = ({submitPassword, handlePassword, password}) => {
	return (
		<>
			<section className="block-wrap">
				<div className="auth-wrap">
					<div className="box input-wrap">
						<p>PASSWORD</p>
						<input
							type="text"
							className="input"
							value={password}
							onChange={handlePassword}
							onKeyPress={submitPassword}
						/>
					</div>
				</div>
			</section>
			<style jsx>{style}</style>
		</>
	);
}

const style = css`
	.block-wrap { width: 100%; min-height: 100vh; }
	.auth-wrap { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); }
	.input-wrap { width: 300px; height: 60px; padding: 20px; font-family: 'Black Han Sans', serif; text-align: center; font-size: 20px; }
`

export default Auth;