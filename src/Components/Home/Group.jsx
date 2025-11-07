import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { ApisContext } from '../../Context/ApisContext';
import { MainContext } from '../../Context/MainContext';
import moment from 'moment';


export default function Group({ group }) {
    const [t, i18n] = useTranslation();
    const { tens } = useContext(ApisContext)
    const { handleUserName } = useContext(MainContext)


    return (
        <>

            <p className="nameLesson font-bold text-mainColor text-start  text-sm  w-[20%] text-nowrap">
                {t("Courses.group")} {group?.groupNumber}
            </p>

            <div className=" w-[20%] flex justify-start ">
                <div className="   flex flex-col gap-y-1 groups-center">
                    <p className="nameLesson font-bold text-mainColor text-start   text-sm text-nowrap">

                        {handleUserName(group?.tutorCourse?.courseData?.name, 3)}
                    </p>
                    <p className="nameLesson font-bold text-textGray text-start   text-xs   text-nowrap">

                        {i18n.language === "ar" ? `${t("homeRev.grade")} ${group?.tutorCourse?.courseData?.grade?.nameAr}` : `${t("homeRev.grade")} ${group?.tutorCourse?.courseData?.grade?.nameEn}`}
                    </p>
                </div>
            </div>

            {/* </div> */}
            <p className="files font-semibold text-sm text-mainColor  w-[20%] text-nowrap">

                {tens.includes(group?.studentsCount) ? `${group?.studentsCount} ${t("Courses.students")}` : group?.studentsCount === 0 ? t("homepage.nothing") : `${group?.studentsCount} ${t("Courses.student")}`}
            </p>

            <p className="files font-semibold text-sm text-textGray text-start  w-[20%] text-nowrap">
                {/* {convertTo12HourFormat(`${new Date(group?.startTime).getUTCHours()}:${new Date(group?.startTime).getUTCMinutes()}`)} */}

                {moment(group?.startTime).format('h:mm a')}

            </p>
            <p className="files font-semibold text-sm text-textGray text-start  w-[20%] text-nowrap">
                {/* {convertTo12HourFormat(`${new Date(group?.endTime).getUTCHours()}:${new Date(group?.endTime).getUTCMinutes()}`)} */}

                {moment(group?.endTime).format('h:mm a')}

            </p>
        </>
    )
}
