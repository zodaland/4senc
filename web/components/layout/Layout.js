import Header from './Header';
import Footer from './Footer';
import css from 'styled-jsx/css';

const Layout = ({children, footer, menus, scroll, urlPath}) => {
	return (
		<>
			<Header menus={menus} scroll={scroll} urlPath={urlPath}/>
			<div className="content">
				{children}
			</div>
			<Footer footer={footer}/>
			<style jsx>{style}</style>
		</>
	)
};

const style = css`
	.content { background: url(${process.env.NEXT_PUBLIC_IMAGE_SERVER}background.jpg) no-repeat center center;  background-size: cover;}
`

export default Layout;