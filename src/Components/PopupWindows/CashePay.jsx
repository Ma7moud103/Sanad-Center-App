import React, { useContext, useState, Fragment, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Listbox } from '@headlessui/react';
import { useFormik } from 'formik';
import { MainContext } from '../../Context/MainContext';
import x from '../../assets/sanadSVG/Multiply.svg';
import * as Yup from 'yup';
import { ApisContext } from '../../Context/ApisContext';
import axios from 'axios';
import { BASE_URL } from '../../Soursre';
import cashIcon from '../../assets/sanadSVG/payment.svg';
import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';
import { ReactSVG } from 'react-svg';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function CashePay() {
	let [t] = useTranslation();
	const {
		MainLoading,
		setMainLoading,
		selectedCenter,
		headers,
		setpostPay,
		postPay,
		TypesOfPayment,
		selectedTypeOfPayment,
		setselectedTypeOfPayment,
	} = useContext(ApisContext);

	const { Toggler, setToggler, ErorrMessage, direction } =
		useContext(MainContext);
	// const { leftArrow } = useContext(SvgsContext);

	// const fetchData = useQuery({
	//     queryKey: ["getPayemntTypes", `${selectedCenter?._id}` , `${addModel}`],
	//     queryFn: getTypes(),
	//     enabled: !!selectedCenter?._id,
	//     // retryOnMount: true
	// })

	// pageData?.filter((item) => item?.page === currentPage)[0]?.data

	//               {t("homeRev.mostahekat")}

	const validationSchema = Yup.object({
		title: Yup.string()
			.required()
			.matches(
				/^[\u0600-\u06FF\s\w\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/
			),
		price: Yup.number().required(),
	});

	// console.log(cachedData)
	const [loading, setloading] = useState(false);
	const formik = useFormik({
		initialValues: {
			title: '',
			price: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			if (selectedPay === t('homepage.pull')) {
				values.price *= -1;
			}
			console.log(values);
			try {
				setloading(true);

				const res = await axios.post(
					`${BASE_URL}centers/${selectedCenter?._id}/payments`,
					values,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					ErorrMessage(t('homeRev.paySuccess'), 'success');
					formik.setFieldValue('price', '');
					setpostPay((prev) => !prev);

					setToggler((prev) => {
						return { ...prev, cash: false };
					});
				}
			} catch (error) {
				console.log(error);
				ErorrMessage(t('Errors.main'), 'error');
			} finally {
				setloading(false);
				setMainLoading({ ...MainLoading, spPayments: false });
			}
		},
	});

	const pushPull = [t('homepage.push'), t('homepage.pull')];
	const [selectedPay, setselectedPay] = useState(pushPull[0]);

	useEffect(() => {
		if (selectedTypeOfPayment) {
			formik.setValues({
				title: selectedTypeOfPayment?.title,
				price: selectedTypeOfPayment?.price,
			});
		} else {
			formik.setValues({
				title: '',
				price: '',
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTypeOfPayment, postPay]);

	function close() {
		setToggler({ ...Toggler, cash: false });
	}

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.cash}
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
								onClick={() => setToggler({ ...Toggler, cash: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={cashIcon} />
									<h3 className="text-2xl  font-black text-[#023E8A]">
										{t('homeRev.addTemp')}
									</h3>
								</div>
							</DialogTitle>
							{/* content */}

							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col gap-1 gap-y-3 mt-3 relative 2xl:gap-y-3"
							>
								<label
									htmlFor="type"
									className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
								>
									{t('homepage.selectModel')}
								</label>

								{selectedTypeOfPayment?.type ? (
									<Listbox
										value={selectedTypeOfPayment}
										onChange={(e) => {
											setselectedTypeOfPayment(e);
											formik.setValues({
												...formik.values,
												title: e?.title,
												price: e?.price,
											});
										}}
									>
										{({ open }) => (
											<div className="relative">
												<Listbox.Button
													className={`font-semibold   text-mainColor py-3  px-2 text-sm leading-5  focus:ring-0 
                      relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}
												>
													<span className="absolute top-[50%] translate-y-[-50%] end-4 hidden sm:flex    rounded-full bg-[#E3EFFF]  items-center justify-center p-1">
														<ReactSVG src={downArrowFilter} />
													</span>

													<div
														className={` truncate text-sm px-2 flex gap-x-3  items-center `}
													>
														<span>{selectedTypeOfPayment?.title} </span> -
														<span>
															{selectedTypeOfPayment?.price}{' '}
															{t('homeRev.pound')}{' '}
														</span>
													</div>
												</Listbox.Button>

												<Listbox.Options
													className="absolute  mt-1 max-h-32 z-10 
                        scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow"
												>
													{TypesOfPayment?.filter(
														(item) =>
															item?.title !== selectedTypeOfPayment?.title
													)?.map((person, personIdx) => (
														<Listbox.Option
															key={personIdx}
															className={'scrollbar-thin cursor-pointer'}
															value={person}
														>
															{({ selectedDay, active, selected }) => (
																<>
																	<span
																		className={`block truncate text-xs ${active ? 'bg-mainColor text-white' : null} text-mainColor transition-all py-2 px-2   ${selectedDay ? 'font-medium' : 'font-normal'}`}
																	>
																		<div
																			className={` truncate text-xs justify-between px-3  flex gap-x-3 items-center `}
																		>
																			<span>{person?.title} </span>
																			<span>
																				{person?.price} {t('homeRev.pound')}{' '}
																			</span>
																		</div>
																	</span>
																</>
															)}
														</Listbox.Option>
													))}
												</Listbox.Options>
											</div>
										)}
									</Listbox>
								) : (
									<input
										placeholder={t('homeRev.addplace')}
										className={`py-3 px-6 
                                   placeholder:text-textGray
                                     border-[#E6E9EA]
                                    outline-none  focus:outline-none text-start  rounded-xl placeholder:text-size_12 text-sm  placeholder:text-start border text-mainColor`}
										type="text"
										id="type"
									/>
								)}

								<div className="Address flex flex-col w-full gap-y-1 sm:gap-y-2">
									<label
										htmlFor="title"
										className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
									>
										{t('homeRev.operationName')}
									</label>
									<input
										placeholder={t('homeRev.addplace')}
										className={`input px-3 py-3 bg-white rounded-xl  text-mainColor placeholder:text-textGray text-sm placeholder:text-sm  ${formik.errors.title && formik.touched.title ? 'text-err border-err border placeholder:text-err' : 'border border-borderMainColor text-mainColor'}`}
										type="text"
										name="title"
										id="title"
										value={formik.values.title}
										onChange={(e) => {
											formik.setFieldValue('title', e.target.value);
										}}
										onBlur={formik.handleBlur}
									/>
								</div>

								<div className="w-full flex flex-col gap-y-3 sm:flex-row gap-x-2">
									<div className="detilasw w-full sm:w-1/2 flex flex-col gap-y-1 ">
										<label htmlFor="price" className="text-sm text-mainColor">
											{t('homeRev.price')}
										</label>
										<input
											className={`input px-3 py-3 bg-white rounded-xl  text-mainColor placeholder:text-textGray text-sm placeholder:text-sm  ${formik.errors.price && formik.touched.price ? 'text-err border-err border placeholder:text-err' : 'border border-borderMainColor text-mainColor'}`}
											placeholder="400"
											type="number"
											id="price"
											name="price"
											value={formik.values.price}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>

									<div className=" w-full sm:w-1/2 flex flex-col gap-y-1 ">
										<label htmlFor="price" className="text-sm text-mainColor">
											{t('homeRev.operationType')}
										</label>
										<Listbox value={selectedPay} onChange={setselectedPay}>
											{({ open }) => (
												<div className="relative">
													<Listbox.Button
														className={`font-semibold   text-mainColor py-3  px-2 text-sm leading-5  focus:ring-0 
                      relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}
													>
														<span className="absolute top-[50%] translate-y-[-50%] end-4 hidden sm:flex  rounded-full bg-[#E3EFFF]  items-center justify-center p-1">
															<ReactSVG src={downArrowFilter} />
														</span>

														<span className={`block truncate text-sm px-2`}>
															{selectedPay}
														</span>
													</Listbox.Button>
													<Listbox.Options
														className="absolute  mt-1 max-h-32 z-10 
                        scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow"
													>
														{pushPull
															.filter((item) => item !== selectedPay)
															.map((person, personIdx) => (
																<Listbox.Option
																	key={personIdx}
																	className={'scrollbar-thin cursor-pointer'}
																	value={person}
																>
																	{({ selectedDay, active, selected }) => (
																		<>
																			<span
																				className={`block truncate text-xs ${active ? 'bg-mainColor text-white' : null} text-mainColor transition-all py-2 px-2   ${selectedDay ? 'font-medium' : 'font-normal'}`}
																			>
																				{person}
																			</span>
																		</>
																	)}
																</Listbox.Option>
															))}
													</Listbox.Options>
												</div>
											)}
										</Listbox>
									</div>
								</div>
								<div className="formBtns mt-4 flex flex-row gap-x-3 justify-center items-center">
									<button
										disabled={!formik.isValid}
										type="submit"
										className={` text-white ${!formik.isValid ? 'bg-secondMainColor ' : 'bg-mainColor '}   rounded-2xl px-10 py-3 w-1/2 text-xl`}
									>
										{!loading ? (
											t('SingleGroup.add')
										) : (
											<div
												className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type='button'
										onClick={(e) => {
											e.preventDefault()
											setToggler((prev) => {
												return { ...prev, cash: false };
											});
										}}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-1/2 text-xl"
									>
										{t('homepage.back')}
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
