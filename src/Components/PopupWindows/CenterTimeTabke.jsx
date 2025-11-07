// import { useContext } from 'react';
// import { MainContext } from '../../Context/MainContext';
// import { useTranslation } from 'react-i18next';
// import exit from '../../assets/sanadSVG/Multiply.svg';
// // import { downArrow, downArrowFilter, filterIcon, timeTableIcon } from "../../Svgs";
// import { Listbox } from '@headlessui/react';
// import { Disclosure } from '@headlessui/react';
// import { SvgsContext } from '../../Context/SvgsConetxt';
// import { ApisContext } from '../../Context/ApisContext';
// import ts from '../../assets/sanadSVG/imgUser.svg';
// import timeTableIcon from '../../assets/sanadSVG/timeline.svg';
// import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';
// import { ReactSVG } from 'react-svg';
// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
// import { BASUE_IMAGES } from '../../Soursre';
// import CourseAvatar from '../CourseAvatar';


// export default function CenterTimeTabke() {
// 	const [t, i18n] = useTranslation();

// 	const {
// 		Time,

// 		fetchTutors,
// 		fetchTutorsCourses,
// 		selectedTutor,
// 		setselectedTutor,
// 		selectedTutorCourse,
// 		setselectedTutorCourse,
// 		fetchGroupsTable,
// 	} = useContext(ApisContext);
// 	const { Toggler, setToggler, direction, handleUserName } = useContext(MainContext);
// 	const { leftArrow, checkedIcon, } = useContext(SvgsContext);

// 	function close() {
// 		setToggler({ ...Toggler, centerTimeTable: false });
// 		setselectedTutor("")
// 		setselectedTutorCourse("")
// 	}



// 	return (
// 		<>
// 			<Dialog
// 				dir={direction}
// 				open={Toggler.centerTimeTable}
// 				as="div"
// 				className="relative z-30 focus:outline-none"
// 				onClose={close}
// 			>
// 				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
// 					<div className="flex items-center justify-center min-h-full p-4 py-6 b">
// 						<DialogPanel
// 							transition
// 							className="w-full sm:w-[600px] xl:w-[70%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
// 						>
// 							<button
// 								className="flex items-center justify-center p-3 bg-white rounded-full"
// 								onClick={() => {
// 									setToggler({ ...Toggler, centerTimeTable: false })

// 								}
// 								}
// 							>
// 								<ReactSVG src={exit} />
// 							</button>
// 							<DialogTitle
// 								as="h3"
// 								className="font-medium text-base/7 text-mainColor"
// 							>
// 								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
// 									<ReactSVG src={timeTableIcon} />
// 									<h3 className="text-2xl  font-black text-[#023E8A]">
// 										{t('homeRev.centerTime')}
// 									</h3>
// 								</div>
// 							</DialogTitle>
// 							{/* content */}

// 							<form className="relative flex flex-col items-center justify-start mt-3 gap-y-2">
// 								<div className="flex flex-col items-center w-full selectBox gap-x-mainGap gap-y-2 lg:flex-row">
// 									<div className="w-full box lg:w-1/2">
// 										<label
// 											htmlFor="teacher"
// 											className="text-xs font-semibold text-textColor__2 sm:text-sm"
// 										>
// 											{t('Logs.teacherNa')}
// 										</label>

// 										<Listbox
// 											onChange={(ele) => {
// 												setselectedTutor(ele);
// 											}}
// 										>
// 											{({ open }) => (
// 												<div className="relative mt-2 sm:mt-1">
// 													<Listbox.Button
// 														className={`font-semibold   px-4 py-3 text-sm
//                                                  relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  items-center justify-between  sm:text-sm`}
// 													>
// 														<div className="flex items-center gap-x-1">
// 															{selectedTutor ? (
// 																<>
// 																	{selectedTutor?.profileImage !== "" ?
// 																		<span className=''>
// 																			<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${selectedTutor?.profileImage}`} alt="profileImage" />
// 																		</span>

// 																		: <ReactSVG src={ts} />}
// 																	<div className="flex flex-col items-center justify-start">
// 																		<span
// 																			className={`block truncate text-sm text-mainColor`}
// 																		>

// 																			{handleUserName(selectedTutor?.fullname, 2)}
// 																		</span>
// 																		<span className="text-xs  text-textGray">
// 																			{selectedTutor?.code}
// 																		</span>
// 																	</div>
// 																</>
// 															) : (
// 																<span className="text-textGray">
// 																	{t('homepage.tutorPlaceholder')}
// 																</span>
// 															)}
// 														</div>


// 														<ReactSVG src={downArrowFilter} />

