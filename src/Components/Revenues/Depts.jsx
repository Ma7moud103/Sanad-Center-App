// import React, { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import chip from '../../assets/sanadSVG/chipG.svg'
// import chipres from '../../assets/sanadSVG/chipers.svg'
// import { ReactSVG } from 'react-svg'
// import axios from 'axios'
// import { BASE_URL } from "../../Soursre";
// import { ApisContext } from "../../Context/ApisContext";

// function Depts() {
//   const [t] = useTranslation();
//   // const { Toggler, setToggler } = useContext(MainContext);
//   const { selectedCenter, headers } = useContext(ApisContext);


//   const [loading, setloading] = useState(false)
//   const [data, setdata] = useState([])
//   const getHidders = async () => {

//     if (selectedCenter) {
//       try {
//         setloading(true)
//         const res = await axios.get(`${BASE_URL}centers/${selectedCenter?._id}/student-dues/metadata`, { headers: headers })
//         if (res.status === 200 || res.data.status === "success") {

//           setdata(res.data.data)
//         }
//       } catch (error) {
//         console.log(error)
//       } finally {
//         setloading(false)
//       }
//     }
//   }

//   useEffect(() => {
//     getHidders()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])


//   const forCenter = data?.filter((item) => item?.duesFor === "center")

//   const forStudent = data?.filter((item) => item?.duesFor === "student")



//   return (
//     <>
//       <div className="flex flex-col items-center w-full  sm:flex-row md:flex-col lg:flex-row gap-mainGap">

//         {!loading ?
//           <div className="flex items-center justify-start w-full py-6 bg-white box xl:w-1/2 rounded-2xl px-7 gap-x-4 sm:gap-x-2 md:gap-x-4">
//             <ReactSVG src={chip} />
//             <div className="title">
//               <p className="font-semibold  text-textGray text-size__20 xl:text-size__20 2xl:text-size__20">
//                 {t("homeRev.deptsfor")}
//               </p>
//               <div className="font-bold text-mainColor md:text-size_28 xl:text-size_32">
//                 <p>
//                   {forCenter?.length > 0 ? `${forCenter[0].totalPrice} ${t("homeRev.pound")}` : 0}
//                 </p>
//               </div>
//             </div>
//           </div>
//           :
//           <div className={`py-8 px-6 w-full xl:w-1/2 bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//             <div className="flex items-center w-full space-x-4 animate-pulse">
//               <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//               <div className="flex-1 py-1 space-y-3">
//                 <div className="h-2 rounded bg-zinc-300"></div>
//                 <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//               </div>
//             </div>
//           </div>
//         }


//         {!loading ?
//           <div className="flex items-center justify-start w-full py-6 bg-white box xl:w-1/2 rounded-2xl px-7 gap-x-4 sm:gap-x-2 md:gap-x-4">
//             <ReactSVG src={chipres} />

//             <div className="title">
//               <p className="font-semibold  text-textGray text-size__20 xl:text-size__20 2xl:text-size__20">
//                 {t("homeRev.deptslena")}
//               </p>
//               <div className="font-bold text-mainColor md:text-size_28 xl:text-size_32">
//                 <p>
//                   {forStudent?.length ? `${forStudent[0].totalPrice} ${t("homeRev.pound")}` : 0}
//                 </p>
//               </div>
//             </div>
//           </div>

//           : <div className={`py-8 px-6 w-full xl:w-1/2 bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
//             <div className="flex items-center w-full space-x-4 animate-pulse">
//               <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//               <div className="flex-1 py-1 space-y-3">
//                 <div className="h-2 rounded bg-zinc-300"></div>
//                 <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//               </div>
//             </div>
//           </div>}

//       </div>



//     </>
//   );
// }
// export default Depts;
