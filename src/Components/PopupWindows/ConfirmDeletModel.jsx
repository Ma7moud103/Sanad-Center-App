import React, { useContext, useState } from 'react';
import x from '../../assets/sanadSVG/Multiply.svg';
import icon from '../../assets/sanadSVG/warning.svg';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { BASE_URL } from '../../Soursre';
import { ApisContext } from '../../Context/ApisContext';
import { ReactSVG } from 'react-svg';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function ConfirmDeleteModel() {
	const { Toggler, setToggler, ErorrMessage, modelID, direction } =
		useContext(MainContext);
	const { headers, setaddModel, selectedCenter } = useContext(ApisContext);
	let [t] = useTranslation();

	const [deletLoading, setdeletLoading] = useState(false);

	const deletGroup = async (itemId) => {
		if (modelID && selectedCenter) {
			try {
				setdeletLoading(true);
				setaddModel(true);
				const res = await axios.delete(
					`${BASE_URL}centers/${selectedCenter._id}/payment-templates/${itemId}`,
					{ headers: headers }
				);

				if (res.status === 204 || res.data.status === 'success') {
					ErorrMessage(t('Errors.successDeletModel'), 'success');
					// ErorrMessage(t("homeRev.modelSuccess"), "success")

					setToggler((prev) => {
						return { ...prev, deletModel: false };
					});
				}
			} catch (error) {
				console.log(error);
				ErorrMessage(t('Errors.main'), 'error');
			} finally {
				setdeletLoading(false);
				setaddModel(false);
			}
		}
	};

	function close() {
		setToggler({ ...Toggler, deletModel: false });
	}

	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.deletModel}
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
								onClick={() => setToggler({ ...Toggler, deletModel: false })}
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
										{t('homepage.h1Model')}
									</h3>
									<p className="font-semibold text-center sm:text-lg text-textColor__2 ">
										{t('homepage.pModel')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}

							<div className="formBtns flex  mt-2 gap-x-3 justify-center items-center w-full">
								<button
									type="button"
									onClick={(e) => {
										deletGroup(modelID);
									}}
									className="bg-mainColor flex items-center justify-center text-white rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-xl"
								>
									{!deletLoading ? (
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
											return { ...prev, deletModel: false };
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
