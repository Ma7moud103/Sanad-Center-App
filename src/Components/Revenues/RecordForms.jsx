// import React, { Fragment, useContext, useEffect, useState, memo } from "react";
// import { useTranslation } from "react-i18next";
// // import Pagination from "../Pagination/Pagination";
// // import Avatars from "../../assets/Avatars.png";
// // import axios from "axios";
// import filterIcon from "../../assets/sanadSVG/filterIcon.svg"
// import downArrowFilter from "../../assets/sanadSVG/downArrow.svg"
// import downLoad from "../../assets/sanadSVG/download.svg"
// import plus from "../../assets/sanadSVG/plusTable.svg"
// import editt from "../../assets/sanadSVG/penGray.svg"
// import leftArrow from "../../assets/sanadSVG/leftArrow.svg"
// import deletee from "../../assets/sanadSVG/deletGray.svg"
// import sort from "../../assets/sanadSVG/sort.svg"
// import { ReactSVG } from "react-svg"
// import { MainContext } from "../../Context/MainContext";
// import { Disclosure, Listbox, Transition } from "@headlessui/react";
// // import { SvgsContext } from "../../Context/SvgsConetxt";
// import { ApisContext } from "../../Context/ApisContext";

// function RecordForm() {
//   const [t, i18n] = useTranslation();
//   const { Toggler, setToggler, setmodelID, setmodelData } = useContext(MainContext);
//   const { PagesModel, setPagesModel, Types, selectedType, setselectedType, fetchModels } = useContext(ApisContext);








//   const arr5 = [1, 1, 1, 1, 1]
//   const itemsPerPage = 5;
//   const handlePageChange = (newPage) => {
//     setPagesModel(newPage);

