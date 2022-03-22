import Header from './Header';
import Footer from './Footer';
import Auth from '../Auth';
import css from 'styled-jsx/css';

const Layout = ({children, menus, scroll, urlPath,
	authentication, password, handlePassword, submitPassword, info, handleInfo, submitInfo}) => {
	return (
		<>
		{authentication ? (
			<>
				<Header
					menus={menus}
					scroll={scroll}
					urlPath={urlPath}
                    
                    info={info}
                    handleInfo={handleInfo}
                    submitInfo={submitInfo}
				/>
				<div className="content">
					{children}
				</div>
                <Footer
                    info={info}
                    handleInfo={handleInfo}
                    submitInfo={submitInfo}
                />
			</>
		) : (
			<div className="content">
				<Auth 
					submitPassword={submitPassword}
					handlePassword={handlePassword}
					password={password}
				/>
			</div>
		)}
			<style jsx>{style}</style>
		</>
	)
};

const style = css`
	.content { background: url(${process.env.NEXT_PUBLIC_IMAGE_SERVER}/view/background.jpg) no-repeat center center;  background-size: cover;}
`

export default Layout;
