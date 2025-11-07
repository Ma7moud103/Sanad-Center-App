import { Listbox } from '@headlessui/react'
import { useFormik } from 'formik'
import React, { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Handlebars from 'handlebars';
import html2pdf from 'html2pdf.js'
import * as Yup from 'yup'
import downArrow from "../../../assets/sanadSVG/downArrow.svg"
import { ReactSVG } from "react-svg"
import { useParams } from 'react-router-dom'
import { ApisContext } from '../../../Context/ApisContext'
import axios from 'axios'
import { useErrorBoundary } from 'react-error-boundary'
import { useQuery } from '@tanstack/react-query'
import downLoad from "../../../assets/sanadSVG/download.svg"
import { BASE_URL } from '../../../Soursre'
function GenerationCode() {
    const [t, i18n] = useTranslation()
    const { showBoundary } = useErrorBoundary()
    const { courseId } = useParams()

    const [loading, setloading] = useState(false)
    const [selectedSession, setselectedSession] = useState([])
    const { selectedCenter, headers, fetchSingleCourse } = useContext(ApisContext)

    Handlebars.registerHelper('t', function (key) {
        return i18n.t(key);
    });
    Handlebars.registerHelper('eq', function (a, b) {
        return a === b;
    });

    Handlebars.registerHelper('increment', function (value) {
        return parseInt(value) + 1;
    });
    const Ui = `
  <section class='w-full '>
    <h1 class='text-sm'>
      {{t "homepage.generateCode"}} {{sessionNumber}}
    </h1>

    <h2 class='text-sm'>
      {{t "homepage.course"}} {{ courseName }}
    </h2>

    <h2 class='text-sm'>
      {{t "homeRev.grade"}} {{ courseGrade }}
    </h2>

    <h2 class='text-sm'>
      {{#if (eq term "0")}}
        {{t "homeRev.highSchool"}}
      {{else if (eq term "1")}}
        {{t "homeRev.term"}} {{t "homeRev.first"}}
      {{else if (eq term "2")}}
        {{t "homeRev.term"}} {{t "homeRev.second"}}
      {{else if (eq term "3")}}
        {{t "homeRev.term"}} {{t "homeRev.third"}}
      {{/if}}
    </h2>

    <h2 class='text-sm'>
      {{t "homepage.codesNumber"}} : {{codesNumber}}
    </h2>

    <div class='codes mt-4 py-3'>
      {{#each codes}}
    <p>{{this}}  </p>
      {{/each}}
    </div>
  </section>
`;

    const generateHtmlContent = (template, data) => {
        const compiledTemplate = Handlebars.compile(template);
        return compiledTemplate(data);
    };

    const formik = useFormik({
        initialValues: {
            number: ""
        },
        validationSchema: Yup.object({
            number: Yup.number().required(t("homepage.inputRequired")).max(50, t("homepage.codesNumberMaxLengh"))
        }),
        onSubmit: async (values) => {

            if (selectedSession === null) {
                return false
            }
            try {
                setloading(true)
                const res = await axios.post(`${BASE_URL}/centers/${selectedCenter?._id}/center-courses/${courseId}/sessions/${selectedSession?._id}/access-codes`,
                    values,
                    { headers: headers }
                )
                if (res.status === 200 || res.data.stauts === "success") {



                    const reportData = {
                        sessionNumber: selectedSession?.sessionNumber, // Fixed typo
                        courseName: fetchSingleCourse.data?.at(0)?.tutorCourse?.courseData?.name, // Changed .at(1) to .at(0)
                        courseGrade: fetchSingleCourse.data?.at(0)?.tutorCourse?.courseData?.grade?.nameAr,
                        term: fetchSingleCourse.data?.at(0)?.tutorCourse?.term,
                        codesNumber: formik.values.number,
                        codes: res.data.data.codes, // Added codes to reportData

                        i18n: { language: i18n.language },
                        t: i18n.t.bind(i18n)
                    };

                    const element = document.createElement('div');
                    element.innerHTML = generateHtmlContent(Ui, reportData);

                    const opt = {
                        margin: 1,
                        filename: 'report.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                    };

                    html2pdf().from(element).set(opt).save();
                }
                console.log(res)
            } catch (error) {
                showBoundary(error)
            } finally {
                setloading(false)
            }
        }
    })


    const getCenterCourseSessions = async () => {

        if (selectedCenter && courseId) {
            try {
                const res = await axios.post(
                    `${BASE_URL}attendance/center/${selectedCenter?._id}/?limit=-1`,
                    {
                        centerCourseId: courseId,

                    },
                    { headers: headers }
                );
                if (res.status === 200 || res.data.status === 'success') {

                    setselectedSession(res.data.message[0])
                    return res.data.message;
                }
            } catch (error) {
                showBoundary(error)
            }


        }
    };

    const fetchSession = useQuery({
        queryKey: ["getCenterCourseSessions", `${courseId}`],
        queryFn: () => getCenterCourseSessions(),
        enabled: !!selectedCenter?._id && !!courseId
    })

    return (
        <div className='p-4 bg-white rounded-xl'>
            <h1 className='font-bold text-textColor__2'>{t("homepage.generateCode")}</h1>
            <form onSubmit={formik.handleSubmit}>

                <div className='flex flex-col w-full mt-4 lg:flex-row lg:items-center lg:gap-x-4 lg:gap-y-2'>


                    <div className="flex flex-col w-full numberOfCodes gap-y-2 lg:w-1/2">
                        <label htmlFor="codes" className='text-sm font-semibold text-textColor__2'>
                            {t("homepage.codesNumber")}
                        </label>
                        <input
                            className={`rounded-lg px-2 py-2 text-sm  ${formik.errors.number && formik.touched.number ? "border-err " : "border-input_border "} focus:border-none `}
                            type="number"
                            maxLength={50}
                            id='codes'
                            name='number'
                            value={formik.values.number}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.number && formik.touched.number && <p className='text-xs text-err'>
                            {formik.errors.number}
                        </p>}

                    </div>

                    <div className="flex flex-col w-full dropdown lg:w-1/2 gap-y-2">
                        <label htmlFor="session" className='text-sm font-semibold text-textColor__2'>
                            {t("homepage.sessionSelect")}
                        </label>
                        <Listbox
                            onChange={(ele) => {
                                setselectedSession(ele);

                            }}
                        >
                            {({ open }) => (
                                <div className="relative ">
                                    <Listbox.Button
                                        className={`font-semibold bg-[#F4F7FE] px-2 py-3 text-sm 
                                                 relative w-full flex cursor-pointer rounded-lg  text-left focus:outline-none  items-center justify-between  sm:text-sm gap-x-8 `}
                                    >
                                        <span
                                            className={`block truncate ${selectedSession !== null ? "text-mainColor" : "text-textColor__2"}   text-xs sm:text-sm `}
                                        >
                                            {selectedSession !== null
                                                ? selectedSession?.value && selectedSession?.value === "all" ? selectedSession?.name : `${t('SingleCourse.theSession')} ${selectedSession?.sessionNumber}`
                                                : t("homepage.sessionSelect")}
                                        </span>

                                        <ReactSVG src={downArrow} />
                                    </Listbox.Button>

                                    <Listbox.Options
                                        className="absolute  mt-1 max-h-32 z-10 
                                                        w-full scrollbar-thin rounded-md bg-[#F4F7FE] overflow-y-auto   focus:outline-none  shadow"
                                    >
                                        {fetchSession.data?.map((person, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    ` relative ${active ? 'bg-mainColor text-white' : 'text-mainColor'}  cursor-pointer select-none py-2 px-2`
                                                }
                                                value={person}
                                            >
                                                {({ selectedSession }) => (
                                                    <div className="flex items-center justify-between w-full">
                                                        <span
                                                            className={`block truncate text-size_10 sm:text-size_12  ${selectedSession
                                                                ? 'font-medium'
                                                                : 'font-normal'
                                                                }`}
                                                        >
                                                            {/* {t('SingleCourse.theSession')} 
																	{person?.sessionNumber} */}
                                                            {person?.value && person?.value === "all" ? person?.name : `${t("SingleCourse.theSession")} ${person?.sessionNumber}`}
                                                        </span>
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            )}
                        </Listbox>
                    </div>
                </div>
                <button disabled={!(formik.isValid && formik.dirty && selectedSession !== null)} type='submit' className={`${formik.isValid && formik.dirty && selectedSession !== null ? "bg-mainColor " : "bg-err"} max-w-[300px] text-white mt-2 px-3 py-2 rounded-xl w-full  flex items-center gap-x-3 justify-center`}>

                    {!loading ?
                        <>
                            {t("Logs.download")}
                            < ReactSVG src={downLoad} />
                        </>

                        :
                        <div className={`w-6  h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                        ></div>
                    }
                </button>






            </form>



        </div>
    )
}

export default GenerationCode