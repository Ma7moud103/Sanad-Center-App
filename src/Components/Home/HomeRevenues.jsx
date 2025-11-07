import { useTranslation } from "react-i18next"
import { Disclosure } from "@headlessui/react"
import { useContext, useState, useEffect, memo } from "react"
import { MainContext } from "../../Context/MainContext"
import { SvgsContext } from "../../Context/SvgsConetxt"
import { ApisContext } from "../../Context/ApisContext"
import alert from "../../assets/sanadSVG/alert.svg"
import feedBack from "../../assets/sanadSVG/feedback.svg"
import timeline from "../../assets/sanadSVG/timeline.svg"
import downArrow from "../../assets/sanadSVG/downArrow.svg"
import sort from "../../assets/sanadSVG/sort.svg"
import { ReactSVG } from "react-svg"
import plus from "../../assets/sanadSVG/plusTable.svg";
import moment from 'moment';

const arr = [3, 3, 3, 3, 3]
// const tens = [2, 3, 4, 5, 6, 7, 8, 9, 10, 0]

const HomeRevenues = () => {
    const { setToggler } = useContext(MainContext)

    const { fetchAllCenters } = useContext(ApisContext)


    const [t, i18n] = useTranslation()


    // pagination

    // const itemsPerPage = 5;
    // const handlePageChange = (newPage) => {
    //     setcurrentPagePayments(newPage);

    // };
    // const [totalItems, settotalItems] = useState(0)
    // const totalPages = Math.ceil(totalItems / itemsPerPage);
    // const handleClick = (newPage) => {
    //     if (newPage >= 1 && newPage <= totalPages && newPage !== currentPagePayments) {
    //         handlePageChange(newPage);
    //     }
    // };

    // const displayRange = 1;
    // const pagesToShow = [];
    // const startPage = Math.max(currentPagePayments - displayRange, 1);
    // const endPage = Math.min(currentPagePayments + displayRange, totalPages);

    // if (startPage > 2) {
    //     pagesToShow.push(1);
    //     if (startPage > 3) {
    //         pagesToShow.push("...");
    //     }
    // }

    // for (let i = startPage; i <= endPage; i++) {
    //     pagesToShow.push(i);
    // }

    // if (endPage < totalPages - 1) {
    //     if (endPage < totalPages - 2) {
    //         pagesToShow.push("...");
    //     }
    //     pagesToShow.push(totalPages);
    // }


    // const startIndex = (currentPagePayments - 1) * itemsPerPage;
    // const endIndex = Math.min(startIndex + itemsPerPage, fetchPayment.data?.data?.docs?.length)
    // const visibleData2 = fetchPayment.data?.data?.docs?.slice(startIndex, endIndex)


    // useEffect(() => {
    //     settotalItems(fetchPayment?.data?.metadata?.totalDocs)
    // }, [fetchPayment, currentPagePayments])

    return (

        <div className="flex flex-col w-full xl:flex-row gap-mainGap ">









            <div className="flex flex-col items-center w-full lg:flex-row buttons gap-mainGap ">

                {fetchAllCenters.isFetched ?
                    <button className="flex items-center justify-center w-full p-3 bg-white cursor-pointer box lg:w-1/2 rounded-xl gap-x-3 "
                        onClick={() => setToggler(prev => {
                            return { ...prev, addAlert: true }
                        })}>
                        <ReactSVG src={alert} />

                        <p className="text-lg font-bold text-mainColor sm:text:base text-nowrap lg:text-lg">{t("homeRev.addAlert")}</p>
                    </button>
                    :
                    <div className="flex items-center w-full p-3 space-x-4 bg-white animate-pulse rounded-xl">
                        <div className="flex-1 py-1 space-y-3">
                            <div className="h-2 rounded"></div>
                            <div className="h-2 w-[40%] rounded"></div>
                        </div>
                    </div>
                }



                {fetchAllCenters.isFetched ?
                    <button onClick={() => setToggler(prev => {
                        return { ...prev, feedbackToggler: true }
                    })} className="flex items-center justify-center w-full p-3 bg-white cursor-pointer box lg:w-1/2 rounded-xl gap-x-3 ">

                        <ReactSVG src={feedBack} />


                        <p className="text-lg font-bold text-mainColor sm:text:base text-nowrap lg:text-lg">{t("homeRev.addFeedback")}</p>
                    </button>

                    :
                    <div className="flex items-center w-full p-3 space-x-4 bg-white animate-pulse rounded-xl">
                        <div className="flex-1 py-1 space-y-3">
                            <div className="h-2 rounded"></div>
                            <div className="h-2 w-[40%] rounded"></div>
                        </div>
                    </div>}

                {/* {!MainLoading.selectedCenterLoading ?


                    <button className="flex items-center justify-center w-full p-3 bg-white cursor-pointer box sm:w-1/3 md:w-full rounded-xl gap-x-3 "
                        onClick={(e) => {
                            setToggler(prev => {
                                return { ...prev, centerTimeTable: true }
                            })
                            setposition(e)
                        }}>
                        <ReactSVG src={timeline} />


                        <p className="text-lg font-bold text-mainColor sm:text:base text-nowrap lg:text-lg">{t("homeRev.centerTime")}</p>
                    </button>
                    :
                    <div className="flex items-center w-full p-3 space-x-4 bg-white animate-pulse rounded-xl">
                        <div className="flex-1 py-1 space-y-3">
                            <div className="h-2 rounded"></div>
                            <div className="h-2 w-[40%] rounded"></div>
                        </div>
                    </div>} */}



            </div>
        </div>
    )


}

export default memo(HomeRevenues)