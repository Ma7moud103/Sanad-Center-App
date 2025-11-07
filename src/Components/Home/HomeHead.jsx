import React from 'react'
import Menu from './Menu'
import { useTranslation } from 'react-i18next';
import { ListboxOption } from '@headlessui/react';

function HomeHead({ HeaderName, selectedItem, handleChange, Options }) {
    const [t, i18n] = useTranslation();
    return (
        <div className="header flex justify-between items-center  ">
            <div className="main flex flex-col gap-3">
                <p className="font-extrabold  text-size_24 md:text-size_28   text-mainColor">

                    {t(HeaderName)}
                </p>
            </div>
            <Menu handleChange={handleChange} selectedItem={selectedItem}>
                {Options?.map((person, personIdx) => (
                    <ListboxOption
                        key={personIdx}
                        className={({ selected }) =>
                            ` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4  text-sm   ${selected ? 'bg-mainColor text-white' : 'text-secondMainColor '}`
                        }
                        value={person}
                    >
                        {({ selected }) => (
                            <p className={` text-xs font-semibold `}>
                                {i18n.language === 'ar'
                                    ? person?.nameAr
                                    : i18n.language === 'en' && person?.nameEn}
                            </p>
                        )}
                    </ListboxOption>
                ))}
            </Menu>
        </div>
    )
}

export default HomeHead