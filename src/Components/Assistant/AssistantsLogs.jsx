import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import Pagination from '../Pagination/Pagination';
import { ApisContext } from '../../Context/ApisContext';

import search from '../../assets/sanadSVG/Search Icon.svg';
import deletGray from '../../assets/sanadSVG/deletGray.svg';
import downArrow from '../../assets/sanadSVG/downArrow.svg';
import leftArrow from '../../assets/sanadSVG/leftArrow.svg';
import profile from '../../assets/sanadSVG/studentSmallAvatar.svg';

import { ReactSVG } from 'react-svg';
import { SvgsContext } from '../../Context/SvgsConetxt';
import { BASUE_IMAGES } from '../../Soursre';

const AssistantsLogs = () => {
	const arr = [3, 3, 3, 3, 3];
	const itemsPerPage = 5;
	const [t] = useTranslation();
	const { setToggler, assistantId, setassistantId } = useContext(MainContext);

	const setterAssistantId = useCallback(
		(itemId) => {
			setassistantId(itemId);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[assistantId]
	);

	const { allAssistants, selectedCenter, fetchAllAssistants } =
		useContext(ApisContext);

	const { del } = useContext(SvgsContext);

	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [touched, setTouched] = useState(false);
	const [filteredItems, setfilteredItems] = useState([]);
	// const [selectedItems, setSelectedItems] = useState([]);
	// const [toggleSort, settoggleSort] = useState(false);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
		setTouched(true); // Mark input as touched when it's changed
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	// const toggleSelectItem = (id) => {
	// 	if (allAssistants) {
	// 		if (selectedItems.includes(id)) {
	// 			setSelectedItems(selectedItems?.filter((itemId) => itemId !== id));
	// 		} else {
	// 			setSelectedItems([...selectedItems, id]);
	// 		}
	// 	}
	// };

	// const toggleSelectAll = () => {
	// 	if (allAssistants) {
	// 		setSelectedItems(
	// 			selectedItems?.length === filteredItems?.length
	// 				? []
	// 				: filteredItems?.map((item) => item?._id)
	// 		);
	// 	}
	// };
	// const deleteSelectedItems = () => {
	// 	if (allAssistants) {
	// 		const updatedList = filteredItems?.filter(
	// 			(item) => !selectedItems.includes(item?._id)
	// 		);
	// 		setfilteredItems(updatedList);
	// 		setSelectedItems([]);
	// 	}
	// };

	// const handleSort = () => {
	// 	if (toggleSort) {
	// 		const reversedItems = [...filteredItems].reverse();
	// 		setfilteredItems(reversedItems);
	// 	} else {
	// 		const reversedItems = [...filteredItems].reverse();
	// 		setfilteredItems(reversedItems);
	// 	}
	// };

	// useEffect(() => {
	// 	handleSort();
	// }, [toggleSort]);

	// Calculate the start and end indexes for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, filteredItems?.length);
	const visibleData2 = filteredItems?.slice(startIndex, endIndex);


	useEffect(() => {
		if (allAssistants) {
			const filtered = allAssistants?.filter((item) => {
				if (!touched) {
					return true;
				}
				const searchTerms = searchQuery.toLowerCase().split(' ');
				return searchTerms.every(
					(term) =>
						item?.fullname.toLowerCase().includes(term) ||
						item?.code.toLowerCase().includes(term) ||
						item?.email.toLowerCase().includes(term)
				);
			});

			setfilteredItems(filtered);
		}
	}, [allAssistants, searchQuery, touched]);

	return (
		<div
			className={`w-full lg:bg-white rounded-lg flex flex-col lg:px-6 pt-6 pb-2 mb-6 gap-y-8 ${filteredItems?.length > 0 ? 'lg:h-[620px] ' : 'lg:h-auto '} relative`}
		>
			<div className="items-center justify-between hidden w-full lg:flex">
				<p className="font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
					{t('Logs.assistantLog')}
				</p>

				<div className="items-center justify-end hidden filters gap-x-2 lg:flex header ">
					<div className="SearchInput hidden lg:flex  cursor-pointer  h-10 w-80 bg-[#F4F7FE] rounded-full  justify-start p-5 items-center text-textColor__2 text-lg">
						<ReactSVG src={search} />

						<input
							placeholder={t('SingleGroup.search')}
							value={searchQuery}
							onChange={(e) => {
								handleSearchChange(e);
							}}
							onFocus={(e) => {
								e.target.style.boxShadow = 'none';
							}}
							className={
								'bg-inherit w-full text-sm text-mainColor font-bold placeholder:font-semibold   border-none rounded-sm'
							}
							type="search"
						/>
					</div>

					{/* <button className="items-center justify-center hidden px-3 py-2 text-sm text-white lg:flex gap-x-2 bg-mainColor rounded-xl">
						<ReactSVG src={downLoad} />
						{t('Logs.download')}
					</button> */}
				</div>
			</div>

			<div className="flex items-center justify-between w-full header lg:hidden row">
				<div className="flex items-center justify-between w-full gap-3 main">
					<p className="font-extrabold text-size_26 md:text-size_28 text-mainColor">
						{t('Logs.assistantLog')}
					</p>

					{/* <button className="flex items-center justify-center px-3 py-2 text-sm text-white gap-x-2 bg-mainColor rounded-xl">
						<ReactSVG src={downLoad} />
						{t('Logs.download')}
					</button> */}
				</div>
			</div>

			<div className={`largeScreen hidden lg:flex flex-col h-[70%] `}>

				<div className="textHeader   border p-6   border-[#E1E1E1] bg-[#F9FAFC]  rounded-2xl rounded-b-none flex justify-between items-center w-full">
					<p className="w-1/3 text-sm text-start text-textGray">
						{t('Logs.assistantName')}
					</p>

					<p className="w-1/3 text-sm text-start text-nowrap text-textGray">
						{t('Logs.assistantCode')}
					</p>

					<p className="w-1/3 text-sm text-start text-textGray">
						{t('register.phoneNumber')}
					</p>

				</div>
				{fetchAllAssistants.isFetched ? (
					filteredItems.length > 0 ? (
						visibleData2?.map((item, i) => {
							const lastEle = visibleData2?.length - 1
							return (
								<div
									key={item?._id}
									className={`content relative w-full py-4 border-[#E1E1E1]   border  border-t-0 ${lastEle === i && "rounded-b-2xl"}  flex items-center justify-between  px-6 `}
								>
									<div className={' w-1/3 flex items-center gap-2'}>


										{item?.profileImage !== "" ?
											<span className=''>
												<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
											</span>

											: <ReactSVG src={profile} />}
										<div className={'flex flex-col items-start '}>
											<p className="text-xs font-bold nameLesson text-mainColor text-nowrap xl:text-sm ">
												{item?.fullname?.split(' ')?.slice(0, 2)?.join('')}
											</p>
											<p className="text-xs font-bold nameLesson text-textGray text-nowrap xl:text-sm ">
												{item ? item.email : null}
											</p>
										</div>
									</div>

									<p className="w-1/3 text-xs font-semibold files xl:text-sm text-mainColor text-start">
										{item?.code}
									</p>

									<p className="w-1/3 text-xs font-semibold files xl:text-sm text-textGray text-start">
										{item?.phoneNumber}
									</p>

									<div
										className="=icons cursor-pointer absolute end-6 top-[50%] translate-y-[-50%] "
										onClick={(e) => {
											e.stopPropagation();
											setToggler((prev) => {
												return { ...prev, deletTeacher: true };
											});
											setterAssistantId(item?._id);
										}}
									>
										<ReactSVG src={deletGray} />
									</div>
								</div>
							);
						})
					) : (
						<p className="p-2 my-2 font-bold text-center  rounded-xl text-mainColor">
							{t('homepage.nothing')}
						</p>
					)
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

			{fetchAllAssistants && filteredItems?.length > 0 && (
				<div className="pagination hidden lg:flex items-center justify-center absolute bottom-4 end-[50%] translate-x-[-50%]">
					<Pagination
						totalItems={filteredItems?.length}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			)}

			{/* uncomment this part if you have the data then loop in it to display the data*/}
			<div className="flex flex-col rounded-2xl gap-y-3 lg:hidden">
				{fetchAllAssistants.isFetched ? (
					<>
						{filteredItems.length > 0 ? (
							visibleData2?.map((item, i) => {
								return (
									<Disclosure key={item?._id}>
										{({ open }) => (
											<div>
												<Disclosure.Button
													className={`py-4 px-6 w-full  bg-white  shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
														}`}
												>
													<div className="flex items-center justify-center gap-x-2">
														{item?.profileImage !== "" ?
															<span className=''>
																<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
															</span>

															: <ReactSVG src={profile} />}

														<div className="flex flex-col items-start justify-center">
															<div className="flex items-center font-bold text-mainColor text-size__14 sm:text-base gap-x-2 ">
																{item?.fullname
																	?.split(' ')
																	?.slice(0, 2)
																	?.join('')}
																{/* <Link to={"teacher/3"}
                                  onClick={(e) => e.stopPropagation()}
                                ><ReactSVG src={navigator} /></Link> */}
															</div>
															<p className="font-bold text-textGray text-2xs sm:text-xs ">
																{item?.email}
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
													<div className="flex items-center justify-between w-full">
														<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
															{t('Logs.centerName')}
														</p>
														<div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray ">
															{selectedCenter?.name}
														</div>
													</div>

													<div className="flex items-center justify-between w-full">
														<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
															{t('Logs.assistantCode')}
														</p>
														<div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-mainColor ">
															{item?.code}
														</div>
													</div>

													<div className="flex items-center justify-between w-full">
														<p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
															{t('register.phoneNumber')}
														</p>
														<div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray ">
															{item?.phoneNumber}
														</div>
													</div>

													<button
														className="flex flex-wrap justify-end w-full gap-2 font-semibold text-textGray"
														onClick={() => {
															setToggler((prev) => {
																return { ...prev, deletTeacher: true };
															});
															setterAssistantId(item?._id);
														}}
													>
														{del(18, 18)}
													</button>
												</Disclosure.Panel>
											</div>
										)}
									</Disclosure>
								);
							})
						) : (
							<p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor xl:bg-transparent">
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

				{fetchAllAssistants.isFetched && filteredItems?.length > 0 && (
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

export default AssistantsLogs;
