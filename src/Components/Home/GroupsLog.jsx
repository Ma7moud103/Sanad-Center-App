import React, { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
// import Pagination from "../../Pagination/Pagination";
import { Disclosure, Listbox, ListboxButton, ListboxOption, ListboxOptions, } from "@headlessui/react";
import Pagination from "../Pagination/Pagination";
import { MainContext } from "../../Context/MainContext";
import { SvgsContext } from "../../Context/SvgsConetxt";
import { ApisContext } from "../../Context/ApisContext";
import iocnHeaderTable from "../../assets/sanadSVG/iocnHeaderTable.svg"
import { ReactSVG } from "react-svg"
import filterIcon from "../../assets/sanadSVG/filterIcon.svg"
import downArrowFilter from "../../assets/sanadSVG/downArrow.svg"
import sort from "../../assets/sanadSVG/sort.svg"
import moment from 'moment'
import HomeHead from "./HomeHead";
import Labels from "./Labels";
import Groups from "./Groups";
import LargePosts from "../Skeletons/LargePosts";


const tags = [{ name: "Groups.name" }, { name: "Groups.nameCourse", hasSort: true }, { name: "Groups.studentsNum" }, { name: "Groups.start" }, { name: "Groups.end" }, { hasIcon: true }]
const arr5 = [1, 1, 1, 1, 1]
const itemsPerPage = 5;
function GroupsLog() {

    const [t, i18n] = useTranslation();
    const { setToggler, setselectedGroup, handleUserName } = useContext(MainContext)
    const { Grades, fetchCurrentGroups, tens } = useContext(ApisContext)

    const { leftArrow, } = useContext(SvgsContext)
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const cashedSelectedGrade = JSON.parse(sessionStorage.getItem("selectedGrade"))
    const [selectedGradeOfCourse, setSelectedGradeOfCourse] = useState(
        { nameEn: t("Notifications.showAll"), nameAr: t("Notifications.showAll") } || cashedSelectedGrade
    );

    const handleCourseChange = (Grade) => {
        setSelectedGradeOfCourse(Grade);
        sessionStorage.setItem('selectedGrade', JSON.stringify(Grade));
        setCurrentPage(1);
    };

    const CurrentGroups = fetchCurrentGroups && fetchCurrentGroups.data?.filter((item) => {
        if (selectedGradeOfCourse.nameEn === "Show all" || selectedGradeOfCourse.nameAr === "عرض الكل") {

            return true

        } else {
            if (i18n.language === 'ar') {
                return item?.tutorCourse?.courseData?.grade?.nameAr === selectedGradeOfCourse?.nameAr;
            } else if (i18n.language === "en") {
                return item?.tutorCourse?.courseData?.grade?.nameEn === selectedGradeOfCourse?.nameEn;
            } else {
                return true

            }

        }
    });





    // Calculate the start and end indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, CurrentGroups?.length)
    const visibleData2 = CurrentGroups?.slice(startIndex, endIndex)


    return (

        <>
            <div className={`w-full lg:bg-white rounded-lg flex flex-col lg:px-6 pt-6 gap-y-8 ${CurrentGroups?.length > 0 ? " lg:h-[700px] " : "h-auto py-5"}`}>


                <HomeHead Options={Grades} handleChange={handleCourseChange} selectedItem={selectedGradeOfCourse} HeaderName={"Groups.header"} />

                <div className="largeScreen hidden lg:flex flex-col h-[70%] ">
                    {/* {!MainLoading.GroupsLoading ? <> */}

                    {fetchCurrentGroups.isFetched ?
                        (
                            <>
                                <Labels tags={tags} />
                                <Groups setSelectedItem={setselectedGroup} CurrentGroups={CurrentGroups} groups={visibleData2} />
                            </>
                        )
                        : <LargePosts />
                    }

                </div>

                {CurrentGroups?.length > 0 && fetchCurrentGroups.isFetched ?
                    <div className="hidden lg:flex items-center justify-center mt-6">
                        <Pagination
                            totalItems={CurrentGroups?.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    : null}


                {/* uncomment this part if you have the data then loop in it to display the data*/}
                <div className="flex flex-col rounded-2xl gap-y-3 lg:hidden w-full">

                    {fetchCurrentGroups.isFetched ?
                        CurrentGroups && CurrentGroups?.length > 0 ? visibleData2?.map((item, i) => {
                            return (
                                <Disclosure key={i}>
                                    {({ open }) => (
                                        <div>
                                            <Disclosure.Button
                                                className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
                                                    }`}
                                            >


                                                <div className="flex flex-col justify-center items-start">
                                                    <p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
                                                        {t("Courses.group")} {item?.groupNumber}
                                                    </p>
                                                    <p className="font-bold text-textGray text-size_12  ">
                                                        {i18n.language === "ar" ? item?.tutorCourse?.courseData?.grade?.nameAr : item?.tutorCourse?.courseData?.grade?.nameEn}
                                                    </p>
                                                </div>


                                                <div className="flex gap-x-2 items-center ">
                                                    {open ? <ReactSVG src={downArrowFilter} /> : leftArrow()}

                                                </div>



                                            </Disclosure.Button>
                                            <Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
                                                        {t("Groups.nameCourse")}
                                                    </p>
                                                    <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">

                                                        {handleUserName(item?.tutorCourse?.courseData?.name, 4)}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  ">
                                                        {t("Groups.tutorName")}
                                                    </p>
                                                    <div className="flex  gap-2 font-semibold text-textGray flex-wrap justify-end   text-size_12 sm:text-size__14">
                                                        {item?.tutorCourse?.tutor?.fullname}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  ">
                                                        {t("Groups.studentsNum")}
                                                    </p>
                                                    <div className="flex  gap-2 font-semibold text-textGray flex-wrap justify-end    text-size_12 sm:text-size__14">
                                                        {tens.includes(item?.studentsCount) ? `${item?.studentsCount}${t("Courses.students")}` : item?.studentsCount === 0 ? t("homepage.nothing") : `${item?.studentsCount}${t("Courses.student")}`}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  ">
                                                        {t("Groups.start")}
                                                    </p>
                                                    <div className="flex  gap-2 font-semibold text-textGray flex-wrap justify-end   text-size_12 sm:text-size__14">
                                                        {moment(item?.startTime).format('h:mm a')}

                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  ">
                                                        {t("Groups.end")}
                                                    </p>
                                                    <div className="flex  gap-2 font-semibold text-textGray flex-wrap justify-end  text-size_12 sm:text-size__14">
                                                        {moment(item?.endTime).format('h:mm a')}

                                                    </div>
                                                </div>

                                                <div className="=icons cursor-pointer flex w-full justify-end"
                                                    onClick={() => {

                                                        sessionStorage.setItem("groupId", item?._id)
                                                        sessionStorage.setItem("courseId", item?.centerCourse)
                                                        setselectedGroup(item)

                                                        setToggler(prev => {
                                                            return { ...prev, checkCard: true }
                                                        })
                                                    }}                                   >
                                                    {/* {iocnHeaderTable} */}
                                                    <ReactSVG src={iocnHeaderTable} />
                                                </div>
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            )
                        }) : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white">{t("homepage.nothing")}</p>

                        : arr5.map((item, i) => {
                            return <div key={i} className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
                                <div className="animate-pulse w-full  flex items-center  space-x-4">
                                    <div className="rounded-full bg-zinc-300 h-10 w-10"></div>
                                    <div className="flex-1 space-y-3 py-1">
                                        <div className="h-2 bg-zinc-300 rounded"></div>
                                        <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                    {
                        CurrentGroups?.length > 0 && fetchCurrentGroups.isFetched ?
                            <Pagination
                                totalItems={CurrentGroups?.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            /> : null
                    }
                </div>




            </div >

        </>
    );
}


export default React.memo(GroupsLog)
