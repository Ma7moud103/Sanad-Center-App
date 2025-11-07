// import React, { useContext, useState } from "react";
// import icon from "../../../assets/PDF.png";
// import exit from "../../../assets/sanadIcons/Vector.png";
// import trash from "../../../assets/Vector (28).png";
// import { MainContext } from "../../../Context/MainContext";
// import { useTranslation } from "react-i18next";

// export default function SingleCoursePopupWindow() {

//   const { Toggler, setToggler } = useContext(MainContext);
//   let [t] = useTranslation();
//   const sampleData = [
//     {
//       id: 1,
//       fileName: "ملخص الدرس الأول .pdf",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 2,
//       fileName: "ملخص الدرس الأول .jpg",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 3,
//       fileName: "ملخص الدرس الأول .docx",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 4,
//       fileName: "ملخص الدرس الأول .Mp4",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 5,
//       fileName: "فيديو الدرس - يوتيوب",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 6,
//       fileName: "ملخص الدرس الأول .docx",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 6,
//       fileName: "ملخص الدرس الأول .pdf",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 7,
//       fileName: "ملخص الدرس الأول .Mp4",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     // Add more sample data items as needed
//   ];
//   return (
//     <>
//       <div className={`justify-center items-center ${Toggler.files ? "flex" : "hidden"} inset-0 z-50 outline-none focus:outline-none absolute w-full h-screen p-6 md:p-0 top-0`}>
//         <div className="fixed w-[90%] md:w-3/5 xl:w-1/2 3xl:w-1/3 max-h-[775px] mx-auto max-w-3xl z-40 flex justify-center items-center shadow-lg rounded-2xl">
//           <div className="rounded-2xl shadow-sm relative flex flex-col w-full h-auto bg-[#F4F7FE] bg-HomePageBgImage bg-cover bg-center bg-no-repeat outline-none focus:outline-none p-6 md:p-10 md:px-6 gap-y-10">
//             {/*header*/}
//             <div className="flex items-start">
//               <div className="w-1/5"></div>
//               <div
//                 className={`w-3/5 h-10 p-1 flex justify-center items-center rounded-full
//                       bg-secondMainColor text-white
//                   }`}
//               >
//                 <p>{t("PopupWindows.uploadedFiles")}</p>
//               </div>
//               <div className="flex exitBtn justify-end w-1/5">
//                 <button
//                   className="p-1 w-10 h-10 flex justify-center items-center bg-white rounded-full"
//                   onClick={() => setToggler(prev => {
//                     return { ...prev, files: false }
//                   })}                >
//                   <img src={exit} alt="Exit"></img>
//                 </button>
//               </div>
//             </div>
//             {/*body*/}
//             <div
//               id="FileList"
//               className="flex flex-col scale-x-[-1] justify-center items-center overflow-y-auto pe-5 scrollbar scrollbar-thumb-secondMainColor scrollbar-track-white scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-w-2 "
//             >
//               <div className="scrolling-part w-full md:pe-2 scale-x-[-1] max-h-[400px]">
//                 {sampleData.map((item) => (
//                   <div
//                     key={item.id}
//                     className="singleFile flex justify-between items-center py-4 border-b-2 w-full"
//                   >
//                     <div className="flex justify-start items-center gap-x-4">
//                       <span className="flex justify-center items-center w-6 h-6">
//                         <img className="w-full" src={icon} alt="" />
//                       </span>
//                       <div className="text flex flex-col justify-center items-start">
//                         <p className="text-[#293241] font-semibold text-xl tracking-wide">
//                           {item.fileName}
//                         </p>
//                         <p className="text-textGray font-semibold text-sm">
//                           {item.timestamp}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex justify-end items-center gap-x-4">
//                       <span className="flex justify-center items-center border-[3px] rounded-2xl bg-transparent px-6 py-1 text">
//                         <p>{item.fileSize}</p>
//                       </span>
//                       <span className="flex justify-center items-center w-7 h-7 cursor-pointer">
//                         <img className="w-full" src={trash} alt="" />
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           onClick={() => setToggler(prev => {
//             return { ...prev, files: false }
//           })}
//           className="fixed inset-0 bg-black backdrop-blur-[1px] bg-opacity-[0.02]"
//         ></div>
//       </div>
//     </>
//   );
// }
