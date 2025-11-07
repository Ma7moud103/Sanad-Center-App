import React, { useContext, useEffect, useMemo } from "react";
import SignUpImg1 from "../../assets/Login/form1.svg";
import SignUpImg2 from "../../assets/Login/form2.svg";
import SignUpImg3 from "../../assets/Login/form3.svg";
import SignUpImg4 from "../../assets/Login/form4.svg";
import CorrectSign from "../../assets/Icon/Vector.png";
import { MainContext } from "../../Context/MainContext";

import { useTranslation } from "react-i18next";
import BtnToggleLang from "../../Components/SideMenu/BtnToggleLang";
import Register from "./Register";
import { ReactSVG } from "react-svg";
import Terms from "../../Components/PopupWindows/Terms"

const SignUp = () => {
	let { step, direction } = useContext(MainContext);
	let { t, i18n } = useTranslation();


	const icon = localStorage.getItem("step")



	const cachedDirection = localStorage.getItem('direction');
	useEffect(() => {
		if (cachedDirection !== null) {

			if (cachedDirection === "rtl") {
				i18n.changeLanguage("ar")
			} else {
				i18n.changeLanguage("en")
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cachedDirection])


	const result = useMemo(() => {
		if (icon !== null) {
			return icon
		} else {
			return step
		}
	}, [step, icon])



	return (
		<>
			<div dir={direction} className="flex h-screen w-full m-auto lg:p-auto">
				<div className="flex justify-around items-center  w-full h-full overflow-hidden ">
					<div className="flex justify-center    items-center w-full lg:w-1/2 h-full">
						<div className="z-10 absolute   end-6 top-6  ">
							<BtnToggleLang />
						</div>

						<div className="flex flex-col h-full bg-white p-8 py-6 rounded-2xl justify-center items-center bg-HomePageBgImage bg-cover bg-center bg-no-repeat w-full sm:w-[400px] sm:h-auto static sm:relative  ">
							<div className="title-content text-center flex flex-col justify-center items-center gap-y-2">
								<h4 className=" text-mainColor  font-semibold text-[33px] sm:text-[45px] ">
									{t('Login.welcomeMessage')}
								</h4>
								<p className=" text-center font-normal text-size_12 sm:text-sm  text-[#9CA3AF]">
									{t('register.mainPara')}
								</p>
							</div>

							{icon === 1 && (
								<div className="mt-10  w-full md:px-2 flex justify-between items-center relative before:h-[1px] before:w-1/5 before:bg-[#96A0AD4D] before:right-[22%] before:absolute after:h-[1px] after:w-1/5 after:bg-[#96A0AD4D] after:left-[19%] after:absolute ">
									<div className="w-11 h-11  rounded-full bg-mainColor flex justify-center items-center relative">
										<span className="text-size_22 sm:text-size_26 md:text-2xl text-white text-center">
											1
										</span>
									</div>
									<div
										className=" w-10 h-10  rounded-full bg-[#96A0AD4D]  flex justify-center items-center relative"
										alt=""
									>
										<span className="text-size_22 sm:text-size_26 md:text-2xl  text-white text-center">
											2
										</span>
									</div>
									<div
										className=" w-10 h-10  rounded-full bg-[#96A0AD4D] flex justify-center items-center relative"
										alt=""
									>
										<span className="text-size_22 sm:text-size_26 md:text-2xl text-white text-center">
											3
										</span>
									</div>
								</div>
							)}
							{icon === 2 && (
								<div className="w-full md:px-2  flex justify-between items-center relative before:h-[1px] before:w-1/5 before:bg-[#96A0AD4D] before:right-[19%] before:absolute after:h-[1px] after:w-1/5 after:bg-[#96A0AD4D] after:left-[19%] after:absolute my-8">
									<div className=" w-10 h-10 rounded-full bg-[#96C362] flex justify-center items-center relative">
										<span className="text-size_22 md:text-2xl text-white text-center">
											<img
												src={CorrectSign}
												className="w-4"
												alt="Correct-Sign"
											/>
										</span>
									</div>
									<div
										className="w-11 h-11  rounded-full bg-mainColor flex justify-center items-center relative"
										alt=""
									>
										<span className="text-size_22 md:text-2xl text-white text-center">
											2
										</span>
									</div>
									<div
										className=" w-10 h-10 rounded-full bg-[#96A0AD4D] flex justify-center items-center relative"
										alt=""
									>
										<span className="text-size_22 md:text-2xl text-white text-center">
											3
										</span>
									</div>
								</div>
							)}
							{icon === 3 && (
								<div className="w-full md:px-2  flex justify-between items-center relative before:h-[1px] before:w-1/5 before:bg-[#96A0AD4D] before:right-[19%] before:absolute after:h-[1px] after:w-1/5 after:bg-[#96A0AD4D] after:left-[19%] after:absolute mt-8">
									<div className=" w-10 h-10 rounded-full bg-[#96C362] flex justify-center items-center relative">
										<span className="text-size_22  md:text-2xl text-white text-center">
											<img
												src={CorrectSign}
												className="w-4"
												alt="Correct-Sign"
											/>
										</span>
									</div>
									<div
										className=" w-10 h-10  rounded-full bg-[#96C362] flex justify-center items-center relative"
										alt=""
									>
										<span className="text-size_22  md:text-2xl text-white text-center">
											<img
												src={CorrectSign}
												className="w-4"
												alt="Correct-Sign"
											/>
										</span>
									</div>
									<div
										className=" w-11 h-11 relative z-10 rounded-full bg-mainColor flex justify-center items-center "
										alt=""
									>
										<span className="text-size_22  md:text-2xl text-white text-center">
											3
										</span>
									</div>
								</div>
							)}

							<Register />
						</div>
					</div>

					{result === 0 && (
						<div className="hidden  lg:flex w-1/2 justify-center items-center ">
							<ReactSVG src={SignUpImg1} />
						</div>
					)}

					{result === 1 && (
						<div className="hidden  lg:flex  w-1/2  justify-center items-center">
							<ReactSVG src={SignUpImg2} />
						</div>
					)}

					{result === 2 && (
						<div className="hidden  lg:flex  w-1/2  justify-center items-center">
							<ReactSVG src={SignUpImg3} />
						</div>
					)}

					{result === 3 && (
						<div className="hidden  lg:flex  w-1/2  justify-center items-center">
							<ReactSVG src={SignUpImg4} />
						</div>
					)}
				</div>
			</div>
			<Terms />
		</>
	);
};

export default SignUp;