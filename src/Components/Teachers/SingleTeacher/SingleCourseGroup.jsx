import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Disclosure,

} from '@headlessui/react';
import Pagination from '../../Pagination/Pagination';
import { useParams } from 'react-router-dom';
import { ApisContext } from '../../../Context/ApisContext';
import leftArrow from '../../../assets/sanadSVG/leftArrow.svg'
import downArrow from '../../../assets/sanadSVG/downArrow.svg'

import { ReactSVG } from 'react-svg';
import { BASE_URL } from '../../../Soursre';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function SingleCourseGroup() {
    const { courseGroupId } = useParams()
    const arr = [3, 3, 3, 3, 3];
    const [t] = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const {
        headers,
        selectedCenter,
        Time,
        tens,
        handleAddGroup,
        handleModifyGroup,
        handleDeletGroup,
    } = useContext(ApisContext);
    const itemsPerPage = 5;
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getTeacherGroups = async () => {
        if (selectedCenter && courseGroupId) {
            try {
                const res = await axios.get(
                    `${BASE_URL}centers/${selectedCenter?._id}/center-courses/${courseGroupId}/groups?fields=-center,-tutorCourse?limit=-1`,
                    { headers: headers }
                );
                if (res.status === 200 || res.data.status === 'success') {
                    return res.data.data;
                }
            } catch (error) {
                console.log(error);
            }
        }



    };

    const fetchGroups = useQuery({
        queryKey: [
            'fetchGroups',
            `${selectedCenter}`,
            `${courseGroupId}`,
            `${handleAddGroup}`,
            `${handleModifyGroup}`,
            `${handleDeletGroup}`,
        ],
        queryFn: () => getTeacherGroups(),
        enabled: !!selectedCenter && !!courseGroupId,
    });

    console.log(fetchGroups.data)

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, fetchGroups.data?.length);
    const visibleData2 = fetchGroups.data?.slice(startIndex, endIndex);

    return (
        <div className={`w-full xl:bg-white rounded-lg flex flex-col xl:px-6 pt-6 pb-2 gap-y-8 ${fetchGroups.data?.length > 0 ? 'lg:h-[520px]' : 'h-auto'} `}
        >
            <div className="main flex flex-col gap-3 w-full lg:w-auto">
                <p className="font-extrabold  text-size_26 md:text-size_28 text-mainColor">
                    {t('SingleCourse.groupLog')}
                </p>
            </div>


            <div className="largeScreen hidden xl:flex flex-col  h-[70%]">
                {fetchGroups.isFetched ? (
                    <>
                        <div className="thead border-[1px] bg-[#F4F7FE] py-3 rounded-t-xl  border-[#E1E1E1]    flex justify-between items-center w-full">
                            <div className="textHeader p-6 py-3 w-full   flex justify-between">
                                <p className="text-start text-textGray w-[20%] text-sm">
                                    {t('TeacherDetails.groupNumber')}
                                </p>

                                <p className="text-start w-[20%] text-sm text-textGray">
                                    {t('TeacherDetails.studentCount')}
                                </p>

                                <p className="text-start text-textGray  w-[20%] text-sm">
                                    {t('homepage.day')}
                                </p>
                                <p className="text-start text-textGray  w-[20%] text-sm">
                                    {t('Groups.start')}
                                </p>
                                <p className="text-start text-textGray  w-[20%] text-sm">
                                    {t('Groups.end')}
                                </p>
                            </div>
                        </div>
                        {fetchGroups.data && fetchGroups.data?.length > 0 ? (
                            visibleData2?.map((item, i) => {
                                const isLastItem = i === visibleData2?.length - 1;

                                return (
                                    <div
                                        key={i}
                                        className={`content w-full   border-[#E1E1E1] border-[1px] border-t-0 flex items-center justify-center ${isLastItem && 'rounded-b-xl'}`}
                                    >
                                        <div

                                            className="py-4 px-6 w-full   flex items-center justify-between "
                                        >
                                            {/* <div className="flex text-start gap-2 w-1/5"> */}

                                            <div className="nameLesson text-start   w-1/5 flex items-center gap-x-1">


                                                <div className="flex flex-col items-start">
                                                    <h6 className="font-bold text-xs text-mainColor xl:text-sm text-nowrap">
                                                        {`${t("homepage.group")} ${item?.groupNumber}`}
                                                    </h6>

                                                </div>
                                            </div>

                                            <p className="nameLesson text-sm font-bold text-mainColor text-start    w-1/5">
                                                {tens.includes(item?.studentsCount)
                                                    ? `${item?.studentsCount} ${t('Courses.students')}`
                                                    : item?.studentsCount === 0
                                                        ? t("homepage.nothing")
                                                        : `${item?.studentsCount} ${t('Courses.student')}`}
                                            </p>


                                            <p className="nameLesson text-sm font-bold text-mainColor text-start    w-1/5">
                                                {item?.dayOfWeek === 0 && `${t(`homepage.sunday`)}`}
                                                {item?.dayOfWeek === 1 && `${t(`homepage.monday`)}`}
                                                {item?.dayOfWeek === 2 && `${t(`homepage.tuesday`)}`}
                                                {item?.dayOfWeek === 3 && `${t(`homepage.wednesday`)}`}
                                                {item?.dayOfWeek === 4 && `${t(`homepage.thursday`)}`}
                                                {item?.dayOfWeek === 5 && `${t(`homepage.friday`)}`}
                                                {item?.dayOfWeek === 6 && `${t(`homepage.saturday`)}`}
                                            </p>
                                            <p className="files text-sm font-semibold text-mainColor text-start  w-1/5">
                                                {Time(item?.startTime)}
                                            </p>

                                            <p className="files text-sm font-semibold text-mainColor text-start  w-1/5">
                                                {Time(item?.endTime)}

                                            </p>
                                        </div>

                                    </div>
                                );
                            })
                        ) : (
                            <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor">
                                {t('homepage.nothing')}
                            </p>
                        )}
                    </>
                ) : (
                    arr?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="py-5 px-6 w-full lg:gap-x-4  flex items-center justify-between "
                            >
                                <div className="animate-pulse w-full  flex items-center  space-x-4">
                                    <div className="rounded-full bg-zinc-300 h-10 w-10"></div>
                                    <div className="flex-1 space-y-3 py-1">
                                        <div className="h-2 bg-zinc-300 rounded"></div>
                                        <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {fetchGroups.isFetched && fetchGroups.data?.length > 0 && (
                <div className="hidden   xl:flex items-center justify-center">
                    <Pagination
                        totalItems={fetchGroups.data?.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* uncomment this part if you have the data then loop in it to display the data*/}
            <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
                {fetchGroups.isFetched ? (
                    <>
                        {fetchGroups.data && fetchGroups.data.length > 0 ? (
                            visibleData2?.map((item, i) => {
                                return (
                                    <Disclosure key={i}>
                                        {({ open }) => (
                                            <div>
                                                <Disclosure.Button
                                                    className={`py-4 px-5 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? 'rounded-b-none' : 'rounded-b-2xl'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-center gap-x-2 font-semibold text-mainColor">
                                                        {`${t("homepage.group")} ${item?.groupNumber}`}

                                                    </div>

                                                    <div className="flex items-center justify-center gap-x-4">
                                                        <p className="text-size_12 sm:text-sm bg-secondMainColor text-white py-1 px-2 rounded-xl">
                                                            {item?.dayOfWeek === 0 && `${t(`homepage.sunday`)}`}
                                                            {item?.dayOfWeek === 1 && `${t(`homepage.monday`)}`}
                                                            {item?.dayOfWeek === 2 && `${t(`homepage.tuesday`)}`}
                                                            {item?.dayOfWeek === 3 && `${t(`homepage.wednesday`)}`}
                                                            {item?.dayOfWeek === 4 && `${t(`homepage.thursday`)}`}
                                                            {item?.dayOfWeek === 5 && `${t(`homepage.friday`)}`}
                                                            {item?.dayOfWeek === 6 && `${t(`homepage.saturday`)}`}
                                                        </p>

                                                        {open ? <ReactSVG src={downArrow} /> : <ReactSVG src={leftArrow} />}
                                                    </div>


                                                </Disclosure.Button>
                                                <Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
                                                            {t('TeacherDetails.studentCount')}
                                                        </p>
                                                        <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
                                                            {tens.includes(item?.studentsCount)
                                                                ? `${item?.studentsCount} ${t('Courses.students')}`
                                                                : item?.studentsCount === 0
                                                                    ? t("homepage.nothing")
                                                                    : `${item?.studentsCount} ${t('Courses.student')}`}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
                                                            {t('Groups.start')}
                                                        </p>
                                                        <div className="flex  gap-2 font-semibold text-textGray  text-size_12 sm:text-size__14 flex-wrap justify-end">
                                                            {Time(item?.startTime)}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  text-nowrap">
                                                            {t('Groups.end')}
                                                        </p>
                                                        <div className="flex  gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray flex-wrap justify-end">
                                                            {Time(item?.endTime)}
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </div>
                                        )}
                                    </Disclosure>
                                );
                            })
                        ) : (
                            <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor bg-white xl:bg-transparent">
                                {t('homepage.nothing')}
                            </p>
                        )}
                    </>
                ) : (
                    arr?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}
                            >
                                <div className="animate-pulse w-full  flex items-center  space-x-4">
                                    <div className="rounded-full bg-zinc-300 h-10 w-10"></div>
                                    <div className="flex-1 space-y-3 py-1">
                                        <div className="h-2 bg-zinc-300 rounded"></div>
                                        <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}

                {fetchGroups.isFetched &&
                    fetchGroups.data?.length > 0 && (
                        <Pagination
                            totalItems={fetchGroups.data?.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
            </div>
        </div>
    )
}

export default SingleCourseGroup