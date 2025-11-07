// import React, { useContext, useEffect, useState, memo } from "react";
// import { useTranslation } from "react-i18next";
// // import Pagination from "../Pagination/Pagination";
// // import Avatars from "../../assets/Avatars.png";
// // import axios from "axios";

// // import { MainContext } from "../../Context/MainContext";
// import { Disclosure } from "@headlessui/react";
// import { SvgsContext } from "../../Context/SvgsConetxt";
// import { ApisContext } from "../../Context/ApisContext";
// import { Listbox } from "@headlessui/react";
// import profile from "../../assets/sanadSVG/imgUser2.svg"
// import { ReactSVG } from "react-svg"
// import downArrow from "../../assets/sanadSVG/downArrow.svg"
// import sort from "../../assets/sanadSVG/sort.svg"
// import downLoad from "../../assets/sanadSVG/download.svg"
// import plus from '../../assets/sanadSVG/plusTable.svg'
// import filterIcon from "../../assets/sanadSVG/filterIcon.svg"
// import { MainContext } from "../../Context/MainContext";



// const arr = [2, 2, 2, 2, 2]
// function TotalServing() {
//   const [t, i18n] = useTranslation();
//   // const tens = [2, 3, 4, 5, 6, 7, 8, 9, 10]

//   const { Day, Time, selectedspcializedItem, setselectedspcializedItem, spcializedPaymentsPage, setspcializedPaymentsPage, fetchSpcialedPaymet, spcializedPaymentsTypes

//   } = useContext(ApisContext);

//   const { leftArrow, pullBox } = useContext(SvgsContext)
//   const { Toggler, setToggler } = useContext(MainContext)



//   const itemsPerPage = 5;
//   const handlePageChange = (newPage) => {
//     setspcializedPaymentsPage(newPage);

