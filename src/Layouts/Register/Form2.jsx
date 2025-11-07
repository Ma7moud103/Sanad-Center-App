import { Field, Form, Formik } from "formik";
import React from "react";
// import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function Form2({ data, next, back }) {
    let [t] = useTranslation();

    const handleSubmit = (values) => {
        next(values);
    };

    let StepTwoValidationSchema = Yup.object({
        phoneNumber: Yup.string()
            .required(t("register.phoneReq"))
            .matches(/^01[0125][0-9]{8}$/, t("register.phoneMat")),
        birthDate: Yup.date().max(new Date(), t("register.birthDateBefore")).required(t("register.birthDateBefore")),
        gender: Yup.string().required(t("register.genderReq")),
    });







    // let { complateData } = useContext(MainContext);
    return (
        <Formik
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={StepTwoValidationSchema}
        >
            {(formikProps) => (
                <Form className="w-full relative mt-12 mb-10">
                    <div className={`flex flex-col  justify-center items-center gap-y-3 sm:gap-y-6 w-full`}>
                        <div className="phone flex flex-col w-full  gap-y-1 sm:gap-y-2 ">
                            <label
                                htmlFor="phoneNumber"
                                className="text-mainColor w-full text-start font-semibold text-size_12  relative"
                            >
                                {t("register.phoneNumber")}
                            </label>

                            <input
                                value={formikProps.values.phoneNumber}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                placeholder={t("register.phoneNumber")}
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className={`py-2  px-6  outline-none placeholder:text-slate-400  placeholder:text-[12px] text-size_12   focus:outline-none text-end border-[1px] rounded-xl  placeholder:text-end
                             ${formikProps.errors.phoneNumber &&
                                        formikProps.touched.phoneNumber
                                        ? " border-[#E4363DE8] placeholder:text-[#E4363DE8] text-[#E4363DE8]"
                                        : "border-[#BDC4CD] text-mainColor font-bold"
                                    }  `}
                            />

                            {formikProps.errors.phoneNumber &&
                                formikProps.touched.phoneNumber ? (
                                <div className="flex items-center gap-x-2  mb-3">
                                    <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                    <p className="text-[#E4363DE8] text-size_12 sm:text-sm   ">
                                        {formikProps.errors.phoneNumber}
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        <div id="myDate" className="birthdate flex  flex-col w-full  gap-y-1 sm:gap-y-2">
                            <label className="text-mainColor w-full text-start font-semibold text-size_12  relative">
                                {t("register.birthDate")}
                            </label>

                            {/* 1995-10-25T00:00:00.000+00:00 */}

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker

                                    // format="YYYY-MM-DD"
                                    name="birthDate"

                                    // value={formikProps?.values?.birthDate}
                                    // onClose={() => {
                                    //     formikProps.setFieldTouched("birthDate", true);
                                    // }}
                                    // onBlur={formikProps.handleBlur}
                                    onChange={(e) => {
                                        // console.log(e)
                                        // console.log(formikProps.values.birthDate)
                                        formikProps.values.birthDate = e?.$d;
                                        // formikProps.setFieldValue("birthDate", e)

                                    }}




                                />
                            </LocalizationProvider>

                            {formikProps.errors.birthDate && formikProps.touched.birthDate ? (
                                <div className="flex items-center gap-x-2  ">
                                    <span className="w-[5px] h-[5px] bg-[#E4363DE8]"></span>
                                    <p className="text-[#E4363DE8] text-size_12 ">
                                        {formikProps.errors.birthDate}
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        <div className="gender flex flex-col w-full gap-y-1 sm:gap-y-2">
                            <p className="text-mainColor w-full text-start font-semibold text-size_12 relative ">
                                {t("register.gender")}
                            </p>
                            <div className="flex  sm:w-1/2  gap-x-[5.75rem]">
                                <div className="flex justify-between gap-1 items-center">
                                    <Field
                                        className="outline-mainColor focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg cursor-pointer text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none w-[20px] h-[20px] "
                                        id="Male"
                                        type="radio"
                                        name="gender"
                                        value="M"
                                        checked={formikProps.values.gender === "M"}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur} // Handle blur event
                                    />
                                    <label
                                        htmlFor="Male"
                                        className="text-black w-full text-start font-semibold text-size_12  relative"
                                    >
                                        {t("register.m")}{" "}
                                    </label>
                                </div>

                                <div className="flex sm:w-1/2 justify-between gap-x-1  items-center">
                                    <Field
                                        className="outline-mainColor focus:border-mainColor focus:outline-mainColor border-[#BDC4CD] border-[1px] rounded-lg cursor-pointer text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none w-[20px] h-[20px] "
                                        id="Female"
                                        type="radio"
                                        name="gender"
                                        value={"F"}
                                        checked={formikProps.values.gender === "F"}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur} // Handle blur event
                                    />
                                    <label
                                        htmlFor="Female"
                                        className="text-black w-full text-start font-semibold  text-size_12 relative"
                                    >
                                        {t("register.f")}
                                    </label>
                                </div>
                            </div>

                            {formikProps.errors.gender && formikProps.touched.gender ? (
                                <div className="flex items-center gap-x-2  mb-3">
                                    <span className="w-[5px] h-[5px] bg-[#E4363DE8] text-sm"></span>
                                    <p className="text-[#E4363DE8] text-sm ">
                                        {formikProps.errors.gender}
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        <div className="w-full mt-4 sm:mt-0  flex justify-center items-center gap-x-3">
                            <button
                                type="submit"
                                disabled={!formikProps.isValid}
                                className={`text-white cursor-pointer flex justify-center items-center ${formikProps.isValid
                                    ? "bg-mainColor"
                                    : "bg-[#023e8a96]"
                                    } font-bold w-full  rounded-2xl text-sm  py-3  focus:outline-none`}
                            >
                                {t("register.next")}
                            </button>

                            <button
                                onClick={() => back(formikProps.values)}
                                type="button"
                                className="text-white flex justify-center items-center  bg-mainColor hover:bg-secondMainColor font-bold w-full  rounded-2xl text-sm  py-3  focus:outline-none"
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