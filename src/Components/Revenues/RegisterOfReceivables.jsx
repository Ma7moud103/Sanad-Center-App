// import React, { Fragment, useContext, useEffect, useState, memo } from "react";
// import { useTranslation } from "react-i18next";

// import filterIcon from "../../assets/sanadSVG/filterIcon.svg"
// import profile from '../../assets/sanadSVG/imgUser2.svg'
// import downArrowFilter from "../../assets/sanadSVG/downArrow.svg"
// import downLoad from "../../assets/sanadSVG/download.svg"

// import { ReactSVG } from "react-svg"
// import { Disclosure, Listbox, Transition } from "@headlessui/react";
// import { SvgsContext } from "../../Context/SvgsConetxt";
// import { ApisContext } from "../../Context/ApisContext";

// function RegisterOfReceivables() {
//   const arr5 = [1, 1, 1, 1, 1]
//   const [t, i18n] = useTranslation();

//   const { Day, Time, desPages, setdesPages, duseTypes, selectedDesType, setselectedDesType, fetchDes } = useContext(ApisContext);

//   const { pullBox, leftArrow } = useContext(SvgsContext)

//   const itemsPerPage = 5;
//   const handlePageChange = (newPage) => {
//     setdesPages(newPage);

//   };
//   const [totalItems, settotalItems] = useState(0)
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const handleClick = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages && newPage !== desPages) {
//       handlePageChange(newPage);
//     }
//   };

//   const displayRange = 1;
//   const pagesToShow = [];
//   const startPage = Math.max(desPages - displayRange, 1);
//   const endPage = Math.min(desPages + displayRange, totalPages);

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

//     settotalItems(fetchDes.data?.metadata?.totalDocs)


//   }, [fetchDes, desPages])


//   return (

//     <div className={`w-full xl:bg-white rounded-lg flex flex-col xl:px-6 gap-y-8 py-6   ${fetchDes.data?.data?.length > 0 ? "xl:h-[650px]" : "xl:h-auto "}`}>
//       <div className="flex flex-col justify-between header text-start sm:flex-row sm:items-center ">
//         <div className="flex flex-col justify-between w-full gap-3 main sm:flex-row">

//           <p className="font-extrabold text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
//             {t("homeRev.mostahekat")}
//           </p>

//           <div className="main flex flex-col gap-3 w-full lg:w-[200px] ">
//             <Listbox
//               value={selectedDesType}
//               onChange={(value) => {
//                 setselectedDesType(value)
//                 setdesPages(1)
//               }}


//             >
//               {({ open }) => (
//                 <div className="relative w-full">

//                   <Listbox.Button className={`font-semibold w-full  text-mainColor px-4 h-full  text-sm leading-5 py-3   focus:ring-0  items-center  relative  flex cursor-pointer rounded-lg bg-white xl:bg-[#F4F7FE] text-left focus:outline-none  sm:text-sm`}>


//                     <div className="flex items-center gap-x-3">
//                       <div className="flex items-center justify-center">
//                         <ReactSVG src={filterIcon} />
//                       </div>

//                       <span className={`block truncate text-sm`}>
//                         {selectedDesType.name}
//                       </span>
//                     </div>

//                     <span className={`pointer-events-none absolute    end-4 flex items-center  rounded-full `}>
//                       <ReactSVG src={downArrowFilter} />
//                     </span>

//                   </Listbox.Button>

//                   <Transition
//                     as={Fragment}
//                     leave="transition ease-in duration-100"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                   >
//                     <Listbox.Options className="absolute  mt-1 max-h-12 z-10  w-full
//                         scrollbar-thin   overflow-y-scroll rounded-md bg-white xl:bg-[#F4F7FE] py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow">
//                       {duseTypes?.filter((item) => item?.name !== selectedDesType?.name)?.map((person, personIdx) => (

//                         <Listbox.Option
//                           key={personIdx}
//                           className={({ active }) =>
//                             ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'}`}
//                           value={person} >
//                           {({ selectedDesType }) => (
//                             <span className={`block text-sm truncate ${selectedDesType ? 'font-medium' : 'font-normal'}`}>
//                               {person?.name}
//                             </span>
//                           )}
//                         </Listbox.Option>
//                       ))}
//                     </Listbox.Options>
//                   </Transition>

//                 </div>
//               )
//               }
//             </Listbox>
//           </div>


//         </div>


//       </div>
//       {fetchDes.isFetched ?

//         <div className={`largeScreen hidden xl:block    ${fetchDes.data?.data?.length > 0 ? "h-[600px]" : "h-auto"}`}>

//           <div className="Header bg-[#F4F7FE] p-6 border border-[#E1E1E1]   rounded-2xl rounded-b-none flex justify-between">
//             <p className="w-1/5 text-start text-textGray" >
//               {t("homepage.paymentReason")}
//             </p>


//             <p className="w-1/5 text-start text-textGray">{t("homeRev.type")}</p>


//             <div className="flex w-1/5" >
//               <p className="text-start text-textGray">{t("homeRev.by")}</p>
//             </div>
//             <div className="flex w-1/5" >
//               <p className="text-start text-textGray">{t("homeRev.date")}</p>
//             </div>

//             <p className="w-1/5 text-start text-textGray" >
//               {t("homeRev.time")}
//             </p>
//             {/* <p className="w-1/6 text-start text-textGray">
//                 {t("PopupWindows.cardCode")}
//               </p> */}
//           </div>


//           {fetchDes.data?.data?.length > 0 ? fetchDes.data?.data?.map((item, i) => {
//             const lastElement = fetchDes.data?.data?.length - 1

//             return (

//               <div key={i} className={`py-4 px-6  w-full border-[#E1E1E1] border  flex items-center justify-between relative ${i === lastElement && "rounded-b-2xl"} border border-t-0 `}>
//                 {/* <div className="flex w-1/5 gap-2 text-start"> */}

//                 <div className="flex items-center w-1/5 font-bold nameLesson gap-x-2">
//                   {item?.forWho === "center" ? pullBox("#56CC5B") : pullBox("#F56767")}
//                   <div className="flex flex-col items-start">
//                     <p className="text-sm font-bold  text-mainColor text-start 2xl:text-base">
//                       {item?.price > 0 ? item?.price : item?.price * -1}
//                     </p>
//                     <p className="font-semibold  text-textGray text-start text-size_12">
//                       {item?.forWho === "center" ? t("homeRev.revenues") : t("homeRev.payments")}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-1/5 text-sm font-bold nameLesson text-mainColor text-start">
//                   {item?.type === "custom" ? (
//                     <>
//                       <p>{t("homepage.custom")}</p>
//                       <p className="text-xs font-semibold text-textGray">{item?.title}</p>
//                     </>
//                   ) : item?.type === "attendance" ? (
//                     <>
//                       <p>{t("Logs.attendTrue")} </p>

//                     </>
//                   ) : item?.type === "registeration" ? (<>
//                     <p>{t("homepage.registration")}</p>
//                   </>) : item?.type === "card" ? (<>
//                     <p>{t("homepage.card")}</p>
//                     <p className="text-xs font-semibold text-textGray">{i18n.language === "ar" ? item?.grade?.nameAr : item?.grade?.nameEn}</p>

//                   </>) : item?.type === "sessionAccess" && (<>
//                     <p>{t("homepage.sessionAccess")}</p>
//                   </>)

//                   }
//                 </div>



//                 <div className={" w-1/5 flex items-center gap-1"}>
//                   {item?.profileImage ? <img src={item?.profileImage} alt="profile img" /> : <ReactSVG src={profile} />}
//                   <div className={"flex flex-col items-start "}>
//                     <p className="text-sm font-bold nameLesson text-mainColor ">
//                       {item?.createdBy?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}
//                     </p>
//                     <p className="text-xs font-bold nameLesson text-textGray ">
//                       {item?.createdBy?.code}
//                     </p>
//                   </div>
//                 </div>

//                 <p className="w-1/5 text-sm font-semibold nameLesson text-textGray text-start">
//                   {Day(item?.createdAt)}
//                 </p>

//                 {/* </div> */}
//                 <p className="w-1/5 text-sm font-semibold files text-textGray text-start">
//                   {Time(item?.createdAt)}

//                 </p>

//                 {/* <p className="w-1/6 text-sm font-bold nameLesson text-mainColor text-start 2xl:text-base">
//                     {item.cardCode}
//                   </p> */}
//               </div>

//             );
//           }) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor xl:bg-transparent">{t("homepage.nothing")}</p>}



//           {/* paginations */}

//           {fetchDes.data?.data?.length > 0 &&
//             <div className="relative flex items-center justify-center w-full py-2 mt-4">
//               <div className=" flex absolute translate-y-[-50%] top-[50%] start-0 flex-row items-start w-[157px] h-[48px]   rounded-full p-3 gap-2 bg-gradient-to-bl from-secondMainColor to-blue_light ">
//                 <div className="icon">
//                   <ReactSVG src={downLoad} />
//                 </div>
//                 <p className="text-white">{t("homepage.report")}</p>
//               </div>


//               <div className="flex items-center justify-center gap-y-4 ">
//                 {fetchDes.data?.data?.length > 0 &&
//                   <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                     <button
//                       onClick={() => handleClick(desPages - 1)}
//                       // onClick={() => setdesPages((old) => {
//                       //   Math.max(old - 1, 1)
//                       // })}
//                       className={`${desPages === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                         } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                       disabled={desPages === 1}
//                     >
//                       &lt;
//                     </button>

//                     {pagesToShow.map((page, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           if (typeof page === "number") {
//                             handleClick(page);
//                           }
//                         }}
//                         className={`${typeof page === "number"
//                           ? desPages === page
//                             ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                             : "bg-transparent text-[#293241] hover:bg-slate-100"
//                           : "text-[#293241]"
//                           } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => handleClick(desPages + 1)}
//                       className={`${desPages === totalPages
//                         ? "opacity-50 cursor-not-allowed"
//                         : "cursor-pointer"
//                         }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                       disabled={desPages === totalPages || fetchDes.isPlaceholderData}

//                     >
//                       &gt;
//                     </button>
//                   </div>
//                 }
//               </div>


//             </div>
//           }

//         </div>
//         : arr5.map((item, index) => {
//           return <div key={index} className="items-center justify-between hidden w-full px-6 py-1 lg:gap-x-4 xl:flex ">
//             <div className="flex items-center w-full space-x-4 animate-pulse">
//               <div className="flex-1 py-1 space-y-3">
//                 <div className="h-2 rounded bg-zinc-300"></div>
//                 <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//               </div>
//             </div>
//           </div>
//         })

//       }
//       {/* uncomment this part if you have the data then loop in it to display the data*/}

//       <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
//         {fetchDes.isFetched ? <>
//           {fetchDes.data?.data?.length > 0 ? fetchDes.data?.data?.map((item, i) => {
//             return (
//               <Disclosure key={i}>
//                 {({ open }) => (
//                   <div>
//                     <Disclosure.Button
//                       className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                         }`}
//                     >

//                       <div className="flex items-center gap-x-2">
//                         {item?.forWho === "center" ? pullBox("#56CC5B") : pullBox("#F56767")}

//                         <div className="flex flex-col items-start">
//                           <p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
//                             {item?.price > 0 ? item?.price : item?.price * -1}  {t("homeRev.pound")}

//                           </p>
//                           <p className="font-bold text-textGray text-size_12 sm:text-sm md:text-base">
//                             {item?.forWho === "center" ? t("homeRev.revenues") : t("homeRev.payments")}
//                           </p>

//                         </div>
//                       </div>

//                       <div className="flex items-center gap-x-2 ">
//                         {open ? <ReactSVG src={downArrowFilter} /> : leftArrow()}
//                       </div>




//                     </Disclosure.Button>
//                     <Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                       <div className="flex items-center justify-between w-full">
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                           {t("homeRev.type")}
//                         </p>
//                         <div className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray">

//                           {item?.type === "custom" ? (
//                             <>
//                               <p>{t("homepage.custom")}</p>
//                               <p className="text-xs font-semibold text-textGray">{item?.title}</p>
//                             </>
//                           ) : item?.type === "attendance" ? (
//                             <>
//                               <p>{t("Logs.attendTrue")}</p>

//                             </>
//                           ) : item?.type === "registeration" ? (<>
//                             <p>{t("homepage.registration")}</p>
//                           </>) : item?.type === "card" ? (<>
//                             <p>{t("homepage.card")}</p>
//                             <p className="text-xs font-semibold text-textGray">{i18n.language === "ar" ? item?.grade?.nameAr : item?.grade?.nameEn}</p>

//                           </>) : item?.type === "sessionAccess" && (<>
//                             <p>{t("homepage.sessionAccess")}</p>
//                           </>)

//                           }


//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between w-full">
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                           {t("homeRev.by")}
//                         </p>
//                         <div className="flex flex-wrap justify-end gap-2 font-semibold text-size_12 sm:text-size__14 text-mainColor ">
//                           {item?.createdBy?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}

//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between w-full">
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                           {t("homeRev.date")}
//                         </p>
//                         <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14">
//                           {Day(item?.createdAt)}


//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between w-full">
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                           {t("homeRev.time")}
//                         </p>
//                         <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14">
//                           {Time(item?.createdAt)}


//                         </div>
//                       </div>
//                     </Disclosure.Panel>
//                   </div>
//                 )}
//               </Disclosure>
//             )
//           }) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">{t("homepage.nothing")}</p>}



//           {fetchDes.data?.data?.length > 0 &&
//             <div className="flex items-center justify-center gap-y-4 ">

//               <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                 <button
//                   onClick={() => handleClick(desPages - 1)}
//                   // onClick={() => setdesPages((old) => {
//                   //   Math.max(old - 1, 1)
//                   // })}
//                   className={`${desPages === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                     } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                   disabled={desPages === 1}
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
//                       ? desPages === page
//                         ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                         : "bg-transparent text-[#293241] hover:bg-slate-100"
//                       : "text-[#293241]"
//                       } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handleClick(desPages + 1)}
//                   className={`${desPages === totalPages
//                     ? "opacity-50 cursor-not-allowed"
//                     : "cursor-pointer"
//                     }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                   disabled={desPages === totalPages || fetchDes.isPlaceholderData}

//                 >
//                   &gt;
//                 </button>
//               </div>
//             </div>}
//         </>

//           : arr5.map((item, i) => {
//             return <div key={i} className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//               <div className="flex items-center w-full space-x-4 animate-pulse">
//                 <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//                 <div className="flex-1 py-1 space-y-3">
//                   <div className="h-2 rounded bg-zinc-300"></div>
//                   <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//                 </div>
//               </div>
//             </div>
//           })}

//       </div>

//     </div>
//   );
// }

// export default memo(RegisterOfReceivables);
