import { useTranslation } from 'react-i18next';
import { memo, useContext } from 'react';
import { MainContext } from '../../../Context/MainContext';
import { ApisContext } from '../../../Context/ApisContext';

import Post from '../../Skeletons/Post';

import timetable from '../../../assets/sanadSVG/timeline.svg';
import addGroup from '../../../assets/sanadSVG/addGroup.svg';

import students from '../../../assets/sanadSVG/students.svg';
import { ReactSVG } from 'react-svg';
import SingleCourseAvatar from '../../SingleCourseAvatar';

function Boxes() {
	const [t, i18n] = useTranslation();
	const { setToggler } = useContext(MainContext);
	const { tens, fetchSingleGroup } = useContext(ApisContext);

	// useEffect(() => {
	//     GetSingleGroup(groupId)
	// }, [])

	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">
			<div className="box w-full  xl:w-1/3 rounded-2xl flex flex-col items-center p-4 gap-y-4  justify-center bg-white">
				{fetchSingleGroup.isFetched ? (
					<>
						<div className="icon rounded-full flex flex-col items-center">
							<SingleCourseAvatar courseName={fetchSingleGroup.data?.tutorCourse?.courseData?.name} />
							<h5 className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold text-center">
								{fetchSingleGroup.data?.tutorCourse?.courseData?.name}
							</h5>
							<p className="text-textGray text-lg xl:text-size__14 2xl:text-base font-normal text-center">
								{fetchSingleGroup.data?.tutorCourse?.courseData?.grade
									? i18n.language === 'ar'
										? `${t('homeRev.grade')} ${fetchSingleGroup.data?.tutorCourse?.courseData?.grade?.nameAr}`
										: `${t('homeRev.grade')} ${fetchSingleGroup.data?.tutorCourse?.courseData?.grade?.nameEn}`
									: null}
							</p>
						</div>

						<div className="title flex items-center gap-x-1 w-full ">
							<div className="w-1/3 flex flex-col items-center justify-center">
								<p className=" text-secondMainColor text-size_12 sm:text-base xl:text-sm text-nowrap  font-bold">
									{t('SingleCourse.courseCode')}
								</p>
								<div className="text-textGray text-size_10 sm:text-sm xl:text-sm font-bold">
									{fetchSingleGroup.data?.tutorCourse?.courseData?.code}
								</div>
							</div>

							<div className="w-1/3 flex flex-col items-center justify-center">
								<p className=" text-secondMainColor text-size_12 sm:text-base xl:text-sm text-nowrap  font-bold">
									{t('SingleCourse.semester')}
								</p>
								<div className="text-textGray text-size_10 sm:text-sm xl:text-sm font-bold">
									{fetchSingleGroup.data?.tutorCourse?.term === '0'
										? t('homeRev.highSchool')
										: fetchSingleGroup.data?.tutorCourse?.term
											? fetchSingleGroup.data?.tutorCourse?.term === '1'
												? `${t('homeRev.term')} ${t('homeRev.first')}`
												: fetchSingleGroup.data?.tutorCourse?.term === '2'
													? `${t('homeRev.term')} ${t('homeRev.second')}`
													: fetchSingleGroup.data?.tutorCourse?.term === '3' &&
													`${t('homeRev.term')} ${t('homeRev.third')}`
											: null}
								</div>
							</div>

							<div className="w-1/3 flex flex-col items-center justify-center">
								<p className=" text-secondMainColor text-size_12 sm:text-base xl:text-sm text-nowrap  font-bold">
									{t('SingleCourse.teacherName')}
								</p>
								<div className="text-textGray text-size_10 sm:text-sm xl:text-sm font-bold">
									{fetchSingleGroup.data?.tutorCourse?.tutor?.fullname}
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

			<div className="box flex flex-col xl:flex-row w-full  xl:w-2/3 items-center gap-2  xl:gap-mainGap ">
				<div className="w-full flex flex-col gap-y-2">
					<div
						className=" box cursor-pointer w-full  bg-white rounded-2xl flex  p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center items-center"
						onClick={() =>
							setToggler((prev) => {
								return { ...prev, modifyGroup: true };
							})
						}
					>
						{fetchSingleGroup.isFetched ? (
							<>
								<ReactSVG src={addGroup} />

								<p className="text-mainColor text-lg xl:text-xl  font-bold">
									{' '}
									{t('homeRev.modifyGroup')}
								</p>
							</>
						) : (
							<Post />
						)}
					</div>

					<div className="box w-full cursor-pointer bg-white rounded-2xl flex  p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center items-center">
						{fetchSingleGroup.isFetched ? (
							<>
								<ReactSVG src={timetable} />

								<div className="title text-nowrap">
									<p className=" text-textGray text-lg xl:text-xl  font-bold">
										{t('SingleGroup.groupDay')}
									</p>
									<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
										{fetchSingleGroup.data?.dayOfWeek === 0 &&
											t('homepage.sunday')}
										{fetchSingleGroup.data?.dayOfWeek === 1 &&
											t('homepage.monday')}
										{fetchSingleGroup.data?.dayOfWeek === 2 &&
											t('homepage.tuesday')}
										{fetchSingleGroup.data?.dayOfWeek === 3 &&
											t('homepage.wednesday')}
										{fetchSingleGroup.data?.dayOfWeek === 4 &&
											t('homepage.thursday')}
										{fetchSingleGroup.data?.dayOfWeek === 5 &&
											t('homepage.friday')}
										{fetchSingleGroup.data?.dayOfWeek === 6 &&
											t('homepage.saturday')}
									</p>
								</div>
							</>
						) : (
							<Post />
						)}
					</div>
				</div>

				<div className="w-full  flex flex-col gap-y-2">
					<div className="box w-full  bg-white rounded-2xl flex p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center">
						{fetchSingleGroup.isFetched ? (
							<>
								<div className="icon rounded-full  flex items-center justify-center">
									<ReactSVG src={students} />
								</div>

								<div className="title text-nowrap">
									<p className=" text-textGray text-lg xl:text-xl  font-bold">
										{t('homepage.groupName')}
									</p>
									<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
										{fetchSingleGroup.data?.groupNumber
											? t('homepage.group')
											: null}{' '}
										{fetchSingleGroup.data?.groupNumber}
									</p>
								</div>
							</>
						) : (
							<Post />
						)}
					</div>

					<div className="box w-full  bg-white rounded-2xl flex p-4 xl:py-6 gap-x-4 sm:gap-x-2 justify-center">
						{fetchSingleGroup.isFetched ? (
							<>
								<div className="icon rounded-full  flex items-center justify-center ">
									<ReactSVG src={students} />
								</div>

								<div className="title text-nowrap">
									<p className=" text-textGray text-lg xl:text-xl font-bold">
										{t('Groups.studentsNum')}
									</p>
									<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
										{fetchSingleGroup.data?.studentsCount > 0
											? tens.includes(fetchSingleGroup.data?.studentsCount)
												? `${fetchSingleGroup.data?.studentsCount} ${t('Courses.students')}`
												: `${fetchSingleGroup.data?.studentsCount} ${t('Courses.student')}`
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

export default memo(Boxes);
