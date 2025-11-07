import React, { useContext, useState } from 'react';
import icon from '../../assets/sanadSVG/teachers.svg';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import x from '../../assets/sanadSVG/Multiply.svg';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import { BASE_URL } from '../../Soursre';
import { ApisContext } from '../../Context/ApisContext';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function ConfirmDeleteBoockedCourse() {
    const { Toggler, setToggler, assistantId, direction } =
        useContext(MainContext);
    const { handleDeletBoockedCourse, setboockedCourseReq, boockedCourseReq } =
        useContext(ApisContext);

    const [t] = useTranslation();



    function close() {
        setToggler({ ...Toggler, deleteCourse: false });
    }

    return (
        <>
            <Dialog
                dir={direction}
                open={Toggler.deleteCourse}
                as="div"
                className="relative z-30 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                    <div className="flex items-center justify-center min-h-full p-4 py-6 b">
                        <DialogPanel
                            transition
                            className="w-full sm:w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                className="flex items-center justify-center p-3 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, deleteCourse: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="font-medium text-base/7 text-mainColor"
                            >
                                <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                    <ReactSVG src={icon} />
                                    <h3 className="text-2xl  font-black text-[#023E8A]">
                                        {t('homepage.deleteCourse')}
                                    </h3>
                                    <p className="font-semibold text-center sm:text-lg text-textColor__2 ">
                                        {t('homepage.deletedCourseDes')}
                                    </p>
                                </div>
                            </DialogTitle>
                            {/* content */}

                            <div className="flex items-center justify-center w-full mt-2 formBtns gap-x-3">
                                <button
                                    // disabled={!(idCenter && assistantId)}
                                    onClick={() => {
                                        setboockedCourseReq({ ...boockedCourseReq, fire: true })
                                        handleDeletBoockedCourse()
                                    }}
                                    className="flex items-center justify-center w-full px-10 py-3 text-lg text-white bg-mainColor rounded-2xl md:w-1/2"
                                >
                                    {!boockedCourseReq.loading ? (
                                        t('PopupWindows.confirm')
                                    ) : (
                                        <div
                                            className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
                                        ></div>
                                    )}
                                </button>
                                <button
                                    onClick={() =>
                                        setToggler((prev) => {
                                            return { ...prev, deleteCourse: false };
                                        })
                                    }
                                    className="w-full px-10 py-3 text-lg bg-transparent text-mainColor rounded-2xl md:w-1/2"
                                >
                                    {t('PopupWindows.back')}
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
