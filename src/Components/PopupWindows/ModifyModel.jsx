import React, { useContext, useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { MainContext } from '../../Context/MainContext';
import x from '../../assets/sanadSVG/Multiply.svg';
import * as Yup from 'yup';
import { ApisContext } from '../../Context/ApisContext';
import axios from 'axios';
import { BASE_URL } from '../../Soursre';
import cashIcon from '../../assets/sanadSVG/payment.svg';
import { ReactSVG } from 'react-svg';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function ModifyModel() {
	let [t] = useTranslation();
	const {
		selectedCenter,
		headers,

		setaddModel,
	} = useContext(ApisContext);

	const { Toggler, setToggler, ErorrMessage, modelData, direction } =
		useContext(MainContext);

	const validationSchema = Yup.object({
		type: Yup.string()
			.required()
			.matches(/^[\p{L} ]+$/u),
		title: Yup.string().matches(/^[\p{L} ]+$/u),
		price: Yup.string().required(),
	});

	const [loading, setloading] = useState(false);
	const formik = useFormik({
		initialValues: {
			type: '',
			price: '',
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			if (modelData) {
				try {
					setloading(true);

					const res = await axios.patch(
						`${BASE_URL}centers/${selectedCenter?._id}/payment-templates/${modelData?._id}`,
						values,
						{ headers: headers }
					);
					console.log(res);
					if (res.status === 200 || res.data.status === 'success') {
						ErorrMessage(t('homeRev.modelSuccessModify'), 'success');
						setToggler({ ...Toggler, modifyModel: false });
						resetForm();
						setaddModel((prev) => !prev);
					}
				} catch (error) {
					console.log(error);
					ErorrMessage(t('Errors.main'), 'error');
				} finally {
					setloading(false);
				}
			}
		},
	});

	useEffect(() => {
		if (modelData && modelData?.type === 'card') {
			formik.setFieldValue('type', modelData?.type);
			formik.setFieldValue('price', modelData?.price);
			// formik.setFieldValue("title", i18n.language === "ar" ? modelData?.grade?.nameAr : modelData?.grade?.nameEn)
		} else if (modelData && modelData?.type === 'custom') {
			formik.setFieldValue('type', modelData?.type);
			formik.setFieldValue('price', modelData?.price);
			formik.setFieldValue('title', modelData?.title);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modelData]);

	function close() {
		setToggler({ ...Toggler, modifyModel: false });
	}
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.modifyModel}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4 py-8">
						<DialogPanel
							transition
							className="w-full md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-2 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, modifyModel: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={cashIcon} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('homepage.modifyModel')}
									</h3>
								</div>
							</DialogTitle>

							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col gap-1 relative 2xl:gap-y-3 mt-2"
							>
								<div className={`flex flex-col gap-x-2  `}>
									<div
										className={`flex flex-col sm:flex-row w-full gap-y-2 items-center gap-x-2 `}
									>
										{modelData?.type === 'custom' && (
											<div
												className={`Address flex w-full sm:w-1/2 flex-col  gap-y-1 sm:gap-y-2`}
											>
												<label
													htmlFor="title"
													className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
												>
													{modelData?.type === 'custom'
														? t('homeRev.operationName')
														: t('Logs.educationalStage')}
												</label>
												<input
													placeholder={t('homeRev.labelheader')}
													className={`input px-3 py-3 bg-white rounded-xl  text-mainColor placeholder:text-textGray text-sm placeholder:text-sm  ${formik.errors.title && formik.touched.title ? 'text-err border-err border placeholder:text-err' : 'border border-borderMainColor text-mainColor'}`}
													type="text"
													name="title"
													id="title"
													value={formik.values.title}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>
											</div>
										)}

										<div
											className={`Address flex  ${modelData?.type === 'card' ? 'w-full' : 'w-full sm:w-1/2'} flex-col  gap-y-1 sm:gap-y-2`}
										>
											<label
												htmlFor="type"
												className={`text-[#023E8A]  text-start font-semibold text-sm relative`}
											>
												{t('homeRev.operationType')}
											</label>
											<input
												placeholder={t('homeRev.labelheader')}
												className={`input px-3 py-3 bg-white rounded-xl  text-mainColor placeholder:text-textGray text-sm placeholder:text-sm  ${formik.errors.type && formik.touched.type ? 'text-err border-err border placeholder:text-err' : 'border border-borderMainColor text-mainColor'}`}
												type="text"
												name="type"
												id="type"
												readOnly
												value={formik.values.type}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
									</div>

									<div className="Address flex flex-col w-full gap-y-1 sm:gap-y-2">
										<label
											htmlFor="price"
											className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
										>
											{t('homeRev.price')}
										</label>
										<input
											placeholder={t('homeRev.addplace')}
											className={`input px-3 py-3 bg-white rounded-xl  text-mainColor placeholder:text-textGray text-sm placeholder:text-sm  ${formik.errors.price && formik.touched.price ? 'text-err border-err border placeholder:text-err' : 'border border-borderMainColor text-mainColor'}`}
											type="number"
											name="price"
											id="price"
											value={formik.values.price}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>
								</div>

								<div className="formBtns mt-4 flex flex-row gap-x-3 justify-center items-center">
									<button
										disabled={!(formik.isValid && formik.dirty)}
										type="submit"
										className={` text-white text-nowrap ${!(formik.isValid && formik.dirty) ? 'bg-secondMainColor ' : 'bg-mainColor '}   rounded-2xl px-10 py-3 w-1/2  text-base`}
									>
										{!loading ? (
											t('PopupWindows.confirm')
										) : (
											<div
												className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type='button'
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, modifyModel: false };
											});
										}}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-1/2 "
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
