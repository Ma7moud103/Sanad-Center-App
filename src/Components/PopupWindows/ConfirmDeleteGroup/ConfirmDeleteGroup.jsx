import React, { useContext } from 'react';
import exit from '../../../assets/sanadSVG/Multiply.svg';
import icon from '../../../assets/sanadSVG/warning.svg';
import { MainContext } from '../../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { BASE_URL } from '../../../Soursre';
import { ApisContext } from '../../../Context/ApisContext';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactSVG } from 'react-svg';

export default function ConfirmDeleteGroup() {
	const { Toggler, setToggler, ErorrMessage, direction } =
		useContext(MainContext);
	const {
		headers,
		deletGroupId,

		sethandleDeletGroup,
		selectedCenter,
		MainLoading,
		setMainLoading,
		setGroupsPage,
	} = useContext(ApisContext);
	// const { id } = useParams();
	// const cashedCenter = JSON.parse(sessionStorage.getItem('centerid'));
	let [t] = useTranslation();
	const deletGroup = async (itemId) => {
		if (selectedCenter && itemId) {
			try {
				setMainLoading({ ...MainLoading, deletGroup: true });
				const res = await axios.delete(
					`${BASE_URL}centers/${selectedCenter?._id}/groups/${deletGroupId}`,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {
					// const newArr = CourseGroups.filter((item) => {
					//   return item._id !== itemId
					// })
					// setCourseGroups(newArr)

					sethandleDeletGroup((prev) => !prev);
					ErorrMessage(t('Errors.deletGroup'), 'success');
					setGroupsPage(1);
					// GetAllCourses()
					setToggler((prev) => {
						return { ...prev, deletGroup: false };
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				setMainLoading({ ...MainLoading, deletGroup: false });
			}
		}
	};

	// console.log(deletGroupId, cashedCenter._id)

	function close() {
		setToggler({ ...Toggler, deletGroup: false });
	}

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.deletGroup}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, deletGroup: false })}
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
											{t('PopupWindows.confirmGroupDeletion')}
										</h3>
										<p className="text-center text-[#4E5556] text-sm md:text-base lg:text-lg">
											{t(
												"PopupWindows.youWon'tBeAbleToRecoverTheGroupExceptThroughSupport"
											)}
										</p>
									</div>
								</div>
							</DialogTitle>
							{/* content */}

							<div className="formBtns flex  gap-x-3 justify-center items-center w-full">
								<button
									type="button"
									onClick={(e) => {
										deletGroup(deletGroupId);
									}}
									className="bg-mainColor flex items-center justify-center text-white rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-xl"
								>
									{!MainLoading.deletGroup ? (
										t('PopupWindows.confirm')
									) : (
										<div
											className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
										></div>
									)}
								</button>
								<button
									type="button"
									onClick={() =>
										setToggler((prev) => {
											return { ...prev, deletGroup: false };
										})
									}
									className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-xl"
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
