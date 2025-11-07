import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MainContext } from '../../Context/MainContext';
import x from '../../assets/sanadSVG/Multiply.svg';
import eyePassRed from '../../assets/sanadSVG/eyeRed.svg';
import eyePassBlue from '../../assets/sanadSVG/eyeBlue.svg';
import axios from 'axios';
import * as Yup from 'yup';
import { ReactSVG } from 'react-svg';
import { useContext, useState } from 'react';
import { BASE_URL } from '../../Soursre';
import { ApisContext } from '../../Context/ApisContext';
import { useFormik } from 'formik';

export default function ChangePassword() {
	let [t] = useTranslation();

	const { Toggler, setToggler, ErorrMessage, direction } =
		useContext(MainContext);
	const { headers } = useContext(ApisContext);
	const [showPassword, setShowPassword] = useState({
		old: false,
		pass: false,
		repass: false,
	});

	function close() {
		setToggler({ ...Toggler, changePass: false });
	}

	const ResetPassValidation = Yup.object({
		oldPassword: Yup.string()
			.required()
			.matches(/^(?=\S*[\d])(?=\S*[$!@%&_])\S{8,30}$/),
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

	const [loading, setloading] = useState(false);
	const ResetPassFormik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: ResetPassValidation,
		onSubmit: async (values, { resetForm }) => {
			try {
				setloading(true);

				const res = await axios.patch(
					`${BASE_URL}center-users/auth/change-pass`,
					values,
					{ headers: headers }
				);

				if (res.status === 200 || res.data.status === 'success') {
					ErorrMessage(t('Errors.done2'), 'success');
					setToggler({ ...Toggler, changePass: false });
					resetForm();
				}
			} catch (error) {
				switch (error.response.data.message) {
					case 'old password is incorrect':
						ErorrMessage(t('Errors.inCorrectpass'), 'error');

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
			} finally {
				setloading(false);
			}
		},
	});

	function handleClasses(formikError, touched) {
		if (formikError && touched) {
			return 'border-[#E4363DE8] placeholder:text-[#E4363DE8] text-err border-[1px]';
		} else {
			return 'border-[1px] border-textGray  placeholder:text-textGray text-mainColor';
		}
	}
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.changePass}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, changePass: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('homepage.changePass')}
									</h3>
								</div>
							</DialogTitle>
							{/* content */}

							<form
								onSubmit={ResetPassFormik.handleSubmit}
								className="flex flex-col gap-y-3 my-3"
							>
								<div className="password flex flex-col w-full gap-y-2">
									<label
										htmlFor="old"
										className="text-mainColor w-full text-start font-semibold text-xs md:text-sm"
									>
										{t('ResetPass.old')}
									</label>

									<div className="relative">
										<input
											value={ResetPassFormik.values.oldPassword}
											onChange={(e) => {
												ResetPassFormik.handleChange(e);
											}}
											onBlur={ResetPassFormik.handleBlur}
											placeholder={t('ResetPass.old')}
											className={`py-3 w-full px-6 ${handleClasses(ResetPassFormik.errors?.oldPassword, ResetPassFormik.touched?.oldPassword)} outline-none focus:outline-none placeholder-text-slate-300 text-start border-[1px] rounded-xl   placeholder:text-xs  placeholder:text-start  text-xs`}
											type={`${showPassword.old ? 'text' : 'password'}`}
											id="old"
											name="oldPassword"
										/>
										<span
											onClick={() => {
												setShowPassword((prev) => {
													return { ...prev, old: !prev.old };
												});
											}}
											className="absolute  end-4 cursor-pointer lg:end-5 top-[50%] translate-y-[-50%]"
										>
											{ResetPassFormik.errors.oldPassword &&
											ResetPassFormik.touched.oldPassword ? (
												<ReactSVG src={eyePassRed} />
											) : (
												<ReactSVG src={eyePassBlue} />
											)}
										</span>
									</div>
									{/* {ResetPassFormik.errors.newPassword &&
                                        ResetPassFormik.touched.newPassword ? (
                                        <div className="flex items-center gap-x-2 ">
                                            <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                            <p className="text-[#E4363DE8]  text-sm  ">
                                                {ResetPassFormik.errors.newPassword}
                                            </p>
                                        </div>
                                    ) : null} */}
								</div>
								<div className="password flex flex-col w-full gap-y-2">
									<label
										htmlFor="newPassword"
										className="text-mainColor w-full text-start font-semibold text-xs md:text-sm"
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
											className={`py-3 w-full px-6 ${handleClasses(ResetPassFormik.errors?.newPassword, ResetPassFormik.touched?.newPassword)} outline-none focus:outline-none placeholder-text-slate-300 text-start border-[1px] rounded-xl   placeholder:text-xs  placeholder:text-start  text-xs`}
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
											) : (
												<ReactSVG src={eyePassBlue} />
											)}
										</span>
									</div>
									{/* {ResetPassFormik.errors.newPassword &&
                                        ResetPassFormik.touched.newPassword ? (
                                        <div className="flex items-center gap-x-2 ">
                                            <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                            <p className="text-[#E4363DE8]  text-sm  ">
                                                {ResetPassFormik.errors.newPassword}
                                            </p>
                                        </div>
                                    ) : null} */}
								</div>

								<div className="confirmNewPassword  flex flex-col w-full gap-y-2">
									<label
										htmlFor="confirmNewPassword"
										className="text-mainColor  w-full text-start font-semibold text-xs md:text-sm"
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
											className={`py-3 w-full px-6 ${handleClasses(ResetPassFormik.errors?.confirmNewPassword, ResetPassFormik.touched?.confirmNewPassword)} outline-none focus:outline-none placeholder-text-slate-300 text-start border-[1px] rounded-xl   placeholder:text-xs  placeholder:text-start  text-xs`}
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
											) : (
												<ReactSVG src={eyePassBlue} />
											)}
										</span>
									</div>

									{/* {ResetPassFormik.errors.confirmNewPassword &&
                                        ResetPassFormik.touched.confirmNewPassword ? (
                                        <div className="flex items-center gap-x-2 ">
                                            <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                            <p className="text-[#E4363DE8]  text-sm ">
                                                {ResetPassFormik.errors.confirmNewPassword}
                                            </p>
                                        </div>
                                    ) : null} */}
								</div>

								<div className="formBtns mt-2  flex flex-row gap-x-3 justify-center items-center">
									<button
										disabled={
											!(ResetPassFormik.isValid && ResetPassFormik.dirty)
										}
										type="submit"
										className={`text-white ${!(ResetPassFormik.isValid && ResetPassFormik.dirty) ? 'bg-secondMainColor' : 'bg-mainColor'}  text-center rounded-2xl px-10 py-2  w-full md:w-1/2 text-lg`}
									>
										{loading ? (
											<div
												className={`w-6 h-6 border-t-4 border-white border-solid mx-auto rounded-full animate-spin block`}
											></div>
										) : (
											t('PopupWindows.confirm')
										)}
									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, changePass: false };
											});
										}}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-2  w-full md:w-1/2 text-lg"
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
