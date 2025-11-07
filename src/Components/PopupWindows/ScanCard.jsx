import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import x from '../../assets/sanadSVG/Multiply.svg';

import scanIcon from '../../assets/sanadSVG/scanBox.svg';
import scan from '../../assets/sanadSVG/scanGray.svg';
import { ReactSVG } from 'react-svg';
import { Html5Qrcode } from 'html5-qrcode';

import { ApisContext } from '../../Context/ApisContext';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function CheckCard() {
	const reg = /^[0-9]{7}$/;

	const [t] = useTranslation();
	const { Toggler, setToggler, direction } =
		useContext(MainContext);
	const {
		getLastSevenItems,

		getCard,
		MainLoading,
		qrData,
		setQrData,
	} = useContext(ApisContext);
	const [scannerStarted, setScannerStarted] = useState(false);
	const hasCalledGetCard = useRef(false);

	const videoRef = useRef(null);
	const toggleScanner = () => {
		setScannerStarted((prev) => !prev);
	};
	const error = useMemo(() => {
		return qrData !== '' && reg.test(qrData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [qrData]);

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


					const newQrData = getLastSevenItems(qrCodeMessage.split('')).join('');
					setQrData(newQrData);

					// Call getCard directly after scanning
					if (reg.test(newQrData) && !hasCalledGetCard.current) {
						getCard(newQrData);
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

	const handleSubmit = (e) => {
		e.preventDefault();

		// Call getCard on form submission if the input is valid
		if (error) {
			getCard(qrData);
		}
	};

	function close() {
		setToggler({ ...Toggler, scanCard: false });
	}

	useEffect(() => {
		return () => {
			setQrData("")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.scanCard}
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
								onClick={() => setToggler({ ...Toggler, scanCard: false })}
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
									<p className='text-sm text-center text-textColor__2 font-semibold sm:text-base'>
										{t("homepage.scanCard")}
									</p>
								</div>
							</DialogTitle>
							{/* content */}

							<form onSubmit={handleSubmit}
								className="flex flex-col mt-2 gap-y-4 relative justify-start items-center h-2/5 ">
								<div className="w-full input">
									<div
										id="scanCard"
										style={{ display: scannerStarted ? 'block' : 'none' }}
										ref={videoRef}
									></div>

									<div className="w-full bg-white px-3 py-1 sm:py-2  rounded-xl flex items-center justify-between">
										<input
											className="border-none w-[90%] text-sm placeholder:text-sm placeholder:text-textGray "
											type="number"
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

								<div className=" buttons flex   gap-3 w-full items-center justify-between">
									<button
										type="submit"
										onClick={(e) => {
											e.preventDefault();
											getCard(qrData);
										}}
										disabled={!error}
										className={`rounded-2xl py-2 ${!error ? 'bg-secondMainColor' : 'bg-mainColor '}   sm:py-3 px-1 border-none  text-white text-base sm:text-lg   w-1/2 font-bold`}
									>
										{!MainLoading.scanBtn ? (
											t('PopupWindows.confirm')
										) : (
											<div
												className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault()
											setToggler((prev) => {
												return { ...prev, scanCard: false };
											})
										}
										}
										className="rounded-2xl  py-3 px-12 bg-transparent border-none text-mainColor text-lg   w-1/2 font-bold"
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
