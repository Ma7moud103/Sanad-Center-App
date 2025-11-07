// import React, { memo, useContext } from "react";
// import { useTranslation } from "react-i18next";

// import attendanceIcon from "../../assets/sanadSVG/revTableBox.svg"
// import attendancecodeIcon from "../../assets/sanadSVG/revKey.svg"
// import attendanceAttendant from "../../assets/sanadSVG/revStudents.svg"
// import attendancebb from "../../assets/sanadSVG/revReg.svg"

// import { ReactSVG } from "react-svg"

// import axios from 'axios'
// import { BASE_URL } from "../../Soursre";
// import { ApisContext } from "../../Context/ApisContext";
// import { useQuery } from "@tanstack/react-query";







// function RevenuesBoxes() {
//   const [t] = useTranslation();

//   const { selectedCenter, headers, postPay, _id } = useContext(ApisContext);
//   const tens = [2, 3, 4, 5, 6, 7, 8, 9, 10]







//   const getHiddersData = async (selectedCenter) => {
//     const res = await axios.get(`${BASE_URL}centers/${selectedCenter?._id}/payments/metadata`, { headers: headers })
//     return res.data.data
//   }

//   const fetchHiddersData = useQuery({
//     queryKey: ["getHiddersData", `${_id}`, `${postPay}`],
//     queryFn: () => getHiddersData(selectedCenter),
//     enabled: !!_id,
//     refetchOnMount: true,

//     // refetchInterval: 86400000
//   });


//   const cards = fetchHiddersData.data?.filter((item) => item?.type === "card")
//   const registeration = fetchHiddersData.data?.filter((item) => item?.type === "registeration")
//   const attendance = fetchHiddersData.data?.filter((item) => item?.type === "attendance")
//   const sessionAccess = fetchHiddersData.data?.filter((item) => item?.type === "sessionAccess")



//   return (
//     <div className="flex flex-col items-center w-full  md:flex lg:flex xl:flex-row gap-mainGap">

//       {fetchHiddersData.isFetched ? <div className="flex justify-center w-full p-4 bg-white box xl:w-1/4 rounded-2xl gap-x-4 sm:gap-x-2">

//         <ReactSVG src={attendanceIcon} />

//         <div className="title">
//           <p className="font-bold  text-textGray text-size__20 xl:text-size__14 2xl:text-size__14">
//             {t("homepage.totalcards")}
//           </p>
//           <div className="text-mainColor text-lg xl:text-size__14 2xl:text-[20px] font-bold">

//             {(cards && cards.length) ?
//               (tens.includes(cards[0]?.count)) ?
//                 `${cards[0].count} ${t("homepage.cards")}` :
//                 (cards[0]?.count === 0) ? 0 :
//                   `${cards[0].count} ${t("homepage.card")}`
//               : t("homepage.nothing")}



//           </div>
//         </div>
//       </div> :
//         <div className={`p-4 w-full xl:w-1/4 bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//           <div className="flex items-center w-full space-x-4 animate-pulse">
//             <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//             <div className="flex-1 py-1 space-y-3">
//               <div className="h-2 rounded bg-zinc-300"></div>
//               <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//             </div>
//           </div>
//         </div>}





//       {fetchHiddersData.isFetched ? <div className="flex justify-center w-full p-4 bg-white box xl:w-1/4 rounded-2xl gap-x-4 sm:gap-x-2">

//         <ReactSVG src={attendancecodeIcon} />

//         <div className="title">
//           <p className="font-bold  text-textGray text-size__20 xl:text-size__14 2xl:text-size__14">
//             {t("homepage.totalcode")}          </p>
//           <div className="text-mainColor text-lg xl:text-size__14 2xl:text-[20px] font-bold">

//             {(sessionAccess && sessionAccess.length) ?
//               (tens.includes(sessionAccess[0]?.count)) ?
//                 `${sessionAccess[0].count} ${t("homepage.codes")}` :
//                 (sessionAccess[0]?.count === 0) ? 0 :
//                   `${sessionAccess[0].count} ${t("homepage.code")}`
//               : t("homepage.nothing")}



//           </div>
//         </div>
//       </div> :
//         <div className={`p-4 w-full xl:w-1/4 bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//           <div className="flex items-center w-full space-x-4 animate-pulse">
//             <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//             <div className="flex-1 py-1 space-y-3">
//               <div className="h-2 rounded bg-zinc-300"></div>
//               <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//             </div>
//           </div>
//         </div>}






//       {fetchHiddersData.isFetched ? <div className="flex justify-center w-full p-4 bg-white box xl:w-1/4 rounded-2xl gap-x-4 sm:gap-x-2">

//         <ReactSVG src={attendanceAttendant} />

//         <div className="title">
//           <p className="font-bold  text-textGray text-size__20 xl:text-size__14 2xl:text-size__14">
//             {t("homepage.totalattended")}
//           </p>
//           <div className="text-mainColor text-lg xl:text-size__14 2xl:text-[20px] font-bold">

//             {(attendance && attendance.length) ?
//               (tens.includes(attendance[0]?.count)) ?
//                 `${attendance[0].count} ${t("Courses.students")}` :
//                 (attendance[0]?.count === 0) ? 0 :
//                   `${attendance[0].count} ${t("homepage.student")}`
//               : t("homepage.nothing")}



//           </div>
//         </div>
//       </div> :
//         <div className={`p-4 w-full xl:w-1/4 bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//           <div className="flex items-center w-full space-x-4 animate-pulse">
//             <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//             <div className="flex-1 py-1 space-y-3">
//               <div className="h-2 rounded bg-zinc-300"></div>
//               <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//             </div>
//           </div>
//         </div>}




//       {fetchHiddersData.isFetched ? <div className="flex justify-center w-full p-4 bg-white box xl:w-1/4 rounded-2xl gap-x-4 sm:gap-x-2">

//         <ReactSVG src={attendancebb} />

//         <div className="title">
//           <p className="font-bold  text-textGray text-size__20 xl:text-size__14 2xl:text-size__14">
//             {t("homepage.totalregister")}
//           </p>
//           <div className="text-mainColor text-lg xl:text-size__14 2xl:text-[20px] font-bold">

//             {(registeration && registeration.length) ?
//               (tens.includes(registeration[0]?.count)) ?
//                 `${registeration[0].count} ${t("Courses.students")}` :
//                 (registeration[0]?.count === 0) ? 0 :
//                   `${registeration[0].count} ${t("homepage.student")}`
//               : t("homepage.nothing")}



//           </div>
//         </div>
//       </div> :
//         <div className={`p-4 w-full xl:w-1/4 bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//           <div className="flex items-center w-full space-x-4 animate-pulse">
//             <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//             <div className="flex-1 py-1 space-y-3">
//               <div className="h-2 rounded bg-zinc-300"></div>
//               <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//             </div>
//           </div>
//         </div>}
//     </div>
//   );
// }
// export default memo(RevenuesBoxes);
