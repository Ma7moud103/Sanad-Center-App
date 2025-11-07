import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../Context/MainContext";
import { ApisContext } from "../../Context/ApisContext";

import courses from "../../assets/sanadSVG/courses.svg"
import plusHomeBox from "../../assets/sanadSVG/plus.svg"
import students from "../../assets/sanadSVG/students.svg"
import teachers from "../../assets/sanadSVG/teachers.svg"
import Box from "../ui/Box";

export default function Boxes() {
  const [t] = useTranslation()
  const { setToggler } = useContext(MainContext)
  const { selectedCenter, fetchAllCenters, tens } = useContext(ApisContext)
  return (
    <div className="flex flex-col items-center w-full xl:flex-row gap-mainGap ">

      <Box imageSrc={students} isFetched={fetchAllCenters.isFetched}>
        <div className="title">

          <p className="text-lg font-bold text-textGray xl:text-size__14 2xl:text-base">{t("TeacherDetails.numberOfStudents")}</p>

          <div className="flex items-center text-nowrap">
            {selectedCenter ? (
              <>
                <p className="text-lg font-bold text-mainColor xl:text-size__14 2xl:text-base">

                  {tens.includes(selectedCenter?.studentsCount) ? `${selectedCenter?.studentsCount} ${t("Courses.students")}` : `${selectedCenter?.studentsCount} ${t("Courses.student")}`}
                </p>
                {/* /
                      <span className="text-sm font-bold text-textGray xl:text-size__14 2xl:text-base">
                        {tens.includes(selectedCenter?.maxStudents
                        ) ? `${selectedCenter?.maxStudents
                        } ${t("Courses.students")}` : `${selectedCenter?.maxStudents
                        } ${t("Courses.student")}`}
                      </span> */}
              </>
            ) : t("homepage.nothing")}
          </div>

        </div>
      </Box>


      <Box bg={"bg-gradient-to-bl from-secondMainColor to-blue_light w-full xl:w-1/4"} imageSrc={courses} isFetched={fetchAllCenters.isFetched}>
        <div className="title text-nowrap">
          <p className="font-bold text-white text-size__20 xl:text-base 2xl:text-lg">{t("Courses.numberOfCourses")}</p>
          <div className="text-lg font-bold text-white xl:text-size__14 2xl:text-base">
            {selectedCenter ? tens.includes(selectedCenter?.centerCoursesCount) ? `${selectedCenter?.centerCoursesCount} ${t("StudentDetails.courses")}` : `${selectedCenter?.centerCoursesCount} ${t("Courses.course")}` : t("homepage.nothing")}

          </div>
        </div>
      </Box>


      <Box imageSrc={teachers} isFetched={fetchAllCenters.isFetched}>
        <div className="title text-nowrap">
          <p className="text-lg font-bold text-textGray xl:text-size__14 2xl:text-base">{t("Courses.teachers")}</p>
          <p className="font-bold text-mainColor text-size__20 xl:text-base 2xl:text-lg">
            {selectedCenter ? tens.includes(selectedCenter?.tutorsCount
            ) ? `${selectedCenter?.tutorsCount
            }${t("Courses.Teachers")}` : `${selectedCenter?.tutorsCount
            }${t("Courses.teacher")}` : t("homepage.nothing")}
          </p>
        </div>
      </Box>

      <Box imageSrc={plusHomeBox} isFetched={fetchAllCenters.isFetched} onClick={() => {
        setToggler(prev => {
          return { ...prev, scanCard: true }
        })
      }} >



        <p className="font-bold text-mainColor text-size_22 xl:text-size_22"> {t("homepage.checkcard")}</p>

      </Box>


    </div>
  );
}
