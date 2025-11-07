import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Disclosure } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import { Link } from 'react-router-dom';
import { SvgsContext } from '../../../Context/SvgsConetxt';
import axios from 'axios';
import { BASE_URL } from '../../../Soursre';
import { ApisContext } from '../../../Context/ApisContext';
import { useParams } from 'react-router-dom';
import deletIcon from '../../../assets/sanadSVG/deletGray.svg';
import downArrow from '../../../assets/sanadSVG/downArrow.svg';
import sort from '../../../assets/sanadSVG/sort.svg';
import navigator from '../../../assets/sanadSVG/singleRoute.svg';
import { ReactSVG } from 'react-svg';
import { useQuery } from '@tanstack/react-query';
import scanCode from "../../../assets/sanadSVG/iocnHeaderTable.svg"

function GroupsLog() {
	const arr1 = [3, 3, 3, 3, 3];
	const { courseId } = useParams();
	const { setToggler, setselectedGroup } = useContext(MainContext);
	const {
		headers,
		selectedCenter,
		setdeletGroupId,
		handleAddGroup,
		handleModifyGroup,
		handleDeletGroup,
		Time,
		GroupsPage,
		setGroupsPage,
		tens,
	} = useContext(ApisContext);
	const { leftArrow, del } = useContext(SvgsContext);
	const [t] = useTranslation();

	const getFunction = async (selectedCenter, courseID) => {
		if (selectedCenter && courseID) {
			const res = await axios.get(
				`${BASE_URL}centers/${selectedCenter?._id}/center-courses/${courseID}/groups?limit=5&page=${GroupsPage}`,
				{ headers: headers }
			);
			return res.data;
		}
	};
	const fetchGroups = useQuery({
		queryKey: [
			'fetchGroups',
			// `${MainLoading.deletGroup}`,
			`${GroupsPage}`,
			`${selectedCenter?._id}`,
			`${courseId}`,
			// `${MainLoading.addGroupL}`,
			`${handleAddGroup}`,
			`${handleModifyGroup}`,
			`${handleDeletGroup}`,
		],
		queryFn: () => getFunction(selectedCenter, courseId),
		enabled: !!selectedCenter && !!courseId,
		placeholderData: true,
		keepPreviousData: true,
	});

	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setGroupsPage(newPage);
	};
	const [totalItems, settotalItems] = useState(0);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const handleClick = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== GroupsPage) {
			handlePageChange(newPage);
		}
	};

	const displayRange = 1;
	const pagesToShow = [];
	const startPage = Math.max(GroupsPage - displayRange, 1);
	const endPage = Math.min(GroupsPage + displayRange, totalPages);

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
		settotalItems(fetchGroups?.data?.metadata?.totalDocs);
	}, [fetchGroups, GroupsPage]);


	return (
		<>
			<div
				className={`w-full lg:bg-white rounded-lg flex flex-col lg:px-6 pt-6 gap-y-8 ${fetchGroups.data?.data?.length > 0 ? 'lg:h-[580px]' : 'h-auto'} `}
			>
				<div className="flex items-center justify-between header ">

					<p className="font-extrabold text-size_26 md:text-size_28 text-mainColor">
						{t('SingleCourse.groupLog')}
					</p>

				</div>

				<div className="largeScreen hidden lg:flex flex-col  h-[70%]">
					{fetchGroups.isFetched ? (
						<>

							<div className="Header p-6  thead bg-[#F4F7FE] border  border-[#E1E1E1]   rounded-2xl rounded-b-none flex justify-between  w-full">
								<p className="w-1/5 text-sm text-start text-textGray">
									{t('SingleCourse.groupName')}
								</p>

								<div className="flex w-1/5 text-sm gap-x-2">
									<ReactSVG src={sort} />
									<p className="text-start text-textGray">
										{t('SingleCourse.studentsCount')}
									</p>
								</div>

								<p className="w-1/5 text-sm text-start text-textGray">
									{t('homepage.day')}
								</p>
								<p className="w-1/5 text-sm text-start text-textGray">
									{t('Groups.start')}
								</p>
								<p className="w-1/5 text-sm text-start text-textGray">
									{t('Groups.end')}
								</p>
							</div>

							{fetchGroups.data && fetchGroups.data?.data?.length > 0 ? (
								fetchGroups.data?.data?.map((item, i) => {
									const lastEle = fetchGroups.data?.data?.length - 1
									return (
										<div
											key={item?._id}
											className={`content w-full border-[#E1E1E1] border-t-0 border ${lastEle === i && "rounded-b-2xl"}  flex items-center justify-center relative`}
										>
											<Link
												onClick={() => {
													sessionStorage.setItem("groupId", item?._id)
													sessionStorage.setItem("courseId", item?.centerCourse)
												}}
												to={`${item._id}`}
												className="py-[22px] px-6 w-[95%] flex items-center justify-between relative"
											>
												{/* <div className="flex w-1/5 gap-2 text-start"> */}

												<p className="w-1/5 text-sm font-bold nameLesson text-mainColor text-start">
													{item ? t('homepage.group') : null} {item.groupNumber}
												</p>

												<p className="w-1/5 text-sm font-bold nameLesson text-mainColor text-start">
													{item.studentsCount
														? tens.includes(item?.studentsCount)
															? `${item?.studentsCount} ${t('Courses.students')}`
															: `${item?.studentsCount} ${t('Courses.student')}`
														: t('homepage.nothing')}
												</p>

												{/* </div> */}
												<p className="w-1/5 text-sm font-semibold text-textGray text-start ">
													{item.dayOfWeek === 0 && t('homepage.sunday')}
													{item.dayOfWeek === 1 && t('homepage.monday')}
													{item.dayOfWeek === 2 && t('homepage.tuesday')}
													{item.dayOfWeek === 3 && t('homepage.wednesday')}
													{item.dayOfWeek === 4 && t('homepage.thursday')}
													{item.dayOfWeek === 5 && t('homepage.friday')}
													{item.dayOfWeek === 6 && t('homepage.saturday')}
												</p>
												<p className="w-1/5 text-sm font-semibold text-textGray text-start ">
													{/* {moment(item?.startTime).format('h:mm a')} */}
													{Time(item?.startTime)}
												</p>
												<p className="w-1/5 text-sm font-semibold text-textGray text-start ">
													{Time(item?.endTime)}
												</p>
											</Link>

											<div
												className="=icons cursor-pointer absolute end-12 top-[50%] translate-y-[-50%] "
												onClick={() => {

													sessionStorage.setItem("groupId", item?._id)
													sessionStorage.setItem("courseId", item?.centerCourse)
													setselectedGroup(item)

													setToggler(prev => {
														return { ...prev, checkCard: true }
													})
												}}
											>
												<ReactSVG src={scanCode} />
											</div>

											<div
												className="=icons cursor-pointer absolute end-4 top-[50%] translate-y-[-50%] "
												onClick={(e) => {
													e.stopPropagation();
													setToggler((prev) => {
														return { ...prev, deletGroup: true };
													});
													setdeletGroupId(item._id);
												}}
											>
												<ReactSVG src={deletIcon} />
											</div>
										</div>
									);
								})
							) : (
								<p className="p-2 my-2 font-bold text-center  rounded-xl text-mainColor">
									{t('homepage.nothing')}
								</p>
							)}
						</>
					) : (
						arr1?.map((item, index) => {
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

				{fetchGroups.data?.data?.length > 0 && (
					<div className="items-center justify-center hidden lg:flex gap-y-4">
						{fetchGroups?.data?.data?.length > 0 && (
							<div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
								<button
									onClick={() => handleClick(GroupsPage - 1)}
									// onClick={() => GroupsPage((old) => {
									//     Math.max(old - 1, 1)
									// })}
									className={`${GroupsPage === 1
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
										} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
									disabled={GroupsPage === 1}
								>
									&lt;
								</button>

								{pagesToShow?.map((page, index) => (
									<button
										key={index}
										onClick={() => {
											if (typeof page === 'number') {
												handleClick(page);
											}
										}}
										className={`${typeof page === 'number'
											? GroupsPage === page
												? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
												: 'bg-transparent text-[#293241] hover:bg-slate-100'
											: 'text-[#293241]'
											} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
									>
										{page}
									</button>
								))}
								<button
									onClick={() => handleClick(GroupsPage + 1)}
									className={`${GroupsPage === totalPages
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
										}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
									disabled={
										GroupsPage === totalPages || fetchGroups.isPlaceholderData
									}
								>
									&gt;
								</button>
							</div>
						)}
					</div>
				)}

				{/* uncomment this part if you have the data then loop in it to display the data*/}
				<div className="flex flex-col w-full rounded-2xl gap-y-3 lg:hidden ">
					{fetchGroups.isFetched ? (
						<>
							{fetchGroups.data && fetchGroups.data?.data?.length > 0 ? (
								fetchGroups.data?.data?.map((item, i) => {
									return (
										<Disclosure key={item?._id}>
											{({ open }) => (
												<div>
													<Disclosure.Button

														className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
															}`}
													>
														<div className="flex items-center gap-x-2">
															<h5 className="text-sm font-bold text-mainColor md:text-lg">
																{item?.groupNumber ? t('homepage.group') : null}{' '}
																{item?.groupNumber}
															</h5>
															<Link to={`${item._id}`}
																onClick={() => {
																	sessionStorage.setItem("groupId", item?._id)
																	sessionStorage.setItem("courseId", item?.centerCourse)
																}}
															>
																<ReactSVG src={navigator} />
															</Link>
														</div>

														<div className="">
															{open ? (
																<ReactSVG src={downArrow} />
															) : (
																leftArrow()
															)}
														</div>
													</Disclosure.Button>
													<Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
														<div className="flex items-center justify-between w-full">
															<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																{t('SingleCourse.studentsCount')}
															</p>
															<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray ">
																{tens.includes(item?.studentsCount)
																	? `${item?.studentsCount} ${t('Courses.students')}`
																	: `${item?.studentsCount} ${t('Courses.student')}`}
															</p>
														</div>

														<div className="flex items-center justify-between w-full">
															<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																{t('homepage.day')}
															</p>
															<div className="flex flex-wrap justify-end gap-2 text-xs font-semibold text-textGray ">
																{item.dayOfWeek === 0 && t('homepage.sunday')}
																{item.dayOfWeek === 1 && t('homepage.monday')}
																{item.dayOfWeek === 2 && t('homepage.tuesday')}
																{item.dayOfWeek === 3 &&
																	t('homepage.wednesday')}
																{item.dayOfWeek === 4 && t('homepage.thursday')}
																{item.dayOfWeek === 5 && t('homepage.friday')}
																{item.dayOfWeek === 6 && t('homepage.saturday')}
															</div>
														</div>
														<div className="flex items-center justify-between w-full">
															<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																{t('Groups.start')}
															</p>
															<div className="flex flex-wrap justify-end gap-2 text-xs font-semibold text-textGray">
																{Time(item?.startTime)}
															</div>
														</div>
														<div className="flex items-center justify-between w-full">
															<p className="text-xs font-semibold text-center sm:text-size__14 text-textGray text-nowrap">
																{t('Groups.end')}
															</p>
															<div className="flex flex-wrap justify-end gap-2 text-xs font-semibold text-textGray ">
																{Time(item?.endTime)}
															</div>
														</div>

														<div className="flex items-center  w-full justify-end  gap-x-2">

															<button
																onClick={(e) => {
																	e.stopPropagation();
																	setToggler((prev) => {
																		return { ...prev, deletGroup: true };
																	});
																	setdeletGroupId(item._id);
																}}
																type="button"
																className="  "
															>
																<ReactSVG src={deletIcon} />

															</button>
															<div
																className="  "
																onClick={() => {

																	sessionStorage.setItem("groupId", item?._id)
																	sessionStorage.setItem("courseId", item?.centerCourse)
																	setselectedGroup(item)

																	setToggler(prev => {
																		return { ...prev, checkCard: true }
																	})
																}}
															>
																<ReactSVG src={scanCode} />
															</div>
														</div>
													</Disclosure.Panel>
												</div>
											)}
										</Disclosure>
									);
								})
							) : (
								<p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">
									{t('homepage.nothing')}
								</p>
							)}
						</>
					) : (
						arr1?.map((item, i) => {
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
					{fetchGroups.data?.data?.length > 0 && (
						<div className="flex items-center justify-center gap-y-4">
							{fetchGroups?.data?.data?.length > 0 && (
								<div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
									<button
										onClick={() => handleClick(GroupsPage - 1)}
										// onClick={() => GroupsPage((old) => {
										//     Math.max(old - 1, 1)
										// })}
										className={`${GroupsPage === 1
											? 'opacity-50 cursor-not-allowed'
											: 'cursor-pointer'
											} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
										disabled={GroupsPage === 1}
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
												? GroupsPage === page
													? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
													: 'bg-transparent text-[#293241] hover:bg-slate-100'
												: 'text-[#293241]'
												} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
										>
											{page}
										</button>
									))}
									<button
										onClick={() => handleClick(GroupsPage + 1)}
										className={`${GroupsPage === totalPages
											? 'opacity-50 cursor-not-allowed'
											: 'cursor-pointer'
											}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
										disabled={
											GroupsPage === totalPages || fetchGroups.isPlaceholderData
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

export default React.memo(GroupsLog);
