import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import x from '../../assets/sanadSVG/Multiply.svg';
// import { downArrow, downArrowFilter, filterIcon, timeTableIcon } from "../../Svgs";
import {
	ListboxButton,
	ListboxOptions,
	ListboxOption,
	Listbox,
	Dialog,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import filterIcon from '../../assets/sanadSVG/filterIcon.svg';
import { SvgsContext } from '../../Context/SvgsConetxt';
import { ApisContext } from '../../Context/ApisContext';
import ts from '../../assets/sanadSVG/imgUser2.svg';
import marker from "../../assets/sanadSVG/checked.svg"
import timeTableIcon from '../../assets/sanadSVG/addGroup.svg';
import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';
import { ReactSVG } from 'react-svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL, BASUE_IMAGES } from '../../Soursre';
import CourseAvatar from '../CourseAvatar';
import { useParams } from 'react-router-dom';

export default function BookCourse() {
	const { code } = useParams()

	const [t, i18n] = useTranslation();
	const TYPES = [
		{ name: t('homepage.bulk'), value: 'bulk' },
		{ name: t('homepage.Bysession'), value: 'session' },
	];
	const [selectedType, setselectedType] = useState(TYPES[0]);
	const filteredTypes = TYPES.filter((item) => {
		return item.name !== selectedType.name;
	});

	const registerationFeesTypes = [
		{ name: t('homepage.true'), value: 'true' },
		{ name: t('homepage.false'), value: 'false' },
	];
	const [selectedregisterationFees, setselectedregisterationFees] = useState(
		registerationFeesTypes[0]
	);
	const filteredregisterationFees = registerationFeesTypes.filter((item) => {
		return item.name !== selectedType.name;
	});

	const { Toggler, setToggler, ErorrMessage, direction, handleUserName } =
		useContext(MainContext);
	const { checkedIcon } = useContext(SvgsContext);



	const {
		tens,
		headers,
		fetchTutorsGroups,
		Time,
		selectedCenter,
		sethandleBookCourse,
		fetchTutors,
		fetchSpcificTutorCourses,
		selectedTutorBookCourse,
		setselectedTutorBookCourse,
		selectedCourseINBookCourse,
		setselectedCourseINBookCourse,
	} = useContext(ApisContext);

	// openForRegistration


	const [selected, setSelected] = useState([]);

	const [loading, setloading] = useState(false);

	async function handleSubmit(values, reset) {
		if (selectedCenter && code) {
			console.log('here');
			try {
				setloading(true);

				const res = await axios.post(
					`${BASE_URL}centers/${selectedCenter?._id}/cards/${code}/card-courses`,
					values,
					{ headers: headers }
				);

				console.log(res)
				if (res.status === 200 || res.data.status === 'success') {
					ErorrMessage(t('Errors.CourseSuccess'), 'success');
					sethandleBookCourse((prev) => !prev);
					setToggler({ ...Toggler, bookCourse: false });

				}
			} catch (error) {
				if (
					error.response.data.message ===
					'groups conflict with course requirements'
				) {
					ErorrMessage(t('Errors.groupsConflict'), 'error');
				} else if (
					error.response.data.message === 'conflicting course requirements'
				) {
					ErorrMessage(t('Errors.coursesConflict'), 'error');
				} else if (error.response.data.message === "tutor course already added") {
					ErorrMessage(t('Errors.courseAddedBefore'), 'error');
				}
				else {
					ErorrMessage(t('Errors.main'), 'error');
				}
				console.log(error);
			} finally {
				setloading(false);

			}
		}
	}



	const formik = useFormik({
		initialValues: {
			centerCourseId: '',
			// credits: 0,
			// paymentType: selectedType.value,
			groups: '',
			// discountPercent: '',
			// registerationFees: selectedregisterationFees.value,
		},
		validationSchema: Yup.object({
			centerCourseId: Yup.string().required('Center Course ID is required'),
			// credits: Yup.number().required('Credits are required'),
			// paymentType: Yup.string().required('Payment Type is required'),
			groups: Yup.array()
				.min(1, 'At least one group is required')
				.required('Groups are required'),
			// discountPercent: Yup.number().required('Discount Percent is required'),
			// registerationFees: Yup.string().required('Registration Fees are required'),
		}),

		onSubmit: async (values, { resetForm }) => {
			console.log(values)

			handleSubmit(values, resetForm);

		},
	});


	const isError = (values, Toched) => {
		if (values && Toched) {
			return 'text-err border border-err  placeholder:text-err font-semibold ';
		} else {
			return 'text-mainColor border border-[#E6E9EA] font-semibold  ';
		}
	};

	function close() {
		setToggler({ ...Toggler, bookCourse: false });
		setSelected([]);
		setselectedCourseINBookCourse("");
		setselectedTutorBookCourse("");
		setselectedType(TYPES[0]);
		formik.resetForm()

	}

	useEffect(() => {

		if (Toggler.bookCourse === false) {
			setSelected([]);
			setselectedCourseINBookCourse("");
			setselectedTutorBookCourse("");
			setselectedType(TYPES[0]);
			formik.resetForm()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Toggler.bookCourse])

	// useEffect(() => {
	// 	if (selectedType.value === "session") {
	// 		formik.setFieldValue("credits", 0)

	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [selectedType])
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.bookCourse}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex items-center justify-center min-h-full p-4 b">
						<DialogPanel
							transition
							className="w-full md:w-[80%] lg:w-[60%] 2xl:w-[50%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-2 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, bookCourse: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="font-medium text-base/7 text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={timeTableIcon} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('homepage.bookCourse')}
									</h3>
								</div>
							</DialogTitle>
							<form
								onSubmit={formik.handleSubmit}
								className="relative flex flex-col items-center justify-start gap-y-2"
							>
								<div className="flex flex-col items-center w-full selectBox gap-x-mainGap gap-y-1 sm:gap-y-2 md:flex-row">
									<div className="flex flex-col w-full box md:w-1/2 gap-y-2">
										<label
											htmlFor="teacher"
											className="text-xs font-semibold text-mainColor "
										>
											{t('Logs.teacherNa')}
										</label>

										<Listbox
											value={selectedTutorBookCourse}
											onChange={(ele) => {
												setselectedTutorBookCourse(ele);
											}}
										>
											{({ open }) => (
												<div className="relative ">
													<Listbox.Button
														className={`font-semibold  px-3 py-2  text-sm 
                                                 relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  items-center justify-between  sm:text-sm`}
													>
														<div className="flex items-center gap-x-1">
															{selectedTutorBookCourse ? (
																<>


																	{selectedTutorBookCourse?.profileImage !== "" ?
																		<span className=''>
																			<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${selectedTutorBookCourse?.profileImage}`} alt="profileImage" />
																		</span>

																		:
																		<ReactSVG src={ts} />}

																	<div className="flex flex-col items-start ">
																		<span
																			className={`block truncate  text-mainColor text-sm `}
																		>

																			{handleUserName(selectedTutorBookCourse?.fullname, 3)}
																		</span>
																		<span className="text-xs text-textGray">
																			{selectedTutorBookCourse?.code}
																		</span>
																	</div>
																</>
															) : (
																<span className="text-textGray">
																	{t('homepage.tutorPlaceholder')}
																</span>
															)}
														</div>

														<span className="flex items-center justify-center rounded-full w-7 h-7 bg-bg_mainLayout">
															<ReactSVG src={downArrowFilter} />
														</span>
													</Listbox.Button>

													<Listbox.Options
														className="absolute  mt-1 max-h-32 z-20 overflow-y-auto
                                                        w-full  rounded-md bg-white py-1 scrollbar-thin   focus:outline-none  shadow-md border-[1px] border-borderMainColor"
													>
														{fetchTutors.isFetched ?
															fetchTutors.data.length > 0 ?
																fetchTutors.data?.filter(
																	(item) =>
																		item?.fullname !== selectedTutorBookCourse?.fullname
																)
																	?.map((person, personIdx) => (
																		<Listbox.Option
																			key={personIdx}
																			className={({ active }) =>
																				` relative cursor-pointer select-none py-2 px-2`
																			}
																			value={person}
																		>
																			{({ }) => (
																				<div className="flex items-center justify-between w-full">
																					<div className="flex items-center gap-x-1">
																						{person?.profileImage !== "" ?
																							<span className=''>
																								<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${person?.profileImage}`} alt="profileImage" />
																							</span>

																							:
																							<ReactSVG src={ts} />}

																						<div className="flex flex-col">

																							<span
																								className={`block truncate text-sm text-mainColor ${selectedTutorBookCourse
																									? 'font-medium'
																									: 'font-normal'
																									}`}
																							>
																								{person?.fullname}
																							</span>
																							<span className="text-xs text-textGray ">
																								{person?.code}
																							</span>
																						</div>
																					</div>
																				</div>
																			)}
																		</Listbox.Option>
																	)) : <span className="px-4 text-xs text-center sm:text-sm">{t("homepage.nothing")}</span> :
															<span className="px-4 text-xs text-center sm:text-sm">Wait ...</span>}
													</Listbox.Options>
												</div>
											)}
										</Listbox>
									</div>

									<div className="flex flex-col w-full box md:w-1/2 gap-y-2">
										<label
											htmlFor="centerCourseId"
											className="text-xs font-semibold text-mainColor "
										>
											{t('Courses.courseName')}
										</label>

										<Listbox
											value={selectedCourseINBookCourse}
											disabled={
												selected.length > 0 || formik.values.groups.length > 0
											}
											onChange={(ele) => {
												setselectedCourseINBookCourse(ele);
												console.log(ele);
												formik.setFieldValue('centerCourseId', ele?._id);

											}}
										>
											{({ open }) => (
												<div className="relative ">
													<Listbox.Button
														id="centerCourseId"
														className={`font-semibold px-3 py-2 text-sm 
                                                 relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  items-center justify-between  sm:text-sm`}
													>
														{selectedCourseINBookCourse ? (
															<div className="flex items-center gap-x-1 ">
																<div className="flex flex-col items-start ">
																	<span
																		className={`block truncate text-sm  text-mainColor `}
																	>
																		{handleUserName(selectedCourseINBookCourse?.tutorCourse
																			?.courseData?.name, 4) ||
																			t('homepage.coursePlaceholder')}
																	</span>

																	<div className="flex items-center justify-start text-xs text-textGray text-nowrap">
																		<span>
																			{i18n.language === 'ar'
																				? `${t('homeRev.grade')} ${selectedCourseINBookCourse?.tutorCourse?.courseData?.grade?.nameAr} - `
																				: `${t('homeRev.grade')} ${selectedCourseINBookCourse?.tutorCourse?.courseData?.grade?.nameEn} - `}
																		</span>

																		<span>
																			{selectedCourseINBookCourse?.tutorCourse
																				?.term === '0'
																				? t('homeRev.highSchool')
																				: selectedCourseINBookCourse?.tutorCourse?.term
																					? selectedCourseINBookCourse?.tutorCourse
																						?.term === '1'
																						? `${t('homeRev.term')} ${t('homeRev.first')}`
																						: selectedCourseINBookCourse?.tutorCourse
																							?.term === '2'
																							? `${t('homeRev.term')} ${t('homeRev.second')}`
																							: selectedCourseINBookCourse?.tutorCourse
																								?.term === '3' &&
																							`${t('homeRev.term')} ${t('homeRev.third')}`
																					: null}
																		</span>
																	</div>
																</div>
															</div>
														) : (
															<span className="text-textGray">
																{t('homepage.coursePlaceholder')}
															</span>
														)}

														<span className="flex items-center justify-center rounded-full w-7 h-7 bg-bg_mainLayout">
															<ReactSVG src={downArrowFilter} />
														</span>
													</Listbox.Button>

													<Listbox.Options
														className="absolute  mt-1 max-h-40 z-20 overflow-y-auto
                                                        w-full  rounded-md bg-white py-1 scrollbar-thin   focus:outline-none  shadow-md border-[1px] border-borderMainColor"
													>
														{fetchSpcificTutorCourses.isFetched ?
															fetchSpcificTutorCourses.data?.length > 0 ?
																fetchSpcificTutorCourses.data
																	?.filter(
																		(item) =>
																			item?.tutorCourse?.courseData?.name !==
																			selectedCourseINBookCourse?.tutorCourse?.courseData
																				?.name
																	)
																	?.map((person, personIdx) => (
																		<Listbox.Option
																			key={personIdx}
																			className={({ active }) =>
																				` relative cursor-pointer select-none py-2 px-2`
																			}
																			value={person}
																		>
																			{({ selected }) => (
																				<div className="flex items-center justify-between w-full">
																					<div className="flex items-center gap-x-1">
																						{/* {CourseAvatar(18, 18)} */}
																						<CourseAvatar courseName={person?.tutorCourse?.courseData?.name} w={20} h={20} />

																						<div className="flex flex-col items-start">
																							<span
																								className={`block truncate text-xs 2xl:text-sm text-mainColor ${selectedCourseINBookCourse
																									? 'font-medium'
																									: 'font-normal'
																									}`}
																							>
																								{
																									person?.tutorCourse?.courseData
																										?.name
																								}
																							</span>
																							<span className=" text-textGray text-[10px] 2xl:text-xs">
																								{i18n.language === 'ar'
																									? `${t('homeRev.grade')}  ${person?.tutorCourse?.courseData?.grade?.nameAr}
                                                                                -`
																									: ` ${t('homeRev.grade')} ${person?.tutorCourse?.courseData?.grade?.nameEn}
                                                                                -`}

																								{person?.tutorCourse
																									?.term === '0'
																									? t('homeRev.highSchool')
																									: person?.tutorCourse?.term
																										? person?.tutorCourse
																											?.term === '1'
																											? `${t('homeRev.term')} ${t('homeRev.first')}`
																											: person?.tutorCourse
																												?.term === '2'
																												? `${t('homeRev.term')} ${t('homeRev.second')}`
																												: person?.tutorCourse
																													?.term === '3' &&
																												`${t('homeRev.term')} ${t('homeRev.third')}`
																										: t("homepage.nothing")}
																							</span>
																						</div>
																					</div>

																					<span>
																						{selected ? checkedIcon() : ''}
																					</span>
																				</div>
																			)}
																		</Listbox.Option>
																	)) : <span className='w-full px-4 text-xs text-center sm:text-sm '>{t("homepage.nothing")}</span> : <span className='w-full px-4 text-xs text-center sm:text-sm '> Wait ...</span>}
													</Listbox.Options>
												</div>
											)}
										</Listbox>
									</div>
								</div>

								<div className="flex flex-col w-full gap-y-2">
									<h6 className="mb-1 text-sm text-textColor__2">
										{t('homepage.bookd')}
									</h6>
									<div className="w-full">
										<div className="flex flex-col w-full groups gap-y-2">
											<label
												htmlFor="groups"
												className="text-xs font-semibold text-mainColor "
											>
												{t('homepage.groupsNumber')}
												{selectedCourseINBookCourse?.sessionsPerWeek ? (
													<span className="text-xs">
														{` - ${t('homepage.must')} (${selectedCourseINBookCourse?.sessionsPerWeek > 0 ? tens.includes(selectedCourseINBookCourse?.sessionsPerWeek) ? `${selectedCourseINBookCourse?.sessionsPerWeek} ${t("homepage.groups")}` : `${selectedCourseINBookCourse?.sessionsPerWeek} ${t("homepage.group")}` : null})`}
													</span>
												) : null}

											</label>
											<div className="relative ">
												<Listbox
													// value={selectedCenter}
													onChange={(e) => {
														// setselectedCenter(e)
														// sessionStorage.clear()
														// sessionStorage.setItem("centerid", JSON.stringify(e))
														let x = e?.map((item) => {
															return item?._id;
														});
														setSelected(x);
														formik.setFieldValue('groups', x);
													}}
													multiple
												>
													{({ open }) => (
														<div className="relative ">
															<ListboxButton
																id="groups"
																className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   text-mainColor border-input_border border-[1px]          sm:py-3  text-sm
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm `}
															>
																<div className="flex items-center ps-2 sm:p-0 gap-x-2">
																	<ReactSVG src={filterIcon} />

																	<span
																		className={`block truncate text-sm text-mainColor`}
																	>
																		{selected?.length > 0
																			? tens.includes(selected?.length)
																				? `${selected?.length} ${t('homepage.choises')}`
																				: `${selected?.length} ${t('homepage.oneChoise')}`
																			: t('homepage.choise')}
																		{/*  : t("homepage.wait") */}
																	</span>
																</div>

																<ReactSVG src={downArrowFilter} />
															</ListboxButton>

															<ListboxOptions
																className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-base bg-white rounded-md shadow max-h-40 scrollbar-thin focus:outline-none sm:text-sm "
															>
																{fetchTutorsGroups.isFetched ?
																	fetchTutorsGroups.data?.length > 0 ? (
																		fetchTutorsGroups.data?.map(
																			(item, personIdx) => (
																				<ListboxOption
																					key={personIdx}
																					value={item}
																					className={({ active, selected }) =>
																						`  select-none relative py-2 pe-10 ps-4    text-mainColor font-bold cursor-pointer`
																					}
																				>
																					{({ selected }) => (
																						<>
																							<div
																								className={`flex   lg:w-full justify-between items-center gap-x-6  ${selected
																									? 'font-medium'
																									: 'font-normal'
																									}`}
																							>
																								<p className="hidden text-xs sm:block ">{`${t('homepage.group')} ${item?.groupNumber} `}</p>

																								<p className="text-xs ">
																									{item?.dayOfWeek === 0 &&
																										t('homepage.sunday')}
																									{item?.dayOfWeek === 1 &&
																										t('homepage.monday')}
																									{item?.dayOfWeek === 2 &&
																										t('homepage.tuesday')}
																									{item?.dayOfWeek === 3 &&
																										t('homepage.wednesday')}
																									{item?.dayOfWeek === 4 &&
																										t('homepage.thursday')}
																									{item?.dayOfWeek === 5 &&
																										t('homepage.friday')}
																									{item?.dayOfWeek === 6 &&
																										t('homepage.saturday')}
																								</p>

																								<div className="flex items-center gap-x-1 ">
																									<p className="text-xs">
																										{Time(item?.startTime)}
																									</p>
																									:
																									<p className="text-xs">
																										{Time(item?.endTime)}
																									</p>
																								</div>

																								<div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${selected && "bg-mainColor"}   rounded-md`}>
																									{selected &&
																										<ReactSVG src={marker} />
																									}
																								</div>
																							</div>
																						</>
																					)}
																				</ListboxOption>
																			)
																		)
																	) : (
																		<span className="w-full p-2 px-4 text-xs font-bold text-center text-textGray ">
																			{t('homepage.nothing')}
																		</span>
																	) : (
																		<span className="w-full p-2 px-4 text-xs font-bold text-center text-textGray ">
																			wait ...
																		</span>)}
															</ListboxOptions>
														</div>
													)}
												</Listbox>
											</div>
										</div>
									</div>

								</div>

								<div className="flex items-center justify-center w-full mt-4 formBtns gap-x-3">
									<button
										disabled={!(formik.isValid && formik.dirty)}
										type="submit"
										className={`text-white ${!(formik.isValid && formik.dirty) ? 'bg-secondMainColor ' : 'bg-mainColor '}   text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
									>
										{!loading ? (
											t('SingleGroup.add')
										) : (
											<div
												className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, bookCourse: false };
											});
										}}
										className="w-full px-10 py-2 text-lg bg-transparent text-mainColor rounded-2xl sm:py-3 md:w-1/2"
									>
										{t('homepage.back')}
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
