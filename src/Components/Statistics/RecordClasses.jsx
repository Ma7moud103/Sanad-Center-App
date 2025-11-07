// import React, { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import Pagination from "../Pagination/Pagination";
// import Avatars from "../../assets/Avatars.png";
// import axios from "axios";

// import downLoad from "../../assets/sanadSVG/download.svg"
// import sort from '../../assets/sanadSVG/sort.svg'
// import { ReactSVG } from 'react-svg'
// import CheckCard from "../PopupWindows/CheckCard";
// import { MainContext } from "../../Context/MainContext";

// function RecordClasses() {
//   const [t] = useTranslation();
//   let x = [
//     1, 2, 3, 4, 5, 6, 78, 4213, 12, 34, 364, 12, 351243, 5123, 8, 34, 24, 134,
//     13, 14153, 42, 3, 4, 652, 623, 263,
//   ];
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const { Toggler, setToggler } = useContext(MainContext);
//   const { items, setItems } = useContext(MainContext);
//   const handleDeleteItem = async (id) => {
//     fetch(`http://localhost:8000/users/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         console.log("User deleted successfully");
//       })
//       .catch((error) => {
//         console.error("Error deleting user:", error);
//       });
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };
//   const [userData, setUserData] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:8000/users")
//       .then((res) => res.json())
//       .then((data) => {
//         // Process the fetched data here
//         setUserData(data); // For example, log the data to the console
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//       });
//   }, []);

//   // Calculate the start and end indexes for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, x.length);

//   const visibleData2 = Object.values(userData).slice(startIndex, endIndex);
//   return (
//     <>
//       <div className="w-full xl:bg-white rounded-lg flex flex-col xl:px-6 pt-6 gap-y-8 xl:h-[auto]  ">
//         <div className="header text-start flex flex-col md:flex-row justify-between md:items-center ">
//           <div className="main flex flex-col gap-3">
//             <p className="font-extrabold  text-size_26 md:text-size_28 xl:text-size_32   text-mainColor">
//               {t("SingleCourse.sessionLog")}
//             </p>
//           </div>
//         </div>

//         <div className="largeScreen hidden xl:flex flex-col h-auto">
//           <div className="thead bg-[#F4F7FE]">
//             <div className="Header p-6   border border-[#E1E1E1] border-b-0 rounded-2xl rounded-b-none flex justify-between">
//               <p className="text-start text-textGray  w-1/2">
//                 {t("Logs.lecname")}
//               </p>

//               <p className="text-start text-textGray  w-1/2">
//                 {t("Logs.studnum")}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col rounded-2xl gap-y-3 hidden md:flex">
//             {visibleData2.map((item, i) => {
//               return (
//                 <div key={i} className="content h-auto">
//                   <div className="py-4 px-6 w-full border-[#E1E1E1] border  flex items-center justify-between relative">
//                     {/* <div className="flex text-start gap-2 w-1/5"> */}
//                     <div className="flex flex-row gap-2 w-1/2 items-center">
//                       <div className=" w-[30px] h-[30px]  rounded-full">
//                         <img
//                           className="cover w-full h-full rounded-full"
//                           src={Avatars}
//                           alt=""
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <p className="nameLesson font-bold text-secondMainColor text-start text-lg  ">
//                           {t("Logs.lecname")}
//                         </p>
//                         <p className="nameLesson font-bold text-textGray text-start text-sm   ">
//                           {t("Groups.nameCourse")}
//                         </p>
//                       </div>
//                     </div>

//                     <p className="nameLesson font-bold text-secondMainColor text-start  text-lg  w-1/2">
//                       200 طالب
//                     </p>
//                   </div>
//                   <div className="thead  bg-[#F4F7FE] flex items-center gap-x-2  border-x   ">
//                     <div className="  w-full border-b items-center  flex flex-col    ">
//                       <div className="flex  border-b justify-around w-full py-4">
//                         <p className="font-semibold text-size_12 w-1/4 sm:text-size__14 text-textGray text-center  ">
//                           {t("SingleCourse.groupName")}
//                         </p>
//                         <p className="font-semibold text-size_12 w-1/4 sm:text-size__14 text-textGray text-center">
//                           {t("Logs.studnum")}
//                         </p>
//                         <p className="font-semibold text-size_12 w-1/4 sm:text-size__14 text-textGray text-center">
//                           {t("homeRev.date")}
//                         </p>
//                         <p className="font-semibold text-size_12 w-1/4 sm:text-size__14 text-textGray text-center">
//                           {t("homeRev.time")}
//                         </p>
//                       </div>

