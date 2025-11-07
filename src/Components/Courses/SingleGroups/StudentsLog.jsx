import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Handlebars from 'handlebars';
import html2pdf from 'html2pdf.js'
import { Disclosure, Listbox } from '@headlessui/react';

import { SvgsContext } from '../../../Context/SvgsConetxt';
import { ApisContext } from '../../../Context/ApisContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, BASUE_IMAGES } from '../../../Soursre';
import profile from '../../../assets/sanadSVG/studentSmallAvatar.svg';
import downArrow from '../../../assets/sanadSVG/downArrow.svg';

import downLoad from '../../../assets/sanadSVG/download.svg';
import { ReactSVG } from 'react-svg';
import { useQuery } from '@tanstack/react-query';
import LargePosts from '../../Skeletons/LargePosts';
import { useErrorBoundary } from 'react-error-boundary';
import { MainContext } from '../../../Context/MainContext';
import attendanceIcon from "../../../assets/sanadSVG/iocnHeaderTable.svg"
function StudentsLog() {
	const arr1 = [3, 3, 3, 3, 3];
	const { showBoundary } = useErrorBoundary()
	const { groupId, courseId } = useParams();
	const { headers, selectedCenter, fetchSingleGroup, tens, selectedSession, setselectedSession, } = useContext(ApisContext);

	const { direction, handleUserName, Toggler, setToggler, setcardCode, attendHandller, } = useContext(MainContext)
	const { leftArrow } = useContext(SvgsContext);
	const [t, i18n] = useTranslation();


	const [sessions, setsessions] = useState([])
	const [allStuents, setallStuents] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);



	Handlebars.registerHelper('t', function (key) {
		return i18n.t(key);
	});


	Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
		return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
	});

	Handlebars.registerHelper('checkStudentCase', function (studentCase) {
		if (studentCase === true) {
			return t("Logs.attendTrue");
		} else if (studentCase === false) {
			return t("Logs.attendFalse");
		}
	});

	Handlebars.registerHelper('checkPaymentType', function (payment) {
		if (payment === "bulk") {
			return t('homepage.bulk')
		} else if (payment === "session") {
			return t('homepage.Bysession')
		}
	});

	Handlebars.registerHelper('getEducationalStage', function (grade, language) {
		return language === 'ar' ? grade.educationalStageAr : grade.educationalStageEn;
	});

	Handlebars.registerHelper('checkSessionType', function (sessionName) {
		switch (sessionName) {
			case "session":
				return t("StudentDetails.session");
			case "revision":
				return t("homepage.revesion");
			case "offlineExam":
				return t("homepage.offlineExam");
			default:
				return 'N/A';
		}
	});


	const Ui = `
    <section dir="{{dir}}" class='bg-white w-full p-4 flex flex-col gap-y-2'>
      <div class="info w-full flex items-end flex-col gap-y-2">
        <span class='w-full flex justify-end'>
          <img src='http://localhost:3000/assets/sanadSVG/sanadBgLogo.jpg' alt="Logo" />
        </span>
        <h4 class='text-textColor__2 font-semibold text-sm w-full text-start'>
          {{t "Logs.centerName"}} : {{centerName}}
        </h4>
        <h5 class='text-textColor__2 font-semibold text-sm w-full text-start'>
          {{t "homepage.centerCode"}} : {{centerCode}}
        </h5>
      </div>
      <h3 class='w-full text-center font-extrabold text-2xl'>
        {{t "Logs.studentsInGroup"}} {{groupNumber}}
      </h3>
      <div class='w-full flex items-center justify-between mt-3'>
        <div class="col flex flex-col gap-y-2">
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "Courses.courseName"}} : {{courseName}}
          </h5>
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "Logs.educationalStage"}} : {{getEducationalStage grade i18n.language}}
          </h5>
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "Courses.teacherName"}} : {{teacherName}}
          </h5>
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "homepage.attended"}} : {{attended}}
          </h5>
         
        </div>
        <div class="col flex flex-col gap-y-2">
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "SingleCourse.sessionNumber"}} : {{sessionNumber}}
          </h5>
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "SingleCourse.sessionType"}} : {{checkSessionType sessionName}}
          </h5>
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "Logs.teacherCode"}} : {{teacherCode}}
          </h5>
          <h5 class='w-full text-sm font-semibold text-textColor__2'>
            {{t "homepage.allAttened"}} : {{allAttened}}
          </h5>
         
        </div>
      </div>
      <table class="min-w-full table-auto mt-4 border-collapse border border-input_border">
        <thead>
          <tr class="bg-gray-200 border border-input_border">
            <th class="px-4 py-2 text-2xs border border-input_border">{{t "Logs.studentName"}}</th>
            <th class="px-4 py-2 text-2xs border border-input_border">{{t "Logs.studentCode"}}</th>
            <th class="px-4 py-2 text-2xs border border-input_border">{{t "PopupWindows.cardCode"}}</th>
            <th class="px-4 py-2 text-2xs border border-input_border">{{t "register.phoneNumber"}}</th>
            <th class="px-4 py-2 text-2xs border border-input_border">{{t "SingleGroup.paymentType"}}</th>
            <th class="px-4 py-2 text-2xs border border-input_border">{{t "Logs.studentCase"}}</th>
          </tr>
        </thead>
        <tbody>
          {{#each studentsReport}}
          <tr class="bg-white border border-input_border text-center">
            <td class="px-4 py-2 border text-2xs border-input_border">{{this.student.fullname}}</td>
            <td class="px-4 py-2 border text-2xs border-input_border">{{this.student.code}}</td>
            <td class="px-4 py-2 border text-2xs border-input_border">{{this.code}}</td>
            <td class="px-4 py-2 border text-2xs border-input_border">{{this.student.phoneNumber}}</td>
            <td class="px-4 py-2 border text-2xs border-input_border">{{checkPaymentType this.paymentType}}</td>
            <td class="px-4 py-2 border text-2xs border-input_border">{{checkStudentCase this.isAttended}}</td>
          </tr>
          {{/each}}
        </tbody>
      </table>
    </section>
  `;

	const generateHtmlContent = (template, data) => {
		const compiledTemplate = Handlebars.compile(template);
		return compiledTemplate(data);
	};


	const [loading, setloading] = useState(false)
	const DownLoadStudents = async () => {
		if (groupId && selectedSession) {
			setloading(true)
			try {
				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/groups/${groupId}/attendance?limit=5&page=${currentPage}&sessionId=${selectedSession?._id}`,
					{
						headers: headers,
					}
				);

				if (res.status === 200 || res.data.status === 'success') {




					const reportData = {
						groupNumber: fetchSingleGroup.data?.groupNumber,
						centerName: selectedCenter?.name,
						centerCode: selectedCenter?.code,
						courseName: fetchSingleGroup.data?.tutorCourse?.courseData?.name,
						grade: {
							educationalStageAr: fetchSingleGroup.data?.tutorCourse?.courseData?.grade?.nameAr,
							educationalStageEn: fetchSingleGroup.data?.tutorCourse?.courseData?.grade?.nameEn,
						},
						teacherName: fetchSingleGroup.data?.tutorCourse?.tutor?.fullname,
						attended: res.data.data.length,
						tens: tens,
						sessionNumber: selectedSession?.sessionNumber,
						sessionName: selectedSession?.type,
						teacherCode: fetchSingleGroup.data?.tutorCourse?.tutor?.code,
						allAttened: fetchSingleGroup.data?.studentsCount,
						studentsReport: res.data.data,

						dir: direction,

						i18n: { language: i18n.language }, // Pass current language
						t: i18n.t.bind(i18n) // Ensure t function is included

					};

					const element = document.createElement('div');
					element.innerHTML = generateHtmlContent(Ui, reportData);

					const opt = {
						margin: 1,
						filename: 'report.pdf',
						image: { type: 'jpeg', quality: 0.98 },
						html2canvas: { scale: 2 },
						jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
					};

					html2pdf().from(element).set(opt).save();

				}
			} catch (error) {
				console.log(error);
				showBoundary(error)
			} finally {
				setloading(false)
			}
		}
	};




	const GetStudents = async () => {
		if (groupId) {

			const sessionId = selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "" : `&sessionId=${selectedSession?._id}` : ""
			console.log(sessionId)

			try {
				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/groups/${groupId}/attendance?limit=5&page=${currentPage}${sessionId}`,
					{
						headers: headers,
					}
				);

				if (res.status === 200 || res.data.status === 'success') {

					setallStuents(res.data.data);



					return res.data;
				}
			} catch (error) {
				showBoundary(error)
				console.log(error);
			}


		}
	};

	const fetchStudents = useQuery({
		queryKey: [
			'GetStudents',
			`${selectedCenter?._id}`,
			`${selectedSession?._id}`,
			`${groupId}`,
			`${attendHandller}`,
		],
		queryFn: () => GetStudents(),
		enabled: !!selectedCenter?._id && !!groupId,
		placeholderData: true,
		// retryOnMount: true,
		keepPreviousData: true,
	});




	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
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
		if (fetchStudents.data?.metadata) {
			settotalItems(fetchStudents.data?.metadata.totalDocs);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allStuents, currentPage]);




	const getSessionsForGroup = async () => {




		if (selectedCenter && courseId && groupId) {
			try {
				const res = await axios.post(
					`${BASE_URL}attendance/center/${selectedCenter?._id}`,
					{
						centerCourseId: courseId,
						groupId: groupId,
					},
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {

					setsessions([
						{ name: t("Logs.selectAll"), value: "all" }, ...res.data.message
					])
					return res.data.message;
				}
			} catch (error) {
				showBoundary(error)
			}


		}
	};
	const fetchCourseSessions = useQuery({
		queryKey: ['getCourseSesions', `${selectedCenter?._id}`, `${courseId}`, `${groupId}`],
		queryFn: () => getSessionsForGroup(),
		enabled: !!selectedCenter?._id && !!courseId && !!groupId,
	});




	return (
		<>
			<div
				className={`w-full 2xl:bg-white rounded-lg flex flex-col 2xl:px-6 pt-6 gap-y-8 ${allStuents?.length > 0 ? '2xl:h-[600px] ' : '2xl:h-auto'} `}
			>
				<div className="header flex justify-between items-center ">
					<div className="main flex flex-col gap-3">
						<p className="font-extrabold  text-size_26 md:text-size_28  text-mainColor">
							{t('Logs.studentLog')}
						</p>
					</div>

					<div className="filter flex gap-x-4 items-center justify-center ">
						{/* {selectedSession && allStuents?.length < 0 ? */}
						<>
							<div className="dropdown">
								<Listbox
									onChange={(ele) => {
										setselectedSession(ele);
										setCurrentPage(1);
									}}
								>
									{({ open }) => (
										<div className="relative mt-2 sm:mt-1">
											<Listbox.Button
												className={`font-semibold bg-[#F4F7FE] px-2 py-2 text-sm 
                                                 relative w-full flex cursor-pointer rounded-lg  text-left focus:outline-none  items-center justify-between  sm:text-sm gap-x-8 `}
											>
												<span
													className={`block truncate ${selectedSession !== null ? "text-mainColor" : "text-textColor__2"}   text-xs sm:text-sm `}
												>
													{selectedSession !== null
														? selectedSession?.value && selectedSession?.value === "all" ? selectedSession?.name : `${t('SingleCourse.theSession')} ${selectedSession?.sessionNumber}`
														: t("homepage.sessionSelect")}
												</span>

												<ReactSVG src={downArrow} />
											</Listbox.Button>

											<Listbox.Options
												className="absolute  mt-1 max-h-32 z-10 
                                                        w-full scrollbar-thin rounded-md bg-[#F4F7FE] overflow-y-auto   focus:outline-none  shadow"
											>
												{sessions?.map((person, personIdx) => (
													<Listbox.Option
														key={personIdx}
														className={({ active }) =>
															` relative ${active ? 'bg-mainColor text-white' : 'text-mainColor'}  cursor-pointer select-none py-2 px-2`
														}
														value={person}
													>
														{({ selectedSession }) => (
															<div className="flex w-full items-center  justify-between">
																<span
																	className={`block truncate text-size_10 sm:text-size_12  ${selectedSession
																		? 'font-medium'
																		: 'font-normal'
																		}`}
																>
																	{/* {t('SingleCourse.theSession')} 
																	{person?.sessionNumber} */}
																	{person?.value && person?.value === "all" ? person?.name : `${t("SingleCourse.theSession")} ${person?.sessionNumber}`}
																</span>
															</div>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</div>
									)}
								</Listbox>
							</div>

							<button onClick={DownLoadStudents} className="hidden   lg:flex items-center justify-center gap-x-2 bg-mainColor text-white rounded-xl px-3 py-2 text-sm">
								{!loading ? <>
									<ReactSVG src={downLoad} />
									{t('Logs.download')}
								</> : (
									<div className={`w-6  h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
									></div>
								)}
							</button>
						</>
						{/* : null} */}
					</div>
				</div>

				<div
					className={`largeScreen hidden 2xl:flex flex-col h-[70%] ${allStuents?.length === 0 && 'pb-4'}`}
				>

					<div className="Header px-6 py-4 thead bg-[#F4F7FE] border border-[#E1E1E1]    rounded-2xl rounded-b-none flex justify-between  w-full">
						<p className={`text-start text-textGray  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"} text-sm `}>
							{t('Logs.studentName')}
						</p>

						<p className={`text-start text-nowrap text-textGray text-sm  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}`}>
							{t('PopupWindows.cardCode')}
						</p>

						<p className={`text-start text-nowrap text-textGray text-sm  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}`}>
							{t('SingleCourse.disCount')}
						</p>

						<p className={`text-start text-nowrap text-textGray text-sm  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}`}>
							{t('homepage.dues')}
						</p>

						<p className={`text-start text-nowrap text-textGray text-sm  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}`}>
							{t('homepage.cridets')}
						</p>

						<p className={`text-start text-nowrap text-textGray text-sm  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}`}>
							{t('Logs.phoneNumber')}
						</p>


						<p className={`text-start text-nowrap text-textGray text-sm  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}`}>
							{t('Logs.typePay')}
						</p>


						{selectedSession === null || (selectedSession?.value && selectedSession?.value === "all") ? null : <p className={`text-start text-nowrap text-textGray text-sm  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}`}>
							{t('homepage.theAttend')}
						</p>}

					</div>
					{
						fetchStudents.isFetched ? (
							fetchStudents.data.data?.length > 0 ? (
								fetchStudents.data.data?.map((item, i) => {
									const lastEle = allStuents?.length - 1
									return (
										<div
											key={i}
											className={`content  py-4 px-4 w-full  relative    group transition-all  border-[#E1E1E1] border border-t-0 flex items-center justify-between  ${lastEle === i && "rounded-b-2xl"} `}
										>

											<span onClick={() => {
												setToggler({ ...Toggler, takeAttend: true })
												setcardCode(item?.cardCode)
											}} className={`absolute w-full h-full bg-mainColor hidden group-hover:flex start-0 top-0 rounded-b-2xl  items-center justify-center text-lg  text-white cursor-pointer ${lastEle === i && "rounded-b-2xl"}`}>
												{t("homeRev.takeAtt")}
											</span>
											{/* <div className="flex text-start gap-2 w-1/5"> */}

											<div className={`nameLesson font-bold text-mainColor flex items-center gap-x-1 justify-start  text-start ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}     text-sm`}>

												{item?.student && item?.student?.profileImage !== "" ?
													<span className=''>
														<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.student?.profileImage}`} alt="profileImage" />
													</span>

													: <ReactSVG src={profile} />}
												<div>
													<h5 className="text-sm">
														{handleUserName(item?.student?.fullname, 2)}
													</h5>
													<p className="text-xs text-textGray font-bold">
														{item?.student?.code}
													</p>
												</div>
											</div>
											<p className={`nameLesson font-bold text-mainColor text-start  xl:me-2 2xl:m-0   ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}  text-sm`}>
												{item?.cardCode}
											</p>
											<p className={`nameLesson font-bold text-mainColor text-start  xl:me-2 2xl:m-0   ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}  text-sm`}>
												{item?.discountPercent} %
											</p>
											<p className={`nameLesson font-bold text-mainColor text-start  xl:me-2 2xl:m-0   ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}  text-sm`}>
												{item?.dues > 0 ? `${item?.dues} ${t("homeRev.pound")} ` : t("homepage.nothing")}
											</p>

											<p className={`nameLesson font-bold text-mainColor text-start  xl:me-2 2xl:m-0   ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}  text-sm`}>
												{item?.credits > 0 ? `${item?.credits} ${t("homeRev.pound")} ` : t("homepage.nothing")}
											</p>
											<p className={`nameLesson font-bold text-mainColor text-start  xl:me-2 2xl:m-0   ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}  text-sm`}>
												{item?.student?.phoneNumber}
											</p>



											<p className={`files font-semibold  text-start  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}  `}>
												<span
													className={`${item?.paymentType === 'session' ? 'bg-[#DDE9FF] text-mainColor' : 'bg-[#FFDDF8] text-[#7D34D9E5]'} px-2 py-1 text-xs rounded-xl`}
												>
													{item?.paymentType === 'bulk'
														? t('homepage.bulk')
														: item?.paymentType === 'session' &&
														t('homepage.Bysession')}
												</span>
											</p>

											{selectedSession === null || (selectedSession?.value && selectedSession?.value === "all") ? null : <p className={`files font-semibold  text-textGray text-start  ${selectedSession !== null ? selectedSession?.value && selectedSession?.value === "all" ? "w-[14.22%]" : "w-[12.5%] " : "w-[14.22%]"}  `}>
												<span
													className={`${item?.isAttended ? 'bg-[#E9FFEF] text-[#409261]' : 'bg-bg_red text-err'} text-xs px-2 py-1 rounded-xl`}
												>
													{item?.isAttended
														? t('Logs.attendTrue')
														: t('Logs.attendFalse')}
												</span>
											</p>}


										</div>

									);
								})
							) : (
								<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor ">
									{t('homepage.nothing')}
								</p>
							)
						) : (
							<LargePosts />
						)
					}
				</div>

				{allStuents?.length > 0 && (
					<div className="hidden 2xl:flex items-center gap-y-4 mt-3 justify-center  ">
						<div className="flex items-center justify-center gap-y-4">
							{fetchStudents?.data?.data?.length > 0 && (
								<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
									<button
										onClick={() => handleClick(currentPage - 1)}
										// onClick={() => setCurrentPage((old) => {
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
											currentPage === totalPages ||
											fetchStudents.isPlaceholderData
										}
									>
										&gt;
									</button>
								</div>
							)}
						</div>
					</div>
				)}

				{/* uncomment this part if you have the data then loop in it to display the data*/}
				<div className="flex flex-col rounded-2xl gap-y-3 2xl:hidden">
					{
						fetchStudents.isFetched ? (
							<>
								{allStuents.length > 0 ? (
									allStuents?.map((item, i) => {
										return (
											<Disclosure key={i}>
												{({ open }) => (
													<div>
														<Disclosure.Button
															className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
																}`}
														>
															<div className="flex items-center justify-center gap-x-2">
																{item?.student && item?.student?.profileImage !== "" ?
																	<span className=''>
																		<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.student?.profileImage}`} alt="profileImage" />
																	</span>

																	: <ReactSVG src={profile} />}

																<div className="flex flex-col items-start  ">
																	<div className="font-bold text-mainColor text-sm sm:text-base md:text-lg flex items-center gap-x-2 ">
																		{handleUserName(item?.student?.fullname, 2)}
																	</div>
																	<p className="font-bold text-textGray text-xs sm:text-sm md:text-base">
																		{item?.student?.code}
																	</p>
																</div>

															</div>
															<div className="flex items-center gap-x-4">
																{selectedSession === null || (selectedSession?.value && selectedSession?.value === "all") ? null : <p className="files font-semibold  text-textGray text-start text-sm">
																	<span
																		className={`${item?.isAttended ? 'bg-[#E9FFEF] text-[#409261]' : 'bg-bg_red text-err'} px-2 text-xs py-1 rounded-xl`}
																	>
																		{item?.isAttended === true
																			? t('Logs.attendTrue')
																			: t('Logs.attendFalse')}
																	</span>
																</p>}
																{open ? (
																	<ReactSVG src={downArrow} />
																) : (
																	leftArrow()
																)}
															</div>
														</Disclosure.Button>
														<Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
															<div className="flex justify-between items-center w-full">
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center   text-nowrap">
																	{t('Logs.phoneNumber')}
																</p>
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																	{item?.student?.phoneNumber}
																</p>
															</div>
															<div className="flex justify-between items-center w-full">
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
																	{t('PopupWindows.cardCode')}
																</p>
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																	{item?.cardCode}
																</p>
															</div>
															<div className="flex justify-between items-center w-full">
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
																	{t('SingleCourse.disCount')}
																</p>
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																	{item?.discountPercent} %

																</p>
															</div>
															<div className="flex justify-between items-center w-full">
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
																	{t('homepage.dues')}																</p>
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																	{item?.dues > 0 ? `${item?.dues} ${t("homeRev.pound")} ` : t("homepage.nothing")}

																</p>
															</div>
															<div className="flex justify-between items-center w-full">
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
																	{t('homepage.cridets')}
																</p>
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
																	{item?.credits > 0 ? `${item?.credits} ${t("homeRev.pound")} ` : t("homepage.nothing")}

																</p>
															</div>
															<div className="flex justify-between items-center w-full">
																<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center   text-nowrap">
																	{t('Logs.typePay')}
																</p>
																<div className="flex  gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray flex-wrap justify-end">
																	<span
																		className={`${item?.paymentType === 'session' ? 'bg-[#DDE9FF] text-mainColor' : 'bg-[#FFDDF8] text-[#7D34D9E5]'} px-2 py-1 rounded-xl`}
																	>
																		{item?.paymentType === 'bulk'
																			? t('homepage.bulk')
																			: item?.paymentType === 'session' &&
																			t('homepage.Bysession')}
																	</span>
																</div>
															</div>
															<div className="flex w-full items-end justify-between">
																<span className="cursor-pointer" onClick={() => {
																	setToggler({ ...Toggler, takeAttend: true })
																	setcardCode(item?.cardCode)
																}} >
																	<ReactSVG src={attendanceIcon} />
																</span>
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
							arr1?.map((item, i) => {
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
						)
					}

					{allStuents?.length > 0 && (
						<div className="flex items-center justify-center gap-y-4">
							{fetchStudents?.data?.data?.length > 0 && (
								<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
									<button
										onClick={() => handleClick(currentPage - 1)}
										// onClick={() => setCurrentPage((old) => {
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
											currentPage === totalPages ||
											fetchStudents.isPlaceholderData
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

export default React.memo(StudentsLog);
