import css from 'styled-jsx/css';

const style = css`
	footer { position: fixed; bottom: 0px; border-top:1px solid #eee; display:flex; justify-content:center; width:100%; height:50px; padding-top:14px; font-weight: 100; font-size: 13px; }
`

const Footer = ({ footer }) => {
	return (
		<>
			<footer>
				<div>
					<ul>
						<li>
							{footer}
						</li>
						<li>
							Copyright (C) 4senc, All rights reserved.
						</li>
					</ul>
				</div>
				<div>
					~협회
				</div>
			</footer>
			<style jsx>{style}</style>
			
		</>
	)
};

export default Footer;