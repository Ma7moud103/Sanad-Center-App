import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpImg from '../../assets/Login/Code submit.png';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import BtnToggleLang from '../../Components/SideMenu/BtnToggleLang';
import { MainContext } from '../../Context/MainContext';
import { BASE_URL } from '../../Soursre';

export default function VerificationCode() {
	let { t, i18n } = useTranslation();
	const navigate = useNavigate();

	const {
		email,
		ErorrMessage,
		setstep,
		AuthLoading,
		setAuthLoading,
		direction,
	} = useContext(MainContext);

	const storedEmail = JSON.parse(localStorage.getItem('ver-email'));


	// Define the validation schema using Yup
	const validationSchema = Yup.object({
		otp: Yup.string()
			.matches(/^\d{4}$/, t('verify.inputMatch'))
			.required(t('verify.inputReq')),
	});
	const formik = useFormik({
		initialValues: {
			email: email ? email : storedEmail, // Use the retrieved email from local storage (but this for testing)
			otp: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				setAuthLoading((prev) => {
					return { ...prev, verifyEmail: true };
				});
				const response = await axios.patch(
					`${BASE_URL}center-users/auth/verify-otp`,
					values
				);

				if (response.status === 200) {
					setAuthLoading((prev) => {
						return { ...prev, verifyEmail: true };
					});
					ErorrMessage(t('Errors.done'), 'success');
					localStorage.setItem('step', 1);
					setstep(1);
					navigate('/signup');
					localStorage.removeItem("AuthPath")

				}

				setAuthLoading((prev) => {
					return { ...prev, verifyEmail: false };
				});
			} catch (error) {
				setAuthLoading((prev) => {
					return { ...prev, verifyEmail: false };
				});
				if (error.response.data.message === 'incorrect OTP') {
					ErorrMessage(t('Errors.codeWrong'), 'error');
				} else if (error.response.data.message === 'user already verified') {
					ErorrMessage(t('Errors.alreadyverify'), 'success');
					localStorage.setItem('step', 1);
					setstep(1);
					navigate('/signup');


				} else if (
					error.response.data.message ===
					'Maximum OTP attempts reached. User is suspended for 1 hour.'
				) {
					ErorrMessage(t('Errors.try'), 'error');
				} else if (error.response.data.message === 'user is suspended') {
					console.log(error.response.data.suspendedUntil);
					let suspendedDate = new Date(error.response.data.suspendedUntil);
					let currentDate = new Date();
					let waitFor = suspendedDate - currentDate;
					ErorrMessage(
						`${t('Errors.tyr2')} ${parseInt(waitFor / 1000 / 60)} m `,
						'error'
					);
				} else {
					ErorrMessage(error.response.data.message, 'error');
				}
			}
			setAuthLoading((prev) => {
				return { ...prev, verifyEmail: false };
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

	async function ResendOtp() {
		return await axios
			.patch(`${BASE_URL}center-users/auth/resend-otp`, {
				email: email ? email : storedEmail,
			})
			.then((data) => {
				console.log(data);
				if (data.status === 200) {
					ErorrMessage(t('Errors.verify2'), 'success');

				}
			})
			.catch((erorr) => {
				console.log(erorr);
				if (erorr.response.data.message === 'user is suspended') {
					let suspendedDate = new Date(erorr.response.data.suspendedUntil);
					let currentDate = new Date();
					let waitFor = suspendedDate - currentDate;
					ErorrMessage(
						`${t('Errors.tyr2')} ${parseInt(waitFor / 1000 / 60)}m `,
						'error'
					);
				} else if ((erorr.response.data.message = 'user already verified')) {
					ErorrMessage(t('Errors.alreadyverify'), 'error');
					localStorage.removeItem("AuthPath")
					localStorage.setItem('step', 1);
					setstep(1);
					navigate('/signup');



				} else {
					ErorrMessage(erorr.response.data.message, "error");
				}
			});
	}



	const AuthPath = localStorage.getItem("AuthPath")



	useEffect(() => {
		if (AuthPath !== null) {
			navigate(AuthPath)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div dir={direction} className="h-screen w-screen">
				<div className="static sm:relative h-full flex justify-center items-center lg:p-2">
					<div className="absolute  end-6 top-6  ">
						<BtnToggleLang />
					</div>

					<div className="  w-full xl:w-[50%]  h-full  flex items-center justify-center">
						<form
							onSubmit={formik.handleSubmit}
							className="flex flex-col bg-white p-8 sm:rounded-2xl  h-full justify-around items-center bg-HomePageBgImage bg-cover bg-center bg-no-repeat relative   w-full sm:w-[400px] sm:h-auto sm:gap-y-14  "
						>
							<div className="absolute end-6 top-6 sm:hidden ">
								<BtnToggleLang />
							</div>

							<div className="title-content flex flex-col justify-center sm:mt-8 items-center gap-y-">
								<h1 className="text-mainColor font-semibold text-[38px] sm:text-[40px]  text-nowrap">
									{t('verify.header')}
								</h1>
								<p className=" text-center font-normal text-size_12 text-[#9CA3AF]">
									{t('verify.p')}
									<span className="text-mainColor font-bold text-sm sm:text-base">
										{email ? email : storedEmail}
									</span>{' '}
								</p>
							</div>

							<div className="flex flex-col justify-center items-center  gap-y-4 w-full">
								<div className="full-name flex flex-col w-full gap-y-2">
									<label
										htmlFor="otp"
										className="text-mainColor w-full text-start font-semibold text-sm relative"
									>
										{t('verify.label')}
									</label>
									<input
										placeholder={t('verify.inputPlace')}
										className={` px-6  border-[#BDC4CD] outline-none focus:border-mainColor focus:outline-none text-start border-[1px] rounded-xl sm:py-3  placeholder:text-sm text-sm placeholder:text-start
                    ${formik.errors.otp && formik.touched.otp
												? 'border-[#E4363DE8] placeholder:text-[#E4363DE8]'
												: 'border-[#BDC4CD]'
											}`}
										type="text"
										id="otp"
										name="otp"
										value={formik.values.otp}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{/* {formik.errors.otp && formik.touched.otp && (
                    <div className="w-full bg-red-200 capitalize py-2 px-3 rounded-xl my-3 text-textColor__2">
                      {formik.errors.otp}
                    </div>
                  )} */}

									{formik.errors.otp && formik.touched.otp ? (
										<div className="flex items-center gap-x-2 ">
											<span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
											<p className="text-[#E4363DE8]  text-sm  ">
												{formik.errors.otp}
											</p>
										</div>
									) : null}
								</div>
								<div
									onClick={() => {
										ResendOtp();
									}}
									className="w-full text-end text-secondMainColor mt-12 text-sm font-bold cursor-pointer"
								>
									{t('verify.reSendCode')}
								</div>
							</div>

							<div className="buttons flex flex-col justify-center items-center w-full sm:mb-8 ">
								<button
									type="submit"
									className={`text-white flex justify-center items-center ${formik.isValid ? 'bg-mainColor' : 'bg-[#023e8a96]'
										} font-bold w-full rounded-2xl     py-3 text-size_14  text-sm  focus:outline-none`}
								>
									{AuthLoading.verifyEmail ? (
										<div
											className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
										></div>
									) : (
										t('verify.check')
									)}{' '}
								</button>
								<div className="my-2 cursor-pointer text-center text-size__14 ">
									<p>
										{t('verify.Acc')}
										<Link
											onClick={() => localStorage.removeItem("AuthPath")}
											to={'/login'}
											className="text-mainColor underline hover:no-underline"
										>
											{t('verify.login')}
										</Link>{' '}
									</p>
								</div>
							</div>
						</form>
					</div>
					<div className="hidden xl:flex  justify-center items-center w-[40%]  h-full">
						<img src={SignUpImg} alt="signup" className="" />
					</div>
				</div>
			</div>
		</>
	);
}
