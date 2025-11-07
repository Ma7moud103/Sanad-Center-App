import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../Context/MainContext';

export default function BtnToggleLang() {
    const { toggleDirection } = useContext(MainContext)

    let { i18n } = useTranslation()
    return (
        <>




            {i18n.language === "en" && (
                <span
                    onClick={() => toggleDirection()}
                    className=" bg-mainColor   cursor-pointer text-sm py-1 px-2 sm:px-5  rounded-[120px] flex items-center justify-center shadow text-white">
                    Arabic
                </span>
            )}

            {i18n.language === "ar" || i18n.language === "ar-EG" ? (
                <span
                    onClick={() => toggleDirection()}
                    className=" bg-mainColor   cursor-pointer text-sm py-1 px-2 sm:px-5  rounded-[120px] flex items-center justify-center shadow text-white">
                    الانجليزيه
                </span>
            ) : null}

        </>
    )
}