//                       <div className="flex  border-b justify-around w-full py-4">
//                         <p className="font-semibold text-size_12 w-1/4 sm:text-size__14 text-textGray text-center  ">
//                           الحصه 01
//                         </p>
//                         <p className="font-bold  text-mainColor w-1/4 text-size_12 sm:text-size__14  text-center">
//                           30 طالب
//                         </p>
//                         <p className="font-bold  text-mainColor w-1/4 text-size_12 sm:text-size__14  text-center">
//                           08/05/2026
//                         </p>
//                         <p className="font-bold  text-mainColor w-1/4 text-size_12 sm:text-size__14  text-center">
//                           09:00 مساءً
//                         </p>
//                       </div>

//                       <div className="flex  border-b justify-around w-full py-4">
//                         <p className="font-semibold text-size_12  w-1/4 sm:text-size__14 text-textGray text-center  ">
//                           الحصه 01
//                         </p>
//                         <p className="font-bold  text-mainColor w-1/4 text-size_12 sm:text-size__14  text-center">
//                           30 طالب
//                         </p>
//                         <p className="font-bold  text-mainColor w-1/4 text-size_12 sm:text-size__14  text-center">
//                           08/05/2026
//                         </p>
//                         <p className="font-bold  text-mainColor w-1/4 text-size_12 sm:text-size__14  text-center">
//                           09:00 مساءً
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//             {/* pagination */}
//           </div>
//           <CheckCard />
//         </div>

//         <div className="hidden pb-5 xl:flex items-center justify-center">
//           <Pagination
//             totalItems={x?.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </div>

//         {/* uncomment this part if you have the data then loop in it to display the data*/}
//         <div className="flex flex-col rounded-2xl gap-y-3 xl:hidden">
//           {visibleData2.map((item, i) => (
//             <div key={i}>
//               <div
//                 className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl rounded-b-none`}
//               >
//                 <div className="Header w-full flex flex-row items-center   ">
//                   <div className=" w-[35px] h-[35px]  rounded-full">
//                     <img
//                       className="cover w-full h-full rounded-full"
//                       src={Avatars}
//                       alt=""
//                     />
//                   </div>

//                   <div className=" flex flex-col w-[85%]  px-2">
//                     <p className="font-bold text-mainColor text-start text-size__20 ">
//                       اسم الحصة
//                     </p>
//                     <p className="font-bold text-textGray text-start text-size_12 ">
//                       اسم الكورس
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-x-2 items-center "></div>

//               <div className=" w-full items-center bg-white flex flex-col items-center  justify-between rounded-b-2xl">
//                 <div className="flex py-4 px-5  border-b items-center justify-between   w-1/4 w-full">
//                   <p className="font-semibold text-size_16 text-textGray text-center  ">
//                     اجمالي عدد الطلبة
//                   </p>
//                   <p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
//                     800 طالب
//                   </p>
//                 </div>

//                 <div className="flex py-4 px-5 justify-between items-center w-1/4 w-full">
//                   <p className="font-semibold text-size_12 sm:text-size__14  text-textGray text-center  ">
//                     المجموعة 01
//                   </p>
//                   <p className="font-bold  text-mainColor text-size_12 sm:text-size__14  text-center">
//                     20 طالب
//                   </p>
//                 </div>
//                 <div className="flex py-4 px-5 justify-between items-center w-1/4 w-full">
//                   <p className="font-semibold text-size_12 sm:text-size__14  text-textGray text-center  ">
//                     المجموعة 01
//                   </p>
//                   <p className="font-bold  text-mainColor text-size_12 sm:text-size__14  text-center">
//                     20 طالب
//                   </p>
//                 </div>
//                 <div className="flex py-4 px-5 justify-between items-center w-1/4 w-full">
//                   <p className="font-semibold text-size_12 sm:text-size__14  text-textGray text-center  ">
//                     المجموعة 01
//                   </p>
//                   <p className="font-bold  text-mainColor text-size_12 sm:text-size__14  text-center">
//                     20 طالب
//                   </p>
//                 </div>
//                 <div className="flex py-4 px-5 justify-between items-center w-1/4 w-full">
//                   <p className="font-semibold text-size_12 sm:text-size__14  text-textGray text-center  ">
//                     المجموعة 01
//                   </p>
//                   <p className="font-bold  text-mainColor text-size_12 sm:text-size__14  text-center">
//                     20 طالب
//                   </p>
//                 </div>
//                 <div className="flex py-4 px-5 justify-between items-center w-1/4 w-full">
//                   <p className="font-semibold text-size_12 sm:text-size__14  text-textGray text-center  ">
//                     المجموعة 01
//                   </p>
//                   <p className="font-bold  text-mainColor text-size_12 sm:text-size__14  text-center">
//                     20 طالب
//                   </p>
//                 </div>
//               </div>
//               {/* Add other panel content as needed */}
//             </div>
//           ))}
//           {/* Pagination component */}
//           <Pagination
//             totalItems={x?.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default RecordClasses;
