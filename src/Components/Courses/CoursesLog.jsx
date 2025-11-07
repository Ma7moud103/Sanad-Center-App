import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Disclosure,
	Listbox,
	ListboxButton,
	ListboxOption,
} from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ApisContext } from '../../Context/ApisContext';
import filterIcon from '../../assets/sanadSVG/filterIcon.svg';
import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';

import sort from '../../assets/sanadSVG/sort.svg';
import navigator from '../../assets/sanadSVG/singleRoute.svg';
import { ReactSVG } from 'react-svg';
import { ListboxOptions } from '@headlessui/react';
import CourseAvatar from "../CourseAvatar"

function CoursesLog() {
	const arr = [3, 3, 3, 3, 3];
	const [t, i18n] = useTranslation();
	// const { CourseAvatar } = useContext(SvgsContext);
	const {
		Grades,
		tens,
		selectedGradeOfCourse, setSelectedGradeOfCourse,
		fetchAllCourses,
		coursePage, setcoursePage
	} = useContext(ApisContext);


	const handleCourseChange = (Grade) => {
		setSelectedGradeOfCourse(Grade);
		sessionStorage.setItem('selectedGradeOfCourse', JSON.stringify(Grade));
		setcoursePage(1);
	};

	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setcoursePage(newPage);
	};
	const [totalItems, settotalItems] = useState(0);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const handleClick = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== coursePage) {
			handlePageChange(newPage);
		}
	};

	const displayRange = 1;
	const pagesToShow = [];
	const startPage = Math.max(coursePage - displayRange, 1);
	const endPage = Math.min(coursePage + displayRange, totalPages);

	if (startPage > 2) {
		pagesToShow.push(1);
		if (startPage > 3) {
			pagesToShow.push('...');
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		pagesToShow.push(i);
	}

	if (endPage < totalPages - 1) {
		if (endPage < totalPages - 2) {
			pagesToShow.push('...');
		}
		pagesToShow.push(totalPages);
	}









	useEffect(() => {
		settotalItems(fetchAllCourses.data?.metadata?.totalDocs);
	}, [fetchAllCourses, coursePage]);

	// console.log(fetchAllCourses.data)

	return (
		<>
			<div
				className={`w-full xl:bg-white rounded-lg flex flex-col xl:px-6 pt-6 pb-2 gap-y-8 ${fetchAllCourses.data?.data?.length > 0 ? 'lg:h-[620px]' : 'h-auto'} `}
			>
				<div className="flex items-center justify-between header ">
					<div className="flex flex-col w-full gap-3 main lg:w-auto">
						<p className="font-extrabold text-size_26 md:text-size_28 text-mainColor">
							{t('Courses.courseLog')}
						</p>
					</div>

					{/* dropdown */}
					<div className="lg:w-[230px] hidden lg:block ">
						<Listbox
							value={selectedGradeOfCourse}
							onChange={(Grade) => {
								handleCourseChange(Grade);
								console.log(Grade);
							}}
						>
							{({ open }) => (
								<div className="relative ">
									<ListboxButton
										className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-xs xl:text-sm
                                                                        flex cursor-pointer rounded-xl bg-white xl:bg-bg_mainLayout  text-start focus:outline-none   `}
									>
										<div className="flex items-center ps-2 sm:p-0 gap-x-2">
											<ReactSVG src={filterIcon} />

											<div className={` flex flex-col gap-y-1`}>
												<p className="block text-xs font-semibold truncate text-mainColor">
													{selectedGradeOfCourse ? (
														i18n.language === 'ar' ? (
															selectedGradeOfCourse?.nameAr
														) : (
															i18n.language === 'en' &&
															selectedGradeOfCourse?.nameEn
														)
													) : (
														<span className="text-textColor__2">
															{t('homepage.choiseCourse')}
														</span>
													)}
												</p>
											</div>
										</div>

										<ReactSVG src={downArrowFilter} />
									</ListboxButton>

									<ListboxOptions
										className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-xs bg-white rounded-md shadow max-h-40 xl:bg-bg_mainLayout xl:text-sm scrollbar-thin focus:outline-none "
									>
										{Grades.map((person, personIdx) => (
											<ListboxOption
												key={personIdx}
												className={({ selected }) =>
													` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4  text-sm  ${selected ? 'bg-mainColor text-white' : 'text-secondMainColor '}`
												}
												value={person}
											>
												{({ selected }) => (
													<p className={` text-xs font-semibold `}>
														{i18n.language === 'ar'
															? person?.nameAr
															: i18n.language === 'en' && person?.nameEn}
													</p>
												)}
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							)}
						</Listbox>
					</div>
				</div>

				<div className="largeScreen hidden xl:flex flex-col h-[70%] ">
					{fetchAllCourses.isFetched ? (
						<>
							<div className="thead bg-[#F4F7FE] border border-[#E1E1E1] rounded-t-xl">
								<div className="flex justify-between w-full p-6 border-b-0 rounded-b-none Header rounded-2xl">
									<p className="text-start text-sm text-textGray w-[25%]">
										{t('Courses.courseName')}
									</p>



									<p className="text-sm  w-[25%] text-start text-textGray">
										{t('homeRev.term')}
									</p>


									<p className="text-start text-sm text-textGray  w-[25%]">
										{t('Courses.groupsCount')}
									</p>
									<p className="text-start text-sm text-textGray  w-[25%]">
										{t('Courses.studentsCount')}
									</p>
								</div>
							</div>
							{fetchAllCourses.data?.data && fetchAllCourses.data?.data?.length > 0 ? (
								fetchAllCourses.data?.data?.map((item, i) => {
									const isLastItem = i === fetchAllCourses.data?.data?.length - 1;

									return (
										<div
											key={i}
											className={`content w-full   border-[#E1E1E1] border-[1px] border-t-0 flex items-center justify-center ${isLastItem && 'rounded-b-xl'}`}
										>
											<Link
												onClick={() => {
													sessionStorage.setItem("courseId", item?._id)
													sessionStorage.removeItem("groupId")
												}} to={`${item?._id}`}
												className="flex items-center justify-between w-full px-6 py-4 "
											>
												{/* <div className="flex w-1/5 gap-2 text-start"> */}

												<div className="nameLesson text-start   w-[25%] flex items-center gap-x-1">
													{/* {CourseAvatar()} */}
													<CourseAvatar courseName={item?.tutorCourse?.courseData?.name} />

													<div className="flex flex-col items-start">
														<h6 className="text-xs font-bold text-mainColor xl:text-sm text-nowrap">
															{item?.tutorCourse?.courseData?.name?.split(' ')
																?.length > 3
																? `${item?.tutorCourse?.courseData?.name
																	?.split(' ')
																	?.slice(0, 3)
																	?.join(' ')} ...`
																: item?.tutorCourse?.courseData?.name}
														</h6>

														<p className="font-semibold text-textGray text-size_10 xl:text-xs">
															{i18n.language === 'ar'
																? `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameAr}`
																: `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameEn}`}
														</p>
													</div>
												</div>

												<p className="font-semibold   w-[25%] text-mainColor text-sm">
													{item?.tutorCourse?.term === "0" ? t("homeRev.highSchool") : item?.tutorCourse?.term === "1" ? t("homeRev.first") : item?.tutorCourse?.term === "2" ? t("homeRev.second") : item?.tutorCourse?.term === "3" && t("homeRev.third")}
												</p>

												<p className="files text-sm font-semibold text-mainColor text-start  w-[25%]">
													{tens.includes(item.groupCount)
														? `${item.groupCount} ${t('homepage.groups')}`
														: item.groupCount === 0
															? t("homepage.nothing")
															: `${item.groupCount} ${t('homepage.group')}`}
												</p>

												<p className="files text-sm font-semibold text-textGray text-start  w-[25%]">
													{tens.includes(item?.studentsCount)
														? `${item?.studentsCount} ${t('Courses.students')}`
														: item?.studentsCount === 0
															? t("homepage.nothing")
															: `${item?.studentsCount} ${t('Courses.student')}`}
												</p>
											</Link>
											{/* <div className="=icons cursor-pointer w-[5%] "
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setToggler(prev => {
                                                        return { ...prev, deletCourse: true }
                                                    })
                                                    setDeleted(prev => {
                                                        return { ...prev, deletedCourse: item._id }
                                                    })
                                                }}>
                                                {deletIcon}
                                            </div> */}
										</div>
									);
								})
							) : (
								<p className="p-2 my-2 font-bold text-center rounded-xl text-mainColor">
									{t('homepage.nothing')}
								</p>
							)}
						</>
					) : (
						arr?.map((item, index) => {
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

				{fetchAllCourses.data?.data?.length > 0 && (
					<div className="items-center justify-center hidden mt-6 gap-y-4 xl:flex">
						{fetchAllCourses?.data?.data?.length > 0 && (
							<div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
								<button
									onClick={() => handleClick(coursePage - 1)}
									// onClick={() => setcoursePage((old) => {
									//     Math.max(old - 1, 1)
									// })}
									className={`${coursePage === 1
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
										} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
									disabled={coursePage === 1}
								>
									&lt;
								</button>

								{pagesToShow.map((page, index) => (
									<button
										key={index}
										onClick={() => {
											if (typeof page === 'number') {
												handleClick(page);
											}
										}}
										className={`${typeof page === 'number'
											? coursePage === page
												? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
												: 'bg-transparent text-[#293241] hover:bg-slate-100'
											: 'text-[#293241]'
											} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
									>
										{page}
									</button>
								))}
								<button
									onClick={() => handleClick(coursePage + 1)}
									className={`${coursePage === totalPages
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
										}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
									disabled={
										coursePage === totalPages || fetchAllCourses.isPlaceholderData
									}
								>
									&gt;
								</button>
							</div>
						)}
					</div>
				)}

				{/* uncomment this part if you have the data then loop in it to display the data*/}
				<div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
					{fetchAllCourses.isFetched ? (
						<>
							{fetchAllCourses.data?.data?.length > 0 ? (
								fetchAllCourses.data?.data?.map((item, i) => {
									return (
										<Disclosure key={i}>
											{({ open }) => (
												<div>
													<Disclosure.Button
														className={`py-4 px-5 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
															}`}
													>
														<div className="flex items-center justify-center gap-x-2">
															<CourseAvatar courseName={item?.tutorCourse?.courseData?.name} />

															<div className="flex flex-col items-start">
																<div className="flex items-center text-xs font-bold text-mainColor sm:text-base text-nowrap gap-x-2 ">
																	{item?.tutorCourse?.courseData?.name}
																	<Link to={`${item?._id}`

																	}
																		onClick={() => {
																			sessionStorage.setItem("courseId", item?._id)
																			sessionStorage.removeItem("groupId")
																		}}
																	>
																		{' '}
																		<ReactSVG className="" src={navigator} />
																	</Link>
																</div>
																<p className="font-bold text-textGray text-size_12 sm:text-sm ">
																	{i18n.language === 'ar'
																		? `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameAr}`
																		: `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameEn}`}
																</p>
															</div>
														</div>

														<div className="flex items-center justify-center gap-x-2">
															<p className="text-size_12 sm:text-sm bg-[#FFDDF8] text-[#7D34D9] py-1 px-2 rounded-2xl">
																{item?.tutorCourse?.term === '0'
																	? t('homeRev.highSchool')
																	: item?.tutorCourse?.term
																		? item?.tutorCourse?.term === '1'
																			? `${t('homeRev.term')} ${t('homeRev.first')}`
																			: item?.tutorCourse?.term === '2'
																				? `${t('homeRev.term')} ${t('homeRev.second')}`
																				: item?.tutorCourse?.term === '3' &&
																				`${t('homeRev.term')} ${t('homeRev.third')}`
																		: null}
															</p>
														</div>
													</Disclosure.Button>
													<Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
														<div className="flex items-center justify-between w-full">
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
																{t('homeRev.term')}
															</p>
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray">
																{item?.tutorCourse?.term === "0" ? t("homeRev.highSchool") : item?.tutorCourse?.term === "1" ? t("homeRev.first") : item?.tutorCourse?.term === "2" ? t("homeRev.second") : item?.tutorCourse?.term === "3" && t("homeRev.third")}
															</p>
														</div>
														<div className="flex items-center justify-between w-full">
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
																{t('Courses.groupsCount')}
															</p>
															<div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14">
																{tens.includes(item.groupCount)
																	? `${item.groupCount} ${t('homepage.groups')}`
																	: item.groupCount === 0
																		? t("homepage.nothing")
																		: `${item.groupCount} ${t('homepage.group')}`}
															</div>
														</div>
														<div className="flex items-center justify-between w-full">
															<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
																{t('Courses.studentsCount')}
															</p>
															<div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray">
																{tens.includes(item?.studentsCount)
																	? `${item?.studentsCount} ${t('Courses.students')}`
																	: item?.studentsCount === 0
																		? t("homepage.nothing")
																		: `${item?.studentsCount} ${t('Courses.student')}`}
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
						arr?.map((item, i) => {
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
					{fetchAllCourses.data?.data?.length > 0 && (
						<div className="flex items-center justify-center gap-y-4">
							{fetchAllCourses?.data?.data?.length > 0 && (
								<div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
									<button
										onClick={() => handleClick(coursePage - 1)}
										// onClick={() => setcoursePage((old) => {
										//     Math.max(old - 1, 1)
										// })}
										className={`${coursePage === 1
											? 'opacity-50 cursor-not-allowed'
											: 'cursor-pointer'
											} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
										disabled={coursePage === 1}
									>
										&lt;
									</button>

									{pagesToShow.map((page, index) => (
										<button
											key={index}
											onClick={() => {
												if (typeof page === 'number') {
													handleClick(page);
												}
											}}
											className={`${typeof page === 'number'
												? coursePage === page
													? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
													: 'bg-transparent text-[#293241] hover:bg-slate-100'
												: 'text-[#293241]'
												} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
										>
											{page}
										</button>
									))}
									<button
										onClick={() => handleClick(coursePage + 1)}
										className={`${coursePage === totalPages
											? 'opacity-50 cursor-not-allowed'
											: 'cursor-pointer'
											}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
										disabled={
											coursePage === totalPages ||
											fetchAllCourses.isPlaceholderData
										}
									>
										&gt;
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default React.memo(CoursesLog);
