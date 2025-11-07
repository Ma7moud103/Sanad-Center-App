// import React, { useContext, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { MainContext } from "../../Context/MainContext";

// function StatisticsBox() {
//   const [t] = useTranslation();
//   const [dropDownMenu, setDropDownMenu] = useState(false);
//   const [dropDownMenu1, setDropDownMenu1] = useState(false);
//   function toggleDropDownMenu() {
//     setDropDownMenu((dropDownMenu) => !dropDownMenu);
//   }
//   function toggleDropDownMenu1() {
//     setDropDownMenu1((dropDownMenu1) => !dropDownMenu1);
//   }
//   function CloseAllMenus() {
//     setDropDownMenu(false);
//     setDropDownMenu1(false);
//   }
//   const { Toggler, setToggler } = useContext(MainContext);
//   return (
//     <>
//       <div className="flex  flex-col xl:flex-row  w-full items-center  gap-mainGap ">

//         <div className="box w-full items-center xl:w-full bg-white rounded-2xl flex flex-row p-4 gap-x-4 sm:gap-x-2 justify-between">


//           <p className=" text-secondMainColor hidden md:block px-5 text-size__24 md:text-size_26 xl:text-size_26 2xl:text-size_26 font-bold">
//             {t("Groups.nameCourse")}
//           </p>

//           <select className="rounded-2xl w-full md:w-1/2 h-[46px] text-mainColor text-lg xl:text-size__14 2xl:text-[20px] font-bold appearance-none pr-8 relative">


//             <option>jdasfjjdsfhua</option>
//             <option>jdassfhua</option>
//             <option>jdasfjsfhua</option>
//             <option>jdasfjjdsfhua</option>
//           </select>


//         </div>
//       </div>

//       {/* rounded-2xl w-full   text-mainColor text-lg xl:text-size__14 2xl:text-[20px] font-bold appearance-none pr-8 relative */}

//     </>
//   );
// }

// export default StatisticsBox;
