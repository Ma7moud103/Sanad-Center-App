import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Disclosure, Listbox } from '@headlessui/react';
import Pagination from '../Pagination/Pagination';
import { MainContext } from '../../Context/MainContext';
import { SvgsContext } from '../../Context/SvgsConetxt';
import { ApisContext } from '../../Context/ApisContext';

import { ReactSVG } from 'react-svg';
import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';
import sort from '../../assets/sanadSVG/sort.svg';
import imgUser from '../../assets/sanadSVG/imgUser.svg';
import axios from 'axios';
import { BASE_URL, BASUE_IMAGES } from '../../Soursre';
import teacherProfile from '../../assets/sanadSVG/imgUser2.svg';
import leftarrow from '../../assets/sanadSVG/leftArrow.svg'
import deleteIcon from "../../assets/sanadSVG/delet.svg"

import CourseAvatar from "../CourseAvatar"
// import { useParams } from 'react-router-dom';
import Post from '../Skeletons/Post';
function SingleStudent() {
	const [t, i18n] = useTranslation();
	// const { code } = useParams()

	const grade3 = [
		{ name: t('homeRev.highSchool'), value: '0' },
		{ name: t('homeRev.third'), value: '3' },
	];


	const arr5 = [1, 1, 1, 1, 1];
	const { Toggler, setToggler, ErorrMessage, handleUserName, setcardCourseId, } = useContext(MainContext);


	const {
		selectedTerm, setselectedTerm, terms, setterms, terms3, fetchSingleStudent,
		tens,
		MainLoading,
		studentGrades,
		setstudentData,
		Time,
		selectedCenter,
		headers,
		selectedGradeSt,
		setselectedGradeSt,
		studentCourses,
		fetchStudentCourses,
		studentData,
		boockedCourseReq,
		setboockedCourseReq
	} = useContext(ApisContext);
	const { leftArrow, bookCourse, dollarSign, profile, edit, del } =
		useContext(SvgsContext);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};



	const filteredGrade = studentGrades?.filter((item) => {
		return item?.nameAr !== selectedGradeSt?.nameAr;
	});


	// Calculate the start and end indexes for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, studentCourses?.length);
	const visibleData2 = studentCourses?.slice(startIndex, endIndex);

	const [btnLoading, setbtnLoading] = useState(false);
	async function handleBookCard() {
		if (selectedCenter && studentData) {
			try {
				setbtnLoading(true);
				const res = await axios.patch(
					`${BASE_URL}cards/${studentData?.code}`,
					{
						centerId: selectedCenter?._id,
						term: selectedTerm?.value,
						gradeId: selectedGradeSt?._id,
					},
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					ErorrMessage(t('Errors.bookCourseS'), 'success');
					// sessionStorage.setItem("studentsDetails" , JSON.stringify(res.data))

					if (res.data.receipts[0]?.code === studentData?.code) {
						setstudentData(res.data.receipts[0])
						sessionStorage.setItem(
							'studentsDetails',
							JSON.stringify(res.data.receipts[0])
						);
					}
				}

			} catch (error) {
				console.log(error);
				if (error.response.data.message === 'card issued before or not found') {
					ErorrMessage(t('Errors.errCard'), 'error');
				} else {
					ErorrMessage(t('Errors.main'), 'error');
				}
			} finally {
				setbtnLoading(false);
			}
		}
	}

	const [modifyCardLoading, setmodifyCardLoading] = useState(false)
	async function handleModifyCard() {
		if (selectedCenter && studentData) {
			try {
				setmodifyCardLoading(true);
				const res = await axios.put(
					`${BASE_URL}cards/${studentData?.code}`,
					{
						centerId: selectedCenter?._id,
						term: selectedTerm?.value,
						gradeId: selectedGradeSt?._id,
					},
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					ErorrMessage(t('Errors.bookCourseS'), 'success');

					if (res.data.data?.code === studentData?.code) {
						setstudentData(res.data.data)

						sessionStorage.setItem(
							'studentsDetails',
							JSON.stringify(res.data.data)
						);
					}
				}


			} catch (error) {
				console.log(error);
				if (error.response.data.message === 'card issued before or not found') {
					ErorrMessage(t('Errors.errCard'), 'error');
				} else {
					ErorrMessage(t('Errors.main'), 'error');
				}
			} finally {
				setmodifyCardLoading(false);
			}
		}
	}


	useEffect(() => {
		(() => {

			if (
				selectedGradeSt?.nameAr === 'الثالث الثانوي' ||
				selectedGradeSt?.nameEn === 'secondary 3'
			) {
				setterms(grade3);
				setselectedTerm({ name: t('homeRev.highSchool'), value: '0' });
			} else {
				setterms(terms3);
				setselectedTerm({ name: t('homeRev.first'), value: '1' });
			}

		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedGradeSt]);




	return (
		<>
			<div
				className={`w-full xl:bg-white rounded-lg flex flex-col xl:px-6 pt-6 gap-y-8 h-auto py-5`}
			>
				<div className="flex items-center justify-between header ">
					<div className="flex flex-col gap-3 main">
						<p className="font-extrabold text-size_24 md:text-size_28 text-mainColor">
							{t('StudentDetails.studentData')}
						</p>
					</div>
				</div>

				<div className="largeScreen hidden xl:flex flex-col h-[70%] relative ">
					{/* {!MainLoading.GroupsLoading ? <> */}

					{fetchSingleStudent.isFetched ? (
						<>

							<div className="Header bg-[#F4F7FE] p-6 border border-[#E1E1E1]   rounded-2xl rounded-b-none flex justify-between">
								<p className="w-1/6 text-sm text-start text-textGray">
									{t('Logs.studentName')}
								</p>
								<p className="w-1/6 text-sm text-start text-nowrap text-textGray">
									{t('PopupWindows.cardCode')}
								</p>
								<p className="w-1/6 text-sm text-start text-textGray">
									{t('Logs.stuphone')}
								</p>

								<p className="w-1/6 text-sm text-start text-textGray">
									{t('Logs.parentPhone')}
								</p>
								<p className="w-1/6 text-sm text-start text-textGray">
									{t('Logs.educationalStage')}
								</p>
								<p className="w-1/6 text-sm text-start text-textGray">
									{t('Courses.semester')}
								</p>
							</div>

							{!MainLoading.scanBtn ? (

								<div className="py-[22px] px-6 w-full border-[#E1E1E1] border border-t-0 rounded-b-2xl lg:gap-x-4  flex items-center justify-between relative">
									{/* <div className="flex w-1/5 gap-2 text-start"> */}

									<div className="flex items-center w-1/6 font-bold nameLesson gap-x-2">

										{studentData?.student && studentData?.student?.profileImage !== "" ?
											<span className=''>
												<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${studentData?.student?.profileImage}`} alt="profileImage" />
											</span>

											: profile(33, 33)}
										<div>
											<p className="text-sm text-mainColor text-start">
												{studentData?.student?.fullname
													?.split(' ')
													?.slice(0, 2)
													?.join(' ')}
											</p>
											<p className="text-xs text-textGray text-start 2xl:text-sm">
												{studentData?.student?.code}
											</p>
										</div>
									</div>

									<p className="w-1/6 text-sm font-bold nameLesson text-mainColor text-start text-nowrap">
										{studentData?.code}
									</p>
									<p className="w-1/6 text-sm font-bold nameLesson text-mainColor text-start text-nowrap">
										{studentData?.student?.phoneNumber
											? studentData?.student?.phoneNumber
											: ''}
									</p>

									{/* </div> */}
									<p className="w-1/6 text-sm font-semibold files text-mainColor text-nowrap">
										{studentData?.parentPhoneNumber
											? studentData?.parentPhoneNumber
											: ''}
									</p>

									<div className="w-1/6 text-sm font-semibold grade text-textGray text-start text-nowrap">
										{(studentData?.student && studentData?.grade && studentData?.term) || studentCourses?.length > 0 ? (
											i18n.language === 'ar' ? (
												studentData?.grade?.nameAr
											) : (
												studentData?.grade?.nameEn
											)
										) : (
											<Listbox
												value={selectedGradeSt}
												onChange={(value) => {
													setselectedGradeSt(value);
												}}
											>
												{({ open }) => (
													<div className="relative w-full">
														<Listbox.Button
															className={`font-semibold shadow-sm border-input_border border-[1px]    text-mainColor px-4  text-sm leading-5  focus:ring-0  items-center 
                                                                            relative w-full flex cursor-pointer rounded-lg bg-bg_mainLayout py-2 text-left focus:outline-none  sm:text-sm justify-between`}
														>
															<div className="flex items-center gap-x-3">
																{/* <div className="flex items-center justify-center">
                                                                    <ReactSVG src={filterIcon} />
                                                                </div> */}

																<span
																	className={`block truncate text-[10px] lg:text-xs xl:text-sm`}
																>

																	{i18n.language === "ar" ? selectedGradeSt?.nameAr : selectedGradeSt?.nameEn}
																</span>
															</div>

															{<ReactSVG src={downArrowFilter} />}
														</Listbox.Button>

														<Listbox.Options
															className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-base rounded-md shadow max-h-40 scrollbar-thin bg-bg_mainLayout ring-1 ring-black/5 focus:outline-none sm:text-sm"
														>
															{filteredGrade.map((person, personIdx) => (
																<Listbox.Option
																	key={personIdx}
																	className={({ active }) =>
																		` relative cursor-pointer select-none py-2   px-4  ${active ? 'bg-mainColor text-white' : 'text-mainColor'}`
																	}
																	value={person}
																>
																	{({ selectedGradeSt }) => (
																		<span
																			className={`block text-[11px] truncate ${selectedGradeSt ? 'font-medium' : 'font-normal'}`}
																		>
																			{i18n.language === "ar" ? person?.nameAr : person?.nameEn}
																		</span>
																	)}
																</Listbox.Option>
															))}
														</Listbox.Options>
													</div>
												)}
											</Listbox>
										)}
									</div>
									<div className="w-1/6 text-sm font-semibold term text-textGray text-start text-nowrap">


										{(studentData?.student && studentData?.grade && studentData?.term) || studentCourses?.length > 0 ? (
											studentData?.term === '0' ? (
												t('homeRev.highSchool')
											) : studentData?.term ? (
												studentData?.term === '1' ? (
													`${t('homeRev.term')} ${t('homeRev.first')}`
												) : studentData?.term === '2' ? (
													`${t('homeRev.term')} ${t('homeRev.second')}`
												) : (
													studentData?.term === '3' &&
													`${t('homeRev.term')} ${t('homeRev.third')}`
												)
											) : null
										) : (
											<Listbox
												value={selectedTerm}
												onChange={(value) => {
													setselectedTerm(value);

												}}
											>
												{({ open }) => (
													<div className="relative w-full">
														<Listbox.Button
															className={`font-semibold    text-mainColor px-4 py-2 shadow-sm border-input_border bordre-[1px]  text-sm leading-5  focus:ring-0  items-center 
                                                                            relative w-full flex cursor-pointer rounded-lg bg-bg_mainLayout justify-between text-left focus:outline-none  sm:text-sm`}
														>
															<div className="flex items-center gap-x-3">
																{/* <div className="flex items-center justify-center">
                                                                    <ReactSVG src={filterIcon} />
                                                                </div> */}

																<span
																	className={`block truncate text-[10px] lg:text-xs xl:text-sm `}
																>
																	{/* {selectedTerm.value === 0 ? selectedTerm.name : `${t("homeRev.term")} ${selectedTerm?.name}`} */}
																	{selectedTerm.name}
																</span>
															</div>

															{<ReactSVG src={downArrowFilter} />}
														</Listbox.Button>

														<Listbox.Options
															className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-base rounded-md shadow max-h-40 scrollbar-thin bg-bg_mainLayout ring-1 ring-black/5 focus:outline-none sm:text-sm"
														>
															{terms
																?.filter(
																	(item) => item.name !== selectedTerm.name
																)
																?.map((person, personIdx) => (
																	<Listbox.Option
																		key={personIdx}
																		className={({ active }) =>
																			` relative cursor-pointer select-none py-2 text-[10px]  px-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'}`
																		}
																		value={person}
																	>
																		{({ selectedTerm }) => (
																			<span
																				className={`block text-[11px] truncate ${selectedTerm ? 'font-medium' : 'font-normal'}`}
																			>
																				{person?.name}
																			</span>
																		)}
																	</Listbox.Option>
																))}
														</Listbox.Options>
													</div>
												)}
											</Listbox>
										)}
									</div>
								</div>

							) : (
								<p className="p-2 my-2 font-bold text-center bg-white rounded-xl text-mainColor xl:bg-transparent">
									{t('homepage.nothing')}
								</p>
							)}
						</>
					) : <Post />}
				</div>



				{studentCourses?.length === 0 && !(studentData?.term || studentData?.grade)
					&& (
						<button
							className="  text-sm  w-[130px] ms-auto hidden xl:block   bg-gradient-to-bl from-secondMainColor to-mainColor text-white rounded-xl px-3 py-2 text-center "
							type="button"
							disabled={!(selectedGradeSt && selectedCenter)}
							onClick={() => handleBookCard()}
						>
							{!btnLoading ? (
								t('Logs.saveModify')
							) : (
								<div
									className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
								></div>
							)}
						</button>
					)}





				{(studentData?.term || studentData?.grade) && studentCourses?.length === 0

					&& (
						<button
							className="  text-sm  w-[130px] ms-auto hidden xl:block   bg-gradient-to-bl from-secondMainColor to-mainColor text-white rounded-xl px-3 py-2 text-center "
							type="button"
							disabled={!(selectedGradeSt && selectedCenter)}
							onClick={() => handleModifyCard()}
						>
							{!modifyCardLoading ? t("homepage.modifyCard") : (
								<div
									className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
								></div>
							)}
						</button>
					)}

				{/* uncomment this part if you have the data then loop in it to display the data*/}
				<div className="flex flex-col w-full rounded-2xl gap-y-3 xl:hidden">
					{fetchSingleStudent.isFetched ? (
						studentData ? (
							<Disclosure>
								{({ open }) => (
									<div>
										<Disclosure.Button
											className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
												}`}
										>
											<div className="flex items-center gap-x-2">

												{studentData?.student && studentData?.student?.profileImage !== "" ?
													<span className=''>
														<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${studentData?.student?.profileImage}`} alt="profileImage" />
													</span>

													: <ReactSVG src={imgUser} />}
												<div className="flex flex-col items-start justify-center">
													<p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
														{studentData?.student?.fullname
															?.split(' ')
															?.slice(0, 2)
															?.join(' ')}
													</p>
													<p className="font-bold text-textGray text-size_12 ">
														{studentData?.student?.code}
													</p>
												</div>
											</div>

											<div className="flex items-center gap-x-2 ">
												{open ? (
													<ReactSVG src={downArrowFilter} />
												) : (
													leftArrow()
												)}
											</div>
										</Disclosure.Button>
										<Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
											<div className="flex items-center justify-between w-full">
												<p className="font-semibold text-center text-size_12 sm:text-size__14 text-nowrap text-textGray">
													{t('Logs.stuphone')}
												</p>
												<p className="font-semibold text-center text-size_12 sm:text-size__14 text-nowrap text-textGray">
													{studentData?.student?.phoneNumber
														? studentData?.student?.phoneNumber
														: ''}
												</p>
											</div>
											<div className="flex items-center justify-between w-full">
												<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
													{t('PopupWindows.cardCode')}
												</p>
												<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray">
													{studentData?.code}
												</p>
											</div>
											<div className="flex items-center justify-between w-full">
												<p className="font-semibold text-center text-size_12 sm:text-size__14 text-nowrap text-textGray ">
													{t('Logs.parentPhone')}
												</p>
												<div className="flex flex-wrap justify-end w-3/4 gap-2 font-semibold text-textGray text-size_12 sm:text-size__14 text-nowrap">
													{studentData?.parentPhoneNumber
														? studentData?.parentPhoneNumber
														: ''}
												</div>
											</div>
											<div className="flex items-center justify-between w-full">
												<p className="font-semibold text-center text-size_12 sm:text-size__14 text-nowrap text-textGray ">
													{t('Logs.educationalStage')}
												</p>
												<div className="flex flex-wrap justify-end w-2/4 gap-2 font-semibold text-textGray text-size_12 sm:text-size__14 text-nowrap">
													{(studentData?.student && studentData?.grade && studentData?.term) || studentCourses?.length > 0
														? (
															i18n.language === 'ar' ? (
																studentData?.grade?.nameAr
															) : (
																studentData?.grade?.nameEn
															)
														) : (
															<Listbox
																value={selectedGradeSt}
																onChange={(value) => {
																	setselectedGradeSt(value);
																}}
															>
																{({ open }) => (
																	<div className="relative w-full">
																		<Listbox.Button
																			className={`font-semibold bg-bg_mainLayout py-1 md:py-2 px-3  text-mainColor  text-sm leading-5  focus:ring-0  items-center 
                                                                            relative w-full flex cursor-pointer rounded-lg  text-left focus:outline-none  sm:text-sm justify-between`}
																		>
																			<div className="flex items-center gap-x-3">
																				{/* <div className="flex items-center justify-center">
                                                                    <ReactSVG src={filterIcon} />
                                                                </div> */}

																				<span
																					className={`block truncate text-[10px] lg:text-sm xl:text-sm`}
																				>
																					{i18n.language === "ar" ? selectedGradeSt?.nameAr : selectedGradeSt?.nameEn}
																				</span>
																			</div>

																			{<ReactSVG src={downArrowFilter} />}
																		</Listbox.Button>

																		<Listbox.Options
																			className="absolute z-10 w-full mt-1 overflow-y-scroll text-base rounded-md shadow max-h-40 scrollbar-thin bg-bg_mainLayout ring-1 ring-black/5 focus:outline-none sm:text-sm"
																		>
																			{filteredGrade.map((person, personIdx) => (
																				<Listbox.Option
																					key={personIdx}
																					className={({ active }) =>
																						` relative cursor-pointer select-none py-1   px-4  ${active ? 'bg-mainColor text-white' : 'text-mainColor'}`
																					}
																					value={person}
																				>
																					{({ selectedGradeSt }) => (
																						<span
																							className={`block text-[11px] truncate ${selectedGradeSt ? 'font-medium' : 'font-normal'}`}
																						>
																							{i18n.language === "ar" ? person?.nameAr : person?.nameEn}
																						</span>
																					)}
																				</Listbox.Option>
																			))}
																		</Listbox.Options>
																	</div>
																)}
															</Listbox>
														)}
												</div>
											</div>
											<div className="flex items-center justify-between w-full">
												<p className="font-semibold text-center text-size_12 sm:text-size__14 text-nowrap text-textGray ">
													{t('Courses.semester')}
												</p>
												<div className="flex flex-wrap justify-end w-2/4 gap-2 font-semibold text-textGray text-size_12 sm:text-size__14 text-nowrap">
													{(studentData?.student && studentData?.grade && studentData?.term) || studentCourses?.length > 0 ? (
														studentData?.term === '0' ? (
															t('homeRev.highSchool')
														) : studentData?.term ? (
															studentData?.term === '1' ? (
																`${t('homeRev.term')} ${t('homeRev.first')}`
															) : studentData?.term === '2' ? (
																`${t('homeRev.term')} ${t('homeRev.second')}`
															) : (
																studentData?.term === '3' &&
																`${t('homeRev.term')} ${t('homeRev.third')}`
															)
														) : null
													) : (
														<Listbox
															value={selectedTerm}
															onChange={(value) => {
																setselectedTerm(value);
																// formik.setFieldValue("term", value?.value)
																// setselectedTerm()
															}}
														>
															{({ open }) => (
																<div className="relative w-full">
																	<Listbox.Button
																		className={`font-semibold    text-mainColor px-3 py-1  text-sm leading-5  focus:ring-0  items-center 
                                                                            relative w-full flex cursor-pointer rounded-lg bg-bg_mainLayout text-left md:py-2  focus:outline-none  sm:text-sm justify-between`}
																	>
																		<div className="flex items-center gap-x-3">
																			{/* <div className="flex items-center justify-center">
                                                                    <ReactSVG src={filterIcon} />
                                                                </div> */}

																			<span
																				className={`block truncate text-[10px] lg:text-sm xl:text-sm `}
																			>
																				{/* {selectedTerm.value === 0 ? selectedTerm.name : `${t("homeRev.term")} ${selectedTerm?.name}`} */}
																				{selectedTerm.name}
																			</span>
																		</div>

																		{<ReactSVG src={downArrowFilter} />}
																	</Listbox.Button>

																	<Listbox.Options
																		className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-base rounded-md shadow max-h-40 scrollbar-thin bg-bg_mainLayout ring-1 ring-black/5 focus:outline-none sm:text-sm"
																	>
																		{terms
																			?.filter(
																				(item) =>
																					item.name !== selectedTerm.name
																			)
																			?.map((person, personIdx) => (
																				<Listbox.Option
																					key={personIdx}
																					className={({ active }) =>
																						` relative cursor-pointer select-none py-1 text-[10px]  px-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'}`
																					}
																					value={person}
																				>
																					{({ selectedTerm }) => (
																						<span
																							className={`block text-[11px] truncate ${selectedTerm ? 'font-medium' : 'font-normal'}`}
																						>
																							{person?.name}
																						</span>
																					)}
																				</Listbox.Option>
																			))}
																	</Listbox.Options>
																</div>
															)}
														</Listbox>
													)}
												</div>
											</div>

											{studentCourses?.length === 0 && !(studentData?.term || studentData?.grade)
												&& (
													<button
														className="px-3 py-2 text-xs text-center text-white sm:text-sm ms-auto bg-gradient-to-bl from-secondMainColor to-mainColor rounded-xl"
														type="button"
														disabled={!(selectedGradeSt && selectedCenter)}
														onClick={() => handleBookCard()}
													>
														{!btnLoading ? (
															t('Logs.saveModify')
														) : (
															<div
																className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
															></div>
														)}
													</button>
												)}


											{(studentData?.term || studentData?.grade) && studentCourses?.length === 0
												&& (
													<button
														className="px-3 py-2 text-xs text-center text-white sm:text-sm ms-auto bg-gradient-to-bl from-secondMainColor to-mainColor rounded-xl"
														type="button"
														disabled={!(selectedGradeSt && selectedCenter)}
														onClick={() => handleModifyCard()}
													>
														{!modifyCardLoading ? t("homepage.modifyCard") : (
															<div
																className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
															></div>
														)}
													</button>
												)}



										</Disclosure.Panel>
									</div>
								)}
							</Disclosure>
						) : (
							<p className="p-2 my-2 font-bold text-center bg-white rounded-xl text-mainColor xl:bg-transparent">
								{t('homepage.nothing')}
							</p>
						)
					) : (
						arr5?.map((item, i) => {
							return (
								<div
									key={i}
									className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}
								>
									<div className="flex items-center w-full space-x-4 animate-pulse">
										<div className="w-10 h-10 rounded-full bg-zinc-300"></div>
										<div className="flex-1 py-1 space-y-3">
											<div className="h-2 rounded bg-zinc-300"></div>
											<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>

			<div
				className={`w-full lg:bg-white rounded-lg flex flex-col lg:px-6 pt-6 pb-2 gap-y-8 lg:h-auto relative`}
			>
				<div className="flex items-center justify-between w-full">
					<p className="font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
						{t('StudentDetails.studentCourses')}
					</p>

					<div className="flex items-center gap-x-2">
						<button
							className="  text-sm  w-[130px]  ms-auto hidden lg:flex   bg-gradient-to-bl from-secondMainColor to-mainColor text-white rounded-xl  text-center py-2  items-center justify-center gap-x-2"
							onClick={() => setToggler({ ...Toggler, bookCourse: true })}
						>
							{bookCourse('#E0E0E0')} {t('homepage.bookCourse')}
						</button>
						{/* <button
							className="  text-sm  w-[130px]  ms-auto hidden lg:flex   bg-gradient-to-bl from-secondMainColor to-mainColor text-white rounded-xl  text-center py-2  items-center justify-center gap-x-2"
							onClick={() => setToggler({ ...Toggler, studentPayments: true })}
						>
							{dollarSign('#E0E0E0')} {t('homepage.pay')}
						</button> */}
					</div>

					<div className="flex items-center lg:hidden gap-x-2">
						<button
							className="bg-white w-[45px] h-[45px] rounded-xl flex lg:hidden items-center justify-center"
							onClick={() => setToggler({ ...Toggler, bookCourse: true })}
						>
							{bookCourse('#023E8ACC')}
						</button>

					</div>
				</div>

				<div className={`largeScreen hidden lg:flex flex-col lg:h-auto`}>
					{fetchStudentCourses.isFetched ? (
						<>
							<div className="thead border px-3 py-3 border-[#E1E1E1] bg-[#F4F7FE]   rounded-2xl rounded-b-none flex justify-between items-center w-full">
								<div className="flex justify-between w-full textHeader">
									<p className="w-1/3 text-sm text-start text-textGray">
										{t('Courses.courseName')}
									</p>

									<div className="flex justify-start w-1/3 text-sm gap-x-2 me-3">
										<ReactSVG src={sort} />
										<p className="text-start text-nowrap text-textGray">
											{t('Logs.teacherName')}
										</p>
									</div>

									<p className="w-1/3 text-sm text-start text-textGray">
										{t('homeRev.alertsNums')}
									</p>
								</div>
							</div>
							{studentCourses && studentCourses?.length > 0 ? (
								visibleData2?.map((item, i) => {
									return (
										<Disclosure key={i}>
											{({ open }) => (
												<div>
													<Disclosure.Button
														className={`content relative w-full border-[#E1E1E1]  "bg-[#F4F7FE]  border-t-0 border flex items-center justify-center  px-3 py-2`}
													>
														<div className="flex items-center w-1/3 text-sm font-bold nameLesson text-mainColor text-start gap-x-2">
															<CourseAvatar courseName={item?.tutorCourse?.courseData?.name} w={20} h={20} />

															<div className="flex flex-col items-start ">
																<p className="text-sm font-bold">

																	{handleUserName(item?.tutorCourse?.courseData?.name, 4)}
																</p>

																<p className="text-xs font-bold text-textGray">

																	{i18n.language === "ar" ? `${t('homeRev.grade')} ${item?.grade?.nameAr}` : `${t('homeRev.grade')} ${item?.grade?.nameEn}`}
																</p>
															</div>
														</div>

														<div className="flex items-center w-1/3 text-sm font-bold nameLesson text-mainColor text-start gap-x-2 ms-3">


															{item?.tutorCourse?.tutor?.profileImage !== "" ?
																<span className=''>
																	<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.tutorCourse?.tutor?.profileImage}`} alt="profileImage" />
																</span>

																: <ReactSVG src={teacherProfile} />}

															<div className="flex flex-col items-start ">
																<p className="text-xs font-bold">

																	{handleUserName(item?.tutorCourse?.tutor?.fullname, 2)}
																</p>
																<p className="text-xs font-bold text-textGray">

																	{item?.tutorCourse?.tutor?.code}
																</p>
															</div>
														</div>

														{/* </div> */}
														<p className="w-1/3 text-sm font-semibold files text-mainColor text-start">
															{tens.includes(item?.alerts)
																? `${item?.alerts} ${t('homeRev.alerts')}`
																: item?.alerts === 0
																	? t('homepage.nothing')
																	: `${item?.alerts} ${t('homeRev.alert')}`}
														</p>
														<span className='absolute z-20 end-20 top-[50%] translate-y-[-50%]' onClick={() => {
															setboockedCourseReq({
																...boockedCourseReq,
																centerCourseId: item?.centerCourse,
																cardCode: studentData?.code,

																cardCourseId: item?._id,


															})
															// (item?.centerCourse, studentData?.code, item?._id, false)
															setToggler({ ...Toggler, deleteCourse: true })
														}}  >
															{del(25, 24, "#023E8AB2")}
														</span>


														<span className='absolute z-20 end-12 top-[50%] translate-y-[-50%]' onClick={() => {
															setcardCourseId(item)
															setToggler({ ...Toggler, modifyBookedCourse: true })
														}}  >
															{edit(25, 24, "#023E8AB2")}
														</span>



														{open ? (
															<ReactSVG src={downArrowFilter} />
														) :
															<ReactSVG src={leftarrow} />
														}
													</Disclosure.Button>

													<Disclosure.Panel className={`bg-[#F4F7FE]  `}>
														<div className="thead border border-t-0 px-3 py-2 border-[#E1E1E1]  bg-[#F4F7FE]    rounded-b-none flex justify-between items-center w-full">
															<div className="flex justify-between w-full textHeader">
																<p className="w-1/3 text-sm text-start text-textGray">
																	{t('homepage.groupName')}
																</p>

																<div className="flex justify-start w-1/3 text-sm gap-x-2 me-3">
																	<ReactSVG src={sort} />
																	<p className="text-start text-nowrap text-textGray">
																		{t('homepage.groupday')}
																	</p>
																</div>

																<p className="w-1/3 text-sm text-start text-textGray">
																	{t('homepage.grouptime')}
																</p>
															</div>
														</div>

														{item?.group_data?.map((group, i) => {
															return (
																<div
																	key={i}
																	className={`content w-full border-[#E1E1E1]  bg-[#F4F7FE]    border-t-0 border flex items-center justify-center  px-3 py-2`}
																>
																	<div className="flex items-center w-1/3 text-sm font-bold nameLesson text-mainColor text-start gap-x-2">
																		{t('homepage.group')} {group?.groupNumber}
																	</div>

																	<div className="flex items-center w-1/3 text-sm font-bold nameLesson text-mainColor text-start gap-x-2 ms-3">
																		{group?.dayOfWeek === 0 &&
																			t('homepage.sunday')}
																		{group?.dayOfWeek === 1 &&
																			t('homepage.monday')}
																		{group?.dayOfWeek === 2 &&
																			t('homepage.tuesday')}
																		{group?.dayOfWeek === 3 &&
																			t('homepage.wednesday')}
																		{group?.dayOfWeek === 4 &&
																			t('homepage.thursday')}
																		{group?.dayOfWeek === 5 &&
																			t('homepage.friday')}
																		{group?.dayOfWeek === 6 &&
																			t('homepage.saturday')}
																	</div>

																	{/* </div> */}
																	<div className="flex items-center w-1/3 gap-x-1">
																		<p className="text-sm font-semibold files text-mainColor text-start ">
																			{Time(group?.startTime)}
																		</p>
																		:
																		<p className="text-sm font-semibold files text-mainColor text-start ">
																			{Time(group?.endTime)}
																		</p>
																	</div>
																</div>
															);
														})}
													</Disclosure.Panel>
												</div>
											)}
										</Disclosure>
									);
								})
							) : (
								<p className="p-2 my-2 font-bold text-center bg-white rounded-xl text-mainColor xl:bg-transparent">
									{t('homepage.nothing')}
								</p>
							)}
						</>
					) : (
						arr5?.map((item, index) => {
							return (
								<div
									key={index}
									className="flex items-center justify-between w-full px-6 py-5 lg:gap-x-4 "
								>
									<div className="flex items-center w-full space-x-4 animate-pulse">
										<div className="w-10 h-10 rounded-full bg-zinc-300"></div>
										<div className="flex-1 py-1 space-y-3">
											<div className="h-2 rounded bg-zinc-300"></div>
											<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>

				{fetchStudentCourses.data?.length > 0 && (
					<div className="items-center justify-center hidden pb-3 pagination lg:flex ">
						<Pagination
							totalItems={studentCourses?.length}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				)}

				{/* uncomment this part if you have the data then loop in it to display the data*/}
				<div className="flex flex-col rounded-2xl gap-y-3 lg:hidden">
					{fetchStudentCourses.isFetched ? (
						<>
							{studentCourses && studentCourses?.length > 0 ? (
								visibleData2?.map((item, i) => {
									return (
										<Disclosure key={i}>
											{({ open }) => (
												<div>
													<Disclosure.Button
														className={`py-4 px-6 w-full bg-white   shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
															}`}
													>
														<div className="flex items-center justify-center gap-x-2">
															<CourseAvatar courseName={item?.tutorCourse?.courseData?.name} w={24} h={24} />

															<div className="flex flex-col items-start justify-center">
																<div className="flex items-center font-bold text-mainColor text-size__14 sm:text-base md:text-size_18 gap-x-2 ">
																	{item?.tutorCourse?.courseData?.name}
																</div>
																<p className="font-bold text-textGray text-size_12 sm:text-sm md:text-base">
																	{i18n.language === "ar" ? `${t('homeRev.grade')} ${item?.grade?.nameAr}` : `${t('homeRev.grade')} ${item?.grade?.nameEn}`}
																</p>
															</div>
														</div>


														{open ? (
															<ReactSVG src={downArrowFilter} />
														) : (
															leftArrow()
														)}
													</Disclosure.Button>
													<Disclosure.Panel
														className={`p-6 w-full bg-white  border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6`}
													>
														<div className="flex items-center justify-between w-full">
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
																{t('Logs.teacherName')}
															</p>
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray">
																{item?.tutorCourse?.tutor?.fullname}
															</p>
														</div>
														<div className="flex items-center justify-between w-full">
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
																{t('Logs.teacherCode')}
															</p>
															<div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-mainColor ">
																{item?.tutorCourse?.tutor?.code}{' '}
															</div>
														</div>

														<div className="flex items-center justify-between w-full">
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
																{t('homeRev.alertsNums')}
															</p>
															<div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray ">
																{tens.includes(item?.alerts)
																	? `${item?.alerts} ${t('homeRev.alerts')}`
																	: item?.alerts === 0
																		? t('homepage.nothing')
																		: `${item?.alerts} ${t('homeRev.alert')}`}
															</div>
														</div>

														<div className="flex justify-end w-full gap-x-4">
															<span className='cursor-pointer' onClick={() => {
																setboockedCourseReq({
																	...boockedCourseReq,
																	centerCourseId: item?.centerCourse,
																	cardCode: studentData?.code,

																	cardCourseId: item?._id,


																})
																// (item?.centerCourse, studentData?.code, item?._id, false)
																setToggler({ ...Toggler, deleteCourse: true })
															}}  >
																<ReactSVG src={deleteIcon} />
															</span>

															<span className='cursor-pointer ' onClick={() => {
																setcardCourseId(item)
																setToggler({ ...Toggler, modifyBookedCourse: true })
															}}  >
																{edit(25, 24, "#023E8AB2")}
															</span>
														</div>

														<div className="w-full border-t  border-[#E1E1E1] ">
															<div className="flex flex-col items-center w-full pt-4 gap-y-2">
																{item?.group_data?.map((group, i) => {
																	return (
																		<div
																			className="flex items-center justify-between w-full "
																			key={i}
																		>
																			<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																				{t('homepage.group')}{' '}
																				{group?.groupNumber}
																			</p>
																			<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																				{group?.dayOfWeek === 0 &&
																					t('homepage.sunday')}
																				{group?.dayOfWeek === 1 &&
																					t('homepage.monday')}
																				{group?.dayOfWeek === 2 &&
																					t('homepage.tuesday')}
																				{group?.dayOfWeek === 3 &&
																					t('homepage.wednesday')}
																				{group?.dayOfWeek === 4 &&
																					t('homepage.thursday')}
																				{group?.dayOfWeek === 5 &&
																					t('homepage.friday')}
																				{group?.dayOfWeek === 6 &&
																					t('homepage.saturday')}
																			</p>
																			<div className="flex items-center gap-x-1 text-textGray">
																				<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																					{Time(group?.startTime)}:
																				</p>
																				:
																				<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																					{Time(group?.endTime)}
																				</p>
																			</div>
																		</div>
																	);
																})}
															</div>
														</div>
													</Disclosure.Panel>
												</div>
											)}
										</Disclosure>
									);
								})
							) : (
								<p className="p-2 my-2 font-bold text-center bg-white rounded-xl text-mainColor xl:bg-transparent">
									{t('homepage.nothing')}
								</p>
							)}
						</>
					) : (
						arr5?.map((item, i) => {
							return (
								<div
									key={i}
									className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center studentCoursesjustify-between rounded-2xl`}
								>
									<div className="flex items-center w-full space-x-4 animate-pulse">
										<div className="w-10 h-10 rounded-full bg-zinc-300"></div>
										<div className="flex-1 py-1 space-y-3">
											<div className="h-2 rounded bg-zinc-300"></div>
											<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
										</div>
									</div>
								</div>
							);
						})
					)}

					{studentCourses?.length > 0 && (
						<Pagination
							totalItems={studentCourses?.length}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default SingleStudent;