//   };
//   const [totalItems, settotalItems] = useState(0)
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const handleClick = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages && newPage !== spcializedPaymentsPage) {
//       handlePageChange(newPage);
//     }
//   };

//   const displayRange = 1;
//   const pagesToShow = [];
//   const startPage = Math.max(spcializedPaymentsPage - displayRange, 1);
//   const endPage = Math.min(spcializedPaymentsPage + displayRange, totalPages);

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

//     settotalItems(fetchSpcialedPaymet.data?.metadata?.totalDocs)


//   }, [fetchSpcialedPaymet, spcializedPaymentsPage])





//   const filteredData = spcializedPaymentsTypes.filter(item => {
//     return selectedspcializedItem.value !== item.value
//   })








//   return (
//     <>
//       <div className={`w-full xl:bg-white rounded-lg flex flex-col xl:p-8 gap-y-8 ${fetchSpcialedPaymet.data?.data?.docs?.length > 0 ? "xl:h-[640px]" : "xl:h-auto "}`}>


//         <div className="flex flex-col justify-between header text-start lg:flex-row gap-y-4 ">

//           <div className="flex items-center justify-between w-full ">
//             <p className="font-extrabold lg:justify-start text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
//               {t("homeRev.totalLec")}
//             </p>



//             <button className=" lg:hidden"
//               onClick={() => setToggler({ ...Toggler, cash: true })}
//             >
//               <ReactSVG src={plus} />
//             </button>
//           </div>


//           <div className="w-full main lg:flex lg:items-center lg:gap-3 lg:justify-between lg:w-auto">





//             <div className="dropDown w-full lg:min-w-[200px] ">
//               <Listbox
//                 value={selectedspcializedItem}
//                 onChange={(e) => {
//                   setselectedspcializedItem(e)
//                   setspcializedPaymentsPage(1)
//                 }} >
//                 {({ open }) => (
//                   <div className="relative ">

//                     <Listbox.Button className={`font-semibold     text-mainColor  py-3  text-sm   
//                        w-full flex items-center justify-between px-4 cursor-pointer rounded-lg bg-white xl:bg-[#F4F7FE] text-left focus:outline-none  sm:text-sm `}>



//                       <div className="flex items-center gap-x-4">

//                         <span  >
//                           <ReactSVG src={filterIcon} />
//                         </span>
//                         <span className={`block truncate tex-sm`}>
//                           {selectedspcializedItem.name}
//                         </span>
//                       </div>

//                       <span  >
//                         <ReactSVG src={downArrow} />
//                       </span>

//                     </Listbox.Button>


//                     <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-y-auto text-base bg-white rounded-md shadow max-h-40 // xl:bg-bg_mainLayout scrollbar-thin focus:outline-none sm:text-sm ">
//                       {filteredData.map((person, personIdx) => (

//                         <Listbox.Option
//                           key={personIdx}
//                           className={({ active }) =>
//                             ` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor text-size_12 sm:text-sm  '}`}
//                           value={person} >
//                           {({ selectedspcializedItem }) => (
//                             <span className={`block truncate text-size_12 sm:text-sm   ${selectedspcializedItem ? 'font-medium' : 'font-normal'}`}>
//                               {person.name}
//                             </span>
//                           )}
//                         </Listbox.Option>
//                       ))}
//                     </Listbox.Options>

//                   </div>
//                 )
//                 }
//               </Listbox>

//             </div>


//             <button className="hidden lg:block "
//               onClick={() => setToggler({ ...Toggler, cash: true })}
//             >
//               <ReactSVG src={plus} />
//             </button>


//           </div>

//         </div>
//         {fetchSpcialedPaymet.isFetched ?
//           <div className="largeScreen hidden xl:flex flex-col h-[70%]">

//             <div className={`Header  bg-[#F4F7FE] p-6   border border-[#E1E1E1]   rounded-2xl rounded-b-none flex justify-between ${fetchSpcialedPaymet.data?.data?.docs.length > 0 ? "h-[600]" : "h-auto"}`}>
//               <p className="w-1/5 text-base text-start text-textGray">
//                 {t("homepage.paymentReason")}
//               </p>

//               <div className="flex w-1/5 text-base gap-x-4">
//                 <ReactSVG src={sort} />
//                 <p className="text-start text-textGray">{t("homeRev.type")}</p>
//               </div>
//               <div className="flex w-1/5 text-base">
//                 <p className="text-start text-textGray">{t("homeRev.by")}</p>
//               </div>
//               <div className="flex w-1/5 text-base">
//                 <p className="text-start text-textGray">{t("homeRev.date")}</p>
//               </div>

//               <p className="w-1/5 text-base text-start text-textGray">
//                 {t("homeRev.time")}
//               </p>
//             </div>

//             {fetchSpcialedPaymet.data?.data?.docs.length > 0 ? fetchSpcialedPaymet.data?.data?.docs?.map((item, i) => {
//               const lastElement = fetchSpcialedPaymet.data?.data?.docs.length - 1

//               return (

//                 <div key={i} className={`py-4 px-6 w-full border-[#E1E1E1] border  flex items-center justify-between relative ${i === lastElement && "rounded-b-2xl"} border border-t-0 `}>
//                   {/* <div className="flex w-1/5 gap-2 text-start"> */}

//                   <div className="flex items-center w-1/5 font-bold nameLesson gap-x-2">
//                     {item?.price > 0 ? pullBox("#56CC5B") : pullBox("#F56767")}
//                     <div className="flex flex-col items-start">
//                       <p className="text-sm font-bold  text-mainColor text-start 2xl:text-base">
//                         {item?.price > 0 ? item?.price : item?.price * -1}
//                       </p>
//                       <p className="font-semibold  text-textGray text-start text-size_12">
//                         {item?.price > 0 ? t("homeRev.revenues") : t("homeRev.payments")}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="w-1/5 px-4 text-sm font-bold nameLesson text-mainColor text-start 2xl:text-base">
//                     {/* {item?.type === "custom" ? item?.customData?.title : item.type} */}
//                     {item?.type === "custom" ? (
//                       <>
//                         <p>{t("homepage.custom")}</p>
//                         <p className="text-xs font-semibold text-textGray">{item?.customData?.title}</p>
//                       </>
//                     ) : item?.type === "attendance" ? (

//                       <p>{t("Logs.attendTrue")} </p>


//                     ) : item?.type === "registeration" ? (

//                       <p>{t("homepage.registration")}</p>

//                     ) : item?.type === "card" ? (
//                       <>
//                         <p>{t("homepage.card")}</p>
//                         <p className="text-xs font-semibold text-textGray">{i18n.language === "ar" ? item?.grade?.nameAr : item?.grade?.nameEn}</p>

//                       </>
//                     ) : item?.type === "sessionAccess" && (

//                       <p>{t("homepage.sessionAccess")}</p>
//                     )

//                     }

//                   </div>

//                   <div className={" w-1/5 flex items-center gap-1"}>
//                     {item?.profileImage ? <img src={item?.profileImage} alt="profile img" /> : <ReactSVG src={profile} />}
//                     <div className={"flex flex-col items-start "}>
//                       <p className="text-sm font-bold nameLesson text-mainColor ">
//                         {item?.createdBy?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}
//                       </p>
//                       <p className="text-xs font-bold nameLesson text-textGray ">
//                         {item?.createdBy?.code}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="w-1/5 text-sm font-semibold nameLesson text-textGray text-start">
//                     {/* {`${new Date(item?.createdAt).getUTCDate()}/${new Date(item?.createdAt).getUTCMonth() + 1}/${new Date(item?.createdAt).getUTCFullYear()}`} */}
//                     {Day(item?.createdAt)}
//                   </p>

//                   {/* </div> */}
//                   <p className="w-1/5 text-sm font-semibold files text-textGray text-start">
//                     {/* {convertTo12HourFormat(`${new Date(item?.createdAt).getUTCHours()}:${new Date(item?.createdAt).getUTCMinutes()}`)} */}
//                     {Time(item?.createdAt)}

//                   </p>
//                 </div>

//               );
//             }) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">{t("homepage.nothing")}</p>}




//             {/* paginations */}

//             {fetchSpcialedPaymet.data?.data?.docs.length > 0 &&
//               <div className="relative flex items-center justify-center w-full py-2 mt-4">
//                 <div className=" flex absolute translate-y-[-50%] top-[50%] start-0 flex-row items-start w-[157px] h-[48px]   rounded-full p-3 gap-2 bg-gradient-to-bl from-secondMainColor to-blue_light ">
//                   <div className="icon">
//                     <ReactSVG src={downLoad} />
//                   </div>
//                   <p className="text-white">{t("homepage.report")}</p>
//                 </div>


//                 <div className="flex items-center justify-center gap-y-4 ">
//                   {fetchSpcialedPaymet.data?.data?.docs.length > 0 &&
//                     <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                       <button
//                         onClick={() => handleClick(spcializedPaymentsPage - 1)}
//                         // onClick={() => setspcializedPaymentsPage((old) => {
//                         //   Math.max(old - 1, 1)
//                         // })}
//                         className={`${spcializedPaymentsPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                           } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                         disabled={spcializedPaymentsPage === 1}
//                       >
//                         &lt;
//                       </button>

//                       {pagesToShow.map((page, index) => (
//                         <button
//                           key={index}
//                           onClick={() => {
//                             if (typeof page === "number") {
//                               handleClick(page);
//                             }
//                           }}
//                           className={`${typeof page === "number"
//                             ? spcializedPaymentsPage === page
//                               ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                               : "bg-transparent text-[#293241] hover:bg-slate-100"
//                             : "text-[#293241]"
//                             } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                         >
//                           {page}
//                         </button>
//                       ))}
//                       <button
//                         onClick={() => handleClick(spcializedPaymentsPage + 1)}
//                         className={`${spcializedPaymentsPage === totalPages
//                           ? "opacity-50 cursor-not-allowed"
//                           : "cursor-pointer"
//                           }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                         disabled={spcializedPaymentsPage === totalPages || fetchSpcialedPaymet.isPlaceholderData}

//                       >
//                         &gt;
//                       </button>
//                     </div>
//                   }
//                 </div>


//               </div>
//             }

//           </div>
//           : arr.map((item, index) => {
//             return <div key={index} className="items-center justify-between hidden w-full px-6 py-1 lg:gap-x-4 xl:flex ">
//               <div className="flex items-center w-full space-x-4 animate-pulse">
//                 <div className="flex-1 py-1 space-y-3">
//                   <div className="h-2 rounded bg-zinc-300"></div>
//                   <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//                 </div>
//               </div>
//             </div>
//           })

//         }









//         <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">

//           {fetchSpcialedPaymet.isFetched ?
//             fetchSpcialedPaymet.data?.data?.docs?.length > 0 ? fetchSpcialedPaymet.data?.data?.docs?.map((item, i) => {
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

//                               <p>{t("Logs.attendTrue")} {t("homepage.and")} {t("Logs.attendFalse")}</p>


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
//                             {item?.createdBy?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between w-full">
//                           <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                             {t("homeRev.date")}
//                           </p>
//                           <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14">
//                             {Day(item?.createdAt)}


//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between w-full">
//                           <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                             {t("homeRev.time")}
//                           </p>
//                           <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14">
//                             {Time(item?.createdAt)}


//                           </div>
//                         </div>
//                       </Disclosure.Panel>
//                     </div>
//                   )}
//                 </Disclosure>
//               )
//             }) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor xl:bg-transparent">{t("homepage.nothing")}</p>

//             : arr.map((item, i) => {
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


//           {fetchSpcialedPaymet.data?.data?.docs?.length > 0 &&
//             <div className="flex items-center justify-center gap-y-4 ">

//               <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                 <button
//                   onClick={() => handleClick(spcializedPaymentsPage - 1)}
//                   // onClick={() => setspcializedPaymentsPage((old) => {
//                   //   Math.max(old - 1, 1)
//                   // })}
//                   className={`${spcializedPaymentsPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                     } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                   disabled={spcializedPaymentsPage === 1}
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
//                       ? spcializedPaymentsPage === page
//                         ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                         : "bg-transparent text-[#293241] hover:bg-slate-100"
//                       : "text-[#293241]"
//                       } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handleClick(spcializedPaymentsPage + 1)}
//                   className={`${spcializedPaymentsPage === totalPages
//                     ? "opacity-50 cursor-not-allowed"
//                     : "cursor-pointer"
//                     }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                   disabled={spcializedPaymentsPage === totalPages || fetchSpcialedPaymet.isPlaceholderData}

//                 >
//                   &gt;
//                 </button>
//               </div>
//             </div>}

//         </div>

//       </div>
//     </>
//   );
// }

// export default memo(TotalServing);
