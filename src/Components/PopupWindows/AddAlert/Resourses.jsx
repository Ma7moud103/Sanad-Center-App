import { useContext, useEffect, useMemo, useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import { BASE_URL } from '../../../Soursre';
import { ApisContext } from '../../../Context/ApisContext';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import axios from 'axios';
import { MainContext } from '../../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Resourses = ({ onUploadSuccess }) => {
	const [t] = useTranslation();

	const { selectedType, ErorrMessage, sethandleAddedFile, session } =
		useContext(MainContext);
	const { headers, userDetails, fetchCoure } = useContext(ApisContext);
	const { id } = useParams();
	const [currentSessionId, setCurrentSessionId] = useState(() => {
		if (session) {
			return session?._id;
		} else {
			return '';
		}
	});
	const [isUploading, setIsUploading] = useState(
		() => sessionStorage.getItem('isUploading') === 'true'
	);

	// console.log(session?._id)
	// console.log(id)

	const fetchUploadApiEndpoint = async (endpoint, file, props) => {
		let requestPayload = { ...props, contentType: file.type };
		delete requestPayload['signal'];
		delete requestPayload['body'];

		let requestEndpoint = `${BASE_URL}upload/multipart/${endpoint}`;
		if (endpoint === 'complete') {
			requestPayload = {
				...requestPayload,
				title: file.name,
				// session: sessionId,
				// accessLevel: selectedType.value,
				size: file.size,
				// tutorCode: userDetails?.code,
			};

			// /tutor-courses/{tutorCourseId}/announcements
			requestEndpoint = `${BASE_URL}announcements/upload/multipart/${endpoint}`;
			// centers
			// requestPayload = {
			// 	...requestPayload,
			// 	title: file.name,
			// 	size: file.size,
			// };
			// requestEndpoint = `http://localhost:3000/api/v1/centers/upload/multipart/${endpoint}`;
		}
		if (endpoint === '') {
			// tutors
			requestEndpoint = `${BASE_URL}announcements/upload/multipart/${endpoint}`;
			// centers
			// requestEndpoint = `http://localhost:3000/api/v1/centers/upload/multipart/${endpoint}`;
		}

		// if (endpoint === 'parts/list') {
		// 	setUploadedParts((prevParts) => ({
		// 		...prevParts,
		// 		[fileId]: data.parts,
		// 	}));
		// }
		// if(endpoint === "parts/sign"){
		// 	setUploadedParts((prevParts) => ({
		// 		...prevParts,
		// 		[fileId]: [
		// 			...(prevParts[fileId] || []),
		// 			{ PartNumber: file.partNumber, ETag: '' }, // ETag will be updated after part upload
		// 		],
		// 	}));
		// }

		try {
			const res = await axios.post(requestEndpoint, requestPayload, {
				headers: headers,
			});

			if (res.status === 200 || res.data?.status === 'success') {
				// setToggler({ ...Toggler, upload: false })
				console.log(res);
				return res.data;
			}
		} catch (error) {
			// ErorrMessage(t("Errors.main"), "error")

			console.log(error);
		}
	};

	const saveUppyState = (uppy) => {
		const state = uppy.getState();
		sessionStorage.setItem('uppyState', JSON.stringify(state));
		sessionStorage.setItem('uppySessionId', currentSessionId);
		sessionStorage.setItem('isUploading', isUploading);
	};

	const loadUppyState = () => {
		const state = sessionStorage.getItem('uppyState');
		return state ? JSON.parse(state) : null;
	};

	const uppy = useMemo(() => {
		const previousSessionId = sessionStorage.getItem('uppySessionId');
		if (previousSessionId !== session?._id) {
			sessionStorage.removeItem('uppyState');
			sessionStorage.removeItem('isUploading');
		}

		const uppy = new Uppy({
			autoProceed: false,
		})
			// .use(ThumbnailGenerator)
			// .use(StatusBar)
			// .use(Informer)
			.use(AwsS3Multipart, {
				createMultipartUpload: async (file) => {
					const contentType = file.type;
					// // tutors
					return fetchUploadApiEndpoint('', file, {
						fileName: file.name,
						vendors: 'tutors',
						vendorCode: userDetails?.code,
						// sessionName: sessionName,
						// courseName: fetchCoure.data?.courseData?.name,
						contentType: contentType,
					});
					// centers
					// return fetchUploadApiEndpoint('', file, {
					// 	fileName: file.name,
					// 	centerCode: centerCode,
					// });
				},

				listParts: (file, props) =>
					fetchUploadApiEndpoint('parts/list', file, props),
				signPart: (file, props) =>
					fetchUploadApiEndpoint('parts/sign', file, props),
				abortMultipartUpload: (file, props) =>
					fetchUploadApiEndpoint('abort', file, props),
				completeMultipartUpload: (file, props) =>
					fetchUploadApiEndpoint('complete', file, props),
			});

		const savedState = loadUppyState();
		if (savedState) {
			uppy.setState(savedState);
		}

		uppy.on('upload-progress', () => saveUppyState(uppy));

		uppy.on('complete', (result) => {
			sessionStorage.removeItem('uppyState');
			sessionStorage.removeItem('isUploading');
			onUploadSuccess(result);

			ErorrMessage(t('Errors.handleUpload'), 'success');
			sethandleAddedFile((prev) => !prev);
		});

		return uppy;
	}, [session?._id]);

	// Effect to update current session ID and handle Uppy state on session change
	useEffect(() => {
		setCurrentSessionId(session?._id);
		if (isUploading) {
			uppy.updateAll(); // Update all files in the queue
			uppy.resumeAll(); // Resume uploads if paused
			uppy.resetProgress(); // Reset progress bars
			uppy.retryAll(); // Retry failed uploads
		}
		return () => {
			saveUppyState(uppy); // Save Uppy state on component unmount
			// Remove event listeners to prevent memory leaks
			uppy.off('upload-progress', () => saveUppyState(uppy));
			uppy.off('complete', (result) => {
				sessionStorage.removeItem('uppyState');
				sessionStorage.removeItem('isUploading');
				onUploadSuccess(result);
				ErorrMessage(t('Errors.handleUpload'), 'success');
			});
			uppy.close(); // Close Uppy instance
		};
	}, [session?._id, uppy]);

	// On component mount, resume uploads if previously in progress
	useEffect(() => {
		if (isUploading) {
			uppy.resumeAll();
		}
	}, []);

	return (
		<Dashboard
			className="shadow-md"
			uppy={uppy}
			proudlyDisplayPoweredByUppy={false}
		/>
	);
};
export default Resourses;