// 													</Listbox.Button>

// 													<Listbox.Options
// 														className="absolute z-10 w-full py-1 mt-1 overflow-y-auto bg-white rounded-md shadow max-h-40 // focus:outline-none scrollbar-thin"
// 													>
// 														{fetchTutors.isFetched ? fetchTutors.data.length > 0 ? fetchTutors.data
// 															?.filter(
// 																(item) =>
// 																	item?.fullname !== selectedTutor?.fullname
// 															)
// 															?.map((person, personIdx) => (
// 																<Listbox.Option
// 																	key={personIdx}
// 																	className={({ active }) =>
// 																		` relative cursor-pointer select-none py-2 px-2`
// 																	}
// 																	value={person}
// 																>
// 																	{({ active }) => (
// 																		<div className={`flex ${active && "bg-orange-100   rounded-lg transition-all"} p-1  w-full items-center  justify-between`}>
// 																			<div className="flex items-center gap-x-1">
// 																				{person?.profileImage !== "" ?
// 																					<span className=''>
// 																						<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${person?.profileImage}`} alt="profileImage" />
// 																					</span>

// 																					: <ReactSVG src={ts} />}
// 																				<div className="flex flex-col">
// 																					<span
// 																						className={`block truncate text-xs text-mainColor ${selectedTutor
// 																							? 'font-medium'
// 																							: 'font-normal'
// 																							}`}
// 																					>
// 																						{person?.fullname}
// 																					</span>
// 																					<span className="text-xs text-textGray ">
// 																						{person?.code}
// 																					</span>
// 																				</div>
// 																			</div>
// 																		</div>
// 																	)}
// 																</Listbox.Option>
// 															)) : <span className='px-4 text-xs text-center'>{t("homepage.nothing")}</span>
// 															: <span className='px-4 text-xs text-center'>Wait ...</span>}
// 													</Listbox.Options>
// 												</div>
// 											)}
// 										</Listbox>
// 									</div>

// 									<div className="w-full box lg:w-1/2">
// 										<label
// 											htmlFor="teacher"
// 											className="text-sm font-semibold text-textColor__2"
// 										>
// 											{t('Courses.courseName')}
// 										</label>

// 										<Listbox
// 											onChange={(ele) => {
// 												setselectedTutorCourse(ele);
// 											}}
// 										>
// 											{({ open }) => (
// 												<div className="relative mt-2 sm:mt-1">
// 													<Listbox.Button
// 														className={`font-semibold   px-4 py-3 text-sm
//                                                  relative w-full flex cursor-pointer rounded-lg bg-white text-left  focus:outline-none  items-center justify-between  sm:text-sm`}
// 													>
// 														<div className="flex items-center gap-x-1">
// 															{

// 																selectedTutorCourse ? (
// 																	<>
// 																		{/* {selectedTutorCourse?.courseData?.image !== "" ? <img src={selectedTutorCourse?.courseData?.image} alt="avatar" /> : <ReactSVG src={avatar} />} */}
// 																		<CourseAvatar courseName={selectedTutorCourse?.tutorCourse
// 																			?.courseData?.name} w={25} h={25} />
// 																		<div className="flex flex-col items-start justify-center ">
// 																			<span
// 																				className={`block truncate text-sm text-mainColor`}
// 																			>

// 																				{handleUserName(selectedTutorCourse?.tutorCourse
// 																					?.courseData?.name, 3)}
// 																			</span>
// 																			<span className="text-xs  text-textGray">
// 																				{i18n.language === 'ar'
// 																					? `${t('homeRev.grade')} ${selectedTutorCourse?.tutorCourse?.courseData?.grade?.nameAr} `
// 																					: `${t('homeRev.grade')} ${selectedTutorCourse?.tutorCourse?.courseData?.grade?.nameEn} `}
// 																				-
// 																				{selectedTutorCourse?.tutorCourse
// 																					?.term === '0'
// 																					? t('homeRev.highSchool')
// 																					: selectedTutorCourse?.tutorCourse?.term
// 																						? selectedTutorCourse?.tutorCourse
// 																							?.term === '1'
// 																							? `${t('homeRev.term')} ${t('homeRev.first')}`
// 																							: selectedTutorCourse?.tutorCourse
// 																								?.term === '2'
// 																								? `${t('homeRev.term')} ${t('homeRev.second')}`
// 																								: selectedTutorCourse?.tutorCourse
// 																									?.term === '3' &&
// 																								`${t('homeRev.term')} ${t('homeRev.third')}`
// 																						: t("homepage.nothing")}
// 																			</span>
// 																		</div>
// 																	</>
// 																) : (
// 																	<span className="text-textGray">
// 																		{t('homepage.coursePlaceholder')}
// 																	</span>
// 																)}
// 														</div>


