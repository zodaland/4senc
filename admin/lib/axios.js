import axios from 'axios'

const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'multipart/form-data',
	},
	baseURL: process.env.NEXT_PUBLIC_IMAGE_SERVER
})

axiosInstance.defaults.withCredentials = true

export const uploadFile = (file, name) => {
    const pathname = (typeof name !== 'undefined') ? `/upload/${name}` : '/upload';
	const form = new FormData();
	form.append('file', file);
	return axiosInstance.post(pathname, form)
		.then((response) => response);
}