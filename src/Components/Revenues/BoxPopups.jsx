// import React, { useContext} from 'react'
// import { useTranslation } from 'react-i18next'
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { ApisContext } from '../../Context/ApisContext'
// function BoxPopups() {
//     const { t } = useTranslation()
//     const { startDate, setstartDate, endDate, setendDate, setisValidDate, isError, setisError } = useContext(ApisContext)



//     const handleStartDateChange = (date) => {
//         if (date.isAfter(endDate)) {
//             setisError(t("Notifications.startTime"))
//             setisValidDate(false)

//         } else {
//             setisError(null);
//             setstartDate(date);
//             setisValidDate(true)

//         }
//     };

//     const handleEndDateChange = (date) => {
//         if (date.isBefore(startDate)) {
//             setisError(t("Notifications.endTime"))
//             setisValidDate(false)
//         } else {
//             setisValidDate(true)
//             setisError(null);
//             setendDate(date);

//         }
//     };


//     // useEffect(() => {

//     //     if (isValidDate) {
//     //         console.log("laugh")
//     //         console.log(startDate)
//     //         console.log(endDate)
//     //     }
//     // }, [startDate, endDate])





//     return (
//         <div className='flex items-center justify-between w-full rounded-xl '>

//             <div className="flex flex-col w-full p-4 bg-white rounded-lg Dates gap-y-3 gap-x-4 xl:w-1/2 xl:flex-col " >

//                 <div className='flex flex-col justify-center w-full sm:flex-row md:justify-normal gap-x-4 gap-y-3 xl:gap-x-2 sm:justify-start lg:justify-start'>
//                     <div>
//                         <label htmlFor="startTime" className='text-sm font-semibold text-textColor__2'>
//                             {t("SingleCourse.startTime")}
//                         </label>
//                         <div id='revDate' className='w-full'>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DatePicker
//                                     className='w-full'
//                                     value={startDate}
//                                     disabled={isError && isError.value === "start"}
//                                     format="YYYY-MM-DD"
//                                     onChange={handleStartDateChange}

//                                 />
//                             </LocalizationProvider>
//                         </div>
//                     </div>
//                     {/* <ReactSVG src={timeTable} /> */}

//                     <div>
//                         <label htmlFor="endTime" className='text-sm font-semibold text-textColor__2'>
//                             {t("SingleCourse.endTime")}
//                         </label>
//                         <div id='revDate' className='w-full'>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DatePicker
//                                     value={endDate}
//                                     className='w-full'
//                                     // disabled={isError && isError.value === "end"}

//                                     format="YYYY-MM-DD"
//                                     onChange={handleEndDateChange}
//                                 />
//                             </LocalizationProvider>
//                         </div>
//                     </div>
//                 </div>

//                 {isError && <p className='p-1 text-sm text-center text-white rounded-lg bg-err'>{isError}</p>}
//                 {/* <ReactSVG src={timeTable} /> */}
//             </div>


//             {/*
//             <div className="flex items-center w-full Buttons sm:justify-end gap-x-2">
//                 <button className='flex items-center justify-center p-2 text-xs text-white gap-x-1 bg-mainColor bg-gradient-to-br rounded-xl'>
//                     <ReactSVG src={downLoad} />
//                     {t("homeRev.payClick")}

//                 </button>

//                 <button className='flex items-center justify-center p-2 text-xs text-white gap-x-1 bg-mainColor bg-gradient-to-br rounded-xl'>
//                     <ReactSVG src={downLoad} />
//                     {t("homeRev.deservedClick")}

//                 </button>
//             </div> */}

//         </div>
//     )
// }

// export default BoxPopups

