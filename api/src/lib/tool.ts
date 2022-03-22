export const getToken = (cookie: string|undefined): string|null => {
    if (!cookie) {
        return null;
    }
	const cookiePiece: string[] = cookie.split('; ');
	const tokenCookie: string|undefined = cookiePiece.find(c => c.indexOf('token=') === 0);

	if (!tokenCookie) {
		return null;
	}
	const separator: number = tokenCookie.indexOf('=') + 1;
	const token = tokenCookie.substr(separator);

	return token;
}