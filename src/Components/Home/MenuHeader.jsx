import React, { memo } from 'react'
import { ReactSVG } from 'react-svg'
import filterIcon from "../../assets/sanadSVG/filterIcon.svg"
import { useTranslation } from 'react-i18next';

function MenuHeader({ selectedItem }) {
    const [t, i18n] = useTranslation();

    return (
        <>
            <ReactSVG src={filterIcon} />

            <div className={` flex flex-col gap-y-1`}>
                <p className="block truncate text-mainColor font-semibold text-xs">
                    {selectedItem ? (
                        i18n.language === 'ar' ? (
                            selectedItem?.nameAr
                        ) : (
                            i18n.language === 'en' &&
                            selectedItem?.nameEn
                        )
                    ) : (
                        <span className="text-textColor__2">
                            {t('homepage.choiseCourse')}
                        </span>
                    )}
                </p>
            </div></>
    )
}


export default memo(MenuHeader)