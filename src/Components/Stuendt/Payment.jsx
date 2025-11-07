// import { useContext, useMemo, useState } from "react";
// import { MainContext } from "../../Context/MainContext";
// import { useTranslation } from "react-i18next";
// import x from "../../assets/sanadSVG/Multiply.svg"

// import { SvgsContext } from "../../Context/SvgsConetxt";
// import { ApisContext } from "../../Context/ApisContext";

// import { ReactSVG } from 'react-svg'

// import axios from 'axios'
// import { BASE_URL } from "../../Soursre";
// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
// import { useQuery } from "@tanstack/react-query";
// import { useErrorBoundary } from "react-error-boundary";
// import CourseAvatar from "../CourseAvatar"
// // import { useParams } from "react-router-dom";

// export default function Payment() {


//     // const { code } = useParams()

//     const arr = [6, 7, 8,]

//     const [t] = useTranslation()
//     const { Toggler, setToggler, ErorrMessage, direction, handleUserName } = useContext(MainContext)
//     const { headers, selectedCenter, studentData } = useContext(ApisContext)
//     const { dollarSign } = useContext(SvgsContext)

//     const [handler, sethandler] = useState(false)

//     const { showBoundary } = useErrorBoundary()

//     const GetData = async () => {
//         if (selectedCenter && studentData) {
//             try {

//                 const res = await axios.get(`${BASE_URL}centers/${selectedCenter?._id}/cards/${studentData?._id}/student-dues?limit=-1`, { headers: headers })

//                 if (res.status === 200 || res.data.data === "success") {


//                     return res.data.data
//                 }

//             } catch (error) {
//                 console.log(error.response.data.message)
//                 showBoundary(error)
//             }
//         }
//     }

//     const fetchData = useQuery({
//         queryKey: ["getDataOFStudentPayment", `${selectedCenter?._id}`, `${studentData?._id}`, `${handler}`],
//         queryFn: () => GetData(),
//         enabled: !!selectedCenter?._id && !!studentData?._id
//     })






//     const [buttonLoading, setbuttonLoading] = useState(false)
//     const [input, setinput] = useState("")

//     const buttonDis = useMemo(() => {
//         if (input !== "") {
//             return false
//         } else {
//             return true
//         }
//     }, [input])






//     const pay = async (center, cardid, duesid) => {
//         if (input) {
//             try {
//                 setbuttonLoading(true)
//                 const res = await axios.patch(`${BASE_URL}centers/${center}/cards/${cardid}/student-dues/${duesid}`, { paid: input }, { headers: headers })
//                 console.log(res)

//                 if (res.status === 200 || res.data.status === "success") {
//                     ErorrMessage(t("Errors.duesCourseS"), "success")
//                     sethandler(prev => !prev)
//                     setinput("")
//                 }
//             } catch (error) {
//                 console.log(error)
//                 ErorrMessage(t("Errors.main"), "error")

//             } finally {
//                 setbuttonLoading(false)
//             }
//         }
//     }






//     function close() {
//         setToggler({ ...Toggler, studentPayments: false });
//         setinput("")
//     }



//     return (
//         <>

//             <Dialog
//                 dir={direction}
//                 open={Toggler.studentPayments}
//                 as="div"
//                 className="relative z-30 focus:outline-none"
//                 onClose={close}
//             >
//                 <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
//                     <div className="flex items-center justify-center min-h-full p-4 b">
//                         <DialogPanel
//                             transition
//                             className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
//                         >
//                             <button
//                                 className="flex items-center justify-center p-3 bg-white rounded-full"
//                                 onClick={() => setToggler({ ...Toggler, studentPayments: false })}
//                             >
//                                 <ReactSVG src={x} />
//                             </button>
//                             <DialogTitle
//                                 as="h3"
//                                 className="font-medium text-base/7 text-mainColor"
//                             >
//                                 <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
//                                     <div className="rounded-full w-12 h-12 flex items-center justify-center mx-auto bg-[#E3EFFFB2]">{dollarSign("#023E8ACC")}
//                                     </div>
//                                     <h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
//                                         {t("homepage.pay")}
//                                     </h3>

