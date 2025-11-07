import { useTranslation } from 'react-i18next';
import { memo, useContext } from 'react';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../Skeletons/Post';
import courses from '../../assets/sanadSVG/courses.svg';
import students from '../../assets/sanadSVG/students.svg';
import { ReactSVG } from 'react-svg';
import Box from '../ui/Box';
const Boxes = () => {
	const [t] = useTranslation();
	// const myCookie = new Cookies()
	// const Details = myCookie.get("userDetails")
	// console.log(Details);
	const { selectedCenter, tens, fetchAllCenters } =
		useContext(ApisContext);

	return (
		<div className="flex flex-col items-center w-full sm:flex-row gap-mainGap ">


			<Box imageSrc={students} bg={"w-full sm:w-1/2 bg-white"} isFetched={fetchAllCenters.isFetched}>
				<div className="title">
					<p className="text-lg font-bold  text-textGray xl:text-size__14 2xl:text-base">
						{t('TeacherDetails.numberOfStudents')}
					</p>

					<div className="flex items-center text-nowrap">

						{selectedCenter && selectedCenter.studentsCount > 0 ? (
							<>
								<p className="text-lg font-bold text-mainColor xl:text-size__14 2xl:text-base">
									{tens.includes(selectedCenter?.studentsCount)
										? `${selectedCenter?.studentsCount} ${t('Courses.students')}`
										: `${selectedCenter?.studentsCount} ${t('Courses.student')}`}
								</p>

							</>
						) : (
							<p className="text-mainColor">{t('homepage.nothing')}</p>
						)}
					</div>
				</div>
			</Box>



			<Box imageSrc={courses} bg={"bg-gradient-to-bl from-secondMainColor to-blue_light  w-full sm:w-1/2"} isFetched={fetchAllCenters.isFetched}>

				<p className="font-bold text-white  text-size__20 xl:text-base 2xl:text-lg">
					{t('Courses.numberOfCourses')}
				</p>
				<div className="text-lg font-bold text-white xl:text-size__14 2xl:text-base">
					{selectedCenter && selectedCenter.centerCoursesCount > 0
						? tens.includes(selectedCenter?.centerCoursesCount)
							? `${selectedCenter?.centerCoursesCount} ${t('StudentDetails.courses')}`
							: `${selectedCenter?.centerCoursesCount} ${t('Courses.course')}`
						: t('homepage.nothing')}
				</div>

			</Box>
			{/* 
			<div className="flex justify-center w-full p-4 bg-white box xl:w-1/3 rounded-2xl gap-x-4 sm:gap-x-2">
				{fetchAllCourses.isFetched && fetchAllCenters.isFetched ? (
					<>
						<ReactSVG src={Groups} />
						<div className="title text-nowrap">
							<p className="text-lg font-bold  text-textGray xl:text-size__14 2xl:text-base">
								{t('Courses.numberOfGroups')}
							</p>
							<p className="font-bold text-mainColor text-size__20 xl:text-base 2xl:text-lg">
								{fetchAllCourses.data && fetchAllCourses.data[0]
									? tens.includes(fetchAllCourses.data[0]?.totalGroups)
										? `${fetchAllCourses && fetchAllCourses.data[0]?.totalGroups} ${t('homepage.groups')}`
										: fetchAllCourses.data[0]?.totalGroups === 0
											? 0
											: `${fetchAllCourses && fetchAllCourses.data[0]?.totalGroups} ${t('homepage.group')}`
									: t('homepage.nothing')}
							</p>
						</div>
					</>
				) : (
					<Post />
				)}
			</div> */}
		</div>
	);
};

export default memo(Boxes);
