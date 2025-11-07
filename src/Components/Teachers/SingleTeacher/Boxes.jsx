import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ApisContext } from '../../../Context/ApisContext';
import course from '../../../assets/sanadSVG/singleTeacher.svg';
import phone from '../../../assets/sanadSVG/singleTeacher2.svg';
import { ReactSVG } from 'react-svg';
import { SvgsContext } from '../../../Context/SvgsConetxt';
import { BASUE_IMAGES } from '../../../Soursre';

const Boxes = () => {
	const [t] = useTranslation();
	const { Teacher, fetchSingleTeacher, tens, singleTeacherData } =
		useContext(ApisContext);

	const { profile } = useContext(SvgsContext)

	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-4 ">
			{fetchSingleTeacher.isFetched ? (
				<div className="box w-full xl:w-[50%] min-h-[300px] max-h-[400px] rounded-2xl flex flex-col items-center p-4 gap-y-4  justify-center bg-white">
					<div className="icon rounded-full flex flex-col items-center justify-center">


						{Teacher?.profileImage !== "" ?
							<span className=''>
								<img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${Teacher?.profileImage}`} alt="profileImage" />
							</span>

							: profile(77, 77)}

						<h5 className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold text-center">
							{Teacher?.fullname}
						</h5>
						<p className="text-textGray  xl:text-size__14 2xl:text-base font-normal text-center">
							{Teacher?.email}
						</p>
					</div>
					{/* <h3 className='font-bold block text-center w-full text-mainColor text-xl xl:text-base xl:self-start '>{t("TeacherDetails.teacherData")}</h3> */}

					<div className="flex  justify-between w-full items-center  gap-y-3">
						<div className=" sub flex items-center w-full  gap-x-2 flex-col xl:flex-row ">
							<ReactSVG src={course} />
							<div className="flex flex-col items-center xl:items-start ">
								<p className="text-xs sm:text-sm text-nowrap text-textGray font-semibold">
									{t('Logs.teacherCode')}
								</p>
								<p className="text-xs text-nowrap sm:text-sm  text-secondMainColor font-semibold">
									{Teacher?.code}
								</p>
							</div>
						</div>

						<div className=" sub flex items-center w-full  gap-x-2 flex-col xl:flex-row ">
							<ReactSVG src={phone} />
							<div className="flex flex-col items-center xl:items-start ">
								<p className="text-xs sm:text-sm text-nowrap text-textGray font-semibold">
									{t('register.phoneNumber')}
								</p>
								<p className="text-xs text-nowrap sm:text-sm  text-secondMainColor font-semibold">
									{Teacher?.phoneNumber}
								</p>
							</div>
						</div>

						<div className=" sub flex items-center w-full  gap-x-2 flex-col xl:flex-row ">
							<ReactSVG src={course} />
							<div className="flex flex-col items-center xl:items-start ">
								<p className="text-xs sm:text-sm text-nowrap text-textGray font-semibold">
									{t('Logs.numberOfCourses')}
								</p>
								<p className="text-xs text-nowrap sm:text-sm  text-secondMainColor font-semibold">
									{Teacher?.totalCourses
										? tens.includes(Teacher?.totalCourses)
											? `${Teacher?.totalCourses} ${t('StudentDetails.courses')}`
											: `${Teacher?.totalCourses} ${t('Courses.course')}`
										: singleTeacherData?.totalCourses
											? tens.includes(singleTeacherData?.totalCourses)
												? `${singleTeacherData?.totalCourses} ${t('StudentDetails.courses')}`
												: `${singleTeacherData?.totalCourses} ${t('Courses.course')}`
											: t('homepage.nothing')}
								</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className=" box w-full xl:w-[50%] rounded-2xl flex flex-col items-center p-4 gap-y-4  justify-center bg-white">
					<div className="animate-pulse w-full  flex flex-col items-center justify-center  ">
						<div className="w-full flex justify-center items-center ">
							<div className="rounded-full bg-zinc-300 h-10 w-10"></div>
						</div>

						<div className="flex-1 space-y-2 flex items-center flex-col py-1 w-full">
							<div className="h-2 w-[15%] bg-zinc-300 rounded"></div>
							<div className="h-2 w-[10%] bg-zinc-300 rounded"></div>
						</div>

						<div className="w-full flex items-center justify-between px-3">
							<div className="box w-1/3">
								<div className="flex-1 space-y-2 flex items-center flex-col py-1 w-full">
									<div className="h-2 w-[70%] bg-zinc-300 rounded"></div>
									<div className="h-2 w-[60%] bg-zinc-300 rounded"></div>
								</div>
							</div>
							<div className="box w-1/3">
								<div className="flex-1 space-y-2 flex items-center flex-col py-1 w-full">
									<div className="h-2 w-[70%] bg-zinc-300 rounded"></div>
									<div className="h-2 w-[60%] bg-zinc-300 rounded"></div>
								</div>
							</div>
							<div className="box w-1/3">
								<div className="flex-1 space-y-2 flex items-center flex-col py-1 w-full">
									<div className="h-2 w-[70%] bg-zinc-300 rounded"></div>
									<div className="h-2 w-[60%] bg-zinc-300 rounded"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Boxes;
