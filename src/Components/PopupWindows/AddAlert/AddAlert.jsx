import React, { useContext, useState, Fragment, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import {
	Transition,
	Listbox,
	Dialog,
	DialogPanel,
	DialogTitle,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../assets/sanadSVG/Multiply.svg';
import boldIcon from '../../../assets/sanadSVG/textBold.svg';
import downArrowFilter from '../../../assets/sanadSVG/downArrow.svg';
import italicIcon from '../../../assets/sanadSVG/textItalic.svg';
import textCenter from '../../../assets/sanadSVG/aignJustify.svg';
import textLeft from '../../../assets/sanadSVG/alignRight.svg';
import leftArrow from '../../../assets/sanadSVG/leftArrow.svg';
import textRight from '../../../assets/sanadSVG/alignLeft.svg';
import uderLineIcon from '../../../assets/sanadSVG/textUnderLine.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import alertIcon from '../../../assets/sanadSVG/alert.svg';
// import Resourses from './Resourses';
import { useFormik } from 'formik';
import { BASE_URL } from '../../../Soursre';
import axios from 'axios';
import * as Yup from "yup"
const Fonts = [
	{ name: '0.7', type: 'sm' },
	{ name: '0.8', type: 'lg' },
	{ name: '0.9', type: 'xl' },
	{ name: '1', type: '2xl' },
];

export default function AddAlert() {
	let [t] = useTranslation();

	const {
		Toggler,
		setToggler,
		direction,
		ErorrMessage,

	} = useContext(MainContext);
	const { headers, selectedCenter, sethandleAddAlert, } = useContext(ApisContext);

	const [selectedFont, setSelectedFont] = useState(Fonts[0]);

	const [Styles, setStyles] = useState({
		fontStyle: '',
		textDecoration: '',
		textAlign: '',
		fontWeight: '',
		fontSize: '',
	});

	const [isOn, setisOn] = useState({
		fontStyle: true,
		textDecoration: true,
		textAlign: true,
		fontWeight: true,
		fontSize: true,
	});

	// const handleUploadSuccess = (result) => {
	// 	if (result?.successful?.length > 0) {
	// 		// ErorrMessage(t("Errors.handleUpload"), "success")
	// 	} else if (result?.failed?.length > 0) {
	// 		ErorrMessage(t('Errors.main'), 'error');
	// 	}
	// };

	// const arr = [
	// 	`${t('StudentDetails.negative')}`,
	// 	`${t('StudentDetails.positive')}`,
	// ];

	const [ActiveClass] = useState(1);

	// const [toggleDropDown, setToggleDropDown] = useState(false);
	// function handleActiveClass(index) {
	// 	setActiveClass(index);
	// 	if (index == 2) {
	// 		setToggleDropDown((open) => !open);
	// 	} else {
	// 		setToggleDropDown((open) => !open);
	// 	}
	// }

	const [loading, setloading] = useState(false);
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			// resources: [],
		},
		validationSchema: Yup.object({
			title: Yup.string().required(),
			description: Yup.string().required(),
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				setloading(true);
				const res = await axios.post(`${BASE_URL}centers/${selectedCenter?._id}/announcements`, values, {
					headers: headers,
				});
				console.log(res)
				if (res.status === 200 || res.data.status === "success") {
					setToggler({ ...Toggler, addAlert: false })
					resetForm()
					ErorrMessage(t('homeRev.alertSuccess'), 'success');
					sethandleAddAlert(prev => !prev)
				}

			} catch (error) {
				console.log(error);
				ErorrMessage(error.response.data.message, 'error');
			} finally {
				setloading(false);
			}

		},
	});

	const close = () => {
		setToggler({ ...Toggler, addAlert: false });
		formik.resetForm()
	};

	useEffect(() => {
		if (!Toggler.addAlert) {
			formik.resetForm()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Toggler.addAlert])

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.addAlert}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full sm:w-[500px] lg:w-[650px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, addAlert: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 mb-2 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={alertIcon} />
									<h3 className="text-2xl font-black text-[#023E8A]">
										{t('homeRev.addAlert')}
									</h3>
									<p className="font-normal text-sm sm:text-base text-center text-textColor__2">
										{t('homepage.alertP')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}
							<>
								{/* <div className="w-full flex items-center gap-x-4 my-3  justify-center">
									<button
										type="button"
										onClick={() => {
											handleActiveClass(1);
											setToggleDropDown(false);
										}}
										className={`px-1 py-1 sm:text-sm sm:px-3 ${ActiveClass === 1 ? 'bg-mainColor text-white' : 'text-mainColor bg-white'} font-bold text-xs sm:text-base  rounded-lg transition-all`}
									>
										{`${t('homeRev.addAlert')} +`}
									</button>
									<button
										type="button"
										onClick={() => {
											handleActiveClass(2);
											setToggleDropDown(false);
										}}
										className={`px-1 py-1 sm:text-sm sm:px-3 ${ActiveClass === 2 ? 'bg-mainColor text-white' : 'text-mainColor bg-white'} font-bold text-xs sm:text-base  rounded-lg transition-all`}
									>
										{t('homepage.uploadNewFile')}
									</button>


								</div> */}

								{ActiveClass === 2 ? (
									<div className="files h-[300px]  overflow-y-auto scrollbar-thin">
										{/* <Resourses onUploadSuccess={handleUploadSuccess} /> */}
									</div>
								) : (
									ActiveClass === 1 && (
										<form onSubmit={formik.handleSubmit} className="flex flex-col gap-1 relative 2xl:gap-y-3">
											<div className="Address flex flex-col w-full gap-y-1 sm:gap-y-2">
												<label
													htmlFor="title"
													className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
												>
													{t('homeRev.alertH')}
												</label>
												<input
													onChange={formik.handleChange}
													placeholder={t('homeRev.alertH')}
													className={` py-2 sm:py-3 px-6 
                             placeholder:text-textGray
                        ${formik.errors.title && formik.touched.title ? "border-err" : "border-[#E6E9EA] "} border-[1px]
                           outline-none  focus:outline-none text-mainColor font-bold text-start  rounded-xl placeholder:text-size_12 text-sm  placeholder:text-start `}
													type="text"
													id="title"
													name="title"
													onBlur={formik.handleBlur}
													value={formik.values.title}
												/>
											</div>

											<div className="content  w-full flex flex-col gap-y-2">
												<div className={` alertcontent flex flex-col w-full`}>
													<label
														htmlFor="description"
														className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
													>
														{t('homeRev.alertcontent')}
													</label>
													<div
														className={`w-full    py-2 px-6  bg-white h-52
                                    outline-none  text-start border border-[#E1E1E1] rounded-xl my-3 placeholder:text-start  resize-none `}
													>
														<div className="controls flex w-full justify-between items-center">
															<div className="relative px-2 py-1 w-[126px] ">
																<Listbox
																	value={selectedFont.name}
																	onChange={(e) => {
																		setSelectedFont(e.name);
																		setStyles((prev) => {
																			return {
																				...prev,
																				fontSize: `${e.name}rem`,
																			};
																		});
																	}}
																>
																	{(open) => (
																		<div className="relative mt-1">
																			<ListboxButton className="relative w-full  rounded-lg bg-white py-2 pl-3 pr-10 text-left border-[1px]  border-solid   border-borderMainColor cursor-pointer sm:text-sm">
																				<span className="block truncate text-mainColor font-bold text-size_10">
																					{t('StudentDetails.fontsize')}
																				</span>
																				<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																					{open ? (
																						<ReactSVG src={downArrowFilter} />
																					) : (
																						<ReactSVG src={leftArrow} />
																					)}
																				</span>
																			</ListboxButton>

																			<Transition
																				as={Fragment}
																				leave="transition ease-in duration-100"
																				leaveFrom="opacity-100"
																				leaveTo="opacity-0"
																			>
																				<ListboxOptions className="absolute mt-1 max-h-28 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
																					{Fonts.map((font, i) => (
																						<ListboxOption
																							key={i}
																							className={({ active }) =>
																								`relative cursor-default select-none py-1  pl-10 ps-4 text-[14px]  text-mainColor${active
																									? 'bg-amber-100 text-amber-900'
																									: 'text-gray-900'
																								}  `
																							}
																							value={font}
																						>
																							{({ selectedFont }) => (
																								<>
																									<span
																										className={`block cursor-pointer  text-mainColor text-size_12  ${selectedFont
																											? 'font-semibold'
																											: 'font-normal'
																											}`}
																									>
																										{font.type}
																									</span>
																									{selectedFont ? (
																										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																											{/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
																										</span>
																									) : null}
																								</>
																							)}
																						</ListboxOption>
																					))}
																				</ListboxOptions>
																			</Transition>
																		</div>
																	)}
																</Listbox>
															</div>

															<div className="icons flex gap-x-2 sm:gap-x-mainGap">
																<div
																	className="icon cursor-pointer"
																	onClick={() => {
																		setisOn((prev) => {
																			return {
																				...prev,
																				textAlign: !prev.textAlign,
																			};
																		});
																		setStyles((prev) => {
																			if (isOn.textAlign) {
																				return { ...prev, textAlign: 'center' };
																			} else
																				return { ...prev, textAlign: 'right' };
																		});
																	}}
																>
																	<ReactSVG src={textCenter} />{' '}
																</div>

																<div
																	className="icon cursor-pointer "
																	onClick={() => {
																		setisOn((prev) => {
																			return {
																				...prev,
																				textAlign: !prev.textAlign,
																			};
																		});
																		setStyles((prev) => {
																			if (isOn.textAlign) {
																				return { ...prev, textAlign: 'left' };
																			} else
																				return { ...prev, textAlign: 'right' };
																		});
																	}}
																>
																	<ReactSVG src={textLeft} />{' '}
																</div>

																<div
																	className="icon cursor-pointer"
																	onClick={() => {
																		setisOn((prev) => {
																			return {
																				...prev,
																				textAlign: !prev.textAlign,
																			};
																		});
																		setStyles((prev) => {
																			if (isOn.textAlign) {
																				return { ...prev, textAlign: 'right' };
																			} else
																				return { ...prev, textAlign: 'right' };
																		});
																	}}
																>
																	<ReactSVG src={textRight} />{' '}
																</div>

																<div
																	className="icon cursor-pointer"
																	onClick={() => {
																		setisOn((prev) => {
																			return {
																				...prev,
																				fontStyle: !prev.fontStyle,
																			};
																		});
																		setStyles((prev) => {
																			if (isOn.fontStyle) {
																				return { ...prev, fontStyle: 'italic' };
																			} else
																				return { ...prev, fontStyle: 'normal' };
																		});
																	}}
																>
																	<ReactSVG src={italicIcon} />
																</div>

																<div
																	className="icon underline cursor-pointer"
																	onClick={() => {
																		setisOn((prev) => {
																			return {
																				...prev,
																				textDecoration: !prev.textDecoration,
																			};
																		});
																		setStyles((prev) => {
																			if (isOn.textDecoration) {
																				return {
																					...prev,
																					textDecoration: 'underline',
																				};
																			} else
																				return {
																					...prev,
																					textDecoration: 'none',
																				};
																		});
																	}}
																>
																	<ReactSVG src={uderLineIcon} />
																</div>

																<div
																	className="icon cursor-pointer"
																	onClick={() => {
																		setisOn((prev) => {
																			return {
																				...prev,
																				fontWeight: !prev.fontWeight,
																			};
																		});
																		setStyles((prev) => {
																			if (isOn.fontWeight) {
																				return { ...prev, fontWeight: 'bold' };
																			} else
																				return {
																					...prev,
																					fontWeight: 'normal',
																				};
																		});
																	}}
																>
																	<ReactSVG src={boldIcon} />
																</div>
															</div>
														</div>

														<textarea
															style={Styles}
															onFocus={(e) => {
																e.target.style.boxShadow = 'none';
															}}
															onChange={formik.handleChange}
															placeholder={t('homeRev.alertcontent')}
															className={` py-2 px-6  text-mainColor
                       placeholder:text-textGray h-32 md:h-34 w-full
                        border-none overflow-hidden  ${formik.errors.description && formik.touched.description ? "border-err" : "border-[#E6E9EA] "} border-[1px]
                           outline-none  text-start rounded-xl my-3 placeholder:text-start  resize-none`}
															type="text"
															id="description"
															name="description"
															value={formik.values.description}
															onBlur={formik.handleBlur}
														/>
													</div>
												</div>
											</div>

											<div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
												<button
													disabled={!(formik.isValid && formik.dirty)}
													type="submit"
													className={`text-white ${!(formik.isValid && formik.dirty) ? 'bg-secondMainColor' : 'bg-mainColor'}  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
												>
													{loading ? (
														<div
															className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
														></div>
													) : (
														t('homepage.add')
													)}
												</button>
												<button
													type="button"
													onClick={() =>
														setToggler({ ...Toggler, addAlert: false })
													}
													className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg"
												>
													{t('homepage.back')}
												</button>
											</div>
										</form>
									)
								)}
							</>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
