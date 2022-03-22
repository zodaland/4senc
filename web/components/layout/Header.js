import Link from 'next/link'
import css from 'styled-jsx/css';

const style = css`
	header { position:fixed; display: flex; justify-content: center; left:50%; width: 100%; transform: translate(-50%); z-index: 1; }
	.logo-wrap { position: absolute; top: 15px; left: 15px; transition: 0.3s; }
	.logo { display: inline-block; cursor: pointer; height: 150px; width: 250px; box-shadow: 5px 5px 7px #bbb; border-radius: 7px; }
	.list li { display: flex; justify-content: center; align-items: center; float:left; text-align: center; width: 120px; height: calc(120px / 3); box-shadow: 5px 5px 7px #bbb; border-radius: 7px; margin: 15px; cursor: pointer; }
	.list .link { margin: 0 5px; cursor: pointer; font-size: 20px; color: rgba(100, 100, 100, 0.5); }
	.list li:hover { background: rgba(232, 232, 234, 0.8); }
	.list li:hover .link { color: rgba(100, 100, 100, 0.8); }
    .none { opacity: 0; pointer-events: none; }
	.active { color: #333 !important; }
	
	@media all and (max-width: 1023px) {
		header { justify-content: flex-start; }
		ul { width: 100vw; }
		.list { margin-left: 265px; }
		header.scroll { justify-content: center; }
		.list.scroll { margin-left: 0; }
	}

	@media all and (max-width: 768px) {
		.list li { float: none; width: calc((100vw - 90px) / 3); }
		.list li.scroll { float: left; }
	}
`

const Header = (({menus, scroll, urlPath}) => {
    return(
		<>
        <header className={scroll && "scroll"}>
			<Link href="/">
            <div className={"logo-wrap" + (scroll ? " none" : "")}>
				<img
                    className="logo"
                    src={process.env.NEXT_PUBLIC_IMAGE_SERVER + 'logo.png'}
                    alt="logo"
                />
            </div>
			</Link>
				<ul className={"list" + (scroll ? " scroll" : "")}>
					{menus.map((menu, index) => (
					<Link key={index} href={'/' + menu.path}>
						<li className={scroll && "scroll"}>
								<p className={((urlPath === menu.path) ? "active" : "") + " link"}>{menu.name}</p>
						</li>
					</Link>
					))}
				</ul>
        </header>
		<style jsx>{style}</style>
		</>
	)
});

export default Header;
