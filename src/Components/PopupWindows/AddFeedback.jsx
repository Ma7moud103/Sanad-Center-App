import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import x from '../../assets/sanadSVG/Multiply.svg';
import scanIcon from '../../assets/sanadSVG/scanBox.svg';
import scan from '../../assets/sanadSVG/scanGray.svg';
import { ReactSVG } from 'react-svg';
import {  Html5Qrcode } from 'html5-qrcode';
import { BASE_URL } from '../../Soursre';
import axios from 'axios';
import { ApisContext } from '../../Context/ApisContext';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function AddFeedback() {
	const reg = /^[0-9]{7}$/;
	// const center = JSON.parse(sessionStorage.getItem('centerid'));
	const [t] = useTranslation();
	const { Toggler, setToggler, ErorrMessage, direction, setstudentDetails } =
		useContext(MainContext);
	const { getLastSevenItems, headers, selectedCenter } =
		useContext(ApisContext);
	const [qrData, setQrData] = useState('');
	const [scannerStarted, setScannerStarted] = useState(false);
	const [Loading, setLoading] = useState(false);
	const videoRef = useRef(null);
	const hasCalledGetCard = useRef(false);

	const toggleScanner = () => {
		setScannerStarted((prev) => !prev);
	};
	const error = useMemo(() => {
		return qrData !== '' && reg.test(qrData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [qrData]);

	async function getCard(qrData) {
		if (qrData && selectedCenter) {
			try {
				setLoading(true);

				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/cards/${qrData}`,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.message === 'success') {

					setstudentDetails(res.data.data);
					ErorrMessage(t('Errors.successCard'), 'success');
					setToggler({
						...Toggler,
						addFeedbackToStudent: true,
						feedbackToggler: false,
					});
				}
			} catch (error) {
				console.log(error);

				if (error.response.data.message === "card not found") {
					ErorrMessage(t('Errors.cardNotFound'), 'error');

				} else {
					ErorrMessage(t('Errors.main'), 'error');

				}

			} finally {
				setQrData('');
				setLoading(false);
			}
		}
	}


	useEffect(() => {
		let html5QrCode;
		if (scannerStarted) {
			html5QrCode = new Html5Qrcode('reader');
			html5QrCode.start(
				{ facingMode: 'environment' },
				{
					fps: 20,
					qrbox: 300,
				},
				(qrCodeMessage) => {

					const newQrData = getLastSevenItems(qrCodeMessage.split('')).join('');
					console.log("Scanned QR Code Data:", newQrData);
					setQrData(newQrData);

					// Call getCard directly after scanning
					if (reg.test(newQrData) && !hasCalledGetCard.current) {
						console.log("Calling getCard with QR data:", newQrData);
						getCard(newQrData);

						hasCalledGetCard.current = true; // Prevent multiple calls for the same QR data

						console.log(hasCalledGetCard.current)
					}


					setScannerStarted(false);

					hasCalledGetCard.current = false;
					console.log("hasCalledGetCard reset to:", hasCalledGetCard.current);
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

	function close() {
		setToggler({ ...Toggler, feedbackToggler: false });
		setQrData('');

	}

	useEffect(() => {
		if (!Toggler.feedbackToggler) {
			setQrData('');
		}
	}, [Toggler.feedbackToggler])
	const handleSubmit = (e) => {
		e.preventDefault();

		if (error) {
			getCard(qrData);
		}
	};
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.feedbackToggler}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4 py-6">
						<DialogPanel
							transition
							className="w-full sm:w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() =>
									setToggler({ ...Toggler, feedbackToggler: false })
								}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={scanIcon} />
									<h3 className="text-2xl  font-black text-[#023E8A]">
										{t('homepage.enterCard')}
									</h3>
									<p className="font-semibold text-center sm:text-lg text-textColor__2 ">
										{t('homepage.checkCard')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}

							<form onSubmit={handleSubmit} className="flex mt-2 flex-col gap-y-2  sm:gap-y-4 relative justify-start items-center ">
								<div className="w-full input">
									<div className="space-y-2">
										<label
											id="code"
											className="text-mainColor text-size_12 sm:text-sm"
											htmlFor="code"
										>
											{t('homepage.codeLabel')}
										</label>

										<div
											id="reader"
											style={{ display: scannerStarted ? 'block' : 'none' }}
											ref={videoRef}
										></div>

										<div className="w-full bg-white px-3 py-1 sm:py-2  rounded-xl flex items-center justify-between">
											<input
												className="border-none w-[90%] text-sm placeholder:text-sm placeholder:text-textGray "
												type="text"
												placeholder={t('homepage.cardplace')}
												onFocus={(e) => {
													e.target.style.boxShadow = 'none';
												}}
												name="cardCode"
												onChange={(e) => {
													setQrData(e.target.value);
												}}
												value={qrData}
											/>
											<span onClick={toggleScanner} className="cursor-pointer">
												<ReactSVG src={scan} />
											</span>
										</div>
									</div>
								</div>

								<div className=" buttons mt-2 flex flex-row gap-3  w-full justify-between">
									<button
										type="submit"
										onClick={(e) => {
											e.preventDefault();
											getCard(qrData);
										}}
										disabled={!error}
										className={`rounded-xl py-3 ${!error ? 'bg-secondMainColor' : 'bg-mainColor '}   sm:py-3 px-1 border-none  text-white text-sm sm:text-base w-full md:w-1/2 font-bold`}
									>
										{!Loading ? (
											t('Logs.search')
										) : (
											<div
												className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault();
											setToggler((prev) => {
												return {
													...prev,
													feedbackToggler: false,
												};
											});
										}}
										className="rounded-xl py-3  sm:py-3 px-12 bg-transparent border-none text-mainColor  text-sm sm:text-base w-full md:w-1/2 font-bold"
									>
										{t('ExitPopup.back')}
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
