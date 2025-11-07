// import React, { memo, useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import Avatars from "../../assets/sanadSVG/imgUser2.svg";

// import { Disclosure } from "@headlessui/react";
// import { SvgsContext } from "../../Context/SvgsConetxt";


// import downArrow from "../../assets/sanadSVG/downArrow.svg"
// import downLoad from "../../assets/sanadSVG/download.svg"

// import sort from "../../assets/sanadSVG/sort.svg"
// import { ReactSVG } from "react-svg"
// import { ApisContext } from "../../Context/ApisContext";

// function RegisterCode() {
//   const [t, i18n] = useTranslation();


//   const { codesPage, setcodesPage, fetchCodes, Day, Time } = useContext(ApisContext);
//   const { leftArrow, pullBox, CourseAvatar } = useContext(SvgsContext)





//   const arr5 = [1, 1, 1, 1, 1]
//   const itemsPerPage = 5;
//   const handlePageChange = (newPage) => {
//     setcodesPage(newPage);

//   };
//   const [totalItems, settotalItems] = useState(0)
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const handleClick = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages && newPage !== codesPage) {
//       handlePageChange(newPage);
//     }
//   };

//   const displayRange = 1;
//   const pagesToShow = [];
//   const startPage = Math.max(codesPage - displayRange, 1);
//   const endPage = Math.min(codesPage + displayRange, totalPages);

//   if (startPage > 2) {
//     pagesToShow.push(1);
//     if (startPage > 3) {
//       pagesToShow.push("...");
//     }
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     pagesToShow.push(i);
//   }

//   if (endPage < totalPages - 1) {
//     if (endPage < totalPages - 2) {
//       pagesToShow.push("...");
//     }
//     pagesToShow.push(totalPages);
//   }


//   useEffect(() => {

//     settotalItems(fetchCodes.data?.metadata?.totalDocs)


//   }, [fetchCodes, codesPage])




//   return (
//     <>
//       <div className={`w-full 2xl:bg-white rounded-lg flex flex-col 2xl:p-8 2lx:px-6 pt-6 gap-y-8 ${fetchCodes.data?.data?.docs?.length > 0 ? "2xl:h-[700px]" : "2xl:h-auto py-2"}`}>
//         <div className="flex flex-col justify-between header text-start md:flex-row md:items-center ">

//           <div className="flex flex-col gap-3 main">
//             <p className="font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
//               {t("homeRev.akwad")}
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 main">
//             {fetchCodes.data?.totalPrice > 0 && <div className="font-semibold  text-size_14 md:text-size_28 xl:text-size_32 text-textGray md:text-mainColor md:font-bold">
//               <p>
//                 {fetchCodes.data?.totalPrice} {t("homeRev.pound")}
//               </p>
//             </div>}
//           </div>
//         </div>


//         {fetchCodes.isFetched ?
//           <div className="largeScreen hidden 2xl:flex flex-col h-[70%]">
//             <div className="thead bg-[#F4F7FE]">
//               <div className="Header p-6 border border-[#E1E1E1] border-b-0 rounded-2xl rounded-b-none flex justify-between">
//                 <p className="w-1/6 text-start text-textGray">
//                   {t("SingleCourse.groupName")}
//                 </p>

//                 <div className="flex w-1/6">
//                   <ReactSVG src={sort} />                <p className="text-start text-textGray">{t("homeRev.type")}</p>
//                 </div>
//                 <div className="flex w-1/6">
//                   <p className="text-start text-textGray">
//                     {t("Courses.teacherName")}
//                   </p>
//                 </div>
//                 <div className="flex w-1/6">
//                   <p className="text-start text-textGray">{t("homeRev.by")}</p>
//                 </div>
//                 <div className="flex w-1/6">
//                   <p className="text-start text-textGray">{t("homeRev.date")}</p>
//                 </div>

//                 <p className="w-1/6 text-start text-textGray">
//                   {t("homeRev.time")}
//                 </p>
//               </div>
//             </div>
//             {fetchCodes.data?.data?.docs?.length > 0 ? fetchCodes.data?.data?.docs?.map((item, i) => {
//               return (
//                 <div key={i} className="content">
//                   <div className="py-4 px-4  w-full border-[#E1E1E1] border  flex items-center justify-around ">
//                     {/* <div className="flex w-1/5 gap-2 text-start"> */}
//                     <div className="flex items-center w-1/6 font-bold nameLesson gap-x-2">
//                       {item?.price > 0 ? pullBox("#56CC5B") : pullBox("#F56767")}
//                       <div className="flex flex-col items-start">
//                         <p className="text-sm font-bold  text-mainColor text-start 2xl:text-base">
//                           {item?.price > 0 ? item?.price : item?.price * -1}
//                         </p>
//                         <p className="text-sm font-semibold  text-textGray text-start">
//                           {item?.price > 0 ? t("homeRev.revenues") : t("homeRev.payments")}
//                         </p>
//                       </div>
//                     </div>


//                     <div className="flex items-center w-1/6 font-bold nameLesson gap-x-2">

//                       {/* <ReactSVG src={courseAv} /> */}
//                       {CourseAvatar(33, 33)}

//                       <div className="flex flex-col items-start">
//                         <p className="text-sm font-bold  text-mainColor text-start">
//                           {item?.sessionAccessData?.session?.sessionNumber > 0 && `${t("SingleCourse.theSession")} ${item?.sessionAccessData?.session?.sessionNumber} `}
//                         </p>
//                         <p className="text-sm font-semibold  text-textGray text-start">
//                           {item?.sessionAccessData?.tutorCourse?.courseData?.name}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center w-1/6 font-bold nameLesson gap-x-2">

//                       <ReactSVG src={Avatars} />

//                       <div className="flex flex-col items-start">
//                         <p className="text-sm font-bold  text-mainColor text-start">
//                           {item?.sessionAccessData?.tutorCourse?.tutor?.fullname}
//                         </p>
//                         <p className="text-sm font-semibold  text-textGray text-start">
//                           {item?.sessionAccessData?.tutorCourse?.tutor?.code}
//                         </p>
//                       </div>
//                     </div>


//                     <div className="flex flex-row items-center w-1/6 gap-2 gap-x-2">

//                       <ReactSVG src={Avatars} />

//                       <div className="flex flex-col">
//                         <p className="text-sm font-bold nameLesson text-secondMainColor text-start ">
//                           {item?.createdBy?.fullname}
//                         </p>
//                         <p className="text-sm font-bold nameLesson text-textGray text-start ">
//                           {item?.createdBy?.code}
//                         </p>
//                       </div>
//                     </div>


//                     <p className="w-1/6 text-sm font-semibold nameLesson text-textGray text-start">
//                       {Day(item?.createdAt)}
//                     </p>

//                     {/* </div> */}
//                     <p className="w-1/6 text-sm font-semibold files text-textGray text-start">
//                       {Time(item?.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//               )
//             }) : <p className="p-2 my-2 font-bold text-center  rounded-xl text-mainColor">{t("homepage.nothing")}</p>}


//             {fetchCodes.data?.data?.docs?.length > 0 && <div className=" hidden md:flex flex-row items-start w-[157px] h-[48px] mt-5 rounded-full p-3 gap-2 bg-gradient-to-bl from-secondMainColor to-blue_light ">
//               <div className="icon">
//                 <ReactSVG src={downLoad} />
//               </div>
//               <p className="text-white">{t("homepage.report")}</p>
//             </div>}


//             {/* pagination */}
//           </div>
//           : arr5.map((item, index) => {
//             return <div key={index} className="flex items-center justify-between w-full px-6 py-1 lg:gap-x-4 ">
//               <div className="flex items-center w-full space-x-4 animate-pulse">
//                 <div className="flex-1 py-1 space-y-3">
//                   <div className="h-2 rounded bg-zinc-300"></div>
//                   <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//                 </div>
//               </div>
//             </div>
//           })}



//         {fetchCodes.data?.data?.docs?.length > 0 &&
//           <div className="items-center justify-center hidden pt-3 2xl:flex">

//             <div className="flex items-center justify-center my-6 gap-y-4">

//               <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                 <button
//                   onClick={() => handleClick(codesPage - 1)}
//                   // onClick={() => setcodesPage((old) => {
//                   //   Math.max(old - 1, 1)
//                   // })}
//                   className={`${codesPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                     } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                   disabled={codesPage === 1}
//                 >
//                   &lt;
//                 </button>

//                 {pagesToShow.map((page, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       if (typeof page === "number") {
//                         handleClick(page);
//                       }
//                     }}
//                     className={`${typeof page === "number"
//                       ? codesPage === page
//                         ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                         : "bg-transparent text-[#293241] hover:bg-slate-100"
//                       : "text-[#293241]"
//                       } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handleClick(codesPage + 1)}
//                   className={`${codesPage === totalPages
//                     ? "opacity-50 cursor-not-allowed"
//                     : "cursor-pointer"
//                     }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                   disabled={codesPage === totalPages || fetchCodes.isPlaceholderData}

//                 >
//                   &gt;
//                 </button>
//               </div>

//             </div>



//           </div>}




//         {/* uncomment this part if you have the data then loop in it to display the data*/}
//         <div className="flex flex-col rounded-2xl gap-y-3 2xl:hidden">

//           {fetchCodes.isFetched ? fetchCodes.data?.data?.docs?.length > 0 ?
//             fetchCodes.data?.data?.docs?.map((item, i) => {
//               return (
//                 <Disclosure key={i}>
//                   {({ open }) => (
//                     <div>
//                       <Disclosure.Button
//                         className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                           }`}
//                       >

//                         <div className="flex items-center gap-x-2">
//                           {item?.price > 0 ? pullBox("#56CC5B") : pullBox("#F56767")}

//                           <div className="flex flex-col items-start">
//                             <p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
//                               {item?.price > 0 ? item?.price : item?.price * -1}  {t("homeRev.pound")}

//                             </p>
//                             <p className="font-bold text-textGray text-size_12 sm:text-sm md:text-base">
//                               {item?.price > 0 ? t("homeRev.revenues") : t("homeRev.payments")}
//                             </p>

//                           </div>
//                         </div>



//                         <div className="flex flex-col items-start">
//                           <p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
//                             {item?.sessionAccessData?.session?.sessionNumber > 0 && `${t("SingleCourse.theSession")} ${item?.sessionAccessData?.session?.sessionNumber} `}

//                           </p>
//                           <p className="font-bold text-textGray text-size_12 sm:text-sm md:text-base">
//                             {item?.sessionAccessData?.tutorCourse?.courseData?.name}
//                           </p>

//                         </div>


//                         <div className="flex items-center gap-x-2 ">
//                           {open ? <ReactSVG src={downArrow} /> : leftArrow()}
//                         </div>




//                       </Disclosure.Button>
//                       <Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                         <div className="flex items-center justify-between w-full">
//                           <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                             {t("homeRev.type")}
//                           </p>
//                           <div className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray">

//                             {item?.type === "custom" ? (
//                               <>
//                                 <p>{t("homepage.custom")}</p>
//                                 <p className="text-xs font-semibold text-textGray">{item?.customData?.title}</p>
//                               </>
//                             ) : item?.type === "attendance" ? (

//                               <p>{t("Logs.attendTrue")} </p>


//                             ) : item?.type === "registeration" ? (

//                               <p>{t("homepage.registration")}</p>

//                             ) : item?.type === "card" ? (
//                               <>
//                                 <p>{t("homepage.card")}</p>
//                                 <p className="text-xs font-semibold text-textGray">{i18n.language === "ar" ? item?.grade?.nameAr : item?.grade?.nameEn}</p>

//                               </>
//                             ) : item?.type === "sessionAccess" && (

//                               <p>{t("homepage.sessionAccess")}</p>
//                             )
//                             }


//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between w-full">
//                           <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                             {t("homeRev.by")}
//                           </p>
//                           <div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-mainColor ">
//                             {item?.createdBy?.fullname} - {item?.createdBy?.code}

//                           </div>
//                         </div>


//                         <div className="flex items-center justify-between w-full">
//                           <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                             {t("Courses.teacherName")}
//                           </p>
//                           <div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-mainColor ">
//                             {item?.sessionAccessData?.tutorCourse?.tutor?.fullname} -  {item?.sessionAccessData?.tutorCourse?.tutor?.code}

//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between w-full">
//                           <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                             {t("homeRev.date")}
//                           </p>
//                           <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14">
//                             {/* {`${new Date(item?.createdAt).getUTCDate()}/${new Date(item?.createdAt).getUTCMonth() + 1}/${new Date(item?.createdAt).getUTCFullYear()}`} */}
//                             {Day(item?.createdAt)}

//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between w-full">
//                           <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                             {t("homeRev.time")}
//                           </p>
//                           <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14">
//                             {/* {convertTo12HourFormat(`${new Date(item?.createdAt).getUTCHours()}:${new Date(item?.createdAt).getUTCMinutes()}`)} */}
//                             {Time(item?.createdAt)}

//                           </div>
//                         </div>
//                       </Disclosure.Panel>
//                     </div>
//                   )}
//                 </Disclosure>
//               )
//             }) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">{t("homepage.nothing")}</p>

//             : arr5.map((item, i) => {
//               return <div key={i} className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//                 <div className="flex items-center w-full space-x-4 animate-pulse">
//                   <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//                   <div className="flex-1 py-1 space-y-3">
//                     <div className="h-2 rounded bg-zinc-300"></div>
//                     <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//                   </div>
//                 </div>
//               </div>
//             })
//           }







//           {fetchCodes.data?.data?.docs?.length > 0 &&
//             <div className="flex items-center justify-center gap-y-4 ">

//               <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                 <button
//                   onClick={() => handleClick(codesPage - 1)}
//                   // onClick={() => setcodesPage((old) => {
//                   //   Math.max(old - 1, 1)
//                   // })}
//                   className={`${codesPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                     } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                   disabled={codesPage === 1}
//                 >
//                   &lt;
//                 </button>

//                 {pagesToShow.map((page, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       if (typeof page === "number") {
//                         handleClick(page);
//                       }
//                     }}
//                     className={`${typeof page === "number"
//                       ? codesPage === page
//                         ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                         : "bg-transparent text-[#293241] hover:bg-slate-100"
//                       : "text-[#293241]"
//                       } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handleClick(codesPage + 1)}
//                   className={`${codesPage === totalPages
//                     ? "opacity-50 cursor-not-allowed"
//                     : "cursor-pointer"
//                     }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                   disabled={codesPage === totalPages || fetchCodes.isPlaceholderData}

//                 >
//                   &gt;
//                 </button>
//               </div>
//             </div>}

//         </div>
//       </div >
//     </>
//   );
// }

// export default memo(RegisterCode);