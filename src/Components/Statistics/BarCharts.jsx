// import React, { useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: '0', uv: 0 },
//   { name: '1', uv: 10 },
//   { name: '2', uv: 30 },
//   { name: '3', uv: 300 },
//   { name: '4', uv: 200 },
//   { name: '5', uv: 3 },
//   { name: '6', uv: 49 },
//   { name: '7', uv: 34 },
//   { name: '8', uv: 20 },
//   { name: '9', uv: 111 },
//   { name: '10', uv: 222 },
// ];





// function BarCharts() {

//   const [t] = useTranslation();

//   const container = useRef()

//   const boxWidth = 1200
//   return (
//     <>
//       <div ref={container} className="w-full bg-white rounded-lg flex flex-col sm:gap-y-3    px-2  py-6 ">

//         <p className="font-extrabold text-size__20 md:text-size_28 xl:text-size_32 text-mainColor pb-3 sm:pb-0">
//           {t("homeRev.percentage")}
//         </p>


//         <div className="w-[100%] h-[150px] sm:h-[200px] lg:h-[250px] xl:h-auto relative  flex  items-center justify-center" >
//           <LineChart className="absolute left-[-3%]" width={boxWidth} height={400} data={data}>

//             <XAxis dataKey="name" />
//             <YAxis />


//             <CartesianGrid strokeDasharray="5 5" />
//             <Line type="monotone" dataKey="uv" stroke="#023E8AB2" />
//           </LineChart>

//           {/* <LineChart width={345} height={309} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="pv"
//               stroke="#8884d8"
//               strokeWidth={2}
//             />
//           </LineChart> */}

//         </div>

//       </div>
//     </>
//   );
// }

// export default BarCharts;