// 														<ReactSVG src={downArrowFilter} />

// 													</Listbox.Button>

// 													<Listbox.Options
// 														className="absolute z-10 w-full py-1 mt-1 overflow-y-auto bg-white rounded-md max-h-44 // focus:outline-none scrollbar-thin"
// 													>
// 														{fetchTutorsCourses.isFetched ?
// 															fetchTutorsCourses.data?.length > 0 ?
// 																fetchTutorsCourses.data
// 																	?.filter(
// 																		(item) =>
// 																			item?.tutorCourse?.courseData?.name !==
// 																			selectedTutorCourse?.tutorCourse?.courseData
// 																				?.name
// 																	)
// 																	?.map((person, personIdx) => (
// 																		<Listbox.Option
// 																			key={personIdx}
// 																			className={({ active }) =>
// 																				` relative cursor-pointer select-none py-2 px-2`
// 																			}
// 																			value={person}
// 																		>
// 																			{({ selected, active }) => (
// 																				<div className={`flex ${active && "bg-orange-100   rounded-lg transition-all"} p-1  w-full items-center  justify-between`}>
// 																					<div className="flex items-center gap-x-1">
// 																						{/* <img
// 																					className="w-8 h-8"
// 																					src={avatar}
// 																					alt=""
// 																				/> */}
// 																						<CourseAvatar courseName={person?.tutorCourse?.courseData
// 																							?.name} w={20} h={20} />
// 																						<div className="flex flex-col">
// 																							<span
// 																								className={`block truncate text-xs text-mainColor ${selectedTutorCourse
// 																									? 'font-medium'
// 																									: 'font-normal'
// 																									}`}
// 																							>
// 																								{
// 																									person?.tutorCourse?.courseData
// 																										?.name
// 																								}
// 																							</span>
// 																							<span className="text-[10px] text-textGray  ">
// 																								{person?.tutorCourse?.courseData
// 																									?.grade && i18n.language === 'ar'
// 																									? `${t('homeRev.grade')} ${person?.tutorCourse?.courseData?.grade?.nameAr} `
// 																									: `${t('homeRev.grade')} ${person?.tutorCourse?.courseData?.grade?.nameEn} `}
// 																								-
// 																								{person?.tutorCourse
// 																									?.term === '0'
// 																									? t('homeRev.highSchool')
// 																									: person?.tutorCourse?.term
// 																										? person?.tutorCourse
// 																											?.term === '1'
// 																											? `${t('homeRev.term')} ${t('homeRev.first')}`
// 																											: person?.tutorCourse
// 																												?.term === '2'
// 																												? `${t('homeRev.term')} ${t('homeRev.second')}`
// 																												: person?.tutorCourse
// 																													?.term === '3' &&
// 																												`${t('homeRev.term')} ${t('homeRev.third')}`
// 																										: t("homepage.nothing")}
// 																							</span>
// 																						</div>
// 																					</div>

// 																					<span>
// 																						{selected ? checkedIcon() : ''}
// 																					</span>
// 																				</div>
// 																			)}
// 																		</Listbox.Option>
// 																	)) : <span className='px-4 text-xs text-center'>{t("homepage.nothing")}</span> :
// 															<span className='px-4 text-xs text-center'>Wait ...</span>}
// 													</Listbox.Options>
// 												</div>
// 											)}
// 										</Listbox>
// 									</div>
// 								</div>

// 								<>
// 									<div className="table w-full mt-4 space-y-2 ">
// 										<h5 className="text-sm font-extrabold header text-start text-textColor__2">
// 											{t('Courses.teacherTimeTable')}
// 										</h5>

// 										<div className="flex flex-col w-full ">
// 											<div
// 												className={`tableLargeDesign rounded-lg  hidden 2xl:block  ${fetchGroupsTable.data?.length > 0 && 'bg-[#F4F7FE] border border-[#E1E1E1] border-b-0'} `}
// 											>
// 												{fetchGroupsTable.data?.length > 0 ? (
// 													fetchGroupsTable.data?.map((item, i) => {
// 														return (
// 															<div
// 																key={i}
// 																className="tableLargeDesign border-b  border-[#E1E1E1] rounded-lg flex-wrap  flex justify-start"
// 															>
// 																<div className="w-1/5 rounded-s-2xl">
// 																	<div className="flex flex-col">
// 																		<div
// 																			className={`py-5 px-7 text-mainColor h-16 font-bold text-start text-lg  `}
// 																		>
// 																			{item?._id === 0 && `${t(`homepage.sunday`)}`}
// 																			{item?._id === 1 && `${t(`homepage.monday`)}`}
// 																			{item?._id === 2 && `${t(`homepage.tuesday`)}`}
// 																			{item?._id === 3 && `${t(`homepage.wednesday`)}`}
// 																			{item?._id === 4 && `${t(`homepage.thursday`)}`}
// 																			{item?._id === 5 && `${t(`homepage.friday`)}`}
// 																			{item?._id === 6 && `${t(`homepage.saturday`)}`}
// 																		</div>
// 																	</div>
// 																</div>

