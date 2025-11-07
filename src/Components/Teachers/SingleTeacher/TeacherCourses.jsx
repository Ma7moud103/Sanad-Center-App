import React, { useContext, useEffect, useState, memo } from 'react';
import { Disclosure } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { ApisContext } from '../../../Context/ApisContext';
import axios from 'axios';
import { BASE_URL } from '../../../Soursre';
import { Link, useParams } from 'react-router-dom';
import sort from '../../../assets/sanadSVG/sort.svg';
import { ReactSVG } from 'react-svg';
import Post from '../../Skeletons/Post';
import downarrow from '../../../assets/sanadSVG/downArrow.svg';
import { useQuery } from '@tanstack/react-query';
import navigator from "../../../assets/sanadSVG/singleRoute.svg"
import leftArrow from '../../../assets/sanadSVG/leftArrow.svg';
const TeacherCourses = () => {
	const arr = [2, 3, 4, 10, 0];

	const { id } = useParams();
	const [t, i18n] = useTranslation();
	const {
		headers,
		selectedCenter,
		tens,
	} = useContext(ApisContext);

	// const [teacherCourseId, setteacherCourseId] = useState([]);
	const [currentPage, setcurrentPage] = useState(1);




	const getTeacherCourses = async () => {
		if (selectedCenter && id) {
			try {
				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter._id}/tutors/${id}/center-courses?limit=5&page=${currentPage}`,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					return res.data;
				}
			} catch (error) {
				console.log(error);
			}
		}
	};





	const fetchCourses = useQuery({
		queryKey: ['fetchCourses', `${selectedCenter}`, `${id}`, `${currentPage}`],
		queryFn: () => getTeacherCourses(),
		enabled: !!selectedCenter && !!id,
		refetchOnMount: true,
		placeholderData: true,
	});


	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setcurrentPage(newPage);
	};
	const [totalItems, settotalItems] = useState(0);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const handleClick = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
			handlePageChange(newPage);
		}
	};

	const displayRange = 1;
	const pagesToShow = [];
	const startPage = Math.max(currentPage - displayRange, 1);
	const endPage = Math.min(currentPage + displayRange, totalPages);

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
		settotalItems(fetchCourses?.data?.metadata?.totalDocs);
	}, [fetchCourses, currentPage]);

	// teachers/group/2
	return (
		<div className="w-full xl:bg-white rounded-lg flex flex-col xl:p-6  justify-center gap-y-5   ">
			<div className="main flex flex-col gap-3">
				<p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32   text-mainColor">
					{t('TeacherDetails.teacherCourses')}
				</p>
			</div>

			<div className="largeScreen hidden xl:flex flex-col overflow-hidden ">
				<div className="thead border border-[#E1E1E1] bg-[#F4F7FE]   rounded-xl rounded-b-none flex justify-between items-center w-full">
					<div className="textHeader p-6 py-5 w-full   flex justify-between items-center">
						<p className="text-start text-sm text-textGray w-1/4">
							{t('Courses.courseName')}
						</p>

						<div className="flex gap-x-2  w-1/4 ">
							<ReactSVG src={sort} />
							<p className="text-start  text-sm text-textGray">
								{t('Logs.educationalStage')}
							</p>
						</div>

						<p className="text-start  text-sm text-textGray w-1/4">
							{t('Courses.studentsCount')}
						</p>
						<p className="text-start  text-sm text-textGray w-1/4">
							{t('Courses.groupsCount')}
						</p>
						{/* <p className="text-start text-textGray w-1/4">
                            {t("Courses.studentsCount")}
                        </p> */}
					</div>
				</div>

				{!fetchCourses.isFetched ? (
					arr.map((item, i) => (
						<div
							key={i}
							className="py-5 px-6 w-full lg:gap-x-4  flex items-center justify-between "
						>
							<div className="animate-pulse w-full  flex items-center  space-x-4">
								<div className="rounded-full bg-zinc-300 h-10 w-10"></div>
								<div className="flex-1 space-y-3 py-1">
									<div className="h-2 bg-zinc-300 rounded"></div>
									<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
								</div>
							</div>
						</div>
					))
				) : fetchCourses.data?.data?.length > 0 ? (
					fetchCourses.data?.data?.map((item, i) => {
						const isLastItem = i === fetchCourses.data?.data?.length - 1;

						return (


							<Link to={`/teachers/group/${item?._id}`} key={i}
								// onClick={() => handleClickedItem(item)}
								className={`content cursor-pointer relative w-full border-[#E1E1E1]  border border-t-0  flex items-center p-8 xl:py-4 ${isLastItem && 'rounded-b-xl'}
                                    `}
							>
								<p className="nameLesson font-bold text-mainColor text-start  text-xs xl:text-sm w-1/4">
									{item?.tutorCourse?.courseData?.name}
								</p>

								<p className="nameLesson font-bold text-mainColor text-start text-xs xl:text-sm w-1/4">
									{item?.tutorCourse?.courseData?.grade
										? t('homeRev.grade')
										: null}{' '}
									{i18n.language === 'ar'
										? item?.tutorCourse?.courseData?.grade?.nameAr
										: item?.tutorCourse?.courseData?.grade?.nameEn}
								</p>

								{/* </div> */}
								<p className="files font-semibold text-xs xl:text-sm text-mainColor text-start w-1/4">
									{/* {tens.includes(item?.studentsCount) ? `${item?.studentsCount} ${t("Courses.students")}` : item?.studentsCount === 0 ? 0 : `${item?.studentsCount} ${t("Courses.student")}`} */}

									{item && item?.studentsCount
										? tens.includes(item?.studentsCount)
											? `${item?.studentsCount} ${t('Courses.students')}`
											: `${item?.studentsCount} ${t('Courses.student')}`
										: t('homepage.nothing')}
								</p>

								<p className="files font-semibold text-xs xl:text-sm text-mainColor text-start w-1/4">
									{/* {tens.includes(item.groupCount) ? `${item.groupCount} ${t("homepage.groups")}` : item.groupCount === 0 ? 0 : `${item.groupCount} ${t("homepage.group")}`} */}

									{item && item?.groupsCount
										? tens.includes(item?.groupsCount)
											? `${item?.groupsCount} ${t('homepage.groups')}`
											: `${item?.groupsCount} ${t('homepage.group')}`
										: t('homepage.nothing')}
								</p>


							</Link>



						);
					})
				) : (
					<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white ">
						{t('homepage.nothing')}
					</p>
				)}

				{fetchCourses.data?.data?.length > 0 && (
					<div className="flex items-center justify-center gap-y-4 pt-6">
						<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
							<button
								onClick={() => handleClick(currentPage - 1)}
								// onClick={() => setcurrentPage((old) => {
								//     Math.max(old - 1, 1)
								// })}
								className={`${currentPage === 1
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer'
									} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
								disabled={currentPage === 1}
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
										? currentPage === page
											? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
											: 'bg-transparent text-[#293241] hover:bg-slate-100'
										: 'text-[#293241]'
										} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => handleClick(currentPage + 1)}
								className={`${currentPage === totalPages
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer'
									}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
								disabled={
									currentPage === totalPages || fetchCourses.isPlaceholderData
								}
							>
								&gt;
							</button>
						</div>
					</div>
				)}
			</div>

			{/* uncomment this part if you have the data then loop in it to display the data*/}
			<div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
				{fetchCourses.isFetched ? (
					fetchCourses.data?.data?.length > 0 ? (
						fetchCourses.data?.data?.map((item, i) => {
							return (
								<Disclosure key={i}>
									{({ open }) => (
										<div>
											<Disclosure.Button
												className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl  ${open ? 'rounded-b-none' : 'rounded-b-2xl'
													}`}
											>
												<div className='flex items-center gap-x-1'>
													<p className="font-bold text-mainColor text-sm sm:text-base">
														{item?.tutorCourse?.courseData?.name}
													</p>

													<Link to={`/teachers/group/${item?._id}`}>
														<ReactSVG src={navigator} />
													</Link>
												</div>

												{open ? (
													<ReactSVG src={downarrow} />
												) : (
													<ReactSVG src={leftArrow} />
												)}
											</Disclosure.Button>
											<Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
												<div className="flex justify-between items-center w-full">
													<p className="font-semibold text-xs sm:text-sm text-textGray text-center   text-nowrap">
														{t('Courses.classLevel')}
													</p>
													<p className="font-semibold text-xs sm:text-sm text-textGray text-center">
														{item?.tutorCourse?.courseData?.grade
															? t('homeRev.grade')
															: null}{' '}
														{i18n.language === 'ar'
															? item?.tutorCourse?.courseData?.grade?.nameAr
															: item?.tutorCourse?.courseData?.grade?.nameEn}
													</p>
												</div>

												<div className="flex justify-between items-center w-full">
													<p className="font-semibold text-xs sm:text-sm text-textGray text-center   text-nowrap">
														{t('Courses.groupsCount')}
													</p>
													<div className="flex text-xs sm:text-sm  gap-2 font-semibold text-textGray flex-wrap justify-end ">
														{item && item?.groupsCount
															? tens.includes(item?.groupsCount)
																? `${item?.groupsCount} ${t('homepage.groups')}`
																: `${item?.groupsCount} ${t('homepage.group')}`
															: t('homepage.nothing')}
													</div>
												</div>

												<div className="flex justify-between items-center w-full">
													<p className="font-semibold text-xs sm:text-sm text-textGray text-center   text-nowrap">
														{t('Courses.studentsCount')}
													</p>
													<div className="flex text-xs sm:text-sm  gap-2 font-semibold text-textGray flex-wrap justify-end ">
														{item && item?.studentsCount
															? tens.includes(item?.studentsCount)
																? `${item?.studentsCount} ${t('Courses.students')}`
																: `${item?.studentsCount} ${t('Courses.student')}`
															: t('homepage.nothing')}
													</div>
												</div>
											</Disclosure.Panel>
										</div>
									)}
								</Disclosure>
							);
						})
					) : (
						<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white">
							{t('homepage.nothing')}
						</p>
					)
				) : (
					arr.map((item, i) => (
						<div key={i} className="bg-white  p-3 rounded-xl">
							{' '}
							<Post />
						</div>
					))
				)}

				{fetchCourses.data?.data?.length > 0 && (
					<div className="flex items-center justify-center gap-y-4">
						<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
							<button
								onClick={() => handleClick(currentPage - 1)}
								// onClick={() => setcurrentPage((old) => {
								//     Math.max(old - 1, 1)
								// })}
								className={`${currentPage === 1
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer'
									} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
								disabled={currentPage === 1}
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
										? currentPage === page
											? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
											: 'bg-transparent text-[#293241] hover:bg-slate-100'
										: 'text-[#293241]'
										} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => handleClick(currentPage + 1)}
								className={`${currentPage === totalPages
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer'
									}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
								disabled={
									currentPage === totalPages || fetchCourses.isPlaceholderData
								}
							>
								&gt;
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(TeacherCourses);
