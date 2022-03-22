import css from 'styled-jsx/css';

const Contact = ({info, emails, emailOptions, handleChange, handleSelect, handleSubmit}) => {
    return (
		<>
			<section className="box contact-wrap">
				<h2 className="title">온라인 방문</h2>
				<hr className="title-line" />
				<p className="feature">하단의 정보를 입력하신 뒤 저희에게 보내주세요.</p>
				<div className="form-box">
					<dl>
						<dt>이름</dt>
						<dd><input type="text" name="name" value={info.name}className="input w150" onChange={handleChange} /></dd>
					</dl>
					<dl>
						<dt>이메일 주소</dt>
						<dd>
							<input type="text" name="email1" value={emails.email1} className="input w150" onChange={handleChange} />
							<span className="at">@</span>
							<input type="text" name="email2" value={emails.email2} className="input w200" onChange={handleChange} />
							<select name="ordinary_emails" onChange={handleSelect}>
								<option value="">직접 입력</option>
								{emailOptions.map((email, index) => (
									<option key={index} value={email}>{email}</option>
								))}
							</select>
							<span className="arrow">∨</span>
						</dd>
					</dl>
					<dl>
						<dt>제목</dt>
						<dd><input type="text" name="subject" value={info.subject} className="input w700" onChange={handleChange} /></dd>
					</dl>
					<dl>
						<dt>문의 내용</dt>
						<dd><textarea name="content" value={info.content} className="input w700" onChange={handleChange} /></dd>
					</dl>
				</div>
				<div className="form-btn">
					<button onClick={handleSubmit}>등록</button>
				</div>
			</section>
			<style jsx>{style}</style>
		</>
    );
}

const style = css`
	.contact-wrap { width: calc(100vw - 30px); margin-bottom: 30px; padding: 20px 0; animation: main 0.3s forwards;  margin: 195px 15px 100px 15px; }
	.title { font-size: 2rem; margin-left: 2vw; }
	hr.title-line { margin-top: 3vh; width:97%; border-top: 1px solid #ddd; }
	.feature { margin-top: 25px; font-weight:300; font-size: 1.7rem; text-align: center; padding: 0 3vw; }
	.form-box { margin-top: 20px; overflow: hidden; }
	dl { margin: 15px 0 0 3vw; height: 60px; }
	dt { float: left; width: 130px; font-size: 21px; font-weight:500; padding-top: 15px; }
	dd { float: left; padding: 0 0 0 45px; }
	dd .at { margin: 5px 31px; font-size: 23px; font-weight: 300; }
	dd .input { border: 1px solid #ccc; padding: 15px 20px; font-size: 18px; font-weight: 300; font-family: 'Noto Sans KR', sans-serif;}
	textarea { height: 400px; }
	dd select { position: absolute; border: 1px solid #ccc; width: 170px; padding: 17px 20px; font-size: 18px; font-weight: 300; margin-left: 47px;}
	dd .arrow { position: absolute; float:right; margin-top: 15px; margin-left: 191px; font-weight: 100; pointer-events: none; }
	.form-btn { text-align: center; }
	.form-btn button { font-family: 'Noto Sans KR', sans-serif; font-weight: 500; font-size: 21px; 
	width: 40%; height: 60px; cursor: pointer; background: rgba(210, 211, 235, 1); border: 0; margin-top: 35px; transition: 0.5s; }
	.form-btn button:active,
	.form-btn button:hover { background: #036; color: #fff }
	.form-btn button:success {}
	.w700 { width: 700px; }
	.w150 { width: 158px; }
	.w200 { width: 200px; }
    input, textarea { background: rgba(230, 231, 235, 1); }

	@media all and (max-width: 1023px) {
		.title { margin-left: 5vw; }
		.feature { margin-top: 20px; }
		.form-box { height: 420px; }
		dl { margin: 0 0 0 1.5vw; height: 70px; }
		dt { width: 22vw; font-size: 1.1rem; padding-top: 13px; }
		dd { padding: 0 0 0 1%; height: 30px; }
		dd .at { margin: 0; font-size: 1rem; }
		dd .input { padding: 2px 0.2vw; font-size: 1.5rem; letter-spacing: -2px; }
		dd select { width: calc(22% - 17px); font-size: 1.0rem; padding: 0.4rem 0.2vw; margin-left: 3%; padding-right: 22px; overflow: hidden; }
		textarea { height: 200px; }
		dd .arrow { margin-left: 16vw; margin-top: 9px; font-size: 0.8rem; }
		.form-btn button { font-size: 1.2rem; height: 45px; }
		
		.w700 { width: 65vw; }
		.w200 { width: 23vw; }
		.w150 { width: 19vw; }
	}
`

export default Contact;
