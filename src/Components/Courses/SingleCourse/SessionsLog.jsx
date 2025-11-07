// import React, { useContext, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { downArrow, filterIcon, filterIconWhite, downArrowFilter, downArrowFilterWhite, sort, deletIcon, deletIconSmall, navigator, T, dots } from "../../../Svgs"
// import { Disclosure } from "@headlessui/react";
// import { Link } from "react-router-dom";
// import { MainContext } from "../../../Context/MainContext";
// import Pagination from "../../Pagination/Pagination";
// import { SvgsContext } from "../../../Context/SvgsConetxt";

// let x = [1, 2, 3, 4, 5, 6, 78, 4213, 12, 34, 364, 12, 351243, 5123, 8, 34, 24, 134, 13, 14153, 42, 3, 4, 652, 623, 263]

// const itemsPerPage = 5;

// function SessionsLog() {
//     const { Toggler, setToggler } = useContext(MainContext);
//     const { leftArrow } = useContext(SvgsContext)


//     const [t] = useTranslation();
//     const [currentPage, setCurrentPage] = useState(1);

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     // Calculate the start and end indexes for the current page
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = Math.min(startIndex + itemsPerPage, x.length)
//     const visibleData2 = x.slice(startIndex, endIndex)


//     return (
//         <>
//             <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 pt-6 gap-y-8 xl:h-[580px]  ">
//                 <div className="header flex justify-between items-center ">


//                     <div className="main flex flex-col gap-3">
//                         <p className="font-extrabold  text-size_26 md:text-size_28    text-mainColor">
//                             {t("SingleCourse.sessionLog")}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="largeScreen hidden xl:flex flex-col h-[70%]">

//                     <div className="thead bg-[#F4F7FE] border border-[#E1E1E1]">
//                         <div className="Header p-6  border-b-0 rounded-2xl rounded-b-none flex justify-between">
//                             <p className="text-start text-sm text-textGray w-1/3">
//                                 {t("SingleCourse.sessionNumber")}
//                             </p>

//                             <div className="flex gap-x-2  w-1/3">

//                                 {sort}
//                                 <p className="text-start text-sm text-textGray">
//                                     {t("SingleCourse.numberOfFiles")}
//                                 </p>
//                             </div>

//                             <p className="text-start text-sm text-textGray  w-1/3">
//                                 {t("SingleCourse.topicName")}
//                             </p>

//                         </div>
//                     </div>
//                     {visibleData2.map((item, i) => {
//                         return (

//                             <div key={i} className="content w-full border-[#E1E1E1] border-t-0 border flex items-center justify-center">
//                                 <div className="py-[22px] px-6 w-full flex items-center justify-between relative">

//                                     {/* <div className="flex text-start gap-2 w-1/5"> */}

//                                     <p className="nameLesson font-bold text-mainColor text-start px-4 text-sm  w-1/3">
//                                         fas
//                                     </p>

//                                     <p className="nameLesson font-bold text-mainColor text-start px-4 text-sm  w-1/3">
//                                         fasd
//                                     </p>

//                                     {/* </div> */}
//                                     <p className="files font-semibold text-sm text-mainColor text-start ps-3 w-1/3">
//                                         kkjjkj
//                                     </p>


//                                 </div>

//                             </div>
//                         )
//                     })}

//                 </div>
//                 <div className="hidden xl:flex items-center justify-center">
//                     <Pagination
//                         totalItems={x?.length}
//                         itemsPerPage={itemsPerPage}
//                         currentPage={currentPage}
//                         onPageChange={handlePageChange}
//                     />
//                 </div>


//                 {/* uncomment this part if you have the data then loop in it to display the data*/}
//                 <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">

//                     {visibleData2.map((item, i) => {
//                         return (
//                             <Disclosure key={i}>
//                                 {({ open }) => (
//                                     <div>
//                                         <Disclosure.Button
//                                             className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                                                 }`}
//                                         >

//                                             <div className="flex items-center justify-center gap-x-2">
//                                                 <div className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
//                                                     {t("SingleCourse.session")} 20
//                                                 </div>
//                                             </div>

//                                             <div className="flex gap-x-2 items-center ">
//                                                 {open ? downArrow : leftArrow()}
//                                             </div>

//                                         </Disclosure.Button>
//                                         <Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                                             <div className="flex justify-between items-center w-full">
//                                                 <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center  w-1/4 text-nowrap">
//                                                     {t("SingleCourse.numberOfFiles")}
//                                                 </p>
//                                                 <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center"> text-nowrap

//                                                     jk;
//                                                 </p>
//                                             </div>
//                                             <div className="flex justify-between items-center w-full">
//                                                 <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center w-1/4  text-nowrap">
//                                                     {t("SingleCourse.topicName")}
//                                                 </p>
//                                                 <p className="font-semibold text-textGray bg-red-50 rounded-xl py-1 px-2  text-size_12 sm:text-sm">
//                                                     arabic
//                                                 </p>
//                                             </div>

//                                         </Disclosure.Panel>
//                                     </div>
//                                 )}
//                             </Disclosure>
//                         )
//                     })}

//                     <Pagination
//                         totalItems={x?.length}
//                         itemsPerPage={itemsPerPage}
//                         currentPage={currentPage}
//                         onPageChange={handlePageChange}
//                     />

//                 </div>




//             </div >

//         </>
//     );
// }

// export default React.memo(SessionsLog)