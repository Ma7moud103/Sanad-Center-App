import React, { useContext, useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import navigator from '../../assets/sanadSVG/singleRoute.svg';
import { ReactSVG } from 'react-svg';
import search from "../../assets/sanadSVG/Search Icon.svg"
import leftArrow from '../../assets/sanadSVG/leftArrow.svg';
import downArrow from '../../assets/sanadSVG/downArrow.svg';
import { ApisContext } from '../../Context/ApisContext';
import profile from '../../assets/sanadSVG/studentSmallAvatar.svg';

import Pagination from '../Pagination/Pagination';
import { BASUE_IMAGES } from '../../Soursre';
const TeachersLog = () => {
	const arr = [3, 3, 3, 3, 3];
	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};
	const [t] = useTranslation();

	// const { profile } = useContext(SvgsContext);
	const {
		fetchTutors,
		tutors,
		tens,
		setsingleTeacherData,
	} = useContext(ApisContext);



	const [searchQuery, setsearchQuery] = useState("")
	const [filteredItems, setfilteredItems] = useState([])
	const handleSearchChange = (event) => {
		setsearchQuery(event.target.value);
	};

	useEffect(() => {
		if (tutors) {
			const filtered = tutors?.filter(item => {

				const searchTerms = searchQuery.toLowerCase().split(' ');
				return searchTerms.every(term =>
					item?.fullname.toLowerCase().includes(term) ||
					item?.code.toLowerCase().includes(term)
				);
			});

			setfilteredItems(filtered);
		}
	}, [tutors, searchQuery]);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, filteredItems?.length);
	const visibleData2 = filteredItems?.slice(startIndex, endIndex);
	console.log(filteredItems)



	return (
		<div
			className={`w-full xl:bg-white rounded-lg flex flex-col xl:px-6 pt-6 pb-2 gap-y-8 ${filteredItems?.length > 0 ? 'xl:h-[620px] ' : 'xl:h-auto '} relative`}
		>
			<div className="hidden xl:flex w-full  justify-between items-center">
				<p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32   text-mainColor">
					{t('Logs.teacherLog')}
				</p>

				<div className="filters  gap-x-2  hidden lg:flex header justify-end items-center  ">

					<div className="SearchInput hidden lg:flex  cursor-pointer  h-10 w-80 bg-[#F4F7FE] rounded-full  justify-start p-5 items-center text-textColor__2 text-lg"  >
						<ReactSVG src={search} />
						<input
							placeholder={t("SingleGroup.search")}
							value={searchQuery}
							onChange={(e) => { handleSearchChange(e) }}
							onFocus={(e) => {
								e.target.style.boxShadow = "none"
							}}
							className={"bg-inherit w-full text-sm text-mainColor text-start font-bold placeholder:font-semibold   border-none rounded-sm"} type="text" />
					</div>
					{/* <button className="hidden lg:flex items-center justify-center gap-x-2 bg-mainColor text-white rounded-xl px-3 py-2 text-sm">
						<ReactSVG src={downLoad} />
						{t('Logs.download')}
					</button> */}
				</div>
			</div>

			<div className="header flex xl:hidden row header justify-between items-center w-full">
				<div className="main flex flex-col gap-3">
					<p className="font-extrabold  text-size_26 md:text-size_28    text-mainColor">
						{t('Logs.teacherLog')}
					</p>
				</div>

				{/* <button className="flex lg:hidden items-center justify-center gap-x-2 bg-mainColor text-white rounded-xl px-3 py-2 text-sm">
					<ReactSVG src={downLoad} />
					{t('Logs.download')}
				</button> */}
			</div>

			<div className={`largeScreen hidden xl:flex flex-col  h-[70%]`}>
				<>
					<div className="thead border px-6 py-5 border-[#E1E1E1] bg-[#F9FAFC]  rounded-2xl rounded-b-none flex justify-between items-center w-full">
						<div className="textHeader w-full   flex justify-between">
							<p className="text-start text-textGray w-1/4 text-sm">
								{t('Logs.teacherName')}
							</p>



							<p className="text-start  text-textGray  w-1/4 text-sm">
								{t('Groups.studentsNum')}
							</p>
							<p className="text-start text-textGray  w-1/4 text-sm">
								{t('register.phoneNumber')}
							</p>
							<p className="text-start text-textGray  w-1/4 text-sm">
								{t('Logs.numberOfCourses')}
							</p>
						</div>
					</div>
					{fetchTutors.isFetched ? (
						visibleData2?.length > 0 ? (
							visibleData2?.map((item, i) => {
								const isLastItem = i === visibleData2?.length - 1;

								return (
									<div
										key={i}
										className={`content w-full border-[#E1E1E1]  border-t-0 border flex items-center justify-center py-4   px-6 ${isLastItem && 'rounded-b-xl'}`}
									>
										<Link
											onClick={() => setsingleTeacherData(item)}
											to={`teacher/${item?._id}`}
											className="w-full flex items-center justify-between "
										>
											{/* <div className="flex text-start gap-2 w-1/5"> */}

											<div className="nameLesson w-1/4  flex items-center gap-x-2 ">
												{item?.profileImage !== "" ?
													<span className=''>
														<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
													</span>

													: <ReactSVG src={profile} />}
												<div>
													<p className=" font-bold text-mainColor text-start text-xs lg:text-sm ">
														{item?.fullname?.split(' ')?.slice(0, 2)?.join(' ')}
													</p>
													<p className=" font-bold text-textGray text-start text-xs lg:text-sm ">
														{item?.code}
													</p>
												</div>
											</div>



											{/* </div> */}
											<p className="files font-semibold  text-textGray text-start w-1/4 text-xs lg:text-sm  ">
												{tens.includes(item?.totalStudents)
													? `${item?.totalStudents} ${t('Courses.students')}`
													: item?.totalStudents === 0
														? t('homepage.nothing')
														: `${item?.totalStudents} ${t('Courses.student')}`}
											</p>

											<p className="files font-semibold  text-textGray text-start w-1/4 text-xs lg:text-sm  ">
												{item?.phoneNumber}
											</p>
											<p className="files font-semibold  text-textGray text-start w-1/4 text-xs lg:text-sm   ">
												{item?.totalCourses
													? tens.includes(item?.totalCourses)
														? `${item?.totalCourses} ${t('StudentDetails.courses')}`
														: `${item?.totalCourses} ${t('Courses.course')}`
													: t('homepage.nothing')}
											</p>
										</Link>
									</div>
								);
							})
						) : (
							<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor">
								{t('homepage.nothing')}
							</p>
						)
					) : (
						arr?.map((item, index) => {
							return (
								<div
									key={index}
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
							);
						})
					)}
				</>
			</div>

			{fetchTutors.isFetched && filteredItems?.length > 0 && (
				<div className="hidden mt-5 xl:flex items-center justify-center">
					<Pagination
						totalItems={filteredItems?.length}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			)}

			{/* uncomment this part if you have the data then loop in it to display the data*/}
			<div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
				{/*  ${fetchTutors.includes(item.id) ? "bg-[#F4F7FE]" : "bg-white"}    */}

				{fetchTutors.isFetched ? (
					<>
						{visibleData2?.length > 0 ? (
							visibleData2?.map((item, i) => {
								return (
									<Disclosure key={i}>
										{({ open }) => (
											<div>
												<Disclosure.Button
													className={`py-4 px-6 w-full bg-white  shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
														}`}
												>
													<div className="flex items-center justify-center gap-x-2">
														{/* <img className='' src={item?.student?.profileImage ? item?.student?.profileImage : profile} alt="profileImage" /> */}
														{/* {profile(20, 20)} */}
														{/* <ReactSVG src={userImg} /> */}
														{item?.profileImage !== "" ?
															<span className=''>
																<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
															</span>

															: <ReactSVG src={profile} />}

														<div className="flex flex-col items-start justify-center">
															<div className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18 flex items-center gap-x-2 ">
																{item?.fullname
																	?.split(' ')
																	?.slice(0, 2)
																	?.join(' ')}
																<Link
																	to={`teacher/${item?._id}`}
																	onClick={(e) => {
																		e.stopPropagation();
																		setsingleTeacherData(item);
																	}}
																>
																	<ReactSVG src={navigator} />
																</Link>
															</div>
															<p className="font-bold text-textGray text-size_12 sm:text-sm md:text-base">
																{item?.code}
															</p>
														</div>
													</div>

													{open ? (
														<ReactSVG src={downArrow} />
													) : (
														<ReactSVG src={leftArrow} />
													)}
												</Disclosure.Button>
												<Disclosure.Panel
													className={`p-6 w-full bg-white  border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6`}
												>

													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('Groups.studentsNum')}
														</p>
														<div className="flex text-size_12 sm:text-size__14  gap-2 font-semibold text-textGray flex-wrap justify-end ">
															{tens.includes(item?.totalStudents)
																? `${item?.totalStudents} ${t('Courses.students')}`
																: item?.totalStudents === 0
																	? t('homepage.nothing')
																	: `${item?.totalStudents} ${t('Courses.student')}`}
														</div>
													</div>
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('register.phoneNumber')}
														</p>
														<div className="flex text-size_12 sm:text-size__14  gap-2 font-semibold text-textGray flex-wrap justify-end ">
															{item?.phoneNumber}
														</div>
													</div>{' '}
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('Logs.numberOfCourses')}
														</p>
														<div className="flex text-size_12 sm:text-size__14  gap-2 font-semibold text-textGray flex-wrap justify-end ">
															{item?.totalCourses
																? tens.includes(item?.totalCourses)
																	? `${item?.totalCourses} ${t('StudentDetails.courses')}`
																	: `${item?.totalCourses} ${t('Courses.course')}`
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
						)}
					</>
				) : (
					arr?.map((item, i) => {
						return (
							<div
								key={i}
								className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}
							>
								<div className="animate-pulse w-full  flex items-center  space-x-4">
									<div className="rounded-full bg-zinc-300 h-10 w-10"></div>
									<div className="flex-1 space-y-3 py-1">
										<div className="h-2 bg-zinc-300 rounded"></div>
										<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
									</div>
								</div>
							</div>
						);
					})
				)}

				{fetchTutors.isFetched &&
					filteredItems?.length > 0 && (
						<Pagination
							totalItems={filteredItems?.length}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					)}
			</div>
		</div>
	);
};

export default memo(TeachersLog);
