import { Disclosure } from '@headlessui/react';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../Soursre';
import { ApisContext } from '../../../Context/ApisContext';
import { MainContext } from '../../../Context/MainContext';
import { SvgsContext } from '../../../Context/SvgsConetxt';
import downArrowFilter from '../../../assets/sanadSVG/downArrow.svg';
import { ReactSVG } from 'react-svg';
import { useQuery } from '@tanstack/react-query';
import CourseAvatar from '../../CourseAvatar';

const WeeklySessions = () => {
	const arr = [2, 2, 2, 22, 2];
	let [t, i18n] = useTranslation();
	const { id } = useParams();
	// const cashedCenter = JSON.parse(sessionStorage.getItem('centerid'));
	const {
		headers,
		tens,
		Time,
		selectedCenter,
		handleAddGroup,
		handleDeletGroup,
		handleModifyGroup,
	} = useContext(ApisContext);
	const { handleUserName } = useContext(MainContext)
	const { leftArrow } = useContext(SvgsContext);

	// const handlePageChange = (newPage) => {
	// 	setCurrentPage(newPage);
	// };

	// const itemsPerPage = 5;
	// const [currentPage, setCurrentPage] = useState(1);

	// let Week = [
	// 	'saturday',
	// 	'sunday',
	// 	'monday',
	// 	'tuesday',
	// 	'wednesday',
	// 	'thursday',
	// 	'friday',
	// ];

	const [MainGroups, setMainGroups] = useState([]);
	// let [Days, setDays] = useState([]);

	const GetSessions = async () => {
		if (selectedCenter && id) {
			try {
				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter._id}/tutors/${id}/groups`,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					setMainGroups(res.data.data);
					return res.data.data;
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const fetchSession = useQuery({
		queryKey: [
			'GetSessions',
			`${selectedCenter}`,
			`${id}`,
			`${handleAddGroup}`,
			`${handleModifyGroup}`,
			`${handleDeletGroup}`,
		],
		queryFn: () => GetSessions(),
		enabled: !!id && !!selectedCenter,
	});

	return (
		<div className="w-full 2xl:bg-white rounded-lg flex flex-col 2xl:px-6 py-8 gap-5">
			<>
				<h2 className="header font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
					{t('Logs.lessionTable')}
				</h2>

				<div
					className={`tableLargeDesign rounded-lg  hidden 2xl:block  ${fetchSession.data?.length > 0 && 'bg-[#F4F7FE] border border-[#E1E1E1]  '} `}
				>
					{fetchSession.isFetched ? (
						fetchSession.data?.length > 0 ? (
							fetchSession.data?.map((item, i) => {
								return (
									<div
										key={i}
										className="tableLargeDesign border-b  border-[#E1E1E1] rounded-lg flex-wrap  flex justify-start"
									>


										<div
											className={`w-1/5 flex items-center justify-center  py-5  px-7 text-mainColor  font-bold text-center text-lg   `}
										>
											{item?._id === 0 && `${t(`homepage.sunday`)}`}
											{item?._id === 1 && `${t(`homepage.monday`)}`}
											{item?._id === 2 && `${t(`homepage.tuesday`)}`}
											{item?._id === 3 && `${t(`homepage.wednesday`)}`}
											{item?._id === 4 && `${t(`homepage.thursday`)}`}
											{item?._id === 5 && `${t(`homepage.friday`)}`}
											{item?._id === 6 && `${t(`homepage.saturday`)}`}
										</div>



										<div className="flex flex-col    w-4/5">
											<div className="flex text-center flex-wrap w-full h-full ">
												{item.groups.map((item, i) => {


													return (
														<div
															key={item._id}
															className={`flex flex-col py-2 lg:w-1/5 xl:w-1/5   justify-center items-center gap-1  bg-white  `}
														>
															<div className='flex items-center gap-x-1'>
																<CourseAvatar courseName={item?.courseData?.name} w={14} h={14} />
																<div className='flex flex-col items-start'>
																	<p className='text-xs text-mainColor'>
																		{`${handleUserName(item?.courseData?.name, 2)}  ( ${item?.groupNumber} )`}
																	</p>
																	<p className='text-2xs text-textColor__2'>
																		{i18n.language === "ar" ? item?.courseData?.grade?.nameAr : item?.courseData?.grade?.nameEn}
																	</p>
																</div>
															</div>
															<div className="flex items-center justify-center text-[#9CA3AF] gap-x-[2px]">
																<p className="text-xs text-[#9CA3AF]">
																	{Time(item?.startTime)}
																</p>
																:
																<p className="text-xs text-[#9CA3AF]">
																	{Time(item?.endTime)}
																</p>
															</div>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								);
							})
						) : (
							<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white">
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
										<div className="flex-1 space-y-3 py-1">
											<div className="h-2 bg-zinc-300 rounded"></div>
											<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>

				<div className="tableSmallDesign flex flex-col rounded-2xl gap-5 2xl:hidden">
					{fetchSession.isFetched ? (
						fetchSession.data?.length > 0 ? (
							fetchSession.data?.map((item, i) => {
								return (
									<div key={i}>
										<Disclosure>
											{({ open }) => (
												<>
													<Disclosure.Button
														className={`py-3 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b-[1px]  flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
															}`}
													>
														<div className='w-[80%]  flex justify-between items-center  '>
															<p className="font-bold text-mainColor sm:text-lg ">
																{item?._id === 0 && `${t(`homepage.sunday`)}`}
																{item?._id === 1 && `${t(`homepage.monday`)}`}
																{item?._id === 2 && `${t(`homepage.tuesday`)}`}
																{item?._id === 3 && `${t(`homepage.wednesday`)}`}
																{item?._id === 4 && `${t(`homepage.thursday`)}`}
																{item?._id === 5 && `${t(`homepage.friday`)}`}
																{item?._id === 6 && `${t(`homepage.saturday`)}`}
															</p>
															<p className='font-bold text-mainColor sm:text-lg'>
																{tens.includes(item?.groups?.length) ? `${item?.groups?.length} ${t("homepage.groups")}` : `${item?.groups?.length} ${t("homepage.group")}`}
															</p>
														</div>

														{open ? (
															<ReactSVG src={downArrowFilter} />
														) : (
															leftArrow()
														)}
													</Disclosure.Button>

													{item?.groups?.map((item, i) => {
														return (
															<Disclosure.Panel
																key={i}
																className="py-3 px-6 w-full bg-white  flex flex-col items-center justify-between  gap-6"
															>
																<div className="flex justify-between items-center w-full">
																	<div className='flex items-center gap-x-1'>
																		<CourseAvatar courseName={item?.courseData?.name} w={14} h={14} />
																		<div className='flex flex-col items-start'>
																			<p className='text-xs text-mainColor'>
																				{`${handleUserName(item?.courseData?.name, 2)}  ( ${item?.groupNumber} )`}
																			</p>
																			<p className='text-2xs text-textColor__2'>
																				{i18n.language === "ar" ? item?.courseData?.grade?.nameAr : item?.courseData?.grade?.nameEn}
																			</p>
																		</div>
																	</div>
																	<div className="flex items-center justify-center text-[#9CA3AF] gap-x-[2px]">
																		<p className="sm:text-sm text-xs text-[#9CA3AF]">
																			{Time(item?.startTime)}
																		</p>
																		:
																		<p className="sm:text-sm text-xs text-[#9CA3AF]">
																			{Time(item?.endTime)}
																		</p>
																	</div>
																</div>
															</Disclosure.Panel>
														);
													})}
												</>
											)}
										</Disclosure>
									</div>
								);
							})
						) : (
							<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white">
								{t('homepage.nothing')}
							</p>
						)
					) : (
						arr.map((item, i) => {
							return (
								<div key={i} className=" w-full bg-white rounded-lg p-4">
									<div className="animate-pulse w-full  flex items-center  space-x-4">
										<div className="flex-1 space-y-3 py-1">
											<div className="h-2 bg-zinc-300 rounded"></div>
											<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</>
		</div>
	);
};

export default WeeklySessions;
