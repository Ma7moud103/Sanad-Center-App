import { ReactSVG } from "react-svg"
import Post from "../Skeletons/Post"

function Box({ isFetched, children, imageSrc, onClick, bg }) {




    return (
        <>
            <div onClick={onClick} className={`flex justify-center  p-4 ${bg ? bg : "bg-white w-full xl:w-1/4"} box  rounded-2xl gap-x-4 sm:gap-x-4 ${onClick ? "cursor-pointer" : "cursor-default"}`}>
                {isFetched ?
                    <>
                        <ReactSVG src={imageSrc} />

                        <div className="title   flex flex-col items-center justify-center">

                            {children}

                        </div>
                    </>
                    : <Post />
                }

            </div>
        </>
    )
}

export default Box