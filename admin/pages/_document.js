import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
                    <link rel="shortcut icon" type="image/x-icon" href="https://image.4senc.com/view/4s_favicon.ico" />
                    <link rel="icon" type="image/x-icon" href="https://image.4senc.com/view/4s_favicon.ico" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&family=Black+Han+Sans&Gowun+Batang:wght@700&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	};
};

export default MyDocument;