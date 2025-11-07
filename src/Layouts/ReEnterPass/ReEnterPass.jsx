import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import ResetPassImage from '../../assets/Login/ReEnter Password Graphic.png';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../Context/MainContext';
import eyePassRed from '../../assets/sanadSVG/eyeRed.svg';
import eyePassBlue from '../../assets/sanadSVG/eyeBlue.svg';
import eyePassGray from '../../assets/sanadSVG/eyeBlue.svg';
import { ReactSVG } from 'react-svg';
import BtnToggleLang from '../../Components/SideMenu/BtnToggleLang';

export default function ResetPass() {
	const { ErorrMessage, AuthLoading, setAuthLoading, direction } =
		useContext(MainContext);
	const [showPassword, setShowPassword] = useState({
		pass: false,
		repass: false,
	});
	// const [isLoading, setIsLoading] = useState(false); // Loading spinner in the submit button
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get('token');
	const id = searchParams.get('id');
	let { t, i18n } = useTranslation();

	const ResetPassValidation = Yup.object({
		newPassword: Yup.string()
			.required(t('Login.passwordErorrRequired'))
			.matches(
				/^(?=\S*[\d])(?=\S*[$!@%&_])\S{8,30}$/,
				t('Login.passwordMatches')
			),
		confirmNewPassword: Yup.string()
			.oneOf([Yup.ref('newPassword')], t('register.confirmPasswordMatch'))
			.required(t('register.requiredRepassword')),
	});
	//https://sanadedu.azurewebsites.net/api/v1//tutors/auth/reset-pass

	const ResetPassFormik = useFormik({
		initialValues: {
			token: token || '',
			id: id || '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: ResetPassValidation,
		onSubmit: async (values) => {
			try {
				setAuthLoading((prev) => {
					return { ...prev, reset: true };
				});
				// const res = await axios.patch(
				// 	`${BASE_URL}center-users/auth/reset-pass`,
				// 	values
				// );

				ErorrMessage(t('Errors.done2'), 'success');
				navigate('/login');

			} catch (error) {
				switch (error.response.data.message) {
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
			}
			setAuthLoading((prev) => {
				return { ...prev, reset: false };
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
			navigate(AuthPath)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<div dir={direction} className="w-screen h-screen">
				<div className="static flex items-center justify-center h-full sm:relative lg:p-2">
					<div className="absolute end-6 top-6 ">
						<BtnToggleLang />
					</div>

					<div className=" w-full xl:w-[50%]  h-full  flex items-center justify-center">
						<form
							onSubmit={ResetPassFormik.handleSubmit}
							className="flex flex-col bg-white p-8 sm:rounded-2xl  h-full justify-around items-center bg-HomePageBgImage bg-cover bg-center bg-no-repeat relative   w-full sm:w-[400px] sm:h-auto sm:gap-y-14 "
						>
							<div className="absolute end-6 top-6 sm:hidden ">
								<BtnToggleLang />
							</div>

							<div className="flex flex-col items-center justify-center title-content sm:mt-8 gap-y-4">
								<h1 className="text-mainColor font-semibold text-[38px]  text-nowrap text-center ">
									{t('ResetPass.newPassword')}
								</h1>
								<p className="text-center font-normal text-size_12 sm:text-sm  text-[#9CA3AF]">
									{t('ResetPass.p')}
								</p>
							</div>

							<div className="flex flex-col items-center justify-center w-full inputs gap-y-4">
								<div className="flex flex-col w-full password gap-y-2">
									<label
										htmlFor="newPassword"
										className="w-full text-sm font-semibold text-mainColor text-start"
									>
										{t('ResetPass.newPasswordPlaceholder')}
									</label>

									<div className="relative">
										<input
											value={ResetPassFormik.values.newPassword}
											onChange={(e) => {
												ResetPassFormik.handleChange(e);
											}}
											onBlur={ResetPassFormik.handleBlur}
											placeholder={t('ResetPass.newPasswordPlaceholder')}
											className={`py-2 w-full px-6 ${ResetPassFormik.errors.newPassword &&
												ResetPassFormik.touched.newPassword
												? ' border-[#E4363DE8] placeholder:text-[#E4363DE8]'
												: 'border-[#BDC4CD] text-mainColor font-bold'
												} outline-none focus:outline-none placeholder-text-slate-300 text-start border-[1px] rounded-xl text-sm  placeholder:text-size_12  placeholder:text-start`}
											type={`${showPassword.pass ? 'text' : 'password'}`}
											id="newPassword"
											name="newPassword"
										/>
										<span
											onClick={() => {
												setShowPassword((prev) => {
													return { ...prev, pass: !prev.pass };
												});
											}}
											className="absolute  end-4 cursor-pointer lg:end-5 top-[50%] translate-y-[-50%]"
										>
											{ResetPassFormik.errors.newPassword &&
												ResetPassFormik.touched.newPassword ? (

												<ReactSVG src={eyePassRed} />
											) : ResetPassFormik.values.newPassword !== '' ? (
												<ReactSVG src={eyePassBlue} />
											) : (
												<ReactSVG src={eyePassGray} />
											)}
										</span>
									</div>
									{ResetPassFormik.errors.newPassword &&
										ResetPassFormik.touched.newPassword ? (
										<div className="flex items-center gap-x-2 ">
											<span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
											<p className="text-[#E4363DE8]  text-sm  ">
												{ResetPassFormik.errors.newPassword}
											</p>
										</div>
									) : null}
								</div>

								<div className="flex flex-col w-full confirmNewPassword gap-y-2">
									<label
										htmlFor="confirmNewPassword"
										className="w-full text-sm font-semibold text-mainColor text-start"
									>
										{t('ResetPass.newRePassword')}
									</label>
									<div className="relative">
										<input
											value={ResetPassFormik.values.confirmNewPassword}
											onChange={(e) => {
												ResetPassFormik.handleChange(e);
											}}
											onBlur={ResetPassFormik.handleBlur}
											placeholder={t('ResetPass.newRePasswordPlaceholder')}
											className={`py-2   w-full px-6 ${ResetPassFormik.errors.confirmNewPassword &&
												ResetPassFormik.touched.confirmNewPassword
												? ' border-[#E4363DE8] placeholder:text-[#E4363DE8]'
												: 'border-[#BDC4CD] text-mainColor font-bold'
												} outline-none focus:outline-none text-start border-[1px] rounded-xl text-sm  placeholder:text-size_12 placeholder:text-start`}
											type={`${showPassword.repass ? 'text' : 'password'}`}
											id="confirmNewPassword"
											name="confirmNewPassword"
										/>

										<span
											onClick={() => {
												setShowPassword((prev) => {
													return { ...prev, repass: !prev.repass };
												});
											}}
											className="absolute  end-4 cursor-pointer lg:end-5 top-[50%] translate-y-[-50%]"
										>
											{ResetPassFormik.errors.confirmNewPassword &&
												ResetPassFormik.touched.confirmNewPassword ? (

												<ReactSVG src={eyePassRed} />
											) : ResetPassFormik.values.confirmNewPassword !== '' ? (
												<ReactSVG src={eyePassBlue} />
											) : (
												<ReactSVG src={eyePassGray} />
											)}
										</span>
									</div>

									{ResetPassFormik.errors.confirmNewPassword &&
										ResetPassFormik.touched.confirmNewPassword ? (
										<div className="flex items-center gap-x-2 ">
											<span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
											<p className="text-[#E4363DE8]  text-sm ">
												{ResetPassFormik.errors.confirmNewPassword}
											</p>
										</div>
									) : null}
								</div>
							</div>

							<div className="flex flex-col items-center justify-center w-full buttons sm:mb-8">
								<button
									type="submit"
									disabled={
										ResetPassFormik.values.confirmNewPassword &&
											ResetPassFormik.values.newPassword === ''
											? true
											: ResetPassFormik.dirty && !ResetPassFormik.isValid
									}
									className={`text-white flex justify-center items-center ${ResetPassFormik.dirty && ResetPassFormik.isValid
										? 'bg-mainColor'
										: 'bg-[#023e8a96]'
										} font-bold w-full rounded-2xl text-sm  py-3  focus:outline-none`}
								>
									{AuthLoading.reset ? (
										<div
											className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
										></div>
									) : (
										t('register.rePassword')
									)}
								</button>
								<div className="text-center cursor-pointer ">
									<p className="text-sm ">
										{t('forget.acc')}
										<Link
											to={'/signup'}
											className="underline text-mainColor hover:no-underline"
										>
											{t('Login.signUpNow')}
										</Link>{' '}
									</p>
								</div>
							</div>
						</form>
					</div>
					<div className="hidden xl:flex  justify-center items-center w-[50%]  h-full">
						<img src={ResetPassImage} alt="reset-password" />
					</div>
				</div>
			</div>
		</>
	);
}
