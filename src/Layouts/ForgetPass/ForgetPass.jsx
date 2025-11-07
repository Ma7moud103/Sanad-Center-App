import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import ForgetPassImage from '../../assets/Login/ForgetPasswordGraphic.png';
import ForgetPassImage2 from '../../assets/Login/Code submit.png';
import CorrectSign from '../../assets/correct-sign.png';
import axios from 'axios';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../Context/MainContext';
import BtnToggleLang from '../../Components/SideMenu/BtnToggleLang';
import { BASE_URL } from '../../Soursre';

export default function ForgetPass() {
	const { ErorrMessage, setAuthLoading, AuthLoading, direction } =
		useContext(MainContext);
	const [requestSent, setRequestSent] = useState(false);
	const [forgetPassEmail, setforgetPassEmail] = useState('');
	let { t, i18n } = useTranslation();
	const NavigateTo = useNavigate();

	const ForgetPassValidation = Yup.object({
		emailOrCode: Yup.string()
			.required(t('register.requiredEmail'))
			.matches(
				/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
				t('register.emailMatch')
			),
	});
	const ForgetPassFormik = useFormik({
		initialValues: {
			emailOrCode: '',
		},
		validationSchema: ForgetPassValidation,
		onSubmit: async (values) => {
			try {
				setAuthLoading((prev) => {
					return { ...prev, forget: true };
				});

				const data = await axios.patch(
					`${BASE_URL}center-users/auth/forgot-pass`,
					values
				);
				if (data.status === 200) {
					setforgetPassEmail(values.emailOrCode);
					setRequestSent(true);
					ErorrMessage(t('Errors.verify2'), 'success');
				}

				setAuthLoading((prev) => {
					return { ...prev, forget: false };
				});
			} catch (error) {
				console.log(error);

				switch (error.response.data.message) {
					case 'incorrect credentials':
						ErorrMessage(t('Errors.ema'), 'error');
						break;
					case 'user is not verified, check your email':
						ErorrMessage(t('Errors.notVerified'), 'error');
						NavigateTo('/verify');
						localStorage.setItem("AuthPath", "/verify")
						break;

					case 'incorrect password':
						ErorrMessage(t('Errors.pass'), 'error');
						break;
					case 'Maximum OTP attempts reached. User is suspended for 1 hour.':
						ErorrMessage(t('Errors.try'), 'error');
						break;
					case 'user is suspended':
						let suspendedDate = new Date(error.response.data.suspendedUntil);
						let currentDate = new Date();
						let waitFor = suspendedDate - currentDate;
						ErorrMessage(
							`${t('Errors.tyr2')} ${parseInt(waitFor / 1000 / 60)} m `,
							'error'
						);
						break;
					default:
						ErorrMessage(t('Errors.prop'), 'error');
						break;
				}

				setAuthLoading((prev) => {
					return { ...prev, forget: false };
				});
			}
			setAuthLoading((prev) => {
				return { ...prev, forget: false };
			});
		},
	});

	const cachedDirection = localStorage.getItem('direction');

	useEffect(() => {
		if (cachedDirection !== null) {
			if (cachedDirection === 'rtl') {
				i18n.changeLanguage('ar');
			} else {
				i18n.changeLanguage('en');
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cachedDirection]);



	const AuthPath = localStorage.getItem("AuthPath")


	useEffect(() => {
		if (AuthPath !== null) {
			NavigateTo(AuthPath)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div dir={direction} className="h-screen w-screen">
				<div className=" static sm:relative h-full flex justify-center items-center lg:p-2">
					<div className="absolute  end-6 top-6  ">
						<BtnToggleLang />
					</div>

					<div className=" w-full lg:w-[50%]  h-full  flex items-center justify-center">
						<form
							className="flex flex-col bg-white p-8 sm:rounded-2xl  h-full justify-around items-center bg-HomePageBgImage bg-cover bg-center bg-no-repeat relative   w-full sm:w-[400px] sm:h-auto sm:gap-y-20  "
							onSubmit={ForgetPassFormik.handleSubmit}
						>
							<div className="absolute end-6 top-6 sm:hidden">
								<BtnToggleLang />
							</div>

							{!requestSent ? (
								<>
									<div className="title-content flex flex-col justify-center items-center gap-y-2">
										<h1 className="text-mainColor font-semibold text-center text-nowrap text-[35px] sm:text-[40px] ">
											{t('forget.header')}
										</h1>
										<p className="text-center font-normal text-size_12  text-[#9CA3AF]">
											{t('forget.p')}
										</p>
									</div>

									<div className="  flex flex-col justify-center items-center  gap-y-2 w-full">
										<div className="w-full ">
											<div className="emailOrCode flex flex-col w-full gap-y-1">
												<label
													htmlFor="emailOrCode"
													className="text-mainColor w-full text-start font-semibold  text-sm relative"
												>
													{t('ForgetPass.email')}{' '}
												</label>
												<input
													value={ForgetPassFormik.values.emailOrCode}
													onChange={(e) => {
														ForgetPassFormik.handleChange(e);
													}}
													onBlur={ForgetPassFormik.handleBlur}
													placeholder={t('register.emialPlaceholder')}
													className={` py-2  px-6 ${ForgetPassFormik.errors.emailOrCode &&
														ForgetPassFormik.touched.emailOrCode
														? ' border-[#E4363DE8] placeholder:text-[#E4363DE8]'
														: 'border-[#BDC4CD]'
														} outline-none  focus:outline-none text-start border-[1px] rounded-xl placeholder:text-slate-400  placeholder:text-size_12 
                              
                               text-size_12 placeholder:text-start`}
													type="text"
													id="emailOrCode"
													name="emailOrCode"
												/>
												{ForgetPassFormik.errors.emailOrCode &&
													ForgetPassFormik.touched.emailOrCode ? (
													<div className="flex items-center gap-x-2">
														<span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
														<p className="text-[#E4363DE8]   text-sm ">
															{ForgetPassFormik.errors.emailOrCode}
														</p>
													</div>
												) : null}
											</div>
										</div>
									</div>

									<div className="flex flex-col  justify-center items-center w-full ">
										<button
											type="submit"
											disabled={
												ForgetPassFormik.values.emailOrCode === ''
													? true
													: ForgetPassFormik.dirty && !ForgetPassFormik.isValid
											}
											className={`text-white flex justify-center items-center ${ForgetPassFormik.dirty && ForgetPassFormik.isValid
												? 'bg-mainColor'
												: 'bg-[#023e8a96]'
												} font-bold w-full py-3  rounded-2xl text-sm  focus:outline-none`}
										>
											{AuthLoading.forget ? (
												<div
													className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
												></div>
											) : (
												t('forget.sendcode')
											)}
										</button>

										<div className="my-2 cursor-pointer  text-center">
											<p className=" text-sm ">
												{t('forget.acc')}
												<Link
													to={'/signup'}
													className="text-mainColor underline hover:no-underline"
												>
													{t('verify.login')}
												</Link>{' '}
											</p>
										</div>
									</div>
								</>
							) : (
								<>
									<div className="title-content  flex flex-col justify-center sm:mt-8 items-center sm:pt-5 gap-y-4">
										<span className="bg-[#D1FADF] rounded-full p-4">
											<img src={CorrectSign} className="" alt="" />
										</span>

										<h1 className="text-mainColor font-semibold text-[40px]  text-nowrap text-center">
											{t('forget.link')}
										</h1>
										<p className=" text-center font-normal text-size_12  text-[#9CA3AF]">
											{t('forget.conf')}
										</p>

										<span className="text-mainColor font-semibold">
											{forgetPassEmail}
										</span>
									</div>
									<div className="flex flex-col justify-center items-center w-full">
										<button
											type="submit"
											// onClick={ForgetPassFormik.submitForm}
											className="text-white  flex justify-center items-center bg-mainColor hover:bg-secondMainColor font-bold w-full  rounded-2xl   py-3   text-sm  focus:outline-none"
										>
											{AuthLoading.forget ? (
												<div
													className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
												></div>
											) : (
												t('forget.resend')
											)}
										</button>
										<div className="my-2 cursor-pointer text-size_12 text-center">
											<p>
												{' '}
												{t('forget.acc')}
												<Link
													to={'/signup'}
													className="text-mainColor underline hover:no-underline"
												>
													{t('verify.login')}
												</Link>{' '}
											</p>
										</div>
									</div>
								</>
							)}
						</form>
					</div>

					<div className="hidden lg:flex  justify-center items-center w-[50%]  h-full">
						<img
							src={!requestSent ? ForgetPassImage : ForgetPassImage2}
							className=""
							alt="forget-password"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
