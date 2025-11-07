import React, {
    useContext,
    useEffect,
} from 'react';

import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import x from '../../assets/sanadSVG/Multiply.svg';
import { ReactSVG } from 'react-svg';
import { MainContext } from "../../Context/MainContext"
const Terms = function () {
    let [t, i18n] = useTranslation();



    const { Toggler, setToggler } = useContext(MainContext);

    function close() {
        setToggler({ ...Toggler, terms: false });

    }
    const cachedDirection = localStorage.getItem('direction');
    useEffect(() => {
        if (cachedDirection !== null) {
            if (cachedDirection === 'rtl') {
                i18n.changeLanguage('ar');
            } else {
                i18n.changeLanguage('en');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cachedDirection]);


    return (
        <>

            <Dialog
                dir={cachedDirection}
                open={Toggler.terms}
                as="div"
                className="relative z-30 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                    <div className="flex min-h-full b items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-[500px] rounded-xl bg-bg_mainLayout max-h-[500px] sm:max-h-[650px] overflow-y-auto scrollbar-thin transition-all  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                className="flex items-center justify-center p-2 sm:p-3 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, terms: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="text-base/7  my-4 font-medium text-mainColor"
                            >
                                <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                    {/* <ReactSVG src={warning} /> */}
                                    <h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
                                        {t('terms.header')}
                                    </h3>


                                </div>
                            </DialogTitle>
                            {/* content */}
                            <article className=' flex flex-col w-full gap-y-4 '>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.one")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.two")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.three")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.four")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.five")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.six")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.seven")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.eight")}
                                </p>

                                <p className=' text-xs  text-start leading-5 font-bold '>
                                    {t("terms.nine")}
                                </p>

                                <h4 className=' text-sm  text-mainColor font-bold '>
                                    {t("terms.contentTable")}
                                </h4>
                                <div className=' text-xs  text-start leading-5    font-bold '>
                                    1. {t("terms.content.con1")} <br />
                                    2. {t("terms.content.con2")}<br />
                                    3. {t("terms.content.con3")}<br />
                                    4. {t("terms.content.con4")}<br />
                                    5. {t("terms.content.con5")}<br />
                                    6. {t("terms.content.con6")}<br />
                                    7. {t("terms.content.con7")}<br />
                                    8.  {t("terms.content.con8")}<br />
                                    9.  {t("terms.content.con9")}<br />
                                    10. {t("terms.content.con10")}<br />
                                    11.  {t("terms.content.con11")}<br />
                                </div>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content1")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content2")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content3")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content4")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content5")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content6")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content7")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content8")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content9")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content10")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content11")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content12")} </p>
                                <p className=' text-xs  text-start leading-5 font-bold '>{t("terms.details.content13")} </p>





                            </article>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
export default Terms