//   };
//   const [totalItems, settotalItems] = useState(0)
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const handleClick = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages && newPage !== PagesModel) {
//       handlePageChange(newPage);
//     }
//   };

//   const displayRange = 1;
//   const pagesToShow = [];
//   const startPage = Math.max(PagesModel - displayRange, 1);
//   const endPage = Math.min(PagesModel + displayRange, totalPages);

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

//     settotalItems(fetchModels.data?.metadata?.totalDocs)


//   }, [fetchModels, PagesModel])






//   return (

//     <div className={`w-full xl:bg-white rounded-lg flex flex-col xl:px-6 gap-y-8 py-6   ${fetchModels.data?.data?.length > 0 ? "xl:h-[570px]" : "xl:h-auto "}`}>
//       <div className="flex flex-col justify-between header text-start lg:flex-row gap-y-4 ">

//         <div className="flex items-center justify-between w-full ">
//           <p className="font-extrabold lg:justify-start text-size_26 md:text-size_28 xl:text-size_32 text-mainColor">
//             {t("homeRev.recordform")}
//           </p>



//           <button onClick={() => setToggler({ ...Toggler, addpayment: true })} className=" lg:hidden">
//             <ReactSVG src={plus} />
//           </button>
//         </div>


//         <div className="w-full main lg:flex lg:items-center lg:gap-3 lg:justify-between lg:w-auto">





//           <div className="dropDown w-full lg:min-w-[200px] ">
//             <Listbox
//               value={selectedType}
//               onChange={(value) => {
//                 setselectedType(value)
//                 setPagesModel(1)
//               }}

//             >
//               {({ open }) => (
//                 <div className="relative w-full">

//                   <Listbox.Button className={`font-semibold w-full  text-mainColor px-4 py-3  text-sm leading-5   focus:ring-0  items-center  relative  flex cursor-pointer rounded-lg bg-white lg:bg-[#F4F7FE] text-left focus:outline-none  sm:text-sm`}>


//                     <div className="flex items-center gap-x-3">
//                       <div className="flex items-center justify-center">
//                         <ReactSVG src={filterIcon} />
//                       </div>

//                       <span className={`block truncate text-sm`}>
//                         {selectedType?.name}
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
//                         scrollbar-thin   overflow-y-scroll rounded-md  bg-white lg:bg-[#F4F7FE] py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow">
//                       {Types?.filter((item) => item?.name !== selectedType?.name)?.map((person, personIdx) => (

//                         <Listbox.Option
//                           key={personIdx}
//                           className={({ active }) =>
//                             ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'}`}
//                           value={person} >
//                           {({ selectedType }) => (
//                             <span className={`block text-sm truncate ${selectedType ? 'font-medium' : 'font-normal'}`}>
//                               {person.name}
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


//           <button onClick={() => setToggler({ ...Toggler, addpayment: true })} className="hidden  lg:block">
//             <ReactSVG src={plus} />
//           </button>


//         </div>

//       </div>
//       {fetchModels.isFetched ?
//         <div className={`largeScreen hidden xl:block    ${fetchModels.data?.data?.length > 0 ? "h-[550px] " : "h-auto"}`}>

//           <div className="Header bg-[#F4F7FE] p-6   border border-[#E1E1E1]   rounded-2xl rounded-b-none flex justify-between">


//             <div className="flex w-2/4 ">
//               <p className="text-start text-textGray">


//                 {selectedType.value === "custom" ? t("homepage.paymentReason") : t("Logs.educationalStage")}
//               </p>
//             </div>


//             <div className="flex w-1/4">
//               <p className="text-start text-textGray ">
//                 {t("homeRev.type")}
//                 {/* type */}
//               </p>
//               <ReactSVG src={sort} />
//             </div>



//             <div className="flex w-1/4 ">
//               <p className="text-start text-textGray">{t("homeRev.price")}</p>
//             </div>

//           </div>


//           {fetchModels.data?.data?.length > 0 ? fetchModels.data?.data?.map((item, i) => {
//             const lastElement = fetchModels.data?.data?.length - 1

//             return (
//               <div key={item?._id} className={`content ${i === lastElement && "rounded-b-2xl  "} py-4 px-6 w-full border-[#E1E1E1] border border-t-0  flex items-center justify-between relative`}>
//                 {/* <div className="flex w-1/5 gap-2 text-start"> */}
//                 <div className="flex flex-row items-center w-2/4 gap-2">
//                   <div className="flex flex-col">
//                     <p className="text-sm font-bold nameLesson text-secondMainColor text-start ">
//                       {item?.type === "custom" ? item?.title : i18n.language === "ar" ? `${t("homeRev.grade")} ${item?.grade?.nameAr}` : `${t("homeRev.grade")} ${item?.grade?.nameEn}`}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-row items-center w-1/4 gap-2">
//                   <div className="flex flex-col">
//                     <p className="text-sm font-semibold nameLesson text-secondMainColor text-start ">
//                       {item?.type === "custom" ? t("homepage.custom") : t("homepage.card")}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-row items-center w-1/4">
//                   <div className="flex flex-col">
//                     <p className="text-sm font-semibold nameLesson text-secondMainColor text-start ">
//                       {item?.price}{t("homeRev.pound")}


//                     </p>
//                   </div>
//                 </div>

//                 <div className="relative flex flex-row  text-end">
//                   <div onClick={() => {
//                     setmodelData(item)
//                     setToggler({ ...Toggler, modifyModel: true })
//                   }} className={`icons  cursor-pointer  absolute ${item?.type === "custom" ? " end-12" : " end-0"}  translate-y-[-50%] top-[50%]`}>
//                     <ReactSVG src={editt} />

//                   </div>
//                   {item?.type === "custom" &&
//                     <div
//                       onClick={() => {
//                         setToggler({ ...Toggler, deletModel: true })
//                         setmodelID(item?._id)
//                       }}
//                       className="icons  cursor-pointer  absolute end-0  translate-y-[-50%] top-[50%]">
//                       <ReactSVG src={deletee} />

//                     </div>}
//                 </div>
//               </div>

//             );
//           }) : <p className="p-2 my-2 font-bold text-center  rounded-xl text-mainColor">{t("homepage.nothing")}</p>}



//           {/* paginations */}

//           {fetchModels.data?.data?.length > 0 &&
//             <div className="relative flex items-center justify-center w-full py-2 mt-4">
//               <div className=" flex absolute translate-y-[-50%] top-[50%] start-0 flex-row items-start w-[157px] h-[48px]   rounded-full p-3 gap-2 bg-gradient-to-bl from-secondMainColor to-blue_light ">
//                 <div className="icon">
//                   <ReactSVG src={downLoad} />
//                 </div>
//                 <p className="text-white">{t("homepage.report")}</p>
//               </div>


//               <div className="flex items-center justify-center gap-y-4 ">
//                 {fetchModels.data?.data?.length > 0 &&
//                   <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                     <button
//                       onClick={() => handleClick(PagesModel - 1)}
//                       // onClick={() => setPagesModel((old) => {
//                       //   Math.max(old - 1, 1)
//                       // })}
//                       className={`${PagesModel === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                         } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                       disabled={PagesModel === 1}
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
//                           ? PagesModel === page
//                             ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                             : "bg-transparent text-[#293241] hover:bg-slate-100"
//                           : "text-[#293241]"
//                           } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => handleClick(PagesModel + 1)}
//                       className={`${PagesModel === totalPages
//                         ? "opacity-50 cursor-not-allowed"
//                         : "cursor-pointer"
//                         }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                       disabled={PagesModel === totalPages || fetchModels.isPlaceholderData}

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

//       <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
//         {fetchModels.isFetched ? <>
//           {fetchModels.data?.data?.length > 0 ? fetchModels.data?.data?.map((item, i) => {
//             return (
//               <Disclosure key={item?._id}>
//                 {({ open }) => (
//                   <div>
//                     <Disclosure.Button
//                       className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${open ? "rounded-b-none" : "rounded-b-2xl"
//                         }`}
//                     >

//                       <div className="flex items-center justify-center gap-x-2">

//                         <div>
//                           <div className="flex items-center font-bold text-mainColor text-size__14 sm:text-base gap-x-2 ">
//                             {/* {item?.title} */}
//                             {item?.type === "custom" ? item?.title : i18n.language === "ar" ? item?.grade?.nameAr : item?.grade?.nameEn}
//                           </div>


//                         </div>
//                       </div>


//                       <div className="flex items-center gap-x-2 ">
//                         {open ? <ReactSVG src={downArrowFilter} />
//                           : <ReactSVG src={leftArrow} />
//                         }
//                       </div>




//                     </Disclosure.Button>
//                     <Disclosure.Panel className="p-6 w-full bg-white border-[#E1E1E1] border border-t-0 flex flex-col items-center justify-between rounded-b-2xl gap-6">
//                       <div className="flex items-center justify-between w-full">
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                           {t("homeRev.type")}
//                         </p>
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-mainColor">
//                           {item?.type === "custom" ? t("homepage.custom") : t("homepage.card")}

//                         </p>
//                       </div>
//                       <div className="flex items-center justify-between w-full">
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                           {t("homeRev.price")}
//                         </p>
//                         <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14 ">
//                           {item?.price} {t("homeRev.pound")}
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between w-full">
//                         <p className="font-semibold text-center text-size_12 sm:text-size__14 text-textGray text-nowrap">
//                         </p>
//                         <div className="flex flex-wrap justify-end gap-2 font-semibold text-textGray text-size_12 sm:text-size__14 ">
//                           <span onClick={() => {
//                             setmodelData(item)
//                             setToggler({ ...Toggler, modifyModel: true })
//                           }
//                           } className="cursor-pointer icons ">
//                             <ReactSVG src={editt} />

//                           </span>
//                           {item?.type === "custom" &&
//                             <span
//                               onClick={() => setToggler({ ...Toggler, deletModel: true })}
//                               className="cursor-pointer icons ">
//                               <ReactSVG src={deletee} />
//                             </span>}

//                         </div>
//                       </div>

//                     </Disclosure.Panel>
//                   </div>
//                 )}
//               </Disclosure>
//             )
//           }) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">{t("homepage.nothing")}</p>}




//           {fetchModels.data?.data?.length > 0 &&
//             <div className="flex items-center justify-center gap-y-4 ">

//               <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
//                 <button
//                   onClick={() => handleClick(PagesModel - 1)}
//                   // onClick={() => setPagesModel((old) => {
//                   //   Math.max(old - 1, 1)
//                   // })}
//                   className={`${PagesModel === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//                     } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
//                   disabled={PagesModel === 1}
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
//                       ? PagesModel === page
//                         ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
//                         : "bg-transparent text-[#293241] hover:bg-slate-100"
//                       : "text-[#293241]"
//                       } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handleClick(PagesModel + 1)}
//                   className={`${PagesModel === totalPages
//                     ? "opacity-50 cursor-not-allowed"
//                     : "cursor-pointer"
//                     }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
//                   disabled={PagesModel === totalPages || fetchModels.isPlaceholderData}

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

// export default memo(RecordForm);
