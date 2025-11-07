import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import LoginImage from '../../assets/Login/form1.svg';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import BtnToggleLang from '../../Components/SideMenu/BtnToggleLang';
import { BASE_URL } from '../../Soursre';
import eyePassBlue from '../../assets/sanadSVG/eyeBlue.svg';
import eyePassRed from '../../assets/sanadSVG/eyeRed.svg';
import { ReactSVG } from 'react-svg';

export default function Login() {

	let now = new Date();
	let time = new Date(now);
	time.setDate(now.getDate() + 1);

	const {
		setstep,
		setRole,
		ErorrMessage,
		direction,
		AuthLoading,
		setAuthLoading,
		setemail,
	} = useContext(MainContext);

	let { t, i18n } = useTranslation();
	const navigate = useNavigate();
	let Cookie = new Cookies();
	const [showPassword, setShowPassword] = useState(false);
	const [remember, setremember] = useState(false);

	function SaveTokenWithExpire(response) {
		Cookie.set('userToken', response.data.token, {
			path: '/homepage',
			expires: time,
			secure: true
		});
		Cookie.set('userDetails', response.data.data, {
			path: '/homepage',
			expires: time,
			secure: true

		});

		Cookie.set('userToken', response.data.token, {
			path: '/',
			expires: time,
			secure: true

		});
		Cookie.set('userDetails', response.data.data, {
			path: '/',
			expires: time,
			secure: true

		});
	}
	function SaveTokenWithoutExpir(response) {
		Cookie.set('userToken', response.data.token, { path: '/homepage', secure: true });
		Cookie.set('userDetails', response.data.data, {
			path: '/homepage',
			secure: true
		});
		Cookie.set('userToken', response.data.token, { path: '/', secure: true });
		Cookie.set('userDetails', response.data.data, {
			path: '/',
			secure: true
		});
	}

	const LoginValidation = Yup.object({
		emailOrCode: Yup.string()
			.required(t('Login.emailErorrRequired'))
			.matches(
				/(^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$)|(^CO[0-9]{5}$)|(^CA[0-9]{6}$)/,
				t('Login.emailErorrMatches')
			),

		password: Yup.string()
			.required(t('Login.passwordErorrRequired'))
			.matches(
				/(^(?=\S*[\d])(?=\S*[$!@%&_])\S{8,30}$)|(^[A-Za-z0-9_-]{8}$)/,
				t('register.passwordMatch')
			),
	});

	const LoginFormik = useFormik({
		initialValues: {
			emailOrCode: '',
			password: '',
		},
		validationSchema: LoginValidation,

		onSubmit: async (values) => {
			try {
				setAuthLoading((prev) => {
					return { ...prev, login: true };
				});

				const response = await axios.post(
					`${BASE_URL}center-users/auth/login`,
					values
				);

				if (
					response.data.status === 'success' ||
					response.status === 200 ||
					response.status === 201
				) {
					if (remember === false) {
						SaveTokenWithExpire(response);
					} else if (remember === true) {
						SaveTokenWithoutExpir(response);
					}

					setRole(response.data.data.role);
					ErorrMessage(t('Errors.success'), 'success');
					navigate('/');
					setAuthLoading((prev) => {
						return { ...prev, login: false };
					});
				}
			} catch (error) {
				console.log(error);

				setAuthLoading((prev) => {
					return { ...prev, login: false };
				});

				switch (error.response.data.message) {
					case 'registeration data is incomplete':
						ErorrMessage(t('Errors.complate'), 'error');
						setemail(values.emailOrCode);

						localStorage.setItem('step', 1);
						setstep(1);
						navigate('/signup');



						break;
					case 'user is not verified, check your email':
						setemail(values.emailOrCode);
						localStorage.setItem(
							'ver-email',
							JSON.stringify(values.emailOrCode)
						);
						ErorrMessage(t('Errors.verify2'), 'success');
						navigate('/verify');
						localStorage.setItem("AuthPath", "/verify")

						break;
					case 'email or code not found':
						ErorrMessage(t('Errors.notfound'), 'error');
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
			}
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
			<div dir={direction} className="h-screen w-screen">
				<div className=" static sm:relative h-full flex justify-center items-center lg:p-2 overflow-hidden">
					<div className="absolute  end-6 top-6 ">
						<BtnToggleLang />
					</div>

					<div className=" w-full xl:w-[50%]  h-full  flex items-center justify-center">
						<form
							className="flex flex-col bg-white p-8 sm:rounded-2xl  h-full justify-around items-center bg-HomePageBgImage bg-cover bg-center bg-no-repeat relative   w-full sm:w-[400px] sm:h-auto sm:gap-y-14   "
							onSubmit={LoginFormik.handleSubmit}
						>
							<div className="absolute end-6 top-6 sm:hidden ">
								<BtnToggleLang />
							</div>

							<div className="title-content flex flex-col justify-center sm:mt-8 items-center gap-y-4">
								<h1 className=" text-mainColor font-semibold text-[35px] sm:text-5xl  text-nowrap text-center">
									{t('Login.welcomeMessage')}
								</h1>
								<p className=" text-center font-normal text-size_12    text-[#9CA3AF]">
									{t('Login.welcomeMessage2')}
								</p>
							</div>

							<div className=" inputs  flex flex-col justify-center items-center  gap-y-4 w-full">
								<div className="email or code flex flex-col w-full">
									<div className="emailOrCode flex flex-col w-full gap-y-2">
										<label
											htmlFor="emailOrCode"
											className={`text-mainColor w-full text-start font-semibold text-size_12 relative`}
										>
											{t('Login.emailOrCode')}
										</label>
										<input
											className={` placeholder:text-size_12 text-size_12  ${LoginFormik.errors.emailOrCode &&
												LoginFormik.touched.emailOrCode
												? ' border-[#E4363DE8] placeholder:text-[#E4363DE8]'
												: 'border-[#BDC4CD]'
												} outline-none  focus:outline-none text-start border-[1px]   rounded-xl py-2   px 6 placeholder:text-start`}
											value={LoginFormik.values.emailOrCode}
											onChange={(e) => {
												LoginFormik.handleChange(e);
											}}
											onBlur={LoginFormik.handleBlur}
											placeholder={t('Login.emailPlaceholder')}
											type="text"
											id="emailOrCode"
											name="emailOrCode"
											autoComplete="emailOrCode"
											required
										/>

										{LoginFormik.errors.emailOrCode &&
											LoginFormik.touched.emailOrCode ? (
											<div className="flex items-center gap-x-2  mb-3">
												<span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
												<p className="text-[#E4363DE8]  text-size_12   ">
													{LoginFormik.errors.emailOrCode}
												</p>
											</div>
										) : null}
									</div>
								</div>

								<div className="pass flex flex-col w-full gap-y-2">
									<label
										htmlFor="password"
										className="text-mainColor w-full text-start font-semibold text-size_12 relative"
									>
										{t('Login.password')}
									</label>

									<div className=" relative">
										<input
											className={` px-6 ${LoginFormik.errors.password &&
												LoginFormik.touched.password
												? ' border-[#E4363DE8] placeholder:text-[#E4363DE8]'
												: 'border-[#BDC4CD]'
												} outline-none focus:outline-none placeholder:text-size_12 text-size_12 text-start border-[1px] rounded-xl  placeholder:text-start w-full py-2`}
											value={LoginFormik.values.password}
											onChange={(e) => {
												LoginFormik.handleChange(e);
											}}
											onBlur={LoginFormik.handleBlur}
											placeholder={t('Login.passwordPlaceholder')}
											type={`${showPassword ? 'text' : 'password'}`}
											id="password"
											name="password"
											autoComplete="password"
											required
										/>

										<div
											className="absolute cursor-pointer top-[50%] translate-y-[-50%] end-4 "
											onClick={() => {
												setShowPassword((prev) => !prev);
											}}
										>
											{LoginFormik.errors.password &&
												LoginFormik.touched.password ? (
												<ReactSVG src={eyePassRed} />
											) : (
												<ReactSVG src={eyePassBlue} />
											)}
										</div>
									</div>

									{LoginFormik.errors.password &&
										LoginFormik.touched.password ? (
										<div className="flex items-center gap-x-2  mb-3">
											<span className="w-[5px] h-[5px] bg-[#E4363DE8] text-[#E4363DE8]"></span>
											<p className="text-[#E4363DE8] text-size_12   ">
												{LoginFormik.errors.password}
											</p>
										</div>
									) : null}

									{/* remember me */}

									<div className="rememberMe  cursor-pointer remember-me flex items-center justify-between">
										<div className="checkbox flex items-center cursor-pointer">
											<input
												className="mx-1 outline-mainColor focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg w-[20px] h-[20px] text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none cursor-pointer"
												id="remember"
												type="checkbox"
												onChange={(e) => {
													setremember((prev) => !prev);
												}}
											/>
											<label
												htmlFor="remember"
												className="text-mainColor font-semibold text-xs sm:text-sm "
											>
												{t('Login.rememberMe')}
											</label>
										</div>
										<Link
											to="/forget-password"
											className="text-mainColor hover:underline font-semibold text-size_12 sm:text-size__14"
										>
											{t('Login.forgetPassword')}
										</Link>
									</div>
								</div>
							</div>

							<div className=" buttons flex flex-col justify-center items-center w-full sm:mb-8 my-1   ">
								<button
									type="submit"
									// disabled={!LoginFormik.dirty}
									disabled={!(LoginFormik.dirty && LoginFormik.isValid)}
									className={`text-white flex justify-center items-center
                      ${!(LoginFormik.dirty && LoginFormik.isValid)
											? ' bg-secondMainColor'
											: 'bg-mainColor'
										} font-bold w-full text-size_14 py-3   rounded-2xl  focus:outline-none`}
								>
									{AuthLoading.login ? (
										<div
											className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
										></div>
									) : (
										t('Login.login')
									)}
								</button>

								<div className="my-2 cursor-pointer text-center text-size__14 ">
									<p>
										{t('Login.noAccount')}
										<Link
											to={'/signup'}
											className="text-mainColor underline hover:no-underline text-size__14 "
										>
											{t('Login.signUpNow')}
										</Link>{' '}
									</p>
								</div>
							</div>
						</form>
					</div>

					<div className="hidden lg:flex  justify-center items-center w-[50%]  h-full">
						<ReactSVG src={LoginImage} />
					</div>
				</div>
			</div>
		</>
	);
}
