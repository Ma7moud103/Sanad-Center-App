import { useTranslation } from 'react-i18next';

import { memo, useContext } from 'react';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../Skeletons/Post';
import teachers from '../../assets/sanadSVG/teachers.svg';
import alert from '../../assets/sanadSVG/alert.svg';
import { ReactSVG } from 'react-svg';
import { MainContext } from '../../Context/MainContext';

const Boxes = () => {
    const [t] = useTranslation();

    const { tens, fetchAlerts } = useContext(ApisContext);
    const { setToggler } = useContext(MainContext)

    return (
        <div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">
            <div className="box w-full xl:w-1/2 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center cursor-pointer" onClick={() => setToggler(prev => {
                return { ...prev, addAlert: true }
            })}>
                {fetchAlerts.isFetched ? (
                    <div className='flex items-center gap-x-2'>
                        <ReactSVG src={alert} />


                        <h3 className=" text-mainColor text-xl 2xl:text-2xl font-bold">
                            {t('homeRev.addAlert')}
                        </h3>




                    </div>
                ) : (
                    <Post />
                )}
            </div>

            {fetchAlerts.isFetched ? (
                <div className="box w-full xl:w-1/2     rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light">
                    <ReactSVG src={teachers} />

                    <div className="title">
                        <p className=" text-white text-size__20  xl:text-lg font-bold">
                            {t('homepage.studentsAlertsnum')}
                        </p>

                        <div className="flex items-center text-nowrap">
                            <p className="text-mainColor text-lg text-white  xl:text-lg  font-bold">
                                {fetchAlerts.data?.metadata?.totalDocs > 0
                                    ? tens.includes(fetchAlerts.data?.metadata?.totalDocs)
                                        ? `${fetchAlerts.data?.metadata?.totalDocs} ${t('homepage.studentsAlerts')}`
                                        : `${fetchAlerts.data?.metadata?.totalDocs} ${t('homepage.studentsAlert')}`
                                    : t('homepage.nothing')}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="box w-full xl:w-1/2 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center">
                    <Post />
                </div>
            )}

            {/* <div className="box w-full xl:w-1/3 rounded-2xl flex p-4 gap-x-4 sm:gap-x-2 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light items-center cursor-pointer"
                onClick={() => setToggler(prev => {
                    return { ...prev, addTeacher: true }
                })}>
                <div className="icon rounded-full p-3 flex items-center justify-center ">
                    {plusWhite}
                </div>
                <p className="text-lg xl:text-size__14 2xl:text-base text-white font-bold">{t("PopupWindows.addTeacher")}</p>
            </div> */}

            {/* <AddTeacher /> */}
        </div>
    );
};

export default memo(Boxes);
