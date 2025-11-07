import React, { useContext } from 'react'
import { ApisContext } from '../Context/ApisContext'
import Cookies from 'universal-cookie'
import { useTranslation } from 'react-i18next'
import { MainContext } from '../Context/MainContext'
import QRCode from 'qrcode.react';
import logo from "../assets/SanadLogo.svg"
import { ReactSVG } from 'react-svg'
import ExitPopUp from "../Components/PopupWindows/ExitPopUp/ExitPopUp"
function UseTutorKey() {
    const { fetchCenterKey, selectedCenter } = useContext(ApisContext)
    const { direction, Toggler, setToggler } = useContext(MainContext)
    const [t] = useTranslation()
    const cookie = new Cookies()
    const userDetails = cookie.get("userDetails")
    return (
        <div dir={direction} className="welcome w-full relative bg-[#F9FAFC]  md:bg-bg_mainLayout h-screen    flex-grow bg-HomePageBgImage bg-cover bg-center bg-no-repeat   flex items-center justify-center flex-col gap-y-2   ">

            <span className="logo absolute top-4 start-4">
                <ReactSVG src={logo} />
            </span>
            <span onClick={() => setToggler({ ...Toggler, exit: true })} className="logOut cursor-pointer p-2 bg-err text-white rounded-xl absolute top-4 end-4">
                {t("dashboard.checkout")}
            </span>


            <p className={`${selectedCenter ? "text-base" : "text-xl"} text-secondMainColor  pb-2 font-bold `}>{t("homepage.titleP")} {userDetails.fullname} ,</p>
            {selectedCenter && <h1 className="text-mainColor text-size_28 xl:text-size_34 font-bold">
                {t("homepage.titleH")}   {selectedCenter?.name}
            </h1>}
            <h1 className='text-4xl font-bold text-mainColor'>
                {t("Login.welcomeMessage")}
            </h1>
            <div className='my-2 rounded-xl overflow-hidden bg-white inline-block p-1'>
                <QRCode size={256} level='H' includeMargin={true}
                    renderAs="svg" value={fetchCenterKey.data?.cAData?.centerOwnerKey} />
            </div>
            <>
                <div className='sm:flex hidden items-center gap-x-4 text-lg text-secondMainColor'>
                    {t("homepage.centerKey")} : <span className='font-bold'>
                        {fetchCenterKey.data?.cAData?.centerOwnerKey}
                    </span>
                </div>

                <div className='sm:hidden flex flex-col items-center gap-x-4 text-lg text-secondMainColor'>
                    {t("homepage.centerKey")} : <span className='font-bold text-mainColor'>
                        {fetchCenterKey.data?.cAData?.centerOwnerKey}
                    </span>
                </div>
            </>

            <ExitPopUp />
        </div>
    )
}

export default UseTutorKey