import React, { useContext } from "react";
import { MainContext } from "../../Context/MainContext";
import { useTranslation } from "react-i18next";
import { Listbox } from "@headlessui/react";
import { ApisContext } from "../../Context/ApisContext";
import Cookies from "universal-cookie";
import { ReactSVG } from "react-svg"
import downarrow from "../../assets/sanadSVG/downArrow.svg"



export default function HeaderHomePage() {
  const { handleUserName } = useContext(MainContext);
  const { allCenters, selectedCenter, setselectedCenter, fetchAllCenters } = useContext(ApisContext)



  const [t] = useTranslation()
  const cookie = new Cookies()
  const userDetails = cookie.get("userDetails")

  const filteredData = allCenters && allCenters.filter(item => {

    return item?.name !== selectedCenter?.name
  })
  // "rmet2Lco8F6BzYu3dmoYq"





  return (
    <div className="flex flex-col items-center justify-between mb-2 lg:flex-row gap-y-2 ">
      {fetchAllCenters.isFetched ?
        <>
          <div className="w-full welcome md:w-1/2 md:self-start ">
            <p className={`${selectedCenter ? "text-base" : "text-xl"} text-secondMainColor  pb-2 font-bold `}>{t("homepage.titleP")} {handleUserName(userDetails.fullname, 3)} ,</p>

            {selectedCenter &&
              <h1 className="font-bold text-mainColor text-size_28 xl:text-size_34">
                {t("homepage.titleH")}   {handleUserName(selectedCenter?.name, 3)}
              </h1>}

          </div>

          <div className="centers w-full lg:w-[300px]">

            {/* <Listbox
              value={selectedCenter}
              onChange={(e) => {
                setselectedCenter(e)
                sessionStorage.clear()
                sessionStorage.setItem("centerid", JSON.stringify(e))
              }} >
              {({ open }) => (
                <div className="relative ">

             

                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-base bg-white rounded-md shadow max-h-40 scrollbar-thin sm:text-sm ">
                    {filteredData && filteredData.map((person, personIdx) => (

                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          ` relative cursor-pointer   py-1 sm:py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor text-size_12 sm:text-sm  '} flex items-center justify-between`}
                        value={person} >
                        {({ selectedCenter }) => (
                          <>
                            <span className={`block truncate text-size_12 sm:text-sm   ${selectedCenter ? 'font-medium' : 'font-normal'}`}>
                              {person?.name}
                            </span>
                            <span className={`block truncate text-size_12 sm:text-sm   ${selectedCenter ? 'font-medium' : 'font-normal'}`}>
                              {person?.code}
                            </span>
                          </>

                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>

                </div>
              )
              }
            </Listbox> */}


            <div className={`font-semibold     text-mainColor  py-2 px-8 text-sm   
                      relative w-full flex   rounded-lg bg-white text-left focus:outline-none items-center justify-between  sm:text-sm `}>


              {fetchAllCenters.data?.length > 0 ? <>


                <span className={`block truncate text-size_12 sm:text-base`}>
                  {selectedCenter?.name}
                </span>
                <span className={`block truncate text-size_12 sm:text-base`}>
                  {selectedCenter?.code}
                </span>


                {/* <ReactSVG src={downarrow} /> */}

              </>
                : t("homepage.nothing")
              }

            </div>

          </div>




        </>
        : (
          <div className="w-full p-4 bg-white rounded-xl">
            <div className="flex items-center w-full space-x-4 animate-pulse">
              {/* <div className="w-10 h-10 rounded-full bg-zinc-300"></div> */}
              <div className="flex-1 py-1 space-y-3">
                <div className="h-2 rounded bg-zinc-300"></div>
                <div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
              </div>
            </div>
          </div>
        )

      }
    </div >
  );
}

