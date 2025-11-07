import React, { useContext } from 'react'
import { ApisContext } from '../../Context/ApisContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import profile from '../../assets/sanadSVG/imgUser2.svg'
import { BASUE_IMAGES } from '../../Soursre';
import { MainContext } from '../../Context/MainContext';
const arr = [3, 3, 3, 3, 3];

function AlertsLog() {
    const [t,] = useTranslation()
    const { fetchAlerts, alertPage, setalertPage, Time, Day } = useContext(ApisContext)
    const { handleUserName } = useContext(MainContext)


    const itemsPerPage = 6;
    const handlePageChange = (newPage) => {
        setalertPage(newPage);
    };
    const [totalItems, settotalItems] = useState(0);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== alertPage) {
            handlePageChange(newPage);
        }
    };

    const displayRange = 1;
    const pagesToShow = [];
    const startPage = Math.max(alertPage - displayRange, 1);
    const endPage = Math.min(alertPage + displayRange, totalPages);

    if (startPage > 2) {
        pagesToShow.push(1);
        if (startPage > 3) {
            pagesToShow.push('...');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
    }

    if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) {
            pagesToShow.push('...');
        }
        pagesToShow.push(totalPages);
    }









    useEffect(() => {
        settotalItems(fetchAlerts.data?.metadata?.totalDocs);
    }, [fetchAlerts, alertPage]);


    return (
        <div
            className={`w-full   rounded-lg flex flex-col   pt-6 pb-2 gap-y-8 h-auto `}
        >
            <div className="flex items-center justify-between header ">
                <div className="flex flex-col w-full gap-3 main lg:w-auto">
                    <p className="font-extrabold text-size_26 md:text-size_28 text-mainColor">
                        {t('homepage.alertsLog')}
                    </p>
                </div>


            </div>



            <div className="flex flex-col rounded-2xl gap-y-5 ">
                {fetchAlerts.isFetched ? (
                    <div className='gap-4 flex flex-col  w-full lg:w-[80%]'>
                        {fetchAlerts.data?.data?.length > 0 ? (
                            fetchAlerts.data?.data?.map((item, i) => {
                                return (

                                    <div key={i} className="p-3  w-full transition-all bg-white shadow box rounded-xl hover:scale-[1.02]">
                                        <div className='flex items-center justify-between w-full'>
                                            <div className="flex items-center gap-x-1">
                                                {item?.createdBy?.profileImage !== "" ? <img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${item?.createdBy?.profileImage}`} alt="profileImage" /> :
                                                    <ReactSVG src={profile} />}
                                                <div>
                                                    <h6 className='text-xs font-bold sm:text-lg text-mainColor'>

                                                        {handleUserName(item?.createdBy?.fullname, 2)}
                                                    </h6>
                                                    <p className='font-bold text-2xs sm:text-base text-textGray'>
                                                        {item?.createdBy?.code}
                                                    </p>
                                                </div>
                                            </div>




                                            <div className='flex flex-col '>

                                                <h5 className='text-xs sm:text-base'>
                                                    {Day(item?.createdAt)}
                                                </h5>
                                                <h5 className='text-xs sm:text-base'>
                                                    {Time(item?.createdAt)}
                                                </h5>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full my-4 content ">
                                            <h4 className='font-bold sm:text-lg'>
                                                {item?.title}
                                            </h4>
                                            <p className='mt-2 text-sm font-semibold leading-5 sm:text-base text-textColor__2'>
                                                {item?.description}
                                            </p>
                                        </div>



                                    </div>

                                );
                            })
                        ) : (
                            <p className="w-full p-2 my-2 font-bold text-center bg-white rounded-xl text-mainColor ">
                                {t('homepage.nothing')}
                            </p>
                        )}
                    </div>
                ) : (
                    arr?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}
                            >
                                <div className="flex items-center w-full space-x-4 animate-pulse">
                                    <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
                                    <div className="flex-1 py-1 space-y-3">
                                        <div className="h-2 rounded bg-zinc-300"></div>
                                        <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                {fetchAlerts.data?.data?.length > 0 && (
                    <div className="flex items-center justify-center gap-y-4">
                        {fetchAlerts?.data?.data?.length > 0 && (
                            <div className="flex items-center justify-center max-w-full text-size_10 sm:text-size_12 md:text-size__14">
                                <button
                                    onClick={() => handleClick(alertPage - 1)}
                                    // onClick={() => setalertPage((old) => {
                                    //     Math.max(old - 1, 1)
                                    // })}
                                    className={`${alertPage === 1
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'cursor-pointer'
                                        } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                                    disabled={alertPage === 1}
                                >
                                    &lt;
                                </button>

                                {pagesToShow.map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (typeof page === 'number') {
                                                handleClick(page);
                                            }
                                        }}
                                        className={`${typeof page === 'number'
                                            ? alertPage === page
                                                ? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
                                                : 'bg-transparent text-[#293241] hover:bg-slate-100'
                                            : 'text-[#293241]'
                                            } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleClick(alertPage + 1)}
                                    className={`${alertPage === totalPages
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'cursor-pointer'
                                        }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                                    disabled={
                                        alertPage === totalPages ||
                                        fetchAlerts.isPlaceholderData
                                    }
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AlertsLog