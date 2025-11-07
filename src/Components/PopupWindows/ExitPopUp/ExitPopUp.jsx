import React, { useContext } from 'react';
import exit from '../../../assets/sanadSVG/Multiply.svg';
import warning from '../../../assets/sanadSVG/warning.svg';
import { MainContext } from '../../../Context/MainContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactSVG } from 'react-svg';

export default function ExitPopUp() {
	// Single Assistant Modal
	const { setExitModal, Toggler, setToggler, direction } =
		useContext(MainContext);
	const navigate = useNavigate();
	let [t] = useTranslation();
	const cookie = new Cookies();
	const token = cookie.get('userToken');
	const userDetails = cookie.get('userDetails');

	function deletToken() {
		cookie.set('userToken', token, {
			path: '/homepage',
			expires: new Date('Sat Dec 30 2000'),
		});
		cookie.set('userToken', token, {
			path: '/',
			expires: new Date('Sat Dec 30 2000'),
		});
		cookie.set('userDetails', userDetails, {
			path: '/homepage',
			expires: new Date('Sat Dec 30 2000'),
		});
		cookie.set('userDetails', userDetails, {
			path: '/',
			expires: new Date('Sat Dec 30 2000'),
		});

		navigate('/login');
		setExitModal(false);
	}

	function close() {
		setToggler({ ...Toggler, exit: false });
	}
	return (
		<>
			<Dialog
				dir={direction}
				open={Toggler.exit}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full sm:w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, exit: false })}
							>
								<ReactSVG src={exit} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={warning} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('ExitPopup.logOut')}
									</h3>
									<p className="font-normal text-lg text-center">
										{t('ExitPopup.confirmLogout')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}

							<div className="flex my-3  gap-2 md:gap-3 w-full justify-between">
								<button
									onClick={() => {
										deletToken()
										setToggler({ ...Toggler, exit: false });
										sessionStorage.clear()
										localStorage.clear()
									}}
									className="rounded-2xl text-base text-center py-2  md:py-3 px-12 bg-[#D92D20B2] border-none text-white  text-nowrap w-full md:w-1/2 font-bold"
								>
									{t('PopupWindows.confirm')}
								</button>
								<button
									onClick={() => {
										setToggler({ ...Toggler, exit: false });
									}}
									className="rounded-2xl py-2  md:py-3 px-12 bg-transparent border-none text-mainColor text-lg w-full md:w-1/2 font-bold"
								>
									{t('ExitPopup.back')}
								</button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
