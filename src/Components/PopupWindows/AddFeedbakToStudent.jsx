import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import x from '../../assets/sanadSVG/Multiply.svg';
import { useFormik } from 'formik';
import { Dialog, DialogPanel, DialogTitle, Listbox } from '@headlessui/react';
import { SvgsContext } from '../../Context/SvgsConetxt';

import boldIcon from '../../assets/sanadSVG/textBold.svg';
import Tbox from '../../assets/sanadSVG/feedback.svg';
import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';
import italicIcon from '../../assets/sanadSVG/textItalic.svg';
import textCenter from '../../assets/sanadSVG/aignJustify.svg';
import textLeft from '../../assets/sanadSVG/alignRight.svg';
import textRight from '../../assets/sanadSVG/alignLeft.svg';
import uderLineIcon from '../../assets/sanadSVG/textUnderLine.svg';
import { ReactSVG } from 'react-svg';

import { ApisContext } from '../../Context/ApisContext';
import profile from '../../assets/sanadSVG/imgUser.svg';
import filterIcon from '../../assets/sanadSVG/filterIcon.svg';
import leftarrow from '../../assets/sanadSVG/leftArrow.svg';
import axios from 'axios';
import { BASE_URL } from '../../Soursre';
import * as Yup from 'yup';

const Fonts = [
	{ name: '0.7', type: 'small' },
	{ name: '0.8', type: 'large' },
	{ name: '0.9', type: 'xlLarge' },
	{ name: '1', type: '2xLarge' },
];

