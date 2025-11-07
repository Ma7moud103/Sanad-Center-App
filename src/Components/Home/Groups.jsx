import React, { memo, useContext } from 'react'
import Group from './Group';
import { ApisContext } from '../../Context/ApisContext';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../Context/MainContext';
import { ReactSVG } from 'react-svg';
import iocnHeaderTable from "../../assets/sanadSVG/iocnHeaderTable.svg"

function Groups({ groups, CurrentGroups, setSelectedItem }) {

    const [t, i18n] = useTranslation();
    const { Toggler, setToggler } = useContext(MainContext)


    return <>
        {CurrentGroups && CurrentGroups?.length > 0 ? groups?.map((item, i) => {

            const isLastItem = i === groups?.length - 1;
            return (


                <div key={i} className={`py-[22px] px-6 w-full border-[#E1E1E1] border border-t-0  lg:gap-x-4  flex items-center justify-between relative ${isLastItem && 'rounded-b-xl'}`}>

                    {/* <div className="flex text-start gap-2 w-1/5"> */}

                    <Group group={item} key={i} />

                    <div className="=icons cursor-pointer absolute  end-5"
                        onClick={() => {

                            sessionStorage.setItem("groupId", item?._id)
                            sessionStorage.setItem("courseId", item?.centerCourse)
                            setSelectedItem(item)

                            setToggler(prev => {
                                return { ...prev, checkCard: true }
                            })
                        }}                                   >
                        {/* {iocnHeaderTable} */}
                        <ReactSVG src={iocnHeaderTable} />
                    </div>

                </div>

            )
        }) : <p className=" my-2 text-center font-bold rounded-xl p-2 text-mainColor">{t("homepage.nothing")}</p>}
    </>
}


export default memo(Groups)