//                                 </div>
//                             </DialogTitle>
//                             {/* content */}





//                             {
//                                 fetchData.isFetched ?
//                                     (
//                                         <div className="container my-2 overflow-y-auto scrollbar-thin">
//                                             {fetchData.data && fetchData.data?.length > 0 ? fetchData.data?.map((item, i) => {
//                                                 return (
//                                                     <div key={i} className="flex flex-col  gap-y-2">
//                                                         <div className={`py-4 px-2 w-full bg-white   shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-md `}>

//                                                             <div className="flex items-center gap-x-2">

//                                                                 <CourseAvatar courseName={item?.centerCourse_data[0]?.tutorCourse?.courseData?.name} w={23} h={23} />

//                                                                 <div className="flex flex-col items-start">
//                                                                     <h5 className="text-sm font-bold text-mainColor">
//                                                                         {handleUserName(item?.centerCourse_data[0]?.tutorCourse?.courseData?.name, 3)}
//                                                                     </h5>
//                                                                     <p className="text-sm font-semibold text-textGray">

//                                                                         {handleUserName(item?.centerCourse_data[0]?.tutorCourse?.tutor?.fullname, 2)}

//                                                                     </p>
//                                                                 </div>
//                                                             </div>

//                                                             <div className="cridets">
//                                                                 <h5 className="text-sm font-bold text-mainColor">{t("PopupWindows.dues")}</h5>
//                                                                 <p className="text-sm font-semibold text-textGray">

//                                                                     {item?.price > 0 && `${item?.price} ${t("homeRev.pound")}`}
//                                                                 </p>
//                                                             </div>

//                                                         </div>

//                                                         <div className="flex items-center justify-between gap-x-5">

//                                                             <input
//                                                                 placeholder={t("PopupWindows.dues")}
//                                                                 onChange={e => setinput(e.target.value)}
//                                                                 className=" focus:outline-none rounded-lg py-2 text-sm placeholder:text-sm border-[#E6E9EA] bg-[#F9FAFA] text-mainColor w-2/3"
//                                                                 type="number"
//                                                                 max={item?.price}
//                                                                 value={input}
//                                                             />

//                                                             <button
//                                                                 disabled={buttonDis || input > item?.price}
//                                                                 className={`text-xs sm:text-sm  w-1/3  ms-auto flex  ${buttonDis || input > item?.price ? " bg-secondMainColor " : " bg-mainColor  "} text-white rounded-lg  text-center py-2  items-center justify-center gap-x-2 `}
//                                                                 type="button"
//                                                                 onClick={() => {
//                                                                     pay(item?.center, item?.card, item?._id)
//                                                                 }}
//                                                             >

//                                                                 {!buttonLoading ? t("Groups.pay") : (
//                                                                     <div className={`w-6  h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
//                                                                     ></div>
//                                                                 )}


//                                                             </button>
//                                                         </div>

//                                                     </div>





//                                                 )
//                                             }) : <p className="p-2 my-2 font-bold text-center bg-white  rounded-xl text-mainColor">{t("homepage.nothing")}</p>}

//                                         </div>
//                                     )

//                                     : arr?.map((item, i) => {
//                                         return <div key={i} className={`py-2 mt-3  px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex  flex-col  items-center justify-between rounded-2xl gap-y-4`}>
//                                             <div className="flex items-center w-full space-x-4 animate-pulse">
//                                                 <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
//                                                 <div className="flex-1 py-1 space-y-3">
//                                                     <div className="h-2 rounded bg-zinc-300"></div>
//                                                     <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     })

//                             }

//                         </DialogPanel>
//                     </div>
//                 </div>
//             </Dialog>
//         </>
//     );

// }


