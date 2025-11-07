import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import scanIcon from '../../assets/sanadSVG/scanBox.svg';
import scan from '../../assets/sanadSVG/scanGray.svg';
import x from '../../assets/sanadSVG/Multiply.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../Context/ApisContext';
import { Listbox } from '@headlessui/react';
import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';
import { Html5Qrcode } from 'html5-qrcode';
import { BASE_URL, BASUE_IMAGES } from '../../Soursre';
import axios from 'axios';
import profile from '../../assets/sanadSVG/imgUser2.svg';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function CheckCard() {
	const { groupId } = useParams()
	const { showBoundary } = useErrorBoundary()
	const [scannerStarted, setScannerStarted] = useState(false);
	// const selectedCenter = JSON.parse(sessionStorage.getItem('centerid'));
	const videoRef = useRef(null);
	const toggleScanner = () => {
		setScannerStarted((prev) => !prev);
	};
	const [t, i18n] = useTranslation();
	const { Toggler, setToggler, ErorrMessage, direction, handleUserName } =
		useContext(MainContext);
	const [studentDetails, setstudentDetails] = useState(false);
	const selectedGroupId = sessionStorage.getItem('groupId');
	const selectedCourseId = sessionStorage.getItem('courseId');

	const {
		selectedCenter,
		selectedSession,
		setselectedSession,
		headers,
		getLastSevenItems,
		tens,

		fetchSessionsForGroup,

	} = useContext(ApisContext);


	// const res = await axios.get(
	// 	`${BASE_URL}centers/${selectedCenter?._id}/groups/${groupId}`,
	// 	{ headers: headers }
	// );


	const cachedGroupId = sessionStorage.getItem("groupId")
	const storedGroupId = cachedGroupId !== null ? cachedGroupId : groupId


	const getSingleGroup = async () => {
		try {

			const res = await axios.get(
				`${BASE_URL}centers/${selectedCenter?._id}/groups/${storedGroupId}`,
				{ headers: headers }
			);

			return res.data.message;

		} catch (error) {
			showBoundary(error)


		}
	}



	const fetchSingleGroup = useQuery({
		queryKey: [
			'GroupDetails',
			`${selectedCenter?._id}`,
			`${storedGroupId}`,

		],
		queryFn: () => getSingleGroup(selectedCenter, groupId),
		enabled: !!selectedCenter && !!storedGroupId,
		refetchOnMount: true,
	});




	const filteredSession = fetchSessionsForGroup.data?.filter(
		(item) => item?.sessionNumber !== selectedSession?.sessionNumber
	);



	// console.log(fetchSessionsForGroup.data)
	// const GroupDetails = selectedGroupId
	// 	? fetchSingleGroup.data?.filter((item) => item?._id === selectedGroupId)
	// 	: null;


	// console.log(GroupDetails.at(0))
	const [qrData, setQrData] = useState('');
	const [loading, setloading] = useState(false);
	const [card, setcard] = useState('');
	const [data, setdata] = useState([]);
	const previousSession = selectedSession?.prevSession
		? `&sessionId=${selectedSession?._id}&prevSessionId=${selectedSession?.prevSession}`
		: `&sessionId=${selectedSession?._id}`;



	const [inputPaid, setinputPaid] = useState(0);

	const CheckCard = async () => {

		if (selectedGroupId && selectedCenter) {

			try {
				setloading(true);
				const res = await axios.get(
					`${BASE_URL}attendance/center/${selectedCenter?._id}/group/${selectedGroupId}?cardCode=${card}&centerCourseId=${selectedCourseId}${previousSession}`,
					{ headers: headers }
				);




				if (res.status === 200 || res.data.status === 'success') {

					setstudentDetails(true);
					setdata(res.data);
					ErorrMessage(t('Errors.successCard'), 'success');

				}
			} catch (error) {
				console.log(error);
				if (error.response.data.message === 'card is not found' || error.response.data.message === "Card not found") {
					ErorrMessage(t('Errors.notFoundCard'), 'error');
				} else if (
					error.response.data.message ===
					"Cannot read properties of null (reading 'group')"
				) {
					ErorrMessage(t('Errors.conflictCard'), 'error');
				} else if (
					error.response.data.message ===
					"Card course not found"
				) {
					ErorrMessage(t('Errors.cardCourse'), 'error');
				}
				else {
					ErorrMessage(t('Errors.main'), 'error');
				}
				setcard('');
				setQrData("")
			} finally {
				setloading(false);
				setcard('');
				setQrData("")
			}
		}
	};



	const [alertLoading, setalertLoading] = useState(false);
	const alert = async () => {
		if (!data?.cardCourse?._id && !selectedCenter) return;
		try {
			setalertLoading(true);
			const res = await axios.patch(
				`${BASE_URL}centers/${selectedCenter?._id}/card-courses/${data?.cardCourse?._id}`,
				{},
				{ headers: headers }
			);
			console.log(res);
			if (res.status === 200 || res.data.status === 'success') {
				// CheckCard()
				ErorrMessage(t('Errors.alert'), 'success');
				setstudentDetails(false);
			}
			console.log(res);
		} catch (error) {
			console.log(error);
			ErorrMessage(t('Errors.main'), 'error');
		} finally {
			setalertLoading(false);
		}
	};
	const [attendenceLoading, setattendenceLoading] = useState(false);

	const attendenceDepend = useMemo(() => {
		if (
			data &&
			data?.cardCourse?.paymentType === 'bulk' &&
			selectedSession &&
			selectedSession?._id
		) {
			return {
				cardId: data?.card?._id,
				paid: 0,
				sessionId: selectedSession?._id,
				centerCourseId: data?.cardCourse?.centerCourse,
				tutorCourseId: data?.cardCourse?.tutorCourse?._id,
			};
		} else {
			return {
				cardId: data?.card?._id,
				paid: inputPaid,
				sessionId: selectedSession?._id,
				centerCourseId: data?.cardCourse?.centerCourse,
				tutorCourseId: data?.cardCourse?.tutorCourse?._id,
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputPaid, selectedSession, loading]);

	const takeAttendence = async () => {
		if (!selectedSession) return null
		try {
			setattendenceLoading(true);
			const res = await axios.post(
				`${BASE_URL}attendance/center/${selectedCenter?._id}/group/${selectedGroupId}/`,
				attendenceDepend,
				{ headers: headers }
			);

			if (res.status === 200 || res.data.status === 'success') {
				ErorrMessage(t('Errors.takeAtted'), 'success');
				// setToggler({ ...Toggler, checkCard: false })
				setstudentDetails(false);
			}
		} catch (error) {
			console.log(error)
			ErorrMessage(t('Errors.main'), 'error');
		} finally {
			setattendenceLoading(false);
		}
	};
	const hasCalledGetCard = useRef(false);

	const reg = /^[0-9]{7}$/;



	const error = useMemo(() => {
		return (card !== '' && reg.test(card)) || (qrData !== '' && reg.test(qrData));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [card]);



	useEffect(() => {
		setcard(qrData || card);
	}, [qrData, card]);

	useEffect(() => {
		if (Toggler.checkCard === false) {
			setstudentDetails(false);
		}
	}, [Toggler.checkCard]);

	useEffect(() => {
		let html5QrCode;
		if (scannerStarted) {
			html5QrCode = new Html5Qrcode('qr-reader');
			html5QrCode.start(
				{ facingMode: 'environment' },
				{
					fps: 20,
					qrbox: 300,
				},
				(qrCodeMessage) => {
					const newQrData = getLastSevenItems(qrCodeMessage.split('')).join('');
					setQrData(newQrData);

					if (reg.test(newQrData) && !hasCalledGetCard.current) {
						CheckCard();
						hasCalledGetCard.current = true; // Prevent multiple calls for the same QR data

					}

					setScannerStarted(false);

					hasCalledGetCard.current = false;

					// setcard('');
					// setQrData("")

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
		setcard("")
		setinputPaid(0)
		setQrData("")
		setToggler({ ...Toggler, checkCard: false });
	}
	const isValid = useMemo(() => {
		if (inputPaid > data?.sessionFees) {
			return false
		} else {
			return true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputPaid])



	const handleSubmit = (e) => {
		e.preventDefault();

		// Call getCard on form submission if the input is valid
		if (error) {
			CheckCard();
		}
	};


	useEffect(() => {
		if (!Toggler.checkCard) {

			setcard("")
			setQrData("")
			setinputPaid(0)
		}

	}, [Toggler.checkCard])

	// console.log(data)
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.checkCard}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex items-center justify-center min-h-full p-4 py-6 b">
						<DialogPanel
							transition
							className="w-full sm:w-[80%] md:w-[90%] lg:w-[70%] 2xl:w-[60%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, checkCard: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="font-medium text-base/7 text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={scanIcon} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('homepage.checkcard')}
									</h3>
									<p className="text-base font-normal text-center sm:text-lg text-textColor__2">
										{t('homepage.checkCard')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}

							<form onSubmit={handleSubmit} className="relative flex flex-col items-center justify-start my-2 mt-4 gap-y-2 h-2/5">
								{!studentDetails ? (
									<>
										<div className="w-full input">
											<div className="space-y-2">
												<label
													id="code"
													className="text-sm text-mainColor"
													htmlFor="code"
												>
													{t('homepage.codeLabel')}
												</label>

												<div
													id="qr-reader"
													style={{
														display: scannerStarted ? 'block' : 'none',
													}}
													ref={videoRef}
												></div>

												<div className="flex items-center justify-between w-full px-3 py-1 bg-white sm:py-2 rounded-xl">
													<input
														className="border-none w-[90%] text-sm placeholder:text-sm placeholder:text-textGray text-mainColor font-bold"
														type="number"
														placeholder={t('homepage.cardplace')}
														onFocus={(e) => {
															e.target.style.boxShadow = 'none';
														}}
														onChange={(e) => {
															if (!qrData) {
																setcard(e.target.value);
															} else {
																setQrData(e.target.value);
															}
														}}
														value={qrData ? qrData : card}
													/>
													<span
														onClick={toggleScanner}
														className="cursor-pointer"
													>
														<ReactSVG src={scan} />
													</span>
												</div>
											</div>
										</div>
										<div className="w-full space-y-2 courseDetails">
											<h3 className="text-sm sm:text-base">
												{t('SingleCourse.courseData')}
											</h3>

											<div className="w-full bg-white rounded-xl border-borderMainColor ">
												<div className="flex flex-col w-full sm:flex-row Group">
													<div className="flex w-full p-1 text-center border-b group border-b-input_border sm:border-none sm:w-1/2">
														<div className="w-[45%] bg-[#F9FAFC] p-2">
															<div className="text-sm font-semibold text-textGray">
																{t('homepage.groupName')}
															</div>
															{/* <div className="">{t("Courses.courseName")}</div> */}
														</div>
														<div className="w-[55%] ">
															<div className="">
																<p className="text-xs font-semibold sm:text-sm text-mainColor">
																	{fetchSingleGroup.data?.groupNumber
																		? `${t('homepage.group')} ${fetchSingleGroup.data?.groupNumber}`
																		: null}
																</p>
																<p className="font-semibold text-2xs sm:text-xs text-textGray">
																	{fetchSingleGroup.data && i18n.language === 'ar'
																		? `${t('homeRev.grade')} ${fetchSingleGroup.data?.tutorCourse?.courseData?.grade?.nameAr}`
																		: `${t('homeRev.grade')} ${fetchSingleGroup.data?.tutorCourse?.courseData?.grade?.nameEn}`}
																</p>
															</div>
														</div>
													</div>

													<div className="flex w-full p-1 text-center border-b group border-b-input_border sm:w-1/2">
														<div className="w-[45%] bg-[#F9FAFC]  p-2">
															<div className="text-sm font-semibold text-textGray">
																{t('SingleCourse.sessionNumber')}
															</div>
															{/* <div className="">{t("SingleCourse.sessionType")}</div> */}
														</div>
														<div className="w-[55%] text-center flex items-center justify-center p-2">
															{!fetchSessionsForGroup.isFetched ? (
																<div className="w-full animate-pulse ">
																	<div className="flex items-center justify-center w-full py-1 ">
																		<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
																	</div>
																</div>
															) : (
																<div className="w-full ">
																	<Listbox
																		onChange={(ele) => {
																			setselectedSession(ele);
																		}}
																	>
																		{({ open }) => (
																			<div className="relative mt-2 sm:mt-1">
																				<Listbox.Button
																					className={`font-semibold bg-bg_mainLayout px-2 py-2 text-sm 
                                                 relative w-full flex cursor-pointer rounded-lg  text-left focus:outline-none  items-center justify-between  sm:text-sm gap-x-8 `}
																				>
																					<span
																						className={`${fetchSessionsForGroup.data?.length > 0 && 'text-center w-full'} block truncate text-mainColor text-xs sm:text-sm `}
																					>
																						{selectedSession !== null
																							? selectedSession?.value && selectedSession?.value === "all" ? selectedSession?.name : `${t('SingleCourse.theSession')} ${selectedSession?.sessionNumber}`
																							: t("homepage.sessionSelect")}
																					</span>

																					{fetchSessionsForGroup.data?.length >
																						0 && (

																							<ReactSVG src={downArrowFilter} />

																						)}
																				</Listbox.Button>

																				<Listbox.Options
																					className="absolute z-10 w-full mt-1 overflow-y-auto rounded-md shadow max-h-32 scrollbar-thin bg-bg_mainLayout focus:outline-none"
																				>
																					{filteredSession?.map(
																						(person, personIdx) => (
																							<Listbox.Option
																								key={personIdx}
																								className={({ active }) =>
																									` relative ${active ? 'bg-mainColor text-white' : 'text-mainColor'}  cursor-pointer select-none py-2 px-2`
																								}
																								value={person}
																							>
																								{({ selectedSession }) => (
																									<div className="flex items-center justify-between w-full">
																										<span
																											className={`block truncate text-size_10 sm:text-size_12  ${selectedSession
																												? 'font-medium'
																												: 'font-normal'
																												}`}
																										>
																											{t(
																												'SingleCourse.theSession'
																											)}{' '}
																											{person?.sessionNumber}
																										</span>
																									</div>
																								)}
																							</Listbox.Option>
																						)
																					)}
																				</Listbox.Options>
																			</div>
																		)}
																	</Listbox>
																</div>
															)}
														</div>
													</div>
												</div>

												<div className="flex flex-col w-full border-t border-b-0 border-solid sm:flex-row Course border-borderMainColor">
													<div className="flex w-full text-center border-b group border-b-input_border sm:border-none sm:w-1/2">
														<div className="w-[45%] bg-[#F9FAFC] p-2">
															{/* <div className="">{t("homepage.groupName")}</div> */}
															<div className="text-sm font-semibold text-textGray">
																{t('Courses.courseName')}
															</div>
														</div>
														<div className="w-[55%] ">
															<div className="">
																<p className="text-xs font-semibold text-textGray">

																	{handleUserName(fetchSingleGroup.data?.tutorCourse?.courseData
																		?.name, 4)}
																</p>
																<p className="text-xs font-semibold text-mainColor">

																	{handleUserName(fetchSingleGroup.data?.tutorCourse?.tutor
																		?.fullname, 1)}
																</p>
															</div>
														</div>
													</div>
													<div className="flex w-full text-center border-b group border-b-input_border sm:border-none sm:w-1/2">
														<div className="w-[45%] bg-[#F9FAFC]  p-2">
															{/* <div className="">{t("SingleCourse.sessionNumber")}</div> */}
															<div className="text-xs font-semibold text-textGray">
																{t('SingleCourse.sessionType')}
															</div>
														</div>
														<div className="w-[55%] flex items-center justify-center">
															<div className="text-xs font-semibold sm:text-sm text-mainColor ">
																{selectedSession?.type === 'session' &&
																	t('StudentDetails.session')}
																{selectedSession?.type === 'offlineExam' &&
																	t('StudentDetails.offlineExam')}
																{selectedSession?.type === 'revision' &&
																	t('StudentDetails.revision')}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="flex flex-col justify-between w-full gap-3 mt-4 buttons md:flex-row">
											<button
												type="submit"
												onClick={(e) => {
													e.preventDefault();

													CheckCard();

												}}
												disabled={!error}
												className={`rounded-2xl ${!error ? 'bg-secondMainColor' : 'bg-mainColor'} py-2 sm:py-3 px-12  border-none text-white text-lg w-full md:w-1/2 font-bold flex items-center justify-center`}
											>
												{!loading ? (
													t('homepage.checkcard')
												) : (
													<div
														className={`w-6  h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
													></div>
												)}
											</button>
											<button
												type="button"
												onClick={(e) => {
													e.preventDefault();
													setToggler((prev) => {
														return { ...prev, checkCard: false };
													});
												}}
												className="w-full px-12 py-2 text-lg font-bold bg-transparent border-none rounded-2xl sm:py-3 text-mainColor md:w-1/2"
											>
												{t('ExitPopup.back')}
											</button>
										</div>
									</>
								) : (
									<>
										<div className="w-full space-y-2 courseDetails">
											<div className="flex flex-col justify-between w-full sm:flex-row sm:items-center gap-y-1">
												<h5 className="text-sm ">
													{t('StudentDetails.studentData')}
												</h5>
												{data?.cardCourse?.paymentType === "session" && <span className='text-xs font-semibold sm:text-sm text-textColor__2'>
													{t("homepage.session")} : {`${data?.sessionFees} ${t("homeRev.pound")}`}
												</span>}

												<div className="flex w-full gap-x-2 sm:w-2/3 sm:justify-end">
													<div className='w-2/3 sm:w-auto'>
														<input
															className="border-none bg-[##F9FAFA] text-mainColor font-semibold block  text-sm rounded-lg placeholder:text-textGray placeholder:font-semibold   w-full"
															type="number"
															placeholder={t('Groups.payed')}
															disabled={data?.cardCourse?.paymentType === 'bulk'}
															value={inputPaid}
															onChange={(e) => setinputPaid(e.target.value)}
															onFocus={(e) => {
																e.target.style.border = 'none';
																e.target.style.outline = 'none';
																e.target.style.boxShadow = 'none';
															}}
															max={data?.sessionFees}
														/>
													</div>

													<button
														className={` ${!isValid ? "bg-secondMainColor" : "bg-mainColor"} rounded-lg px-2 py-1  text-white text-size_12 sm:text-sm md:text-base   flex items-center justify-center gap-x-1 w-1/3  sm:w-auto`}
														type="button"
														disable={!isValid}
														onClick={(e) => {
															e.preventDefault();
															takeAttendence();
														}}
													>
														{!attendenceLoading ? (
															<>
																<svg
																	width="16"
																	height="16"
																	viewBox="0 0 16 16"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M9.61539 4.23077V3.15385C9.61539 2.86823 9.50192 2.59431 9.29996 2.39235C9.098 2.19038 8.82408 2.07692 8.53846 2.07692H7.46154M4.76923 11.7692H2.07692C1.79131 11.7692 1.51739 11.6558 1.31542 11.4538C1.11346 11.2518 1 10.9779 1 10.6923V3.15385C1 2.86823 1.11346 2.59431 1.31542 2.39235C1.51739 2.19038 1.79131 2.07692 2.07692 2.07692H3.15385M9.61539 9.61539H12.8462M9.61539 11.7692H12.8462M13.9231 6.38462H8.53846C8.25284 6.38462 7.97892 6.49808 7.77696 6.70004C7.575 6.902 7.46154 7.17592 7.46154 7.46154V13.9231C7.46154 14.2087 7.575 14.4826 7.77696 14.6846C7.97892 14.8865 8.25284 15 8.53846 15H13.9231C14.2087 15 14.4826 14.8865 14.6846 14.6846C14.8865 14.4826 15 14.2087 15 13.9231V7.46154C15 7.17592 14.8865 6.902 14.6846 6.70004C14.4826 6.49808 14.2087 6.38462 13.9231 6.38462ZM7.73077 1H2.88462L3.32615 2.74462C3.35305 2.86138 3.41889 2.96552 3.51284 3.0399C3.60679 3.11427 3.72325 3.15446 3.84308 3.15385H6.77231C6.89213 3.15446 7.0086 3.11427 7.10255 3.0399C7.19649 2.96552 7.26233 2.86138 7.28923 2.74462L7.73077 1Z"
																		stroke="white"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>

																{t('homeRev.takeAtt')}
															</>
														) : (
															<div
																className={`w-6  h-6 border-t-2 text-center border-white border-solid rounded-full animate-spin block`}
															></div>
														)}
													</button>
												</div>
											</div>

											<div className="table rounded-xl overflow-hidden border border-[#E4E4E4] bg-white w-full ">
												<div className="w-full  flex flex-col sm:flex-row sm:border-b sm:border-[#E4E4E4]">
													<div className="group w-full border-b border-b-input_border sm:border-none sm:w-[60%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC] p-2">
															<div className="font-semibold text-size_12 text-textGray">
																{t('Logs.studentName')}
															</div>
															{/* <div className="">{t("Courses.courseName")}</div> */}
														</div>
														<div className="w-[55%] gap-x-1 sm:gap-x-2 h-full flex  items-center justify-center ">


															{data?.card?.student && data?.card?.student?.profileImage !== "" ?
																<span className=''>
																	<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${data?.card?.student?.profileImage}`} alt="profileImage" />
																</span>

																: <ReactSVG src={profile} />}

															<div className="flex flex-col items-start p-2">
																<p className="text-xs font-semibold sm:text-sm text-mainColor">

																	{handleUserName(data?.card?.student?.fullname, 3)}
																</p>
																<p className="font-semibold sm:text-xs text-2xs text-textGray">
																	{data?.card?.student?.code
																		? data?.card?.student?.code
																		: null}
																</p>
															</div>
														</div>
													</div>

													<div className="group w-full border-b border-b-input_border p-2 sm:border-none sm:w-[40%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC]  p-2 flex items-center justify-center">
															<div className="font-semibold text-size_12 text-textGray">
																{t('Logs.studentCase')}
															</div>
															{/* <div className="">{t("SingleCourse.sessionType")}</div> */}
														</div>
														<div className="w-[55%] h-full flex items-center justify-center ">
															<div
																className={`text-sm px-2 py-1 rounded-lg ${data?.prevSession?.isAttended ? 'bg-[#E9FFEF] text-[#409261]' : 'text-[#FF000099] bg-[#FFE9E9]'}  font-semibold`}
															>
																{data?.prevSession ===
																	'this is the first session'
																	? t('Logs.firstSession')
																	: data?.prevSession?.isAttended
																		? t('Logs.attendTrue')
																		: t('Logs.attendFalse')}
															</div>
														</div>
													</div>
												</div>

												<div className="w-full  flex  flex-col sm:flex-row sm:border-b sm:border-[#E4E4E4]">
													<div className="group w-full p-1 border-b border-b-input_border sm:border-none sm:w-[60%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC] p-2">
															<div className="font-semibold text-size_12 text-textGray">
																{t('Logs.studentR')}
															</div>
															{/* <div className="">{t("Courses.courseName")}</div> */}
														</div>
														<div className="w-[55%] h-full flex flex-col items-center justify-center ">
															<div className="">
																<p className="text-sm font-semibold text-mainColor">
																	{data?.cardCourse?.paymentType === 'bulk'
																		? t('homepage.bulk')
																		: t('homepage.Bysession')}
																</p>
															</div>
														</div>
													</div>

													<div className="group p-1 w-full border-b border-b-input_border sm:border-none sm:w-[40%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC]  p-2 flex items-center justify-center">
															<div className="font-semibold text-size_12 text-textGray">
																{t('PopupWindows.dues')}
															</div>
															{/* <div className="">{t("SingleCourse.sessionType")}</div> */}
														</div>
														<div className="w-[55%] h-full flex items-center justify-center ">
															<div className="font-semibold text-size_12 text-mainColor">
																{data?.studentDues
																	? `${data?.studentDues?.price} ${t('homeRev.pound')}`
																	: t("homepage.nothing")}
															</div>
														</div>
													</div>
												</div>

												<div className="w-full  flex  flex-col sm:flex-row sm:border-b sm:border-[#E4E4E4]">
													<div className="group p-1 w-full border-b border-b-input_border sm:border-none sm:w-[60%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC] p-2">
															<div className="font-semibold text-size_12 text-textGray">
																{t('Logs.inCourse')}
															</div>
															{/* <div className="">{t("Courses.courseName")}</div> */}
														</div>
														<div className="w-[55%] h-full flex flex-col items-center justify-center ">
															<div className="">
																<p className="text-sm font-semibold text-mainColor">
																	{data
																		? data?.isInCenterCourse
																			? t('homepage.true')
																			: t('homepage.false')
																		: t("homepage.nothing")}
																</p>
															</div>
														</div>
													</div>

													<div className="group p-1 w-full border-b border-b-input_border sm:border-none sm:w-[40%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC]  p-2 flex items-center justify-center">
															<div className="font-semibold text-size_12 text-textGray">
																{t('Logs.inGroup')}
															</div>
															{/* <div className="">{t("SingleCourse.sessionType")}</div> */}
														</div>
														<div className="w-[55%] h-full flex items-center justify-center ">
															<div className="font-semibold text-size_12 text-mainColor">
																{data
																	? data?.isInGroup
																		? t('homepage.true')
																		: t('homepage.false')
																	: t("homepage.nothing")}
															</div>
														</div>
													</div>
												</div>

												<div className="flex flex-col w-full sm:flex-row">
													<div className="group p-1 w-full border-b border-b-input_border sm:border-none sm:w-[60%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC] p-2">
															<div className="font-semibold text-size_12 text-textGray">
																{t('SingleCourse.disCount')}
															</div>
															{/* <div className="">{t("Courses.courseName")}</div> */}
														</div>
														<div className="w-[55%] h-full flex flex-col items-center justify-center ">
															<div className="">
																<p className="text-sm font-semibold text-mainColor">
																	{data?.cardCourse?.discountPercent
																		? `${data?.cardCourse?.discountPercent} %`
																		: t("homepage.nothing")}
																</p>
															</div>
														</div>
													</div>

													<div className="group p-1 w-full border-b border-b-input_border sm:border-none sm:w-[40%] flex text-center">
														<div className="w-[45%] bg-[#F9FAFC]  p-2 flex items-center justify-center">
															<div className="font-semibold text-size_12 text-textGray">
																{t('homeRev.alertsNums')}
															</div>
															{/* <div className="">{t("SingleCourse.sessionType")}</div> */}
														</div>
														<div className="w-[55%] h-full flex items-center justify-center ">
															<div className="font-semibold text-size_12 text-mainColor">
																{data?.cardCourse?.alerts
																	? data?.cardCourse?.alerts === 0
																		? 0
																		: tens.includes(data?.cardCourse?.alerts)
																			? `${data?.cardCourse?.alerts} ${t('homeRev.alerts')}`
																			: `${data?.cardCourse?.alerts} ${t('homeRev.alert')}`
																	: t("homepage.nothing")}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												if (data && data?.cardCourse && data?.cardCourse?._id) {
													alert();
												}
											}}
											className="flex items-center self-end justify-center px-3 py-1 text-white border-none rounded-lg bg-err gap-x-1 "
										>
											{!alertLoading ? (
												<>
													<svg
														width="15"
														height="14"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M14.758 11.1798L9.10431 0.957974C8.94055 0.666411 8.70632 0.424567 8.42492 0.256499C8.14351 0.0884322 7.82475 0 7.50032 0C7.1759 0 6.85713 0.0884322 6.57573 0.256499C6.29433 0.424567 6.0601 0.666411 5.89634 0.957974L0.242643 11.1798C0.0837442 11.4627 0 11.7846 0 12.1123C0 12.4401 0.0837442 12.7619 0.242643 13.0448C0.404585 13.3379 0.638492 13.5807 0.920363 13.7486C1.20223 13.9164 1.52192 14.0032 1.84662 13.9999H13.154C13.4785 14.0029 13.7979 13.9161 14.0795 13.7482C14.3612 13.5804 14.5949 13.3377 14.7567 13.0448C14.9158 12.762 14.9998 12.4402 15 12.1125C15.0002 11.7847 14.9167 11.4628 14.758 11.1798ZM13.4133 12.2365C13.387 12.2831 13.3491 12.3215 13.3035 12.3476C13.258 12.3736 13.2066 12.3864 13.1547 12.3846H1.84662C1.79471 12.3864 1.74327 12.3736 1.69775 12.3476C1.65223 12.3215 1.61432 12.2831 1.58802 12.2365C1.56572 12.1987 1.55391 12.1553 1.55391 12.111C1.55391 12.0666 1.56572 12.0232 1.58802 11.9854L7.24172 1.76363C7.26972 1.71877 7.30804 1.6819 7.3532 1.65638C7.39836 1.63085 7.44894 1.61748 7.50032 1.61748C7.55171 1.61748 7.60228 1.63085 7.64745 1.65638C7.69261 1.6819 7.73093 1.71877 7.75893 1.76363L13.412 11.9854C13.4345 12.0231 13.4465 12.0665 13.4467 12.1108C13.447 12.1551 13.4354 12.1986 13.4133 12.2365ZM6.72452 7.80773V5.65393C6.72452 5.43972 6.80625 5.23429 6.95174 5.08282C7.09724 4.93135 7.29457 4.84626 7.50032 4.84626C7.70608 4.84626 7.90341 4.93135 8.0489 5.08282C8.19439 5.23429 8.27613 5.43972 8.27613 5.65393V7.80773C8.27613 8.02194 8.19439 8.22738 8.0489 8.37885C7.90341 8.53031 7.70608 8.61541 7.50032 8.61541C7.29457 8.61541 7.09724 8.53031 6.95174 8.37885C6.80625 8.22738 6.72452 8.02194 6.72452 7.80773ZM8.53473 10.5C8.53473 10.713 8.47407 10.9212 8.3604 11.0983C8.24674 11.2754 8.08519 11.4134 7.89618 11.4949C7.70716 11.5764 7.49918 11.5977 7.29852 11.5562C7.09786 11.5146 6.91355 11.4121 6.76889 11.2615C6.62422 11.1109 6.5257 10.919 6.48579 10.7101C6.44588 10.5012 6.46636 10.2847 6.54465 10.0879C6.62295 9.89109 6.75553 9.72291 6.92564 9.60458C7.09574 9.48624 7.29574 9.42308 7.50032 9.42308C7.77467 9.42308 8.03777 9.53654 8.23176 9.7385C8.42575 9.94046 8.53473 10.2144 8.53473 10.5Z"
															fill="white"
														/>
													</svg>

													{t('homeRev.alert')}
												</>
											) : (
												<div
													className={`w-6  h-6 border-t-2 text-center border-white border-solid rounded-full animate-spin block`}
												></div>
											)}
										</button>
									</>
								)}
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
