/* eslint-disable array-callback-return */
import { Form, Formik} from "formik";
import React, { Fragment, useContext} from "react";
import * as Yup from "yup";
import ourCites from "../../cites.json";
import { useTranslation } from "react-i18next";
import { Listbox, Transition } from "@headlessui/react";
import downArrowFilter from "../../assets/sanadSVG/downArrow.svg"
import { ReactSVG } from "react-svg";
import { MainContext } from "../../Context/MainContext";

export default function Form3({ data, next, back }) {



    const { selectedCity,
        setselectedCity,
        selectedGover,
        setselectedGover } = useContext(MainContext)
    let [t, i18n] = useTranslation();

    // let concentrains = JSON.parse(sessionStorage.getItem("consentrains"));

    let FormThreevalidationSchema = Yup.object({
        city: Yup.string().required(t("register.cityReq")),
        governorate: Yup.string().required(t("register.goverReq")),
        address: Yup.string()
            .required(t("register.addReq"))
            .matches(/^[0-9A-Za-z\u0600-\u06FF\s.,'-]+$/u, t("register.addMat")),
    });

    const handleSubmit = (values) => {
        next(values);
    };


    // console.log(selectedGover)
    return (
        <Formik
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={FormThreevalidationSchema}
        >
            {(formikProps) => (
                <Form className="w-full relative ">
                    <div className="flex flex-col justify-center items-center gap-y-4 py-6 w-full">
                        <div className="governorate flex flex-col w-full gap-y-1 sm:gap-y-2 ">
                            <label
                                htmlFor="governorate"
                                className="text-mainColor w-full text-start font-semibold text-sm   relative"
                            >
                                {t("register.governorate")}
                            </label>

                            <Listbox
                                name="governorate"
                                onChange={(e) => {
                                    setselectedGover(e)
                                    formikProps.setFieldValue("governorate", e?.nameEn)
                                    // console.log(formikProps.values.governorate);
                                }}
                                value={selectedGover} >
                                <div className="relative">
                                    <Listbox.Button
                                        className={`py-3 px-6 border-[#BDC4CD] bg-[#FFFFFF] outline-none cursor-pointer  focus:border-mainColor focus:outline-none text-start border-[1px] rounded-xl placeholder:text-start text-mainColor font-bold w-full `}
                                    >
                                        <span className="absolute top-[50%]  translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[26px] h-[26px] ounded-full ">
                                            <ReactSVG src={downArrowFilter} />
                                        </span>

                                        <span className={`block truncate text-sm  text-mainColor font-bold  $`}
                                        >
                                            {i18n.language === "ar" ? selectedGover?.nameAr : i18n.language === "en" && selectedGover?.nameEn}
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            className="absolute  mt-1 max-h-44 z-10 
                        scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow"
                                        >
                                            {ourCites.data.map((person, personIdx) => (
                                                <Listbox.Option
                                                    key={personIdx}
                                                    className={({ active }) =>
                                                        ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                                                            ? "bg-mainColor text-white"
                                                            : "text-mainColor"
                                                        }`
                                                    }
                                                    value={person}
                                                >
                                                    {({ selectedGover }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate text-xs 
                                                                                 text-start ${selectedGover ? "font-medium" : "font-normal"
                                                                    }`}
                                                            >
                                                                {i18n.language === "ar" ? person?.nameAr : i18n.language === "en" && person?.nameEn}
                                                            </span>
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>

                        </div>

                        <div className="area flex flex-col w-full gap-y-1 sm:gap-y-2">
                            <label
                                htmlFor="city"
                                className="text-mainColor w-full text-start font-semibold text-sm  relative"
                            >
                                {t("register.city")}
                            </label>

                            <Listbox
                                onChange={(e) => {
                                    setselectedCity(e)
                                    formikProps.setFieldValue("city", e?.nameEn)

                                }}
                                name="city"
                                value={selectedCity}
                            >
                                <div className="relative">
                                    <Listbox.Button
                                        className={`py-3 px-6 border-[#BDC4CD] bg-[#FFFFFF] outline-none cursor-pointer focus:border-mainColor focus:outline-none text-start border-[1px] rounded-xl  placeholder:text-start  font-bold w-full`}
                                    >
                                        <span className="absolute top-[50%]  translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[26px] h-[26px]  rounded-full ">
                                            <ReactSVG src={downArrowFilter} />
                                        </span>

                                        <span
                                            className={`block truncate text-sm   text-start text-mainColor`}>
                                            {i18n.language === "ar" ? selectedCity?.nameAr : i18n.language === "en" && selectedCity?.nameEn}
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            className="absolute  mt-1 max-h-44 z-10 
                        scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow"
                                        >
                                            {ourCites.data.map((city) => {
                                                if (city.nameEn === formikProps.values.governorate) {
                                                    return city.cities.map((person, personIdx) => {
                                                        return (
                                                            <Listbox.Option
                                                                key={personIdx}
                                                                className={({ active }) =>
                                                                    ` relative cursor-pointer  select-none py-2 pl-10 pr-4 ${active
                                                                        ? "bg-mainColor text-white"
                                                                        : "text-mainColor"
                                                                    }`
                                                                }
                                                                value={person}
                                                            >
                                                                {({ selectedCity }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block truncate  text-xs ${selectedCity
                                                                                ? "font-medium"
                                                                                : "font-normal"
                                                                                }`}
                                                                        >
                                                                            {i18n.language === "ar" ? person?.nameAr : i18n.language === "en" && person?.nameEn}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        );
                                                    });
                                                }
                                            })}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>

                            {formikProps.errors.city && formikProps.touched.city ? (
                                <div className="flex items-center gap-x-2  mb-3">
                                    <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                    <p className="text-[#E4363DE8]  ">{formikProps.errors.city}</p>
                                </div>
                            ) : null}
                        </div>

                        <div className="address flex flex-col w-full gap-y-1 sm:gap-y-2">
                            <label
                                htmlFor="Address"
                                className="text-mainColor w-full text-start font-semibold text-sm   relative"
                            >
                                {t("register.address")}
                            </label>

                            <input
                                onBlur={formikProps.handleBlur}
                                placeholder={t("register.addressPlaseholder")}
                                className={`py-3 px-6 outline-none cursor-pointer     focus:outline-none text-start border-[1px] rounded-xl   placeholder:text-start placeholder:text-size_12 
                placeholder:text-[#96A0AD] text-sm 
                                       ${formikProps.errors.address && formikProps.touched.address
                                        ? " border-[#E4363DE8] placeholder:text-[#E4363DE8] text-[#E4363DE8] font-normal "
                                        : "border-[#BDC4CD] text-mainColor font-bold"
                                    }  `}
                                type="text"
                                id="Address"
                                value={formikProps.values.address}
                                name="address"
                                onChange={formikProps.handleChange}
                            />
                            {formikProps.errors.address && formikProps.touched.address ? (
                                <div className="flex items-center gap-x-2  mb-3">
                                    <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                    <p className="text-[#E4363DE8] text-size_12   ">
                                        {formikProps.errors.address}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        <div className="buttons w-full  flex gap-x-mainGap  ">
                            <button
                                type="submit"
                                disabled={!formikProps.isValid}
                                className={`text-white cursor-pointer flex justify-center items-center  ${formikProps.isValid
                                    ? "bg-mainColor hover:bg-secondMainColor"
                                    : "bg-[#023e8a8f]"
                                    } font-bold w-full text-sm py-3  rounded-2xl  focus:outline-none`}
                            >
                                {t("register.next")}
                            </button>

                            <button
                                onClick={() => {
                                    back(formikProps.values);
                                }}
                                type="button"
                                className="text-white flex justify-center items-center bg-mainColor hover:bg-secondMainColor font-bold w-full text-sm py-3 rounded-2xl  focus:outline-none"
                            >
                                {t("register.prev")}
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}