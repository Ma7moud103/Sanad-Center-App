import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import x from '../../assets/sanadSVG/Multiply.svg';
// import { downArrow, downArrowFilter, filterIcon, timeTableIcon } from "../../Svgs";
import {
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Listbox,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import filterIcon from '../../assets/sanadSVG/filterIcon.svg';
import { ApisContext } from '../../Context/ApisContext';
import ts from '../../assets/sanadSVG/imgUser2.svg';

import marker from "../../assets/sanadSVG/checked.svg"
import timeTableIcon from '../../assets/sanadSVG/addGroup.svg';
import downArrowFilter from '../../assets/sanadSVG/downArrow.svg';
import { ReactSVG } from 'react-svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL, BASUE_IMAGES } from '../../Soursre';
import { useErrorBoundary } from 'react-error-boundary';
import { useQuery } from '@tanstack/react-query';
import CourseAvatar from '../CourseAvatar';
import { useParams } from 'react-router-dom'

export default function ModifyCourse() {
    const { showBoundary } = useErrorBoundary()
    const { code } = useParams()

    // const cashedStudents = JSON.parse(sessionStorage.getItem('studentsDetails'));

    const [t,] = useTranslation();
    const TYPES = [
        { name: t('homepage.bulk'), value: 'bulk' },
        { name: t('homepage.Bysession'), value: 'session' },
    ];
    const [selectedType, setselectedType] = useState(TYPES[0]);
    const filteredTypes = TYPES.filter((item) => {
        return item.name !== selectedType.name;
    });

    // const registerationFeesTypes = [
    //     { name: t('homepage.true'), value: 'true' },
    //     { name: t('homepage.false'), value: 'false' },
    // ];
    // const [selectedregisterationFees, setselectedregisterationFees] = useState(
    //     registerationFeesTypes[0]
    // );
    // const filteredregisterationFees = registerationFeesTypes.filter((item) => {
    //     return item.name !== selectedregisterationFees.name;
    // });

    const { Toggler, setToggler, ErorrMessage, direction, handleUserName, cardCourseId, } = useContext(MainContext);


    // const { profile, avatar } = useContext(SvgsContext)



    const {
        tens,
        headers,
        handleAddGroup,
        handleDeletGroup,
        handleModifyGroup,
        handleModifyCourse,
        Time,
        selectedCenter,
        sethandleBookCourse,

    } = useContext(ApisContext);


    const GetTeacherTimeTable = async () => {
        if (selectedCenter && cardCourseId?.centerCourse) {
            try {
                const response = await axios.get(
                    `${BASE_URL}centers/${selectedCenter?._id}/center-courses/${cardCourseId?.centerCourse}/groups?fields=-center,-tutorCourse?limit=-1`,
                    { headers: headers }
                );
                if (response.status === 200 || response.data.status === 'success') {
                    // setselectedGroupsBookCourse(response.data.data);
                    return response.data.data;
                }
            } catch (error) {
                console.log(error)
                showBoundary(error)

            }
        }
    };

    const fetchTutorsGroups = useQuery({
        queryKey: [
            'fetchTutorsGroupsToModify',
            `${selectedCenter?._id}`,
            `${cardCourseId?.centerCourse}`,
            `${handleAddGroup}`,
            `${handleDeletGroup}`,
            `${handleModifyGroup}`,
            `${handleModifyCourse}`
        ],
        queryFn: () => GetTeacherTimeTable(),
        enabled: !!selectedCenter?._id && !!cardCourseId?.centerCourse,
        // refetchOnMount: true,
    });



    const [selected, setSelected] = useState([]);


    const [loading, setloading] = useState(false);

    async function handleSubmit(values, reset) {
        if (selectedCenter && code) {

            try {
                setloading(true);

                const res = await axios.patch(
                    `${BASE_URL}centers/${selectedCenter?._id}/cards/${code}/card-courses/${cardCourseId?._id}`,
                    values,
                    { headers: headers }
                );


                if (res.status === 200 || res.data.status === 'success') {
                    ErorrMessage(t('Errors.modifyCourse'), 'success');
                    sethandleBookCourse((prev) => !prev);
                    setToggler({ ...Toggler, modifyBookedCourse: false });

                }
            } catch (error) {
                console.log(error)
                if (
                    error.response.data.message ===
                    'groups conflict with course requirements'
                ) {
                    ErorrMessage(t('Errors.groupsConflict'), 'error');
                } else if (
                    error.response.data.message === 'conflicting course requirements'
                ) {
                    ErorrMessage(t('Errors.coursesConflict'), 'error');
                } else if (error.response.data.message === "tutor course already added") {
                    ErorrMessage(t('Errors.courseAddedBefore'), 'error');
                } else {
                    ErorrMessage(error.response.data.message, 'error');
                }

            } finally {
                setloading(false);

            }
        }
    }



    const formik = useFormik({
        initialValues: {
            centerCourseId: cardCourseId?.centerCourse,
            // credits: 0,
            // paymentType: selectedType.value,
            groups: '',
            // discountPercent: '',
        },
        validationSchema: Yup.object({
            // credits: Yup.number().required('Credits are required'),
            // paymentType: Yup.string().required('Payment Type is required'),
            groups: Yup.array()
                .min(1, 'At least one group is required')
                .required('Groups are required'),
            // discountPercent: Yup.number().required('Discount Percent is required'),
        }),

        onSubmit: async (values, { resetForm }) => {
            console.log(values)
            handleSubmit(values, resetForm);

        },
    });


    const isError = (values, Toched) => {
        if (values && Toched) {
            return 'text-err border border-err  placeholder:text-err font-semibold ';
        } else {
            return 'text-mainColor border border-[#E6E9EA] font-semibold  ';
        }
    };

    function close() {
        setToggler({ ...Toggler, modifyBookedCourse: false });
        setSelected([]);
        setselectedType(TYPES[0]);
        formik.resetForm()
    }

    useEffect(() => {
        if (Toggler.modifyBookedCourse) {
            setSelected([]);

            setselectedType(TYPES[0]);
            formik.resetForm()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Toggler.modifyBookedCourse])

    // useEffect(() => {
    //     if (selectedType.value === "session") {
    //         formik.setFieldValue("credits", 0)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedType])
    useEffect(() => {
        if (cardCourseId) {
            const groupsId = cardCourseId?.group_data?.map((item) => item?._id)
            setSelected(cardCourseId?.group_data)

            cardCourseId?.paymentType === "bulk" ? setselectedType(TYPES[0]) : setselectedType(TYPES[1])


            formik.setValues({
                ...formik.values,
                centerCourseId: cardCourseId?.centerCourse,
                groups: groupsId,
                // credits: cardCourseId?.credits,
                // discountPercent: cardCourseId?.discountPercent,
                // paymentType: cardCourseId?.paymentType === "bulk" ? TYPES[0].value : TYPES[1].value,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps, no-sparse-arrays
    }, [cardCourseId, , Toggler.modifyBookedCourse,])





    return (
        <>
            <Dialog
                dir={direction}
                open={Toggler.modifyBookedCourse}
                as="div"
                className="relative z-30 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                    <div className="flex items-center justify-center min-h-full p-4 b">
                        <DialogPanel
                            transition
                            className="w-full md:w-[80%] lg:w-[60%] 2xl:w-[50%] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                className="flex items-center justify-center p-2 bg-white rounded-full"
                                onClick={() => setToggler({ ...Toggler, modifyBookedCourse: false })}
                            >
                                <ReactSVG src={x} />
                            </button>
                            <DialogTitle
                                as="h3"
                                className="font-medium text-base/7 text-mainColor"
                            >
                                <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                    <ReactSVG src={timeTableIcon} />
                                    <h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
                                        {t('Logs.modifyCourse')}
                                    </h3>
                                </div>
                            </DialogTitle>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="relative flex flex-col items-center justify-start mt-3 gap-y-2"
                            >
                                <div className="flex items-center justify-between w-full p-3 bg-white courseData rounded-xl sm:px-6">
                                    <div className="flex items-center courseDetails gap-x-1 sm:gap-x-2">
                                        <CourseAvatar courseName={cardCourseId?.tutorCourse?.courseData?.name} />

                                        <div>
                                            <h4 className='text-sm font-bold sm:text-base text-mainColor'>
                                                {handleUserName(cardCourseId?.tutorCourse?.courseData?.name, 4)}

                                            </h4>
                                            <p className='text-xs font-semibold sm:text-sm text-textGray'>
                                                {cardCourseId?.tutorCourse?.courseData?.code}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center tutorDetails gap-x-1 sm:gap-x-2">
                                        {/* {avatar(30, 30)} */}

                                        {cardCourseId?.tutorCourse?.tutor?.profileImage !== "" ?
                                            <span className=''>
                                                <img className='w-[43px] h-[43px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${cardCourseId?.tutorCourse?.tutor?.profileImage}`} alt="profileImage" />
                                            </span>

                                            : <ReactSVG src={ts} />}
                                        <div>
                                            <h4 className='text-sm font-bold sm:text-base text-mainColor'>
                                                {handleUserName(cardCourseId?.tutorCourse?.tutor?.fullname, 2)}

                                            </h4>
                                            <p className='text-xs font-semibold sm:text-sm text-textGray'>
                                                {cardCourseId?.tutorCourse?.tutor?.code}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full gap-y-2">

                                    <div className="w-full">
                                        <div className="flex flex-col w-full groups gap-y-2">
                                            <label
                                                htmlFor="groups"
                                                className="text-xs font-semibold text-mainColor "
                                            >
                                                {t('homepage.groupsNumber')}
                                                {cardCourseId?.sessionsPerWeek ? (
                                                    <span className="text-xs">
                                                        {` - ${t('homepage.must')} (${cardCourseId?.sessionsPerWeek > 0 ? tens.includes(cardCourseId?.sessionsPerWeek) ? `${cardCourseId?.sessionsPerWeek} ${t("homepage.groups")}` : `${cardCourseId?.sessionsPerWeek} ${t("homepage.group")}` : null})`}
                                                    </span>
                                                ) : null}

                                            </label>
                                            <div className="relative ">
                                                <Listbox
                                                    // value={selected}
                                                    onChange={(e) => {

                                                        let x = e?.map((item) => {
                                                            return item?._id;
                                                        });

                                                        setSelected(e);
                                                        formik.setFieldValue('groups', x);
                                                    }}
                                                    multiple
                                                >
                                                    {({ open }) => (
                                                        <div className="relative ">
                                                            <ListboxButton
                                                                id="groups"
                                                                className={`font-semibold w-full px-4 py-3 sm:gap-x-3 items-center justify-between   text-mainColor border-input_border border-[1px]          sm:py-3  text-sm 
                                                                        flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm truncate  `}
                                                            >
                                                                <div className="flex items-center ps-2 sm:p-0 gap-x-2 ">
                                                                    <ReactSVG className='' src={filterIcon} />

                                                                    <span
                                                                        className={`block  text-sm text-mainColor text-start     `}
                                                                    >
                                                                        {/* {selected?.length > 0
                                                                            ? tens.includes(selected?.length)
                                                                                ? `${selected?.length} ${t('homepage.choises')}`
                                                                                : `${selected?.length} ${t('homepage.oneChoise')}`
                                                                            : t('homepage.choise')} */}
                                                                        {selected?.length > 1 ? selected?.map((item) => {
                                                                            return `${t("homepage.group")} ${item?.groupNumber}   ,`
                                                                        }) : selected?.map((item) => {
                                                                            return `${t("homepage.group")} ${item?.groupNumber}  `
                                                                        })}

                                                                        {/*  : t("homepage.wait") */}
                                                                    </span>
                                                                </div>

                                                                <ReactSVG className='' src={downArrowFilter} />
                                                            </ListboxButton>

                                                            <ListboxOptions
                                                                className="absolute z-10 w-full py-1 mt-1 overflow-y-scroll text-base bg-white rounded-md shadow max-h-40 scrollbar-thin focus:outline-none sm:text-sm "
                                                            >
                                                                {fetchTutorsGroups.isFetched ?
                                                                    fetchTutorsGroups.data?.length > 0 ? (
                                                                        fetchTutorsGroups.data?.map(
                                                                            (item, personIdx) => (
                                                                                <ListboxOption
                                                                                    key={personIdx}
                                                                                    value={item}
                                                                                    className={({ }) =>
                                                                                        `  select-none relative py-2 pe-10 ps-4    text-mainColor font-bold cursor-pointer`
                                                                                    }
                                                                                >
                                                                                    {({ selected: isSelected }) => (
                                                                                        <>
                                                                                            <div
                                                                                                className={`flex   lg:w-full justify-between items-center gap-x-6  $ `}
                                                                                            >
                                                                                                <p className="hidden sm:block sm:text-sm ">{`${t('homepage.group')} ${item?.groupNumber} `}</p>

                                                                                                <p className="text-sm ">
                                                                                                    {item?.dayOfWeek === 0 &&
                                                                                                        t('homepage.sunday')}
                                                                                                    {item?.dayOfWeek === 1 &&
                                                                                                        t('homepage.monday')}
                                                                                                    {item?.dayOfWeek === 2 &&
                                                                                                        t('homepage.tuesday')}
                                                                                                    {item?.dayOfWeek === 3 &&
                                                                                                        t('homepage.wednesday')}
                                                                                                    {item?.dayOfWeek === 4 &&
                                                                                                        t('homepage.thursday')}
                                                                                                    {item?.dayOfWeek === 5 &&
                                                                                                        t('homepage.friday')}
                                                                                                    {item?.dayOfWeek === 6 &&
                                                                                                        t('homepage.saturday')}
                                                                                                </p>

                                                                                                <div className="flex items-center gap-x-1 ">
                                                                                                    <p className="text-sm">
                                                                                                        {Time(item?.startTime)}
                                                                                                    </p>
                                                                                                    :
                                                                                                    <p className="text-sm">
                                                                                                        {Time(item?.endTime)}
                                                                                                    </p>
                                                                                                </div>

                                                                                                <div className={`w-1 h-1 sm:w-2 sm:h-2 border-mainColor border-2 p-2 flex items-center justify-center ${isSelected && "bg-mainColor"}   rounded-md`}>
                                                                                                    {isSelected &&
                                                                                                        <ReactSVG src={marker} />
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                    )}
                                                                                </ListboxOption>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <span className="w-full p-2 px-4 text-xs font-bold text-center text-textGray ">
                                                                            {t('homepage.nothing')}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="w-full p-2 px-4 text-xs font-bold text-center text-textGray ">
                                                                            wait ...
                                                                        </span>
                                                                    )}
                                                            </ListboxOptions>
                                                        </div>
                                                    )}
                                                </Listbox>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="flex items-center justify-center w-full mt-4 formBtns gap-x-3">
                                    <button
                                        disabled={!(formik.isValid && formik.dirty)}
                                        type="submit"
                                        className={`text-white ${!(formik.isValid && formik.dirty) ? 'bg-secondMainColor ' : 'bg-mainColor '}   text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
                                    >
                                        {!loading ? (
                                            t('SingleGroup.add')
                                        ) : (
                                            <div
                                                className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                            ></div>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToggler((prev) => {
                                                return { ...prev, modifyBookedCourse: false };
                                            });
                                        }}
                                        className="w-full px-10 py-2 text-lg bg-transparent text-mainColor rounded-2xl sm:py-3 md:w-1/2"
                                    >
                                        {t('homepage.back')}
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
