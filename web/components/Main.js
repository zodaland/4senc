import Menu from './Menu';
import css from 'styled-jsx/css';

const Main = ({phrases, phraseAniNum, menus, menuAniNum}) => {
	return (
		<>
			<div className="main-wrap">
				<div className="intro-wrap">
				{ phrases.map((phrase, index) => (
				<div className={"box intro-box" + (phraseAniNum >= index ? " on" : "")} key={index}>
					<h2 
						key={index}
						className="intro"
					>{phrase}</h2>
					</div>
				))}
				</div>
				<ul className="menu">
				{menus.map((menu, index) => (
					<Menu
						key={index}
						menu={menu}
						isActive={(menuAniNum > index) ? true : false}
					/>
				))}
				</ul>
			</div>
			<style jsx>{style}</style>
		</>
	)
}

const style = css`
    .main-wrap { min-height: 100vh; }
	.intro-wrap { display: flex; flex-wrap: wrap; margin-top: 185px; justify-content: center; }
	.intro-box { width: 195px;  }
	.intro { font-family: 'Roboto Slab', sans-serif; letter-spacing: 4px; font-size:42px; color: rgba(100, 100, 100); text-align: center; }
	.inactive { opacity: 0; position: absolute; }
	.menu { display: flex; justify-content: center; margin-top: 30px; }
	.on { animation: intro 1.5s forwards; opacity: 1; }

	@keyframes intro {
		0% { transform: translateX(-200px); opacity: 0; }
		30% { transform: translateX(0px); opacity: 1; }
		50% { text-shadow: 0px 0px 0px #aaa; transform: translateX(0px); }
		100% { text-shadow: 5px 5px 3px #aaa; transform: translateX(-5px) translateY(-5px); }
	}
    @media all and (max-width: 1023px) {
        .intro-box { width: 48%; margin: 1%; }
		.menu { margin-top: 2%; }
    }
`

export default Main;
