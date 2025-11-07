import React, { useContext, useEffect, useState } from 'react';
import x from '../../../assets/sanadSVG/Multiply.svg';

import { MainContext } from '../../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel, DialogTitle, Listbox } from '@headlessui/react';
import { useFormik } from 'formik';
import addGroup from '../../../assets/sanadSVG/addGroup.svg';
import downArrowFilter from '../../../assets/sanadSVG/downArrow.svg';
import { ApisContext } from '../../../Context/ApisContext';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import * as Yup from 'yup';
import { BASE_URL } from '../../../Soursre';
import CourseAvatar from "../../CourseAvatar"

export default function AddCourse() {
	// const center = JSON.parse(sessionStorage.getItem('centerid'));
	const [t, i18n] = useTranslation();
	// const { courseId } = useParams();
	const CourseBooking = [
		{ name: t('homepage.open'), value: true },
		{ name: t('homepage.closed'), value: false },
	];

	// const { CourseAvatar } = useContext(SvgsContext);

	const { Toggler, setToggler, ErorrMessage, direction } =
		useContext(MainContext);
	const {
		Course,
		headers,
		sethandleModifyCourse,
		fetchSingleCourse,

	} = useContext(ApisContext);


	const [loading, setloading] = useState(false)

	const [coorseBook, setcoorseBook] = useState(CourseBooking[0]);








	const formik = useFormik({
		initialValues: {
			registerationFees: 0,
			administrationFees: 0,
			// revisionFees: {
			// 	fees: 0,
			// 	centerDues: 0,
			// 	tutorDues: 0,
			// },
			// offlineExamFees: {
			// 	fees: 0,
			// 	centerDues: 0,
			// 	tutorDues: 0,
			// },
			// sessionFees: {
			// 	fees: 0,
			// 	centerDues: 0,
			// 	tutorDues: 0,
			// },
			sessionsPerWeek: 0,
			openForRegistration: coorseBook.value,
		},

		validationSchema: Yup.object({
			registerationFees: Yup.number().required().positive().min(0),
			administrationFees: Yup.number().required().positive().min(0),
			// revisionFees: Yup.object().shape({
			// 	fees: Yup.number()
			// 		.required()
			// 		.positive()
			// 		.min(0)
			// 		.test(
			// 			'calculation',
			// 			'  The sum of center dues and tutor dues must equal fees',
			// 			function (value) {
			// 				const { centerDues, tutorDues } = this.parent;
			// 				const sum = centerDues + tutorDues;
			// 				return sum === value;
			// 			}
			// 		),
			// 	centerDues: Yup.number().required().positive().min(0),
			// 	tutorDues: Yup.number().required().positive().min(0),
			// }),
			// offlineExamFees: Yup.object().shape({
			// 	fees: Yup.number()
			// 		.required()
			// 		.positive()
			// 		.min(0)
			// 		.test(
			// 			'calculation',
			// 			'  The sum of center dues and tutor dues must equal fees',
			// 			function (value) {
			// 				const { centerDues, tutorDues } = this.parent;
			// 				const sum = centerDues + tutorDues;
			// 				return sum === value;
			// 			}
			// 		),
			// 	centerDues: Yup.number().required().positive().min(0),
			// 	tutorDues: Yup.number().required().positive().min(0),
			// }),
			// sessionFees: Yup.object().shape({
			// 	fees: Yup.number()
			// 		.required()
			// 		.positive()
			// 		.min(0)
			// 		.test(
			// 			'calculation',
			// 			'  The sum of center dues and tutor dues must equal fees',
			// 			function (value) {
			// 				const { centerDues, tutorDues } = this.parent;
			// 				const sum = centerDues + tutorDues;
			// 				return sum === value;
			// 			}
			// 		),
			// 	centerDues: Yup.number().required().positive().min(0),
			// 	tutorDues: Yup.number().required().positive().min(0),
			// }),
			sessionsPerWeek: Yup.number().required().positive().min(0),
		}),

		onSubmit: async (values, { resetForm }) => {
			console.log(values)
			if (!fetchSingleCourse.data) {
				return
			}
			try {
				setloading(true)
				const res = await axios.patch(
					`${BASE_URL}centers/${fetchSingleCourse?.data[0]?.center}/center-courses/${fetchSingleCourse?.data[0]?._id}`,
					values,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					sethandleModifyCourse(prev => !prev)
					ErorrMessage(t('Errors.modifyCourse'), 'success');
					setToggler((prev) => {
						return { ...prev, modifyCourse: false };
					});
				}
			} catch (error) {
				ErorrMessage(t('Errors.main'), 'error');
			} finally {
				setloading(false)
			}
		},
	});

	useEffect(() => {
		if (

			fetchSingleCourse.data &&
			fetchSingleCourse?.data[0]
		) {
			const coorseBookValue =

				fetchSingleCourse?.data[0]?.openForRegistration
					? CourseBooking[0]
					: CourseBooking[1];


			setcoorseBook(coorseBookValue)



			formik.setValues({
				registerationFees:
					fetchSingleCourse.data &&
					fetchSingleCourse?.data[0]?.registerationFees,
				administrationFees:
					fetchSingleCourse.data &&
					fetchSingleCourse?.data[0]?.administrationFees,
				// revisionFees: {
				// 	fees:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.revisionFees?.fees,
				// 	centerDues:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.revisionFees?.centerDues,
				// 	tutorDues:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.revisionFees?.tutorDues,
				// },
				// offlineExamFees: {
				// 	fees:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.offlineExamFees?.fees,
				// 	centerDues:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.offlineExamFees?.centerDues,
				// 	tutorDues:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.offlineExamFees?.tutorDues,
				// },
				// sessionFees: {
				// 	fees:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.sessionFees?.fees,
				// 	centerDues:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.sessionFees?.centerDues,
				// 	tutorDues:
				// 		fetchSingleCourse.data &&
				// 		fetchSingleCourse?.data[0]?.sessionFees?.tutorDues,
				// },
				sessionsPerWeek:
					fetchSingleCourse.data && fetchSingleCourse?.data[0]?.sessionsPerWeek,
				openForRegistration: coorseBookValue.value,
				// studentsCount: fetchSingleCourse.data&&fetchSingleCourse?.data[0]?.studentsCount
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchSingleCourse.isFetched, Course, Toggler.modifyCourse]);

	const isError = (dirty, value) => {
		if (dirty && value) {
			return `py-2 sm:py-3 px-6 
                             placeholder:text-err text-err
                        border-err
                           outline-none  focus:outline-none text-size_12 text-sm placeholder:text-size_12 placeholder:sm:text-sm text-start border-[1px]  rounded-xl  placeholder:text-start`;
		} else {
			return `py-2 sm:py-3 px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  focus:outline-none text-size_12 text-sm placeholder:text-size_12 placeholder:sm:text-sm text-start border-[1px] rounded-xl  placeholder:text-start`;
		}
	};
	const isButtonDisabled = !formik.isValid || !fetchSingleCourse?.data
	const close = function () {
		setToggler({ ...Toggler, modifyCourse: false });
	};
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.modifyCourse}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex items-center justify-center min-h-full p-4 b">
						<DialogPanel
							transition
							className="w-full md:w-[80%] lg:w-[60%] 2xl:w-[55%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-2 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, modifyCourse: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="font-medium text-base/7 text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={addGroup} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('Logs.modifyCourse')}
									</h3>
									<p className="text-lg font-semibold text-center text-textColor__2">
										{t('Logs.modifyCourseP')}
									</p>
								</div>
							</DialogTitle>
							<form
								className="flex flex-col gap-2 gap-y-4"
								onSubmit={formik.handleSubmit}
							>
								<div className="flex flex-col w-full gap-2 courseDetails">
									<label className="text-[#4E5556E5] w-full text-start font-semibold text-sm relative">
										{t('PopupWindows.course')}
									</label>

									<div className="flex items-center justify-between px-5 py-2 bg-white shadow rounded-2xl sm:py-3">
										<div className="flex items-center justify-center gap-2">
											<span className="cursor-pointer">
												<CourseAvatar courseName={fetchSingleCourse.data &&
													fetchSingleCourse?.data[0]?.tutorCourse?.courseData
														?.name} />

												{/* {fetchSingleCourse.data &&

												fetchSingleCourse?.data[0]?.tutorCourse?.courseData
													?.image ? (
													<img
														className="w-8 h-8"
														src={
															fetchSingleCourse.data &&
															fetchSingleCourse?.data[0]?.tutorCourse?.courseData
																?.image
														}
														alt="Course"
													/>
												) : (
													<ReactSVG src={avatar} />
												)} */}
											</span>
											<div className="flex flex-col">
												<p className="flex items-center justify-start gap-2 font-bold text-mainColor text-size_12 sm:text-sm">
													{fetchSingleCourse.data &&
														fetchSingleCourse?.data[0]?.tutorCourse?.courseData
															?.name}
												</p>
												<p className="text-size_10 sm:text-xs text-[#9CA3AF]">
													{t('homeRev.grade')}{' '}
													{i18n.language === 'ar'
														? fetchSingleCourse.data &&
														fetchSingleCourse?.data[0]?.tutorCourse?.courseData
															?.grade?.nameAr
														: fetchSingleCourse.data &&
														fetchSingleCourse?.data[0]?.tutorCourse?.courseData
															?.grade?.nameEn}
												</p>
											</div>
										</div>
										<div className="flex flex-col sm:flex-row sm:gap-x-3">
											<p className="text-xs sm:text-sm text-[#9CA3AF]">
												{fetchSingleCourse.data &&
													fetchSingleCourse?.data[0]?.tutorCourse?.term === '0'
													? t('homeRev.highSchool')
													: fetchSingleCourse.data &&
														fetchSingleCourse?.data[0]?.tutorCourse?.term
														? fetchSingleCourse.data &&
															fetchSingleCourse?.data[0]?.tutorCourse?.term ===
															'1'
															? `${t('homeRev.term')} ${t('homeRev.first')}`
															: fetchSingleCourse.data &&
																fetchSingleCourse?.data[0]?.tutorCourse
																	?.term === '2'
																? `${t('homeRev.term')} ${t('homeRev.second')}`
																: fetchSingleCourse.data &&
																fetchSingleCourse?.data[0]?.tutorCourse
																	?.term === '3' &&
																`${t('homeRev.term')} ${t('homeRev.third')}`
														: null}
											</p>
											<p className="text-xs sm:text-sm text-[#9CA3AF]">
												{fetchSingleCourse.data &&
													fetchSingleCourse?.data[0]?.tutorCourse?.tutor
														?.fullname}
											</p>
										</div>
									</div>
								</div>

								<div className="w-full title">
									<p className="text-[#4E5556E5] font-semibold text-sm sm:text-base">
										{t('PopupWindows.dues')}
									</p>
								</div>

								{/* inputs */}

								<div className="flex flex-col items-center gap-y-2 gap-x-4 sm:flex-row">
									<div className="flex flex-col w-full sm:w-1/2 gap-y-2">
										<label
											htmlFor="registerationFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm text-nowrap"
										>
											{t('PopupWindows.registrationDues')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={isError(
												formik.errors.registerationFees,
												formik.touched.registerationFees
											)}
											type="number"
											id="registerationFees"
											name="registerationFees"
											value={formik.values.registerationFees}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>

									<div className="flex flex-col w-full sm:w-1/2 gap-y-2">
										<label
											htmlFor="administrationFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm text-nowrap"
										>
											{t('PopupWindows.administrativeDues')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={isError(
												formik.errors.administrationFees,
												formik.touched.administrationFees
											)}
											type="number"
											id="administrationFees"
											name="administrationFees"
											value={formik.values.administrationFees}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>
								</div>




								<div className="flex flex-col items-center gap-y-2 gap-x-4 sm:flex-row">
									<div className="flex flex-col w-full sm:w-1/2 gap-y-2">
										<label
											htmlFor="registrationDues"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm text-nowrap"
										>
											{t('homepage.bookCourse')}
										</label>

										<Listbox
											value={formik.values.openForRegistration}
											onChange={(ele) => {
												setcoorseBook(ele);
												formik.setFieldValue('openForRegistration', ele.value);
											}}
										>
											{({ open }) => (
												<div className="relative">
													<Listbox.Button
														className={`font-semibold    text-mainColor py-2  sm:py-3 px-2 text-sm leading-5  focus:ring-0
                      relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}
													>
														<span className="absolute top-[50%] translate-y-[-50%] end-4 hidden sm:flex  sm:w-[30px] sm:h-[30px]  rounded-full bg-[#E3EFFF]  items-center justify-center">

															<ReactSVG src={downArrowFilter} />
														</span>

														<span className={`block truncate text-sm px-2`}>
															{coorseBook.name}
														</span>
													</Listbox.Button>

													<Listbox.Options
														className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-base bg-white rounded-md shadow max-h-32 scrollbar-thin ring-1 ring-black/5 focus:outline-none sm:text-sm"
													>
														{CourseBooking?.filter(
															(item) => item?.name !== coorseBook?.name
														)?.map((person, personIdx) => (
															<Listbox.Option
																key={personIdx}
																className={'scrollbar-thin cursor-pointer'}
																value={person}
															>
																{({ selectedDay, active, selected }) => (
																	<>
																		<span
																			className={`block truncate text-xs ${active ? 'bg-mainColor text-white' : null} text-mainColor transition-all py-2 px-2   ${selectedDay ? 'font-medium' : 'font-normal'}`}
																		>
																			{person?.name}
																		</span>
																	</>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</div>
											)}
										</Listbox>
									</div>

									<div className="flex flex-col w-full sm:w-1/2 gap-y-2">
										<label
											htmlFor="sessionsPerWeek"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm text-nowrap"
										>
											{t('PopupWindows.weeklySessions')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={isError(
												formik.errors.sessionsPerWeek,
												formik.touched.sessionsPerWeek
											)}
											type="number"
											id="sessionsPerWeek"
											name="sessionsPerWeek"
											value={formik.values.sessionsPerWeek}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>
								</div>

								{/* 
								<h4 className="text-sm text-textColor__2">
									{t("homepage.sessionDues")}
								</h4>
								<div className="flex flex-col items-center gap-y-2 gap-x-1 xl:gap-x-4 sm:flex-row">
									<div className="flex flex-col w-full sm:w-1/3 gap-y-2 ">
										<label
											htmlFor="sessionFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm"
										>
											{t('PopupWindows.sessionPrice')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={`  px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  focus:outline-none text-start border-[1px] rounded-xl py-2 sm:py-3 text-size_12 sm:text-sm placeholder:text-size_12 placeholder:sm:text-sm placeholder:text-start`}
											type="number"
											id="sessionFees"
											name="sessionFees.fees"
											value={formik.values.sessionFees.fees}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>

										{formik.errors.sessionFees?.fees &&
											formik.touched.sessionFees?.fees && (
												<p className="text-xs text-err">
													{t('Errors.calculationFees')}
												</p>
											)}
									</div>

									<div className="flex flex-col w-full sm:w-1/3 gap-y-2">
										<label
											htmlFor="sessionFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm"
										>
											{t('PopupWindows.centerPercentage')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={`  px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  focus:outline-none text-start border-[1px] rounded-xl py-2 sm:py-3 text-size_12 sm:text-sm placeholder:text-size_12 placeholder:sm:text-sm placeholder:text-start`}
											type="number"
											id="sessionFees"
											name="sessionFees.centerDues"
											value={formik.values.sessionFees.centerDues}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>

									<div className="flex flex-col w-full sm:w-1/3 gap-y-2">
										<label
											htmlFor="sessionFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm"
										>
											{t('PopupWindows.teacherPercentage')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={`  px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  focus:outline-none text-start border-[1px] rounded-xl py-2 sm:py-3 text-size_12 sm:text-sm placeholder:text-size_12 placeholder:sm:text-sm placeholder:text-start`}
											type="number"
											id="sessionFees"
											name="sessionFees.tutorDues"
											value={formik.values.sessionFees.tutorDues}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>
								</div>
								<h4 className="text-sm text-textColor__2">
									{t("homepage.revisionDues")}
								</h4>
								<div className="flex flex-col items-center gap-y-2 gap-x-1 xl:gap-x-4 sm:flex-row">
									<div className="flex flex-col w-full sm:w-1/3 gap-y-2">
										<label
											htmlFor="revisionFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm"
										>
											{t('homepage.revsion')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={`py-2 sm:py-3  px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  focus:outline-none text-start border-[1px] rounded-xl  text-size_12 sm:text-sm placeholder:text-size_12 placeholder:sm:text-sm placeholder:text-start`}
											type="number"
											id="revisionFees"
											name="revisionFees.fees"
											value={formik.values.revisionFees.fees}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>

										{formik.errors.revisionFees?.fees &&
											formik.touched.revisionFees?.fees && (
												<p className="text-xs text-err">
													{t('Errors.calculationFees')}
												</p>
											)}
									</div>

									<div className="flex flex-col w-full sm:w-1/3 gap-y-2 ">
										<label
											htmlFor="revisionFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm"
										>
											{t('PopupWindows.centerPercentage')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={`py-2 sm:py-3  px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  focus:outline-none text-start border-[1px] rounded-xl  text-size_12 sm:text-sm placeholder:text-size_12 placeholder:sm:text-sm placeholder:text-start`}
											type="number"
											id="revisionFees"
											name="revisionFees.centerDues"
											value={formik.values.revisionFees.centerDues}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>

									<div className="flex flex-col w-full sm:w-1/3 gap-y-2 ">
										<label
											htmlFor="revisionFees"
											className="relative w-full font-semibold text-mainColor text-start text-size_12 sm:text-sm"
										>
											{t('PopupWindows.teacherPercentage')}
										</label>
										<input
											placeholder={t('PopupWindows.amount')}
											className={`py-2 sm:py-3  px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  focus:outline-none text-start border-[1px] rounded-xl  text-size_12 sm:text-sm placeholder:text-size_12 placeholder:sm:text-sm placeholder:text-start`}
											type="number"
											id="revisionFees"
											name="revisionFees.tutorDues"
											value={formik.values.revisionFees.tutorDues}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>
								</div> */}










								<div className="flex items-center justify-center mt-2 formBtns gap-x-3">
									<button
										className={`${isButtonDisabled ? 'bg-secondMainColor' : 'bg-mainColor'} text-nowrap text-white text-sm sm:text-base rounded-xl px-10 py-2 sm:py-3 w-1/2 flex items-center justify-center `}
										type="submit"
										disabled={isButtonDisabled}
									>
										{!loading ? (
											t('PopupWindows.confirm')
										) : (
											<div
												className={`w-6  h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type="button"
										onClick={() =>
											setToggler((prev) => {
												return { ...prev, modifyCourse: false };
											})
										}
										className="w-1/2 px-10 py-2 text-sm bg-transparent text-mainColor rounded-xl sm:py-3 sm:text-base"
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
