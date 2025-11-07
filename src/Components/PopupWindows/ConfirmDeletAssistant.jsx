import React, { useContext, useState } from 'react';
import icon from '../../assets/sanadSVG/teachers.svg';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import x from '../../assets/sanadSVG/Multiply.svg';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import { BASE_URL } from '../../Soursre';
import { ApisContext } from '../../Context/ApisContext';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function ConfirmDeletAssistant() {
	const { Toggler, setToggler, assistantId, ErorrMessage, direction } =
		useContext(MainContext);
	const { headers, selectedCenter, sethandleDeletAssistant } =
		useContext(ApisContext);
	const centerId = JSON.parse(sessionStorage.getItem('centerid'));
	const [t] = useTranslation();
	const idCenter = selectedCenter ? selectedCenter._id : centerId;

	const [loading, setloading] = useState(false);
	async function handleDeletAssistant() {
		try {
			setloading(true);

			if (idCenter && assistantId) {
				const res = await axios.patch(
					`${BASE_URL}centers/${idCenter}/center-assistants/${assistantId}`,
					{},
					{
						headers: headers,
					}
				);
				if (res.status === 200 || res.data.status === 'success') {
					sethandleDeletAssistant((prev) => !prev);
					ErorrMessage(t('Errors.confirmDeletAssSuccess'), 'success');
					setToggler((prev) => {
						return { ...prev, deletTeacher: false };
					});
				}
			}
		} catch (error) {
			console.log(error);
			ErorrMessage(t('Errors.main'), 'error');
		} finally {
			setloading(false);
		}
	}

	function close() {
		setToggler({ ...Toggler, deletTeacher: false });
	}

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.deletTeacher}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4 py-6">
						<DialogPanel
							transition
							className="w-full sm:w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, deletTeacher: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={icon} />
									<h3 className="text-2xl  font-black text-[#023E8A]">
										{t('homepage.confirmDeletAss')}
									</h3>
									<p className="font-semibold text-center sm:text-lg text-textColor__2 ">
										{t('homepage.pAss')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}

							<div className="formBtns flex  mt-2 gap-x-3 justify-center items-center w-full">
								<button
									disabled={!(idCenter && assistantId)}
									onClick={() => {
										handleDeletAssistant();
									}}
									className="bg-mainColor text-white rounded-2xl flex items-center justify-center px-10 py-3 w-full md:w-1/2 text-lg"
								>
									{!loading ? (
										t('PopupWindows.confirm')
									) : (
										<div
											className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
										></div>
									)}
								</button>
								<button
									onClick={() =>
										setToggler((prev) => {
											return { ...prev, deletTeacher: false };
										})
									}
									className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-lg"
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
