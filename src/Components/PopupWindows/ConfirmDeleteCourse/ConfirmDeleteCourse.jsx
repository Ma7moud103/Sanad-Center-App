import React, { useContext } from 'react';
import exit from '../../../assets/sanadSVG/Multiply.svg';
import icon from '../../../assets/sanadSVG/courses.svg';
import { MainContext } from '../../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import { ApisContext } from '../../../Context/ApisContext';
import axios from 'axios';
import { BASE_URL } from '../../../Soursre';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactSVG } from 'react-svg';

export default function ConfirmDeleteCourse() {
	let [t] = useTranslation();
	const { Toggler, setToggler, Deleted, ErorrMessage, direction } =
		useContext(MainContext);
	const {
		selectedCenter,
		MainLoading,
		setMainLoading,
	} = useContext(ApisContext);

	// confirmCourseDeletion
	const DeletCourse = async () => {
		try {
			if (selectedCenter) {
				setMainLoading({ ...MainLoading, deletCourseLoading: true });
				const res = await axios.delete(
					`${BASE_URL}center-courses/${selectedCenter._id}/${Deleted.deletedCourse}`
				);

				console.log(res);
				if (res.status === 200) {
					ErorrMessage(t('homepage.confirmCourseDeletion'), 'success');
					// setallCourses(prev => {
					//   return[...prev , res]
					// })
					// set data with new data
					setMainLoading({ ...MainLoading, deletCourseLoading: false });
				}
			}
		} catch (error) {
			console.log(error);
			ErorrMessage(t('Errors.main'), 'error');
			setMainLoading({ ...MainLoading, deletCourseLoading: false });
		}
	};

	function close() {
		setToggler({ ...Toggler, deletCourse: false });
	}

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.deletCourse}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4 py-6">
						<DialogPanel
							transition
							className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, deletCourse: false })}
							>
								<ReactSVG src={exit} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1 mb-4">
									<span className="w-16 h-16 bg-[#F0F6FFB2] rounded-full flex justify-center items-center">
										{/* <img className="w-8 max-w-full" src={icon} alt="" /> */}
										<ReactSVG src={icon} />
									</span>
									<div className="flex flex-col gap-1 md:gap-y-3 justify-center items-center">
										<h3 className="text-xl md:text-2xl lg:text-3xl font-black text-[#023E8A]">
											{t('PopupWindows.confirmCourseDeletion')}
										</h3>
										<p className="text-[#4E5556] text-sm md:text-base lg:text-lg">
											{t(
												"PopupWindows.youWon'tBeAbleToRecoverTheCourseExceptThroughSupport"
											)}
										</p>
									</div>
								</div>
							</DialogTitle>
							{/* content */}

							<div className="formBtns flex flex-row gap-x-3 justify-center items-center w-full">
								<button
									type="button"
									onClick={() => DeletCourse()}
									className="bg-mainColor text-white rounded-2xl px-10 py-2 sm:py-3 text-base sm:text-lg lg:text-xl w-full md:w-1/2 "
								>
									{!MainLoading.deletCourseLoading ? (
										t('PopupWindows.confirm')
									) : (
										<div
											className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
										></div>
									)}
								</button>
								<button
									type="button"
									onClick={() =>
										setToggler((prev) => {
											return { ...prev, deletCourse: false };
										})
									}
									className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 text-base sm:text-lg lg:text-xl w-full md:w-1/2 "
								>
									{t('PopupWindows.back')}
								</button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