// 																<div className="flex flex-col w-4/5">
// 																	<div className="flex flex-wrap w-full h-full text-center ">
// 																		{item.groups.map((item) => {
// 																			return (
// 																				<div
// 																					key={item._id}
// 																					className="flex flex-col items-center justify-center gap-1 p-2 bg-white lg:w-1/5 xl:w-1/6"
// 																				>
// 																					<p className="text-sm font-bold text-mainColor">
// 																						{t('homepage.group')}{' '}
// 																						{item?.groupNumber}
// 																					</p>
// 																					<div className="flex items-center justify-center text-[#9CA3AF] gap-x-[2px]">
// 																						<p className="text-xs text-[#9CA3AF]">
// 																							{Time(item?.startTime)}
// 																						</p>
// 																						:
// 																						<p className="text-xs text-[#9CA3AF]">
// 																							{Time(item?.endTime)}
// 																						</p>
// 																					</div>
// 																				</div>
// 																			);
// 																		})}
// 																	</div>
// 																</div>
// 															</div>
// 														);
// 													})
// 												) : (
// 													<p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">
// 														{t('homepage.nothing')}
// 													</p>
// 												)}
// 											</div>

// 											<div className="flex flex-col gap-3 tableSmallDesign rounded-2xl 2xl:hidden">
// 												{fetchGroupsTable.data?.length > 0 ? (
// 													fetchGroupsTable.data?.map((item, i) => {
// 														return (
// 															<Disclosure key={i}>
// 																{({ open }) => (
// 																	<div>
// 																		<Disclosure.Button
// 																			className={`py-3 px-6 w-full bg-white shadow-sm   flex items-center justify-between rounded-2xl  `}
// 																		>
// 																			<p className="text-sm font-bold text-mainColor">
// 																				{item?._id === 0 && `${t(`homepage.sunday`)}`}
// 																				{item?._id === 1 && `${t(`homepage.monday`)}`}
// 																				{item?._id === 2 && `${t(`homepage.tuesday`)}`}
// 																				{item?._id === 3 && `${t(`homepage.wednesday`)}`}
// 																				{item?._id === 4 && `${t(`homepage.thursday`)}`}
// 																				{item?._id === 5 && `${t(`homepage.friday`)}`}
// 																				{item?._id === 6 && `${t(`homepage.saturday`)}`}
// 																			</p>

// 																			{open ? (
// 																				<ReactSVG src={downArrowFilter} />
// 																			) : (
// 																				leftArrow()
// 																			)}
// 																		</Disclosure.Button>

// 																		<Disclosure.Panel className="flex flex-col items-center justify-between w-full gap-6 px-6 py-3 mt-1 bg-white rounded-2xl">
// 																			{item?.groups?.map((group, i) => {
// 																				return (
// 																					<div
// 																						key={i}
// 																						className="flex items-center justify-between w-full"
// 																					>
// 																						<p className="text-xs font-semibold text-center sm:text-sm text-mainColor">
// 																							{t('homepage.group')}{' '}
// 																							{group.groupNumber}
// 																						</p>

// 																						<div className='flex items-center  gap-x-1 text-textGray'>
// 																							<p className="text-xs font-semibold text-center sm:text-sm text-textGray">

// 																								{Time(group?.startTime)}:

// 																							</p>
// 																							:
// 																							<p className="text-xs font-semibold text-center sm:text-sm text-textGray">

// 																								{Time(group?.endTime)}
// 																							</p>
// 																						</div>
// 																					</div>
// 																				);
// 																			})}
// 																		</Disclosure.Panel>
// 																	</div>
// 																)}
// 															</Disclosure>
// 														);
// 													})
// 												) : (
// 													<p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">
// 														{t('homepage.nothing')}
// 													</p>
// 												)}
// 											</div>
// 										</div>
// 									</div>
// 								</>
// 							</form>
// 						</DialogPanel>
// 					</div>
// 				</div>
// 			</Dialog>
// 		</>
// 	);
// }
