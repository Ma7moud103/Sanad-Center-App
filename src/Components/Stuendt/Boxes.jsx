import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../Skeletons/Post';
import { MainContext } from '../../Context/MainContext';
import students from '../../assets/sanadSVG/students.svg';
import courses from '../../assets/sanadSVG/courses.svg';
import plus from '../../assets/sanadSVG/plusTable.svg';
import { ReactSVG } from 'react-svg';

const Boxes = () => {
	const [t] = useTranslation();
	// const myCookie = new Cookies()
	// const Details = myCookie.get("userDetails")
	// console.log(Details);
	const { selectedCenter, tens, fetchAllCenters } = useContext(ApisContext);
	const { setToggler } = useContext(MainContext);

	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">
			<div className="box w-full xl:w-1/3 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center">
				{fetchAllCenters.isFetched ? (
					<>
						<ReactSVG src={students} />

						<div className="title">
							<p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
								{t('TeacherDetails.numberOfStudents')}
							</p>

							<div className="flex items-center text-nowrap">
								<p className="text-mainColor text-lg xl:text-size__14 2xl:text-base font-bold">
									{selectedCenter?.studentsCount > 0 ? tens.includes(selectedCenter?.studentsCount)
										? `${selectedCenter?.studentsCount} ${t('Courses.students')}`
										: `${selectedCenter?.studentsCount} ${t('Courses.student')}` : t("homepage.nothing")}
								</p>
								/
								<span className="text-textGray text-sm xl:text-size__14 2xl:text-base font-bold">
									{selectedCenter?.maxStudents > 0 ? tens.includes(selectedCenter?.maxStudents)
										? `${selectedCenter?.maxStudents} ${t('Courses.students')}`
										: `${selectedCenter?.maxStudents} ${t('Courses.student')}` : t("homepage.nothing")}
								</span>
							</div>
						</div>
					</>
				) : (
					<Post />
				)}
			</div>

			{fetchAllCenters.isFetched ? (
				<div className="box w-full xl:w-1/3     rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light">
					<ReactSVG src={courses} />

					<div className="title text-nowrap">
						<p className=" text-white text-size__20 xl:text-base 2xl:text-lg font-bold">
							{t('Courses.numberOfCourses')}
						</p>
						<div className="text-white text-lg xl:text-size__14 2xl:text-base font-bold">
							{selectedCenter?.centerCoursesCount > 0 ? tens.includes(selectedCenter?.centerCoursesCount)
								? `${selectedCenter?.centerCoursesCount} ${t('StudentDetails.courses')}`
								: `${selectedCenter?.centerCoursesCount} ${t('Courses.course')}` : t("homepage.nothing")}
						</div>
					</div>
				</div>
			) : (
				<div className="box w-full xl:w-1/3 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center">
					<Post />
				</div>
			)}

			<div
				onClick={() => {
					setToggler((prev) => {
						return { ...prev, scanCard: true };
					});
				}}
				className="box w-full xl:w-1/3 bg-white  rounded-2xl flex p-4 gap-x-4 sm:gap-x-2 justify-center items-center cursor-pointer"
			>
				{fetchAllCenters.isFetched ? (
					<>
						<div className="icon rounded-full  flex items-center justify-center  ">
							<ReactSVG src={plus} />
						</div>

						<p className="text-mainColor text-size_22 xl:text-size_22  font-bold">
							{' '}
							{t('homepage.checkcard')}
						</p>
					</>
				) : (
					<Post />
				)}
			</div>
		</div>
	);
};

export default Boxes;
