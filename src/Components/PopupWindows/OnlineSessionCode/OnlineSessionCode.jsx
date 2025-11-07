// import React, { useContext, useState } from "react";
// import exit from "../../../assets/sanadIcons/Vector.png";
// import icon from "../../../assets/Vector (26).png";
// import avatar from "../../../assets/Avatars.png";
// import { MainContext } from "../../../Context/MainContext";
// import { useTranslation } from "react-i18next";
// import Cookies from "universal-cookie";

// export default function OnlineSessionCode() {
//   const { setShowOnlineSessionCode } = useContext(MainContext);
//   let [t, i18n] = useTranslation();
//   let cookie = new Cookies();

//   return (
//     <>
//       <div className="justify-center items-center flex inset-0 z-50 outline-none focus:outline-none absolute w-full h-screen p-6 md:p-0 top-0">
//         <div className="absolute md:fixed w-[90%] md:w-[60%] 2xl:w-1/3 max-h-[775px] mx-auto max-w-full z-40 flex justify-center items-center shadow-lg rounded-2xl">
//           {/*Exit*/}
//           <div className="rounded-2xl relative flex flex-col w-full h-auto bg-[#F4F7FE] bg-HomePageBgImage bg-cover bg-center bg-no-repeat outline-none focus:outline-none p-6 md:pb-8 md:pt-4 md:px-8 gap-y-1">
//             <div className="flex justify-end">
//               <button
//                 className="p-1 w-10 h-10 flex justify-center items-center bg-white rounded-full"
//                 onClick={() => setShowOnlineSessionCode(false)}
//               >
//                 <img src={exit} alt="exit"></img>
//               </button>
//             </div>
//             {/*header*/}
//             <div className="flex flex-col items-center justify-between rounded-t gap-y-1 mb-4">
//               <span className="w-16 h-16 bg-[#F0F6FFB2] rounded-full flex justify-center items-center">
//                 <img className="w-8 max-w-full" src={icon} alt="" />
//               </span>
//               <div className="flex flex-col gap-1 md:gap-y-3 justify-center items-center">
//                 <h3 className="flex justify-center items-center text-xl md:text-3xl font-black text-[#023E8A]">
//                   {t("PopupWindows.onlineSessionCode")}
//                 </h3>
//                 <p className="text-[#4E5556] text-sm md:lg">
//                   {t(
//                     "PopupWindows.someImportantInformationWeAreNotSureWhatToPutHere"
//                   )}
//                 </p>
//               </div>
//             </div>
//             {/*body*/}
//             <div className="flex flex-col gap-10">
//               <div className="flex flex-col gap-3 w-full">
//                 <label className="text-[#4E5556E5] w-full text-start font-semibold text-sm relative">
//                   {t("PopupWindows.sessionName")}
//                 </label>
//                 <div className="flex bg-white justify-between items-center rounded-2xl py-3 px-5 shadow">
//                   <div className="flex gap-2 items-center justify-center">
//                     <span className="cursor-pointer">
//                       <img src={avatar} alt="" />
//                     </span>
//                     <div className="flex flex-col">
//                       <p className="font-bold text-mainColor text-lg flex justify-start items-center gap-2">
//                         الحصة الأولى
//                       </p>
//                       <p className="text-xs text-[#9CA3AF]">
//                         الصف الثانى الإعدادى
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-mainColor text-lg font-bold me-8">
//                     151564564
//                   </p>
//                 </div>
//               </div>
//               <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center">
//                 <button className="bg-mainColor text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                   {t("PopupWindows.confirm")}
//                 </button>
//                 <button
//                   onClick={() => setShowOnlineSessionCode(false)}
//                   className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl"
//                 >
//                   {t("PopupWindows.back")}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           onClick={() => setShowOnlineSessionCode(false)}
//           className="fixed inset-0 bg-black backdrop-blur-[1px] bg-opacity-[0.02]"
//         ></div>
//       </div>
//     </>
//   );
// }
