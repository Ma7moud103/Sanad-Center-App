import React from 'react'

export default function LargePosts() {
    const arr5 = [0, 0, 0, 0, 0]
    return (
        arr5.map((item, index) => {
            return <div key={index} className="py-5 px-6 w-full lg:gap-x-4  flex items-center justify-between ">
                <div className="animate-pulse w-full  flex items-center  space-x-4">
                    <div className="rounded-full bg-zinc-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-3 py-1">
                        <div className="h-2 bg-zinc-300 rounded"></div>
                        <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
                    </div>
                </div>
            </div>
        }))
}

