import React, { useContext, useState, useEffect, useRef } from 'react';
import x from '../../../assets/sanadSVG/Multiply.svg';
import warning from '../../../assets/sanadSVG/teachers.svg';
// import arrow from "../../../assets/Vector 1.png";
import { MainContext } from '../../../Context/MainContext';
import { ApisContext } from '../../../Context/ApisContext';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import { BASE_URL } from '../../../Soursre';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import scan from '../../../assets/sanadSVG/scanGray.svg';
import { Html5Qrcode } from 'html5-qrcode';

export default function AddAssistant() {
	const { Toggler, setToggler, direction } = useContext(MainContext);
	const { ErorrMessage } = useContext(MainContext);
	const { headers, sethandleAddAssistant, selectedCenter } =
		useContext(ApisContext);

	let [t] = useTranslation();

	const [Loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			centerOwnerKey: '',
		},
		validationSchema: Yup.object({
			centerOwnerKey: Yup.string()
				.required(t("homepage.inputRequired"))
				.matches(/^[A-Za-z0-9_-]{8}$/, t("homepage.centerKeyValidation")),
		}),
		onSubmit: async (values, { resetForm }) => {
			console.log(values);
			if (selectedCenter) {
				try {
					setLoading(true);
					const res = await axios.patch(
						`${BASE_URL}centers/${selectedCenter?._id}/center-assistants`,
						values,
						{ headers: headers }
					);
					if (res.status === 200 || res.data.status === 'success') {
						sethandleAddAssistant((prev) => !prev);
						ErorrMessage(t('Errors.addAssistant'), 'success');
						resetForm();
						formik.values.centerOwnerKey = '';

						setToggler((prev) => {
							return { ...prev, addAssistant: false };
						});
					}
				} catch (error) {
					console.log(error)
					if (error?.response?.data?.message === 'CA not found') {
						ErorrMessage(t('Errors.notAssistant'), 'error');
					} else {
						ErorrMessage(t('Errors.main'), 'error');
					}
				} finally {
					setLoading(false);
				}
			}
		},
	});









	const [scannerStarted, setScannerStarted] = useState(false);
	const hasCalledGetCard = useRef(false);
	const videoRef = useRef(null);
	const toggleScanner = () => {
		setScannerStarted((prev) => !prev);
	};
	useEffect(() => {
		let html5QrCode;
		if (scannerStarted) {
			html5QrCode = new Html5Qrcode('scanCard');
			html5QrCode.start(
				{ facingMode: 'environment' },
				{
					fps: 20,
					qrbox: 200,
				},
				(qrCodeMessage) => {




					formik.values.centerOwnerKey = qrCodeMessage
					formik.setFieldValue("centerOwnerKey", qrCodeMessage)


					// Call getCard directly after scanning
					if (formik.errors.centerOwnerKey === "" && !hasCalledGetCard.current) {
						formik.values.centerOwnerKey = qrCodeMessage
						formik.setFieldValue("centerOwnerKey", qrCodeMessage)
						hasCalledGetCard.current = true; // Prevent multiple calls for the same QR data
					}


					setScannerStarted(false);

					hasCalledGetCard.current = false;


				},
				(errorMessage) => {
					console.error(errorMessage);
				}
			);
		}

		return () => {
			if (html5QrCode) {
				html5QrCode.stop();
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scannerStarted]);

	const isButtonDisabled = !formik.isValid || !selectedCenter;

	const close = function () {
		setToggler({ ...Toggler, addAssistant: false });
		formik.resetForm()
		formik.values.centerOwnerKey = ""
		formik.setFieldValue("centerOwnerKey", "")
	};

	useEffect(() => {
		if (Toggler.addAssistant === false) {
			formik.resetForm()
			formik.values.centerOwnerKey = ""
			formik.setFieldValue("centerOwnerKey", "")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Toggler.addAssistant])
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.addAssistant}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, addAssistant: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={warning} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('PopupWindows.addAssistant')}
									</h3>
									<p className="font-normal text-sm sm:text-base text-center">
										{t('PopupWindows.assistantP')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}
							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col gap-3 mt-2 2xl:gap-2"
							>
								{formik.errors.centerOwnerKey && formik.touched.centerOwnerKey && <p className='text-err font-semibold text-xs   '>
									{formik.errors.centerOwnerKey}
								</p>}
								<div className="alertAddress flex flex-col gap-y-1 w-full">
									<div
										id="scanCard"
										style={{ display: scannerStarted ? 'block' : 'none' }}
										ref={videoRef}
									></div>
									<div className={`w-full bg-white px-3 py-1      flex items-center justify-between     
                        border-[#E6E9EA] 
                           outline-none  focus:border-none text-start border-[1px] rounded-xl  ${formik.errors.centerOwnerKey && formik.touched.centerOwnerKey ? 'border-err border text-err   ' : 'text-mainColor '}`}>
										<input
											onFocus={(e) => (e.target.style.boxShadow = 'none')}
											placeholder="2518824855"
											className={`    w-[90%] border-none 
                           placeholder:text-start placeholder:text-[#A4ACAD] placeholder:font-bold`}
											type="text"
											id="centerOwnerKey"
											name="centerOwnerKey"
											value={formik.values.centerOwnerKey}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>

										<span onClick={toggleScanner} className="cursor-pointer">
											<ReactSVG src={scan} />
										</span>
									</div>

								</div>

								<div className="formBtns   flex gap-x-3 justify-center items-center">
									<button
										type="submit"
										disabled={isButtonDisabled}
										className={`${isButtonDisabled ? 'bg-secondMainColor' : 'bg-mainColor'} text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl flex items-center justify-center`}
									>
										{!Loading ? (
											t('PopupWindows.add')
										) : (
											<div
												className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type="button"
										onClick={() =>
											setToggler((prev) => {
												return { ...prev, addAssistant: false };
											})
										}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl"
									>
										{t('PopupWindows.back')}
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
