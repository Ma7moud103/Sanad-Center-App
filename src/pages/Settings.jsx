import React, { useContext } from 'react'
import edit from "../assets/sanadSVG/penGray.svg"
import profile from "../assets/sanadSVG/Profile.svg"
import { ReactSVG } from 'react-svg'
import { useTranslation } from 'react-i18next'
import { ApisContext } from '../Context/ApisContext'
import { MainContext } from '../Context/MainContext'
import { Helmet } from 'react-helmet'
import Cookies from 'universal-cookie'
import { BASUE_IMAGES } from '../Soursre'
// import { useErrorBoundary } from 'react-error-boundary'

function Settings() {
    const [t] = useTranslation()
    const { fetchCenterKey } = useContext(ApisContext)
    const { Toggler, setToggler } = useContext(MainContext)


    const userDetails = new Cookies().get("userDetails")



    return (

        <>
            <Helmet>
                <title>Settings</title>
                <meta name="description" content="Page description" />
                <link rel="canonical" href="http://example.com/my-page" />

            </Helmet>
            <section className='w-full p-6 lg:p-12 flex flex-col bg-white rounded-xl  gap-y-8 lg:flex-row lg:justify-between lg:gap-x-4'>

                <div className="profile  w-full lg:w-1/6 flex items-start h-full  justify-center  ">


                    {userDetails?.profileImage !== "" ?
                        <span className=''>
                            <img className='w-[200px] h-[200px] lg:w-[100px] lg:h-[100px] rounded-full transition-all duration-500  hover:drop-shadow-main overflow-hidden' src={`${BASUE_IMAGES}${userDetails?.profileImage}`} alt="profileImage" />
                        </span>

                        : <ReactSVG src={profile} />}
                </div>

                <div className=" w-full  lg:w-3/6 flex flex-col gap-y-3 ">
                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="fullname" className='text-mainColor font-semibold text-xs'>
                            {t("register.fullName")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            placeholder={t("register.fullName")}
                            readOnly
                            id="fullname"
                            defaultValue={userDetails?.fullname ? userDetails?.fullname : t("register.fullName")}
                        />
                    </div>
                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="email" className='text-mainColor font-semibold text-xs'>
                            {t("register.email")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            readOnly

                            id="email"
                            defaultValue={userDetails?.email ? userDetails?.email : t("register.email")}
                        />
                    </div>
                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="pass" className='w-full flex items-center justify-between '>
                            <span className='text-mainColor font-semibold text-xs'>
                                {t("register.password")}
                            </span>
                            <span
                                onClick={() => setToggler({ ...Toggler, changePass: true })}
                                className='me-4 cursor-pointer'>
                                <ReactSVG src={edit} />
                            </span>
                        </label>
                        <input type="password"
                            id='pass'
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={t("register.password")}
                            readOnly
                        />
                    </div>
                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="gen" className='text-mainColor font-semibold text-xs'>
                            {t("register.gender")}

                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.gender ? userDetails?.gender === "M" ? t("register.m") : userDetails?.gender === "F" && t("register.f") : t("register.gender")}
                            readOnly
                            id='gen'

                        />
                    </div>
                </div>


                <div className=" w-full  lg:w-3/6 flex flex-col   gap-y-3 ">
                    {userDetails.role === "2" &&
                        <div className="name w-full flex flex-col gap-y-2">
                            <label htmlFor="" className='text-mainColor font-semibold text-xs'>
                                {t("homepage.centerKey")}
                            </label>
                            <input type="text"
                                className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                                defaultValue={fetchCenterKey.data?.cAData?.centerOwnerKey}
                                readOnly
                            />
                        </div>
                    }
                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="code" className='text-mainColor font-semibold text-xs'>
                            {t("homepage.studentCode")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.code ? userDetails?.code : t("homepage.studentCode")}
                            readOnly
                            id='code'
                        />
                    </div>

                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="phone" className='text-mainColor font-semibold text-xs'>
                            {t("register.phoneNumber")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.phoneNumber ? userDetails?.phoneNumber : t("register.phoneNumber")}
                            readOnly
                            id='phone'
                        />
                    </div>
                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="city" className='text-mainColor font-semibold text-xs '>
                            {t("register.city")}


                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.city ? userDetails?.city : t("register.city")}
                            readOnly
                            id='city'
                        />
                    </div>
                    <div className="name w-full flex flex-col gap-y-2">
                        <label htmlFor="gover" className='text-mainColor font-semibold text-xs'>
                            {t("register.governorate")}
                        </label>
                        <input type="text"
                            className='focus:outline-none cursor-default focus:border-none text-textColor__2 bg-[#EEEEEE] focus:shadow-none px-4 py-3 border-[1px] border-textGray rounded-xl text-xs  font-bold'
                            defaultValue={userDetails?.governorate ? userDetails?.governorate : t("register.governorate")}
                            readOnly
                            id="gover"
                        />
                    </div>
                </div>



            </section>
        </>
    )
}

export default Settings