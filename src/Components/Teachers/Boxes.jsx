import { useTranslation } from 'react-i18next';

import { memo, useContext } from 'react';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../Skeletons/Post';
import teachers from '../../assets/sanadSVG/teachers.svg';
import courses from '../../assets/sanadSVG/courses.svg';
import { ReactSVG } from 'react-svg';

const Boxes = () => {
	const [t] = useTranslation();
	// const myCookie = new Cookies()
	// const Details = myCookie.get("userDetails")
	// console.log(Details);
	const { selectedCenter, tens, fetchAllCenters } = useContext(ApisContext);

	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">
			<div className="box w-full xl:w-1/2 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center">
				{fetchAllCenters.isFetched ? (
					<>
						<ReactSVG src={teachers} />

						<div className="title">
							<p className=" text-textGray text-size__20  xl:text-lg font-bold">
								{t('Logs.numberOfTeachers')}
							</p>

							<div className="flex items-center text-nowrap">
								<p className="text-mainColor text-lg  xl:text-lg  font-bold">
									{selectedCenter?.tutorsCount > 0
										? tens.includes(selectedCenter?.tutorsCount)
											? `${selectedCenter?.tutorsCount} ${t('Courses.Teachers')}`
											: `${selectedCenter?.tutorsCount} ${t('Courses.teacher')}`
										: t('homepage.nothing')}
								</p>
							</div>
						</div>
					</>
				) : (
					<Post />
				)}
			</div>

			{fetchAllCenters.isFetched ? (
				<div className="box w-full xl:w-1/2     rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light">
					<ReactSVG src={courses} />

					<div className="title text-nowrap">
						<p className=" text-white text-size__20  xl:text-lg font-bold">
							{t('Courses.numberOfCourses')}
						</p>
						<div className="text-white text-lg  xl:text-lg font-bold">
							{selectedCenter?.centerCoursesCount > 0 ? tens.includes(selectedCenter?.centerCoursesCount)
								? `${selectedCenter?.centerCoursesCount} ${t('StudentDetails.courses')}`
								: `${selectedCenter?.centerCoursesCount} ${t('Courses.course')}` : t("homepage.nothing")}
						</div>
					</div>
				</div>
			) : (
				<div className="box w-full xl:w-1/2 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center">
					<Post />
				</div>
			)}

			{/* <div className="box w-full xl:w-1/3 rounded-2xl flex p-4 gap-x-4 sm:gap-x-2 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light items-center cursor-pointer"
                onClick={() => setToggler(prev => {
                    return { ...prev, addTeacher: true }
                })}>
                <div className="icon rounded-full p-3 flex items-center justify-center ">
                    {plusWhite}
                </div>
                <p className="text-lg xl:text-size__14 2xl:text-base text-white font-bold">{t("PopupWindows.addTeacher")}</p>
            </div> */}

			{/* <AddTeacher /> */}
		</div>
	);
};

export default memo(Boxes);
