import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import React from 'react'
import MenuHeader from './MenuHeader';
import downArrowFilter from "../../assets/sanadSVG/downArrow.svg"
import { ReactSVG } from 'react-svg';

function Menu({ children, selectedItem, handleChange }) {
    return (
        <div className="lg:w-[230px] hidden lg:block ">
            <Listbox
                value={selectedItem}
                onChange={(Grade) => {
                    handleChange(Grade);

                }}
            >
                {({ open }) => (
                    <div className="relative ">
                        <ListboxButton
                            className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-xs xl:text-sm
                                                                        flex cursor-pointer rounded-xl bg-white lg:bg-bg_mainLayout  text-start focus:outline-none   `}
                        >

                            <div className="flex items-center ps-2 sm:p-0 gap-x-2">
                                <MenuHeader selectedItem={selectedItem} />
                            </div>

                            <ReactSVG src={downArrowFilter} />
                        </ListboxButton>

                        <ListboxOptions
                            className="absolute  mt-1 max-h-40 z-10
                                     w-full overflow-y-scroll rounded-md  bg-white lg:bg-bg_mainLayout  py-1 text-xs xl:text-sm scrollbar-thin shadow  focus:outline-none  "
                        >

                            {children}
                        </ListboxOptions>
                    </div>
                )}
            </Listbox>
        </div>
    )
}

export default Menu