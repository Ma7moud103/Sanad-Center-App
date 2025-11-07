import React, { useContext, useState } from 'react';
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

export default function AddPayment() {
	// let cookie = new Cookies();
	let [t] = useTranslation();
	const { selectedCenter, headers, setaddModel } =
		useContext(ApisContext);

	const { Toggler, setToggler, ErorrMessage, direction } =
		useContext(MainContext);
	// const { leftArrow } = useContext(SvgsContext);

	const validationSchema = Yup.object({
		title: Yup.string()
			.required()
			.matches(
				/^[\u0600-\u06FF\s\w\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/
			),
		price: Yup.number().required(),
	});

	const [loading, setloading] = useState(false);
	const formik = useFormik({
		initialValues: {
			title: '',
			price: '',
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				setloading(true);
				setaddModel(true);

				const res = await axios.post(
					`${BASE_URL}centers/${selectedCenter?._id}/payment-templates`,
					values,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					ErorrMessage(t('homeRev.modelSuccess'), 'success');
					setToggler((prev) => {
						return { ...prev, addpayment: false };
					});
					console.log(res);
				}
			} catch (error) {
				console.log(error);
			} finally {
				resetForm();
				setloading(false);
				setaddModel(false);
			}
		},
	});

	function close() {
		setToggler({ ...Toggler, addpayment: false });
	}

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.addpayment}
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
								onClick={() => setToggler({ ...Toggler, addpayment: false })}
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
								className="flex flex-col gap-1 relative  my-3"
							>
								<div className="flex flex-col gap-y-2 sm:flex-row items-center gap-x-2">
									<div className="Address flex flex-col w-full sm:w-1/2 gap-y-1 sm:gap-y-2">
										<label
											htmlFor="title"
											className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
										>
											{t('homeRev.operationName')}
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

									<div className="Address flex flex-col w-full sm:w-1/2 gap-y-1 sm:gap-y-2">
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

								<div className="formBtns mt-4 flex   gap-x-3 justify-center items-center">
									<button
										disabled={!(formik.isValid && formik.dirty)}
										type="submit"
										className={` text-white text-nowrap ${!(formik.isValid && formik.dirty) ? 'bg-secondMainColor ' : 'bg-mainColor '}   rounded-2xl px-10 py-3 w-1/2 `}
									>
										{!loading ? (
											t('SingleGroup.add')
										) : (
											<div
												className={`w-6  ms-[40%] h-6  border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div>
										)}
									</button>
									<button
										type='button'
										onClick={(e) => {
											e.preventDefault()
											setToggler((prev) => {
												return { ...prev, addpayment: false };
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
