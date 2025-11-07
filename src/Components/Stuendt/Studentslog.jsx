import React, { useContext, useEffect, useState, memo } from 'react';
import Handlebars from 'handlebars';
import html2pdf from 'html2pdf.js'
import { useTranslation } from 'react-i18next';
import { Disclosure, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import leftArrow from '../../assets/sanadSVG/leftArrow.svg';
import downArrow from '../../assets/sanadSVG/downArrow.svg';
import downLoad from '../../assets/sanadSVG/download.svg';
import { ReactSVG } from 'react-svg';
import filterIcon from "../../assets/sanadSVG/filterIcon.svg"
import { SvgsContext } from '../../Context/SvgsConetxt';
import { ApisContext } from '../../Context/ApisContext';
// import logo from "../../assets/sanadSVG/sanadBgLogo.jpg"
import imgUser from '../../assets/sanadSVG/imgUser.svg';
import { BASE_URL, BASUE_IMAGES } from '../../Soursre';
import axios from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import { MainContext } from '../../Context/MainContext';
import { Link } from 'react-router-dom';
import navigator from "../../assets/sanadSVG/singleRoute.svg"
const arr = [3, 3, 3, 3, 3];
const Studentslog = () => {
	const [t, i18n] = useTranslation();
	const { profile } = useContext(SvgsContext);
	const { allStudents, fetchStudents, StudentsPage, setStudentsPage, studentGrade, setstudentGrade, Grades, selectedCenter, headers, setstudentData } =
		useContext(ApisContext);
	const { direction } = useContext(MainContext)
	const { showBoundary } = useErrorBoundary()



	Handlebars.registerHelper('t', function (key) {
		return i18n.t(key);
	});


	Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
		return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
	});

	const Ui = `
    <section  dir="{{dir}}" class='bg-white w-full p-4 flex flex-col gap-y-2'>
        <div class="info w-full flex items-end flex-col gap-y-2">
            <span class='w-full me-auto'>
                <img src='/assets/sanadSVG/sanadBgLogo.jpg' alt="Logo" />
            </span>
            <h4 class='text-textColor__2 font-semibold text-sm w-full '>
              {{t "Logs.centerName"}} :    {{centerName}} 
            </h4>
            <h5 class='text-textColor__2 font-semibold text-sm w-full '>
                {{t "homepage.centerCode"}} :  {{centerCode}} 
            </h5>
        </div>
        <h3 class='w-full text-center   font-extrabold text-2xl '>
            {{t "Logs.studentLog"}}
        </h3>
        <h5 class='w-full  text-sm font-semibold text-textColor__2'>
         {{t "Logs.educationalStage"}} :      {{#ifEquals i18n.language "ar"}}{{grade.nameAr}}{{else}}{{grade.nameEn}}{{/ifEquals}} 
        </h5>
        <table class="min-w-full table-auto mt-4 border-collapse border border-input_border">
            <thead>
                <tr class="bg-gray-200 border border-input_border ">
                    <th class="px-4 py-2 text-sm border border-input_border ">{{t "Logs.studentName"}}</th>
                    <th class="px-4 py-2 text-sm border border-input_border ">{{t "Logs.studentCode"}}</th>
                    <th class="px-4 py-2 text-sm border border-input_border ">{{t "PopupWindows.cardCode"}}</th>
                    <th class="px-4 py-2 text-sm border border-input_border ">{{t "register.phoneNumber"}}</th>
                    <th class="px-4 py-2 text-sm border border-input_border ">{{t "Logs.parentPhone"}}</th>
                </tr>
            </thead>
            <tbody>
                {{#each studentsReport}}
                <tr class="bg-white border border-input_border text-center">
                    <td class="px-4 py-2 border text-xs border-input_border ">{{this.student.fullname}}</td>
                    <td class="px-4 py-2 border text-xs border-input_border ">{{this.student.code}}</td>
                    <td class="px-4 py-2 border text-xs border-input_border ">{{this.code}}</td>
                    <td class="px-4 py-2 border text-xs border-input_border ">{{this.student.phoneNumber}}</td>
                    <td class="px-4 py-2 border text-xs border-input_border ">{{this.parent.phoneNumber}}</td>
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
	const downloadPdf = async () => {
		try {
			setloading(true)
			if (selectedCenter) {
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter._id}/students?limit=-1`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === "success") {

					const reportData = {
						centerName: selectedCenter.name,
						centerCode: selectedCenter.code,
						grade: {
							nameAr: studentGrade?.nameAr,
							nameEn: studentGrade?.nameEn,
						},
						studentsReport: response.data.data,
						dir: direction,
						logo: '../../assets/sanadSVG/sanadBgLogo.jpg',
						i18n: { language: i18n.language } // Pass current language
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
			}
		} catch (error) {
			console.error('Error generating PDF:', error);
			showBoundary(error)
		} finally {
			setloading(false)
		}
	};




	const itemsPerPage = 5;
	const handlePageChange = (newPage) => {
		setStudentsPage(newPage);
	};
	const [totalItems, settotalItems] = useState(0);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const handleClick = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== StudentsPage) {
			handlePageChange(newPage);
		}
	};

	const displayRange = 1;
	const pagesToShow = [];
	const startPage = Math.max(StudentsPage - displayRange, 1);
	const endPage = Math.min(StudentsPage + displayRange, totalPages);

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







	const handleCourseChange = (Grade) => {
		setstudentGrade(Grade);
		// sessionStorage.setItem('studentGrade', JSON.stringify(Grade));
		setStudentsPage(1);
	};

	useEffect(() => {
		settotalItems(fetchStudents.data?.metadata?.totalDocs);
	}, [fetchStudents, StudentsPage]);





	return (
		<div
			className={`w-full lg:bg-white rounded-lg flex flex-col lg:px-6 pt-6 pb-2 gap-y-8 ${allStudents?.length > 0 ? 'lg:h-[570px] ' : 'lg:h-auto '} relative`}
		>
			<div className=" flex flex-col lg:flex-row gap-y-2  w-full  lg:justify-between lg:items-center ">
				<p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32   text-mainColor">
					{t('Logs.studentLog')}
				</p>

				<div className="filters  gap-x-4   flex header justify-end items-center  ">
					<div className="lg:w-[230px]   w-full">
						<Listbox
							value={studentGrade}
							onChange={(Grade) => {
								handleCourseChange(Grade);
								// console.log(Grade);
							}}
						>
							{({ open }) => (
								<div className="relative ">
									<ListboxButton
										className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-xs xl:text-sm
                                                                        flex cursor-pointer rounded-xl bg-white lg:bg-bg_mainLayout  text-start focus:outline-none   `}
									>
										<div className="flex items-center ps-2 sm:p-0 gap-x-2">
											<ReactSVG src={filterIcon} />

											<div className={` flex flex-col gap-y-1`}>
												<p className="block truncate text-mainColor font-semibold text-xs">
													{studentGrade ? (
														i18n.language === 'ar' ? (
															studentGrade?.nameAr
														) : (
															i18n.language === 'en' &&
															studentGrade?.nameEn
														)
													) : (
														<span className="text-textColor__2">
															{t('homepage.choiseCourse')}
														</span>
													)}
												</p>
											</div>

										</div>

										<ReactSVG src={downArrow} />
									</ListboxButton>

									<ListboxOptions
										className="absolute  mt-1 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md  bg-white lg:bg-bg_mainLayout  py-1    text-xs xl:text-sm scrollbar-thin shadow  focus:outline-none  "
									>
										{Grades.map((person, personIdx) => (
											<ListboxOption
												key={personIdx}
												className={({ selected }) =>
													` relative cursor-pointer select-none py-2   first-line:pl-10 pr-4  hover:bg-secondMainColor hover:text-white transition-all  text-sm  ${selected ? 'bg-mainColor text-white' : 'text-secondMainColor '}`
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

					<button onClick={downloadPdf} className=" flex items-center justify-center gap-x-2 bg-mainColor text-white rounded-xl px-3 py-2 text-sm">



						{!loading ? <>
							<ReactSVG src={downLoad} />
							{t('Logs.download')}
						</> : (
							<div className={`w-6  h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
							></div>
						)}
					</button>
				</div>
			</div>


			<div className={`largeScreen hidden lg:flex flex-col h-[70%]`}>
				{fetchStudents.isFetched ? (
					<>

						<div className="textHeader w-full thead border px-6 py-4 border-[#E1E1E1] bg-[#F9FAFC]   rounded-xl rounded-b-none flex justify-between items-center  ">
							<p className="text-start text-textGray w-1/5 text-sm">
								{t('Logs.studentName')}
							</p>

							<p className="text-start text-nowrap text-textGray text-sm w-1/5">
								{t('PopupWindows.cardCode')}
							</p>
							<p className="text-start text-nowrap text-textGray text-sm w-1/5">
								{t('Logs.educationalStage')}
							</p>

							<p className="text-start text-textGray  w-1/5 text-sm">
								{t('Logs.stuphone')}
							</p>
							<p className="text-start text-textGray  w-1/5 text-sm">
								{t('SingleGroup.parentNumber')}
							</p>

						</div>
						{allStudents?.length > 0 ? (
							allStudents?.map((item, i) => {
								const isLastItem = i === allStudents?.length - 1;

								return (
									<Link
										to={`${item?.code}`}
										onClick={() => setstudentData(item)}
										key={i}
										className={`content w-full border-[#E1E1E1] cursor-pointer bg-white  border-t-0 border flex items-center justify-between py-4  px-6 ${isLastItem && 'rounded-b-xl'} `}
									>
										{/* <div className="flex text-start gap-2 w-1/5"> */}

										<div className="nameLesson font-bold w-1/5 flex items-center gap-x-2">

											{item?.student && item?.student?.profileImage !== "" ?
												<span className=''>
													<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.student?.profileImage}`} alt="profileImage" />
												</span>

												: profile(33, 33)}
											<div>
												<p className=" text-mainColor text-start  text-sm ">
													{item?.student?.fullname
														?.split(' ')
														?.slice(0, 2)
														?.join(' ')}
												</p>
												<p className=" text-textGray text-start  text-xs 2xl:text-sm">
													{item?.student?.code}
												</p>
											</div>
										</div>
										<p className="files font-semibold text-xs 2xl:text-sm text-textGray text-start w-1/5">
											{item?.code}
										</p>

										<p className="grade font-bold text-mainColor text-start  text-xs 2xl:text-sm w-1/5 ">
											{i18n.language === 'ar'
												? item?.grade?.nameAr
												: item?.grade?.nameEn}
										</p>

										<p className="files font-semibold text-xs 2xl:text-sm text-textGray text-start w-1/5">
											{item?.student?.phoneNumber}
										</p>
										<p className="files font-semibold text-xs 2xl:text-sm text-textGray text-start w-1/5 ">
											{item?.parent?.phoneNumber}
										</p>
									</Link>
								);
							})
						) : (
							<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor  ">
								{t('homepage.nothing')}
							</p>
						)}
					</>
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
			</div>

			{fetchStudents.data?.data?.length > 0 && (
				<div className=" items-center justify-center gap-y-4 mt-3 hidden lg:flex">
					{fetchStudents?.data?.data?.length > 0 && (
						<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
							<button
								onClick={() => handleClick(StudentsPage - 1)}
								// onClick={() => setStudentsPage((old) => {
								//     Math.max(old - 1, 1)
								// })}
								className={`${StudentsPage === 1
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer'
									} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
								disabled={StudentsPage === 1}
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
										? StudentsPage === page
											? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
											: 'bg-transparent text-[#293241] hover:bg-slate-100'
										: 'text-[#293241]'
										} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => handleClick(StudentsPage + 1)}
								className={`${StudentsPage === totalPages
									? 'opacity-50 cursor-not-allowed'
									: 'cursor-pointer'
									}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
								disabled={
									StudentsPage === totalPages || fetchStudents.isPlaceholderData
								}
							>
								&gt;
							</button>
						</div>
					)}
				</div>
			)}

			{/* uncomment this part if you have the data then loop in it to display the data*/}
			<div className="flex flex-col rounded-2xl gap-y-3 lg:hidden">
				{fetchStudents.isFetched ? (
					<>
						{allStudents?.length > 0 ? (
							allStudents?.map((item, i) => {
								return (
									<Disclosure key={i}>
										{({ open }) => (
											<div>
												<Disclosure.Button
													className={`py-4 px-6 w-full bg-white   shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
														}`}
												>
													<div className="flex items-center justify-center gap-x-2">

														{item?.student && item?.student?.profileImage !== "" ?
															<span className=''>
																<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.student?.profileImage}`} alt="profileImage" />
															</span>

															: <ReactSVG src={imgUser} />}
														<div className="flex flex-col items-start justify-center">
															<div className="font-bold text-mainColor text-size__14 sm:text-base  flex items-center gap-x-2 ">
																{item?.student?.fullname}
																{/* <Link to={"teacher/3"}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <ReactSVG src={navigator} />
                                                                </Link> */}
															</div>
															<p className="font-bold text-textGray text-size_12 sm:text-sm">
																{i18n.language === 'ar'
																	? `${t('homeRev.grade')} ${item?.grade?.nameAr}`
																	: `${t('homeRev.grade')} ${item?.grade?.nameEn}`}
															</p>
														</div>

														<Link
															to={`${item?.code}`}
															onClick={() => setstudentData(item)}
														>
															<ReactSVG src={navigator} />
														</Link>
													</div>

													{open ? (
														<ReactSVG src={downArrow} />
													) : (
														<ReactSVG src={leftArrow} />
													)}

													{/* ${selectedItems.includes(item.id) ? " bg-[#F4F7FE]" : "bg-white"} */}
												</Disclosure.Button>
												<Disclosure.Panel
													className={`p-6 w-full  bg-white  border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6`}
												>
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('Logs.educationalStage')}
														</p>
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
															{item?.grade ? t('homeRev.grade') : null}{' '}
															{i18n.language === 'ar'
																? item?.grade?.nameAr
																: item?.grade?.nameEn}
														</p>
													</div>
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('PopupWindows.cardCode')}
														</p>
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
															{item?.code}
														</p>
													</div>
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('Logs.studentCode')}
														</p>
														<div className="flex text-size_12 sm:text-size__14  gap-2 font-semibold text-mainColor flex-wrap justify-end ">
															{item?.student?.code}
														</div>
													</div>
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('Logs.stuphone')}
														</p>
														<div className="flex text-size_12 sm:text-size__14  gap-2 font-semibold text-textGray flex-wrap justify-end ">
															{item?.student?.phoneNumber}
														</div>
													</div>{' '}
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
															{t('SingleGroup.parentNumber')}
														</p>
														<div className="flex text-size_12 sm:text-size__14  gap-2 font-semibold text-textGray flex-wrap justify-end ">
															{item?.parent?.phoneNumber}
														</div>
													</div>
												</Disclosure.Panel>
											</div>
										)}
									</Disclosure>
								);
							})
						) : (
							<p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white ">
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

				{fetchStudents.data?.data?.length > 0 && (
					<div className="flex items-center justify-center gap-y-4">
						{fetchStudents?.data?.data?.length > 0 && (
							<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
								<button
									onClick={() => handleClick(StudentsPage - 1)}
									// onClick={() => setStudentsPage((old) => {
									//     Math.max(old - 1, 1)
									// })}
									className={`${StudentsPage === 1
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
										} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
									disabled={StudentsPage === 1}
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
											? StudentsPage === page
												? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
												: 'bg-transparent text-[#293241] hover:bg-slate-100'
											: 'text-[#293241]'
											} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
									>
										{page}
									</button>
								))}
								<button
									onClick={() => handleClick(StudentsPage + 1)}
									className={`${StudentsPage === totalPages
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
										}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
									disabled={
										StudentsPage === totalPages ||
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
	);
};

export default memo(Studentslog);
