import { useEffect } from 'react';

export const startUpload = (ref, setFile) => {
	const onDrag = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (e.type === 'dragover') {
			ref.current.style.outlineOffset = "-20px";
		} else {
			ref.current.style.outlineOffset = "-10px";
		}
	};

	const upload = (e) => {
		onDrag(e);
		
		const files = (e.dataTransfer) ? e.dataTransfer.files : e.target.files;
		if (files.length > 1) {
			alert('하나씩 올려주세요.');
			return;
		}
		if (!files[0].type.match(/^image\/.+$/)) {
			alert('이미지만 업로드 가능합니다.');
			return;
		}
		const objectUrl = window.URL.createObjectURL(files[0]);
		ref.current.style.backgroundImage = `url(${objectUrl})`;
		setFile(files[0]);
	};

	useEffect(() => {
		ref.current.style.transition = "all .15s ease-in-out";
		ref.current.style.outline = "2px dashed #000";
		ref.current.style.outlineOffset = "-10px";
		ref.current.addEventListener("dragover", onDrag);
		ref.current.addEventListener("dragleave", onDrag);
		ref.current.addEventListener("drop", upload);

		return () => {
			if (ref.current !== null) {
				ref.current.removeEventListener("dragover", onDrag);
				ref.current.removeEventListener("dragleave", onDrag);
				ref.current.removeEventListener("drop", upload);
			}
		};
	});
};