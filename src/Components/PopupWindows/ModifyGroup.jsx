import React, { useContext, useState, useEffect } from 'react';
import x from '../../assets/sanadSVG/Multiply.svg';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import Groups from '../../assets/sanadSVG/groups.svg';
import downArrow from '../../assets/sanadSVG/downArrow.svg';
import { ReactSVG } from 'react-svg';
import { Dialog, DialogPanel, DialogTitle, Listbox } from '@headlessui/react';
import { useFormik } from 'formik';
import { ApisContext } from '../../Context/ApisContext';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../../Soursre';
import { useParams } from 'react-router-dom';

import { MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'; // Import TimePicker from @mui/x-date-pickers
// import TextField from '@mui/material/TextField';
// import dayjs from 'dayjs'; // Import dayjs for date manipulation
import CourseAvatar from "../CourseAvatar"
export default function ModifyGroup() {
	let [t, i18n] = useTranslation();
	const { groupId } = useParams();
	const cashedCenter = JSON.parse(sessionStorage.getItem('centerid'));
	const Arr = [
		{ day: t('homepage.sunday'), num: 0 },
		{ day: t('homepage.monday'), num: 1 },
		{ day: t('homepage.tuesday'), num: 2 },
		{ day: t('homepage.wednesday'), num: 3 },
		{ day: t('homepage.thursday'), num: 4 },
		{ day: t('homepage.friday'), num: 5 },
		{ day: t('homepage.saturday'), num: 6 },
	];
	const { Toggler, setToggler, ErorrMessage, direction, handleUserName } =
		useContext(MainContext);

	const {
		headers,

		fetchSingleGroup,

		courseDetails,
		sethandleModifyGroup,
	} = useContext(ApisContext);
	// const [theDate, setTheDate] = useState('');
	// const [dropDownMenu, setDropDownMenu] = useState(false);
	// const [dropDownMenu1, setDropDownMenu1] = useState(false);

	// function toggleDropDownMenu() {
	// 	setDropDownMenu((dropDownMenu) => !dropDownMenu);
	// }
	// function toggleDropDownMenu1() {
	// 	setDropDownMenu1((dropDownMenu1) => !dropDownMenu1);
	// }
	// function CloseAllMenus() {
	// 	setDropDownMenu(false);
	// 	setDropDownMenu1(false);
	// }
	const centerId = fetchSingleGroup.data ? fetchSingleGroup.data?.center?._id : cashedCenter?._id
	const [selectedDay, setselectedDay] = useState(Arr[0] || '');
	const filteredArr =
		Arr?.filter((item) => item.day !== selectedDay?.day) || [];
	// const now = dayjs();
	// const twoHoursLater = now.add(2, 'hour');
	const [Time, setTime] = useState({
		startTime: "",
		endTime: "",
	});

	const [loading, setloading] = useState(false)
	const formik = useFormik({
		initialValues: {
			maxStudents: '',
			dayOfWeek: '',
			startTime:
				dayjs(fetchSingleGroup.data?.startTime) || Time.startTime.toISOString(),
			endTime:
				dayjs(fetchSingleGroup.data?.endTime) || Time.endTime.toISOString(),
		},
		validationSchema: Yup.object({
			maxStudents: Yup.number().required(),
			dayOfWeek: Yup.number().required(),
			startTime: Yup.string().required(),
			endTime: Yup.string().required(),
		}),
		onSubmit: async (values, { resetForm }) => {
			console.log(values);
			try {
				setloading(true)
				console.log(centerId)
				const res = await axios.patch(
					`${BASE_URL}centers/${centerId}/groups/${groupId}`,
					values,
					{ headers: headers }
				);
				console.log(res);
				if (res.status === 200 || res.status === 'success') {
					ErorrMessage(t('Errors.modifyGroup'), 'success');

					sethandleModifyGroup((prev) => !prev);
					setToggler({ ...Toggler, modifyGroup: false });
				}
			} catch (error) {
				console.log(error);
				ErorrMessage(t('Errors.main'), 'error');
			} finally {
				setloading(false)
			}

			resetForm();
		},
	});


	const isButtonDisabled = !(formik.isValid || formik.dirty || centerId);

	// function toISO(time) {
	//     const dateArr = time.split(':');
	//     const hours = dateArr[0];
	//     const minutes = dateArr[1];
	//     return new Date(new Date().setHours(parseInt(hours), parseInt(minutes))).toISOString()
	// }

	useEffect(() => {

		const dayOfWeek = fetchSingleGroup.data?.dayOfWeek;
		const selectedDay = Arr.find((item) => item.num === dayOfWeek) || Arr[0];
		setselectedDay(selectedDay);

		setTime({
			startTime: dayjs(fetchSingleGroup.data?.startTime),
			endTime: dayjs(fetchSingleGroup.data?.endTime),
		});

		formik.setValues({
			...formik.values,
			maxStudents: fetchSingleGroup.data?.maxStudents || 0,
			dayOfWeek: selectedDay?.num,
			startTime: dayjs(fetchSingleGroup.data?.startTime),
			endTime: dayjs(fetchSingleGroup.data?.endTime),
		});


	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchSingleGroup.data, fetchSingleGroup.isFetched, Toggler.modifyGroup]);

	// const courseDetails = fetchSingleCourse.data[0]

	function close() {
		setToggler({ ...Toggler, modifyGroup: false });
	}
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.modifyGroup}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4 py-8">
						<DialogPanel
							transition
							className="w-full md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-2 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, modifyGroup: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={Groups} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('homeRev.modifyGroup')}
									</h3>
									<p className="text-md text-textColor__2 font-semibold text-center">
										{t('SingleCourse.modifyGroupP')}
									</p>
								</div>
							</DialogTitle>

							{/*body*/}
							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col gap-y-3"
							>
								<div className="flex flex-col gap-2 w-full">
									<h5 className="text-[#4E5556E5] w-full text-start font-semibold text-sm relative">
										{t('PopupWindows.course')}
									</h5>

									<div className="flex bg-white justify-between items-center rounded-2xl py-2 sm:py-3 px-5 shadow">
										<div className="flex gap-2 items-center justify-center">
											<CourseAvatar courseName={courseDetails?.tutorCourse?.courseData?.name} />
											<div className="flex flex-col">
												<p className="font-bold text-mainColor text-size_12 sm:text-sm  flex justify-start items-center gap-2">

													{handleUserName(courseDetails?.tutorCourse?.courseData?.name, 4)}
												</p>
												<p className="text-size_10 sm:text-xs text-[#9CA3AF]">
													{i18n.language === 'ar'
														? courseDetails?.tutorCourse?.courseData?.grade
															?.nameAr
														: courseDetails?.tutorCourse?.courseData?.grade
															?.nameEn}
												</p>
											</div>
										</div>
										<div className="flex flex-col sm:flex-row sm:gap-x-3">
											<p className="text-xs sm:text-sm text-[#9CA3AF]">
												{courseDetails?.tutorCourse?.term === '0'
													? t('homeRev.highSchool')
													: courseDetails?.tutorCourse?.term
														? courseDetails?.tutorCourse?.term === '1'
															? `${t('homeRev.term')} ${t('homeRev.first')}`
															: courseDetails?.tutorCourse?.term === '2'
																? `${t('homeRev.term')} ${t('homeRev.second')}`
																: courseDetails?.tutorCourse?.term === '3' &&
																`${t('homeRev.term')} ${t('homeRev.third')}`
														: null}
											</p>
											<p className="text-xs sm:text-sm text-[#9CA3AF]">

												{handleUserName(courseDetails?.tutorCourse?.tutor?.fullname, 3)}
											</p>
										</div>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row gap-2 items-center">
									<div className="lg:w-2/3 sm:w-1/2 w-full flex flex-col gap-y-1  relative z-[59]">
										<label
											htmlFor="day"
											className="text-mainColor w-full text-start font-semibold text-sm relative"
										>
											{t('PopupWindows.day')}
										</label>

										<Listbox
											value={selectedDay}
											onChange={(value) => {
												setselectedDay(value);
												formik.setFieldValue('dayOfWeek', value.num);
											}}

										// value={selectedDay}
										// onChange={(value) => {
										//     setselectedDay(value);
										//     formik.setFieldValue("dayOfWeek", value);
										// }}
										>
											{({ open }) => (
												<div className="relative">
													<Listbox.Button
														className={`font-semibold   text-mainColor py-2  sm:py-3 px-2 text-sm leading-5  focus:ring-0
                      relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}
													>
														<span className="absolute top-[50%] translate-y-[-50%] end-4 hidden sm:flex  sm:w-[30px] sm:h-[30px]  rounded-full bg-[#E3EFFF]  items-center justify-center">

															<ReactSVG src={downArrow} />


														</span>

														<span className={`block truncate text-sm px-2`}>
															{selectedDay?.day}
														</span>
													</Listbox.Button>

													<Listbox.Options
														className="absolute  mt-1 max-h-32 z-10 
                        scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow"
													>
														{filteredArr?.map((person, personIdx) => (
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
																			{person?.day}
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

									<div className="flex flex-col lg:w-1/3 w-full sm:w-1/2 gap-y-1">
										<label
											htmlFor="maxStudents"
											className="text-mainColor w-full text-start font-semibold text-sm relative flex justify-start items-baseline"
										>
											{t('PopupWindows.maxStudents')}{' '}
											<span className="font-medium text-mainColor text-2xs">
												- {t('PopupWindows.optional')}
											</span>
										</label>
										<input
											placeholder={t('PopupWindows.20student')}
											className={`py-2 sm:py-3 px-6 
                             placeholder:text-textGray
                        border-[#E6E9EA]
                           outline-none  text-start border-[1px] rounded-xl focus:border-mainColor border-solid focus:border-[1px] placeholder:text-start focus:shadow-none placeholder:text-size_12 placeholder:sm:text-smn text-size_12 sm:text-sm  ${formik.errors.maxStudents ? 'text-err border border-err outline-none focus:outline-none placeholder:text-err' : 'text-mainColor'}`}
											type="number"
											id="maxStudents"
											name="maxStudents"
											value={formik.values.maxStudents}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>
								</div>

								<div className="w-full flex justify-between items-center">
									<p className="text-[#4E5556E5] font-semibold text-sm">
										{t('PopupWindows.schedules')}
									</p>
								</div>

								<div className="flex flex-col sm:flex-row w-full gap-x-2">
									<div className="date   flex gap-y-1 flex-col w-full sm:w-1/2   relative">
										<label
											htmlFor="startTime"
											className={`text-[#023E8A] w-full text-start font-semibold text-sm relative flex`}
										>
											{t('PopupWindows.start')}
										</label>
										<div id="mGroupStartTime" className="w-full">
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<MobileTimePicker
													className="w-full "
													defaultValue={Time.startTime}
													// disabled={isError && isError.value === 'start'}
													// format="YYYY-MM-DD :hh:mm"
													onChange={(e) => {
														// setvalues({ ...values, startTime: e })
														// setstartTime(e)
														formik.setFieldValue('startTime', e.toISOString());
													}}
												/>
											</LocalizationProvider>
										</div>
									</div>

									<div className="date flex gap-y-1 flex-col w-full sm:w-1/2  relative">
										<label
											htmlFor="endTime"
											className={`text-[#023E8A] w-full text-start font-semibold text-sm relative flex`}
										>
											{t('PopupWindows.end')}
										</label>

										<div id="mGroupEndTime" className="w-full">
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<MobileTimePicker
													className="w-full"
													defaultValue={Time.endTime}
													// disabled={isError && isError.value === 'start'}
													// format="YYYY-MM-DD :hh:mm"
													onChange={(e) => {
														// setendTime(e)
														formik.setFieldValue('endTime', e.toISOString());
													}}
												/>
											</LocalizationProvider>
										</div>
									</div>


								</div>

								<div className="formBtns flex  gap-x-3 justify-center items-center">
									<button
										type="submit"
										disabled={isButtonDisabled}
										className={`${isButtonDisabled ? 'bg-secondMainColor' : 'bg-mainColor'} text-white rounded-2xl px-10 flex items-center justify-center text-sm text-nowrap py-2 sm:py-3  w-full md:w-1/2 sm:text-base`}
									>
										{!loading ? (
											t('homeRev.modifyGroup')
										) : (
											<div
												className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, modifyGroup: false };
											});
										}}
										className="bg-transparent text-mainColor rounded-2xl px-10 text-sm text-nowrap py-2 sm:py-3 w-full md:w-1/2 sm:text-base"
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
