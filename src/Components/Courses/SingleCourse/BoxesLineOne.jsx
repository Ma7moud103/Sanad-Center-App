import { useTranslation } from 'react-i18next';
import { memo, useContext } from 'react';
import { MainContext } from '../../../Context/MainContext';
import { ApisContext } from '../../../Context/ApisContext';
import Post from '../../Skeletons/Post';
import addGroup from '../../../assets/sanadSVG/addGroup.svg';
import penBlue from '../../../assets/sanadSVG/pen.svg';
import sessionsBlue from '../../../assets/sanadSVG/sessions.svg';
import students from '../../../assets/sanadSVG/students.svg';
import { ReactSVG } from "react-svg"
import SingleCourseAvatar from '../../SingleCourseAvatar';
function BoxesLineOne({ Course }) {
	const [t, i18n] = useTranslation();
	const { setToggler, handleUserName } = useContext(MainContext);
	const { fetchSingleCourse, tens, } = useContext(ApisContext);

	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap xl:min-h-[230px] ">
			<div className="box w-full  xl:w-1/3 rounded-2xl flex flex-col items-center p-4 gap-y-4  justify-center bg-white">
				{fetchSingleCourse.isFetched ? (
					<>
						<div className="icon rounded-full flex flex-col items-center">
							<SingleCourseAvatar courseName={fetchSingleCourse.data[0]?.tutorCourse?.courseData?.name} />

							<h5 className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold text-center">

								{handleUserName(fetchSingleCourse.data &&
									fetchSingleCourse.data[0]?.tutorCourse?.courseData?.name, 4)}
							</h5>
							<p className="text-textGray text-lg xl:text-size__14 2xl:text-base font-normal text-center">
								{fetchSingleCourse.data &&
									fetchSingleCourse.data[0]?.tutorCourse?.courseData?.grade
									? i18n.language === 'ar'
										? `${t('homeRev.grade')} ${fetchSingleCourse.data && fetchSingleCourse.data[0]?.tutorCourse?.courseData?.grade?.nameAr}`
										: `${t('homeRev.grade')} ${fetchSingleCourse.data && fetchSingleCourse.data[0]?.tutorCourse?.courseData?.grade?.nameEn}`
									: null}
							</p>
						</div>

						<div className="title flex items-center gap-x-1 w-full ">
							<div className="w-1/3 flex flex-col items-center justify-center">
								<p className=" text-secondMainColor text-size_12 sm:text-base xl:text-sm text-nowrap  font-bold">
									{t('SingleCourse.courseCode')}
								</p>
								<div className="text-textGray text-size_10 sm:text-sm xl:text-sm font-bold">
									{fetchSingleCourse.data &&
										fetchSingleCourse.data[0]?.tutorCourse?.courseData?.code}
								</div>
							</div>

							<div className="w-1/3 flex flex-col items-center justify-center">
								<p className=" text-secondMainColor text-size_12 sm:text-base xl:text-sm text-nowrap  font-bold">
									{t('SingleCourse.semester')}
								</p>
								<div className="text-textGray text-size_10 sm:text-sm xl:text-sm font-bold">
									{fetchSingleCourse.data &&
										fetchSingleCourse.data[0]?.tutorCourse?.term === '0'
										? t('homeRev.highSchool')
										: fetchSingleCourse.data &&
											fetchSingleCourse.data[0]?.tutorCourse?.term
											? fetchSingleCourse.data &&
												fetchSingleCourse.data[0]?.tutorCourse?.term === '1'
												? `${t('homeRev.term')} ${t('homeRev.first')}`
												: fetchSingleCourse.data &&
													fetchSingleCourse.data[0]?.tutorCourse?.term === '2'
													? `${t('homeRev.term')} ${t('homeRev.second')}`
													: fetchSingleCourse.data &&
													fetchSingleCourse.data[0]?.tutorCourse?.term ===
													'3' &&
													`${t('homeRev.term')} ${t('homeRev.third')}`
											: null}
								</div>
							</div>

							<div className="w-1/3 flex flex-col items-center justify-center">
								<p className=" text-secondMainColor text-size_12 sm:text-base xl:text-sm text-nowrap  font-bold">
									{t('SingleCourse.teacherName')}
								</p>
								<div className="text-textGray text-size_10 sm:text-sm xl:text-sm font-bold">

									{handleUserName(fetchSingleCourse.data &&
										fetchSingleCourse.data[0]?.tutorCourse?.tutor?.fullname, 2)}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className=" w-full flex flex-col items-center">
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

			<div className="box flex  flex-col xl:flex-row w-full  xl:w-2/3 items-center gap-2  xl:gap-mainGap ">
				<div className="w-full flex flex-col gap-y-2   justify-between">
					<div
						className=" box cursor-pointer w-full  bg-white rounded-2xl flex  p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center items-center"
						onClick={() =>
							setToggler((prev) => {
								return { ...prev, modifyCourse: true };
							})
						}
					>
						{fetchSingleCourse.isFetched ? (
							<>
								<ReactSVG src={penBlue} />
								<p className="text-mainColor text-size__20 xl:text-xl  font-bold">
									{' '}
									{t('Logs.modifyCourse')}
								</p>
							</>
						) : (
							<Post />
						)}
					</div>

					<div
						className=" box w-full cursor-pointer bg-white rounded-2xl flex  p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center items-center"
						onClick={() =>
							setToggler((prev) => {
								return { ...prev, showAddGroup: true };
							})
						}
					>
						{fetchSingleCourse.isFetched ? (
							<>
								<ReactSVG src={addGroup} />

								<p className="text-mainColor text-size__20 xl:text-xl   font-bold">
									{' '}
									{t('SingleCourse.addGroup')}
								</p>
							</>
						) : (
							<Post />
						)}
					</div>
				</div>

				<div className="w-full  flex flex-col gap-y-2">
					<div className="box w-full  bg-white rounded-2xl flex p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center">
						{fetchSingleCourse.isFetched ? (
							<>
								<div className="icon rounded-full  flex items-center justify-center">
									<ReactSVG src={sessionsBlue} />
								</div>

								<div className="title text-nowrap">
									<p className=" text-textGray text-lg xl:text-xl   font-bold">
										{t('SingleCourse.numberOfSessions')}
									</p>
									<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
										{fetchSingleCourse?.data &&
											fetchSingleCourse?.data[0]?.sessionsCount > 0
											? tens.includes(
												fetchSingleCourse.data &&
												fetchSingleCourse.data[0]?.sessionsCount
											)
												? `${fetchSingleCourse.data && fetchSingleCourse.data[0]?.sessionsCount} ${t('SingleCourse.sessions')}`
												: `${fetchSingleCourse.data && fetchSingleCourse.data[0]?.sessionsCount} ${t('SingleCourse.session')}`
											: t('homepage.nothing')}
									</p>
								</div>
							</>
						) : (
							<Post />
						)}
					</div>

					<div className="box w-full  bg-white rounded-2xl flex p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center">
						{fetchSingleCourse.isFetched ? (
							<>
								<div className="icon rounded-full  flex items-center justify-center bg-bg_mainLayout">
									<ReactSVG src={students} />
								</div>

								<div className="title text-nowrap">
									<p className=" text-textGray text-lg xl:text-xl font-bold">
										{t('Groups.studentsNum')}
									</p>
									<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
										{fetchSingleCourse.data &&
											fetchSingleCourse.data[0]?.studentsCount > 0
											? tens.includes(
												fetchSingleCourse.data &&
												fetchSingleCourse.data[0]?.studentsCount
											)
												? `${fetchSingleCourse.data && fetchSingleCourse.data[0]?.studentsCount} ${t('Courses.students')}`
												: `${fetchSingleCourse.data && fetchSingleCourse.data[0]?.studentsCount} ${t('Courses.student')}`
											: t('homepage.nothing')}
									</p>
								</div>
							</>
						) : (
							<Post />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(BoxesLineOne);
