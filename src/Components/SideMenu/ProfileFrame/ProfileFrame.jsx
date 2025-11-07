import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ApisContext } from "../../../Context/ApisContext";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import profile from "../../../assets/sanadSVG/imgUser.svg"
import { ReactSVG } from 'react-svg'
import Post from "../../Skeletons/Post";
import { MainContext } from "../../../Context/MainContext";
import { SvgsContext } from "../../../Context/SvgsConetxt";
import { BASUE_IMAGES } from "../../../Soursre";



export default function ProfileFrame() {
  const { selectedCenter, fetchAllCenters } = useContext(ApisContext)
  const { toggleNotifications, setToggleMenu, } = useContext(MainContext)
  const [t] = useTranslation()
  const cookie = new Cookies()
  const userDetails = cookie.get("userDetails")
  const { bell } = useContext(SvgsContext)



  return (

    <div className="flex items-center justify-between w-full px-3 py-1 mt-3 mb-2 border-solid profile border-y-2 border-borderMainColor">
      {!fetchAllCenters.isFetched ? <Post /> :
        <>
          <Link to={"/settings"} className="flex w-full cursor-pointer imageCard">
            <div className="image me-3">



              {userDetails?.profileImage !== "" ?
                <span className=''>
                  <img className='w-[40px] h-[40px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${userDetails?.profileImage}`} alt="profileImage" />
                </span>

                : <ReactSVG src={profile} />}


            </div>

            <div>
              <p className="text-sm font-bold text-mainColor">
                {userDetails?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}
              </p>

              {userDetails.role === "2" ?
                <p className="font-semibold text-gray-500 text-size_12">
                  {/* {t("homepage.teacher")} */}
                  {selectedCenter ? `${t("homepage.assistant")} - ${selectedCenter?.name}` : t("homepage.assistant")}

                </p> :

                <p className="font-semibold text-gray-500 text-size_12">
                  {/* {t("homepage.teacher")} */}

                  {t("homepage.owner")} -  {selectedCenter?.name}
                </p>
              }
            </div>

          </Link>


        </>
      }

      {/* <Link to={"notifications"} className={`rang cursor-pointer relative ${toggleNotifications ? "bg-mainColor" : "bg-white"}  w-8 h-8 rounded-xl border-2 border-rangColorGray border-solid flex justify-center items-center`}
        onClick={() => {
          sessionStorage.setItem("toggleNotify", JSON.stringify(true))
          setToggleMenu(prev => !prev)
        }}
      >
        {toggleNotifications ? bell("#FFFFFF") : bell()}
      </Link> */}


    </div>

  );
}
