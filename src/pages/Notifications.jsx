import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../Context/MainContext';
import { ApisContext } from '../Context/ApisContext';
import Post from '../Components/Skeletons/Post';
import { ReactSVG } from 'react-svg';
import avatar from '../assets/sanadSVG/imgUser.svg';
import { Listbox, Disclosure } from '@headlessui/react';
import downarrow from '../assets/sanadSVG/downArrow.svg';
import { SvgsContext } from '../Context/SvgsConetxt';
import filterIcon from '../assets/sanadSVG/filterIcon.svg';
import { BASUE_IMAGES } from '../Soursre';
import CourseAvatar from "../Components/CourseAvatar"
export default function Notifications() {
	let [t, i18n] = useTranslation();
	const isToggled = JSON.parse(sessionStorage.getItem('toggleNotify'));

	const { toggleNotifications, settoggleNotifications } =
		useContext(MainContext);
	const {
		MainLoading,
		fetchNotifications,
		currentPageOfNoticfications,
		setCurrentPageOfNoticfications,
		selectedTypeN,
		setselectedTypeN,
		mainTypes,
		acceptRequest,
		refusedRequest,
	} = useContext(ApisContext);
	const { leftArrow } = useContext(SvgsContext);




	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setCurrentPageOfNoticfications(newPage);
	};
	const [totalItems, settotalItems] = useState(0);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const handleClick = (newPage) => {
		if (
			newPage >= 1 &&
			newPage <= totalPages &&
			newPage !== currentPageOfNoticfications
		) {
			handlePageChange(newPage);
		}
	};

	const displayRange = 1;
	const pagesToShow = [];
	const startPage = Math.max(currentPageOfNoticfications - displayRange, 1);
	const endPage = Math.min(
		currentPageOfNoticfications + displayRange,
		totalPages
	);

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

	const filteredData = mainTypes.filter((item) => {
		return item?.status !== selectedTypeN.status;
	});

	// console.log(currentPageOfNoticfications, fetchNotifications.isFetching, fetchNotifications.fetchStatus)

	useEffect(() => {
		settotalItems(fetchNotifications?.data?.metadata?.totalDocs);
		//    setcurrentPageOfNoticfications()
	}, [fetchNotifications, currentPageOfNoticfications]);

	useEffect(() => {
		if (isToggled !== null) {
			settoggleNotifications(isToggled);
		} else {
			settoggleNotifications(false);
		}
		return () => {
			if (toggleNotifications) {
				sessionStorage.removeItem('toggleNotify');
				settoggleNotifications(false);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggleNotifications]);

	// console.log(fetchNotifications.data)

	return (
		<>
			<main className="flex flex-col gap-10">
				<header className="flex flex-col lg:flex-row gap-4 justify-between w-full pt-5">
					<h3 className=" text-center lg:text-start text-4xl text-mainColor font-extrabold">
						{t('Notifications.notifications')}
					</h3>
					<div className="w-full lg:w-[300px] ">
						<Listbox
							value={selectedTypeN}
							onChange={(e) => {
								setselectedTypeN(e);
								setCurrentPageOfNoticfications(1);
							}}
						>
							{({ open, selected }) => (
								<div className="relative mt-1">
									<Listbox.Button
										className={`font-semibold      text-mainColor  py-3 px-2 text-sm   
                      relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm `}
									>
										<span className="absolute top-[50%] translate-y-[-50%] end-4">
											{open ? <ReactSVG src={downarrow} /> : leftArrow()}
										</span>

										<div className="flex items-center gap-x-4">
											<span>
												<ReactSVG src={filterIcon} />
											</span>
											<span
												className={`block truncate text-size_12 sm:text-base`}
											>
												{selectedTypeN?.name}
											</span>
										</div>
									</Listbox.Button>

									<Listbox.Options
										className="absolute  mt-1 max-h-40 z-10  
                       w-full overflow-y-scroll rounded-md bg-white py-1 text-base scrollbar-thin shadow  focus:outline-none sm:text-sm "
									>
										{filteredData &&
											filteredData.map((person, personIdx) => (
												<Listbox.Option
													key={personIdx}
													className={({ active }) =>
														` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor text-size_12 sm:text-sm  '}`
													}
													value={person}
												>
													{({ selectedTypeN, selected }) => (
														<span
															className={`block truncate text-size_12 sm:text-sm   ${selectedTypeN ? 'font-medium' : 'font-normal'}`}
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
					</div>
				</header>

				<section className=" w-full gap-6 hidden lg:flex">
					<div className="w-full  rounded-2xl    flex flex-col gap-4 ">
						{!fetchNotifications?.isFetched ? (
							Array.from({ length: 5 }).map((item, i) => (
								<div className=" bg-white shadow p-4 rounded-2xl " key={i}>
									<Post />
								</div>
							))
						) : (
							<>
								{fetchNotifications.data?.data.length > 0 ? (
									fetchNotifications.data?.data?.map((item, i) => {
										return (
											<div
												key={item?._id}
												className="box bg-white shadow flex items-center flex-col md:flex-row hover:scale-[1.02] hover:bg-mainColor transition-all justify-between  p-4 rounded-2xl gap-5 group"
											>
												<div className="w-4/5 flex flex-col lg:flex-row  items-center justify-between">
													<div className="imageData w-1/3 text flex items-center gap-x-2">

														{item?.tutorCourse?.tutor?.profileImage !== "" ?
															<span className=''>
																<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.tutorCourse?.tutor?.profileImage}`} alt="profileImage" />
															</span>

															: <ReactSVG src={avatar} />}
														<div>
															<h4 className="text-mainColor font-bold text-sm group-hover:text-white">
																{item?.tutorCourse?.tutor?.fullname}
															</h4>
															<p className="font-semibold text-textColor__2 text-xs sm:text-sm leading-snug group-hover:text-white">
																{item?.tutorCourse?.tutor?.fullname}{' '}
															</p>
														</div>
													</div>

													<div className='flex  w-1/3 items-center gap-x-2'>
														<CourseAvatar courseName={item?.tutorCourse?.courseData?.name} w={24} h={24} />
														<div>
															<h4 className="text-mainColor font-bold text-sm group-hover:text-white ">
																{item?.tutorCourse?.courseData?.name}
															</h4>
															<p className="font-semibold text-textColor__2 text-xs sm:text-sm leading-snug group-hover:text-white">
																{item?.tutorCourse?.courseData?.code}
															</p>
														</div>
													</div>

													<p className="text-sm w-1/3 group-hover:text-white">
														{i18n.language === 'ar'
															? `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameAr}`
															: i18n.language === 'en'
																? `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameEn}`
																: null}
													</p>
												</div>

												<div className="buttons w-1/5 flex items-center justify-end gap-x-4">
													{item?.status === 'pending' ? (
														<>
															<button
																type="button"
																disabled={
																	MainLoading.acceptCourse ||
																	MainLoading.refusesCourse
																}
																onClick={() => acceptRequest(item?._id)}
																className={`font-semibold text-sm border-[1px] border-green text-green rounded-2xl py-2  px-4  hover:bg-green hover:text-white transition-all   `}
															>
																{t('homepage.accept')}
															</button>

															<button
																type="button"
																disabled={
																	MainLoading.refusesCourse ||
																	MainLoading.acceptCourse
																}
																onClick={() => refusedRequest(item?._id)}
																className={`font-semibold text-sm border-[1px] border-err text-err rounded-2xl py-2 hover:bg-err hover:text-white transition-all  px-4`}
															>
																{t('homepage.refuse')}
															</button>
														</>
													) : (
														<p
															className={`${item?.status === 'rejected' ? 'bg-red-50 text-err' : 'bg-lime-50 text-green'} text-xs sm:text-sm px-2 py-1 rounded-lg`}
														>
															{item?.status === selectedTypeN.status
																? selectedTypeN.name
																: null}
														</p>
													)}
												</div>
											</div>
										);
									})
								) : (
									<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white ">
										{t('homepage.nothing')}
									</p>
								)}

								{fetchNotifications.data?.data?.length > 0 && (
									<div className="flex items-center justify-center gap-y-4">
										{fetchNotifications?.data?.data?.length > 0 && (
											<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
												<button
													onClick={() =>
														handleClick(currentPageOfNoticfications - 1)
													}
													// onClick={() => setCurrentPageOfNoticfications((old) => {
													//     Math.max(old - 1, 1)
													// })}
													className={`${currentPageOfNoticfications === 1
														? 'opacity-50 cursor-not-allowed'
														: 'cursor-pointer'
														} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
													disabled={currentPageOfNoticfications === 1}
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
															? currentPageOfNoticfications === page
																? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
																: 'bg-transparent text-[#293241] hover:bg-slate-100'
															: 'text-[#293241]'
															} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
													>
														{page}
													</button>
												))}
												<button
													onClick={() =>
														handleClick(currentPageOfNoticfications + 1)
													}
													className={`${currentPageOfNoticfications === totalPages
														? 'opacity-50 cursor-not-allowed'
														: 'cursor-pointer'
														}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
													disabled={
														currentPageOfNoticfications === totalPages ||
														fetchNotifications.isPlaceholderData
													}
												>
													&gt;
												</button>
											</div>
										)}
									</div>
								)}
							</>
						)}
					</div>
				</section>








				{/* small design */}
				<div className="flex flex-col rounded-2xl gap-y-3 lg:hidden">
					{!fetchNotifications?.isFetched ? (
						Array.from({ length: 5 }).map((item, i) => (
							<div className=" bg-white shadow p-4 rounded-2xl " key={i}>
								<Post />
							</div>
						))
					) : (
						<>
							{fetchNotifications.data?.data?.length > 0 ? (
								fetchNotifications.data?.data?.map((item, i) => {
									return (
										<Disclosure key={item?._id}>
											{({ open }) => (
												<div>
													<Disclosure.Button
														className={`py-4 px-5 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
															}`}
													>
														<div className="flex items-center  gap-x-2">
															{item?.tutorCourse?.tutor?.profileImage !== "" ?
																<span className=''>
																	<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.tutorCourse?.tutor?.profileImage}`} alt="profileImage" />
																</span>

																: <ReactSVG src={avatar} />}

															<div className="flex flex-col items-start">
																<div className="font-bold text-mainColor text-xs sm:text-base  flex items-center  text-nowrap gap-x-2 ">
																	{item?.tutorCourse?.tutor?.fullname}
																</div>
																<p className="font-bold text-textGray text-size_12 sm:text-sm ">
																	{/* {i18n.language === "ar" ? `${t("homeRev.grade")} ${item?.tutorCourse?.courseData?.grade?.nameAr}` : `${t("homeRev.grade")} ${item?.tutorCourse?.courseData?.grade?.nameEn}`} */}

																	{item?.tutorCourse?.tutor?.code}
																</p>
															</div>
														</div>

														<div className="flex items-center gap-x-4">
															<p
																className={`${item?.status === 'pending' ? 'bg-orange-300 text-orange-100' : item?.status === 'rejected' ? 'bg-red-50 text-err' : item?.status === 'accepted' && 'bg-lime-100 text-green'} text-xs sm:text-sm px-2 py-1 rounded-lg`}
															>
																{item?.status === selectedTypeN.status
																	? selectedTypeN.name
																	: null}
															</p>
															{open ? (
																<ReactSVG src={downarrow} />
															) : (
																leftArrow()
															)}
														</div>
													</Disclosure.Button>
													<Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
														<div className="flex justify-between items-center w-full">
															<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
																{t('Groups.nameCourse')}
															</p>
															<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																{item?.tutorCourse?.courseData?.name}
															</p>
														</div>
														<div className="flex justify-between items-center w-full">
															<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
																{t('SingleCourse.courseCode')}
															</p>
															<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																{item?.tutorCourse?.courseData?.code}
															</p>
														</div>
														<div className="flex justify-between items-center w-full">
															<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
																{t('Logs.educationalStage')}
															</p>
															<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																{i18n.language === 'ar'
																	? `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameAr}`
																	: `${t('homeRev.grade')} ${item?.tutorCourse?.courseData?.grade?.nameEn}`}
															</p>
														</div>

														<div className="buttons w-full flex items-center justify-end gap-x-4">
															{item?.status === 'pending' && (
																<>
																	<button onClick={() => acceptRequest(item?._id)} className="font-semibold text-sm border-[1px] border-green text-green rounded-2xl py-2  px-4 hover:bg-green hover:text-white transition-all ">
																		{t('homepage.accept')}
																	</button>

																	<button onClick={() => refusedRequest(item?._id)} className="font-semibold text-sm border-[1px] border-err text-err rounded-2xl py-2  px-4 hover:bg-err hover:text-white transition-all">
																		{t('homepage.refuse')}
																	</button>
																</>
															)}
														</div>
													</Disclosure.Panel>
												</div>
											)}
										</Disclosure>
									);
								})
							) : (
								<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white xl:bg-transparent">
									{t('homepage.nothing')}
								</p>
							)}
							{fetchNotifications.data?.data?.length > 0 && (
								<div className="flex items-center justify-center gap-y-4">
									{fetchNotifications?.data?.data?.length > 0 && (
										<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
											<button
												onClick={() =>
													handleClick(currentPageOfNoticfications - 1)
												}
												// onClick={() => setCurrentPageOfNoticfications((old) => {
												//     Math.max(old - 1, 1)
												// })}
												className={`${currentPageOfNoticfications === 1
													? 'opacity-50 cursor-not-allowed'
													: 'cursor-pointer'
													} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
												disabled={currentPageOfNoticfications === 1}
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
														? currentPageOfNoticfications === page
															? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
															: 'bg-transparent text-[#293241] hover:bg-slate-100'
														: 'text-[#293241]'
														} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
												>
													{page}
												</button>
											))}
											<button
												onClick={() =>
													handleClick(currentPageOfNoticfications + 1)
												}
												className={`${currentPageOfNoticfications === totalPages
													? 'opacity-50 cursor-not-allowed'
													: 'cursor-pointer'
													}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
												disabled={
													currentPageOfNoticfications === totalPages ||
													fetchNotifications.isPlaceholderData
												}
											>
												&gt;
											</button>
										</div>
									)}
								</div>
							)}
						</>
					)}
				</div>
			</main>
		</>
	);
}