export default function AddFeedback() {
	const { t, i18n } = useTranslation();
	const { Toggler, setToggler, ErorrMessage, direction, studentDetails } =
		useContext(MainContext);


	const { headers, selectedCenter } = useContext(ApisContext);
	const { leftArrow } = useContext(SvgsContext);

	const [data] = useState([
		{ name: t('StudentDetails.positive'), value: 'positive' },
		{ name: t('StudentDetails.negative'), value: 'negative' },
	]);

	const [selectedFont, setSelectedFont] = useState(Fonts[0]);
	const [selectedType, setselectedType] = useState(data[0]);
	const filterTypes = data.filter((item) => {
		return item.name !== selectedType.name;
	});

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
	const [loading, setloading] = useState(false);

	const formik = useFormik({
		initialValues: {
			content: '',
			type: selectedType.value,
		},
		validationSchema: Yup.object({
			content: Yup.string().required(),
		}),
		onSubmit: async (values, { resetForm }) => {
			if (selectedCenter) {
				try {
					setloading(true);
					const res = await axios.post(
						`${BASE_URL}centers/${selectedCenter?._id}/card/${studentDetails?.map((item) => item?.code)}/feedbacks`,
						values,
						{ headers: headers }
					);

					if (res.status === 200 || res.data.status === 'success') {
						ErorrMessage(t('Errors.successfeedback'), 'success');
						setToggler({ ...Toggler, addFeedbackToStudent: false });
					}
				} catch (error) {
					console.log('from feedback', error);
					if (error.response.data.message === 'card not valid') {
						ErorrMessage(t('Errors.cardNotFound'), 'error');
					} else {
						ErorrMessage(t('Errors.main'), 'error');
					}
				} finally {
					setloading(false);
					formik.values.content = '';
					resetForm();
				}
			}
		},
	});

	const isButtonDisabled = !formik.isValid || !formik.dirty;

	function close() {
		setToggler({ ...Toggler, addFeedbackToStudent: false });
		formik.resetForm()
	}

	useEffect(() => {
		if (!Toggler.addFeedbackToStudent) {
			formik.resetForm()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Toggler.addFeedbackToStudent])

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.addFeedbackToStudent}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4 py-6">
						<DialogPanel
							transition
							className="w-full sm:w-[600px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() =>
									setToggler({ ...Toggler, addFeedbackToStudent: false })
								}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={Tbox} />
									<h3 className="text-2xl  font-black text-[#023E8A]">
										{t('homeRev.addFeedback')}
									</h3>
								</div>
							</DialogTitle>
							{/* content */}

							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col gap-y-2 mt-3  sm:gap-y-4 relative justify-start items-center "
							>
								<div className="content  w-full flex flex-col gap-y-2">
									<div className="detialsAndType flex flex-col sm:flex-row items-center justify-center gap-x-2 w-full">
										<div className="detilasw w-full sm:w-1/2 flex flex-col gap-y-1 ">
											<label
												htmlFor="detil"
												className="text-sm text-textColor__2"
											>
												{t('homepage.StudentDetails')}
											</label>
											<div className="input px-3 py-2 bg-white rounded-xl flex items-center gap-x-2 ">

												<ReactSVG src={profile} />

												{/* {item?.profileImage !== "" ?
													<span className=''>
														<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.profileImage}`} alt="profileImage" />
													</span>

													: <ReactSVG src={profile} />} */}

												<div className="space-y-1">
													<h6 className="text-size_12 sm:text-sm  font-bold text-mainColor">
														{/* {studentDetails[0]?.student?.fullname} */}
														{studentDetails?.map((item) => item?.student?.fullname)}
													</h6>
													<p className="text-size_10 sm:text-xs text-textGray font-semibold">
														{i18n.language === 'ar'
															? ` ${t('homeRev.grade')} ${studentDetails?.map((item) => item?.grade?.nameAr)}
`
															: `  ${t('homeRev.grade')} ${studentDetails?.map((item) => item?.grade?.nameEn)}`}
													</p>
												</div>
											</div>
										</div>

										<div className="detilas w-full sm:w-1/2  flex flex-col gap-y-1 ">
											<label
												htmlFor="detil"
												className="text-sm text-textColor__2"
											>
												{t('homepage.typeFeedback')}
											</label>

											<div className="input py-4 bg-white rounded-xl flex items-center gap-x-2">
												<Listbox
													value={selectedType}
													onChange={(value) => {
														setselectedType(value);
														formik.setFieldValue('type', value.value);
													}}
												>
													{({ open }) => (
														<div className="relative w-full">
															<Listbox.Button
																className={`font-semibold   text-mainColor px-4  text-sm leading-5  focus:ring-0  items-center 
                                                                            relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}
															>
																<div className="flex items-center gap-x-3">
																	<div className="flex justify-center items-center">
																		<ReactSVG src={filterIcon} />
																	</div>

																	<span className={`block truncate text-sm`}>
																		{selectedType?.name}
																	</span>
																</div>

																<span
																	className={`pointer-events-none absolute    end-4 flex items-center  bg-bg_mainLayout rounded-full ${!open ? 'p-1' : 'p-2'}`}
																>
																	{open ? (
																		<ReactSVG src={downArrowFilter} />
																	) : (
																		<ReactSVG src={leftarrow} />
																	)}
																</span>
															</Listbox.Button>

															<Listbox.Options
																className="absolute  mt-5 max-h-40 z-10 
                        scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow"
															>
																{filterTypes.map((person, personIdx) => (
																	<Listbox.Option
																		key={personIdx}
																		className={({ active }) =>
																			` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'}`
																		}
																		value={person}
																	>
																		{({ selectedType }) => (
																			<span
																				className={`block text-sm truncate ${selectedType ? 'font-medium' : 'font-normal'}`}
																			>
																				{person.name}
																			</span>
																		)}
																	</Listbox.Option>
																))}
															</Listbox.Options>
														</div>
													)}
												</Listbox>
											</div>
										</div>
									</div>

									<div className={` alertcontent flex flex-col w-full`}>
										<label
											htmlFor="description"
											className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
										>
											{t('StudentDetails.feedbackDetails')}
										</label>
										<div
											className={`w-full    py-2 px-6  bg-white h-52
                                    outline-none  text-start border-borderMainColor rounded-xl my-3 placeholder:text-start  resize-none `}
										>
											<div className="controls flex w-full justify-between items-center">
												<div className="relative px-2 py-1 w-[126px] ">
													<Listbox
														value={selectedFont.name}
														onChange={(e) => {
															setSelectedFont(e.name);
															setStyles((prev) => {
																return { ...prev, fontSize: `${e.name}rem` };
															});
														}}
													>
														{(open) => (
															<div className="relative mt-1">
																<Listbox.Button className="relative w-full  rounded-lg bg-white py-2 pl-3 pr-10 text-left border-[1px]  border-solid   border-borderMainColor cursor-pointer sm:text-sm ">
																	<span className="block truncate text-mainColor font-bold text-size_10">
																		{t('StudentDetails.fontsize')}
																	</span>
																	<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																		{open ? (
																			<ReactSVG src={downArrowFilter} />
																		) : (
																			leftArrow
																		)}
																	</span>
																</Listbox.Button>

																<Listbox.Options className="absolute mt-1 max-h-28 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm  scrollbar-thin">
																	{Fonts.map((font, i) => (
																		<Listbox.Option
																			key={i}
																			className={({ active }) =>
																				`relative cursor-default select-none py-2 pl-10 ps-4 text-[14px]  text-mainColor${active
																					? 'bg-amber-100 text-amber-900'
																					: 'text-gray-900'
																				}`
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
																		</Listbox.Option>
																	))}
																</Listbox.Options>
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
																} else return { ...prev, textAlign: 'right' };
															});
														}}
													>
														<ReactSVG src={textCenter} />
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
																} else return { ...prev, textAlign: 'right' };
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
																} else return { ...prev, textAlign: 'right' };
															});
														}}
													>
														<ReactSVG src={textRight} />
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
																} else return { ...prev, fontStyle: 'normal' };
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
																	return { ...prev, textDecoration: 'none' };
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
																} else return { ...prev, fontWeight: 'normal' };
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
												placeholder={` ${formik.errors.content
													? t('homeRev.alertplacecontent')
													: t('homeRev.desP')
													}   `}
												className={` py-2 px-6  text-mainColor
                       placeholder:text-textGray h-32 md:h-34 w-full
                        border-none overflow-hidden
                           outline-none  text-start rounded-xl my-3 placeholder:text-start  resize-none
                           ${formik.errors.content ? 'text-err border-err placeholder:text-err' : ''}
                           `}
												type="text"
												id="description"
												name="content"
												value={formik.values.content}
											/>
											{/* {formik.errors.content && <p className="text-red-400 py-1">{formik.errors.content}</p>} */}
										</div>
									</div>
								</div>

								<div className=" buttons flex  gap-1 sm:gap-3 w-full justify-between items-center">
									<button
										disabled={isButtonDisabled}
										type="submit"
										// disabled={formik.isValid}
										className={`rounded-2xl py-2 ${isButtonDisabled ? 'bg-secondMainColor' : 'bg-mainColor'}  sm:py-3  border-none  text-white text-base sm:text-lg w-full md:w-1/2 font-bold  text-center px-1  flex items-center justify-center`}
									>
										{!loading ? (
											t('SingleGroup.add')
										) : (
											<div
												className={`w-6  h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type="button"
										onClick={() =>
											setToggler((prev) => {
												return { ...prev, addFeedbackToStudent: false };
											})
										}
										className="rounded-2xl py-2  sm:py-3 px-12 bg-transparent border-none text-mainColor  text-base sm:text-lg w-full md:w-1/2 font-bold"
									>
										{t('ExitPopup.back')}
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
