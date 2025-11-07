import React from 'react'
import { useTranslation } from 'react-i18next'

const ContactUs = () => {
    const [t] = useTranslation()
    const email = `support@sanadedu.com`
    return (
        <main className='p-3 py-5 w-full flex items-center justify-center    bg-gradient-to-tr from-secondMainColor to-blue_light rounded-xl '>

            <div className="content   flex flex-col gap-y-3">
                <h4 className='text-white text-sm sm:text-base'>
                    {t("dashboard.contactUs")}
                </h4>
                <a target='_blank' rel='noreferrer' href={`mailto:${email}`} className='bg-white  p-2 text-mainColor font-bold text-xs text-center sm:text-sm rounded-xl '>
                    {t("dashboard.contactUsBtn")}
                </a>
            </div>

        </main>

    )
}

export default ContactUs