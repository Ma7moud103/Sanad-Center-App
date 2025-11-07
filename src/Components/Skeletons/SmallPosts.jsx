import React from 'react'

export default function SmallPosts() {
    const arr = [1, 1, 1, 1, 1]
    return (
        arr?.map((item, i) => {
            return <div key={i} className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}>
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

