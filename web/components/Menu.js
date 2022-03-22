import css from 'styled-jsx/css';
import Link from 'next/link';

const Menu = ({ menu, isActive }) => {
	return (
		<>
			<Link href={'/' + menu.path}>
			<li className={"item " + ((isActive === true) ? "on" : "")}>
				<img className="icon" src={process.env.NEXT_PUBLIC_IMAGE_SERVER + menu.path + '.png'} alt="icon" />
				<div className="name">{menu.name}</div>
				<hr className="line" />
				<div className="description">
				{menu.comments.map((comment, index) => (
					<p key={index}>{comment}</p>
				))}
				</div>
			</li>
			</Link>
			<style jsx>{style}</style>
		</>
	)
};

const style = css`
	.item { float: left; text-align: center; width: 270px; border-radius: 7px; margin: 0px 15px; overflow-y: hidden; box-shadow: 5px 5px 7px #bbb; opacity: 0; height: 0; padding: 0; background: rgba(230, 231, 235, 0.7); color: rgba(100, 100, 100); cursor: pointer; transition: 0.3s; }
	.item:hover { background: rgba(230, 231, 235, 0.9); color: rgba(50, 50, 50); }
	.item:hover .icon { opacity: 0.8; }
	.item.on { animation: menu 1.5s forwards; opacity: 1; }
	.icon { width: 70px; opacity: 0.6; }
	.name { margin-top: 10px; font-size: 24px; }
	.line { border-top: 2px solid #eee; margin: 0 0 8px 0; }
	
	@keyframes menu {
		0% { transform: translateY(-400px); }
		20% { transform: translateY(248px); }
		32% { transform: translateY(234px);}
		44% { transform: translateY(248px); padding:0; border: 0; border-top: 1px solid #fff; }
		60% { border-top: 1px solid #fff; }
		61% { border: 0; height: 0}
		70% { height: 0; padding: 24px 0; transform: translateY(200px);}
		100% { height: 200px; padding: 24px 0; transform: translateY(0);  border: 0; }
	}

	@media all and (max-width: 1023px) {
	   .item { text-align: center; width: 32%; border-radius: 7px; margin: 0 1%; overflow-y: hidden; box-shadow: 5px 5px 7px #bbb; opacity: 0; height: 0; padding: 0; border-top: 1px solid #adf; background: rgba(230, 231, 235, 0.7); }
	   .icon { width: 8vw; }

	   @keyframes menu {
			0% { transform: translateY(-400px); }
			20% { transform: translateY(248px); }
			32% { transform: translateY(234px);}
			44% { transform: translateY(248px); padding:0; border: 0; border-top: 1px solid #fff; }
			60% { border-top: 1px solid #fff; }
			61% { border: 0; height: 0}
			70% { height: 0; padding: 24px 0; transform: translateY(200px);}
			100% { height: 200px; padding: 24px 0; transform: translateY(0);  border: 0; }
	   }
	}
`

export default Menu;
