import React, { memo } from 'react'
import { ReactSVG } from 'react-svg'
import sort from "../../assets/sanadSVG/sort.svg"
import { useTranslation } from 'react-i18next'

function Labels({ tags }) {
    const [t] = useTranslation()
    return (
        <div className="Header bg-[#F4F7FE] p-6 py-8 border border-[#E1E1E1]   rounded-2xl rounded-b-none flex justify-between">


            {tags?.map((tag, i) => {
                return <div key={i} className={tag.hasSort ? `text-start text-sm text-textGray flex gap-x-2 1/${tags.length}` : `text-start text-sm text-textGray 1/${tags.length}`}>
                    {tag?.hasSort && <>
                        <ReactSVG src={sort} />

                    </>}

                    {t(tag?.name)}
                </div>
            })}





        </div>
    )
}

export default memo(Labels)