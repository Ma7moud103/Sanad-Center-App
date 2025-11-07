import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MainContext } from '../../Context/MainContext';
import Dashboard from '../../Components/SideMenu/Dashboard/Dashboard';
import ExitPopUp from '../../Components/PopupWindows/ExitPopUp/ExitPopUp';
import DashboardBtn from '../../Components/SideMenu/DashboadBtn/DashboadBtn';
import { useTranslation } from 'react-i18next';
import AddFeedback from '../../Components/PopupWindows/AddFeedback';
import AddAlert from '../../Components/PopupWindows/AddAlert/AddAlert';
// import CenterTimeTabke from '../../Components/PopupWindows/CenterTimeTabke';
import ScanCard from '../../Components/PopupWindows/ScanCard';
import AddFeedbakToStudent from '../../Components/PopupWindows/AddFeedbakToStudent';
import CashePay from '../../Components/PopupWindows/CashePay';
import ConfirmDeleteGroup from '../../Components/PopupWindows/ConfirmDeleteGroup/ConfirmDeleteGroup';
import AddGroup from '../../Components/PopupWindows/AddGroup/AddGroup';
import AddCourse from '../../Components/PopupWindows/AddCourse/AddCourse';
import ConfirmDeleteCourse from '../../Components/PopupWindows/ConfirmDeleteCourse/ConfirmDeleteCourse';

import ModifyGroup from '../../Components/PopupWindows/ModifyGroup';
import AddAssistant from '../../Components/PopupWindows/AddAssistant/AddAssistant';
import BookCourse from '../../Components/Stuendt/BookCourse';
// import Payment from '../../Components/Stuendt/Payment';
import CheckCard from '../../Components/PopupWindows/CheckCard';
import AddPayment from '../../Components/PopupWindows/AddPayment';
import ConfirmDeleteModel from '../../Components/PopupWindows/ConfirmDeletModel';
import ModifyModel from '../../Components/PopupWindows/ModifyModel';
import ChangePassword from '../../Components/PopupWindows/ChangePassword';
import ConfirmDeletAssistant from '../../Components/PopupWindows/ConfirmDeletAssistant';
import ModifyCourse from '../../Components/Stuendt/ModifyCourse';
import Cookies from 'universal-cookie';
import { ApisContext } from '../../Context/ApisContext';
import TakeAttendance from '../../Components/Courses/SingleGroups/TakeAttendance';
import ConfirmDeleteBoockedCourse from '../../Components/Stuendt/ConfirmDeleteBoockedCourse';

export default function HomeLayout() {
	const { toggleMenu, setToggleMenu, darkMode, direction } =
		useContext(MainContext);
	function handleOutsideClick() {
		setToggleMenu(false);
	}
	const { fetchCenterKey } = useContext(ApisContext)
	const userDetails = new Cookies().get("userDetails")

	const { i18n } = useTranslation();

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
	}, [direction]);

	return (
		<div
			dir={direction}
			className={`bg-[#F9FAFC]  md:bg-bg_mainLayout h-screen flex flex-grow bg-HomePageBgImage bg-cover bg-center bg-no-repeat ${darkMode ? 'dark' : ''
				}`}
		>
			{toggleMenu ? (
				<div
					onClick={handleOutsideClick}
					className="md:hidden bg-shadow bg-black bg-opacity-50 end-0 top-0 bottom-0 start-0 fixed w-full flex z-[20]"
				></div>
			) : (
				''
			)}

			{!(userDetails?.role === "2" && fetchCenterKey.data?.centers?.length <= 0) && <div

				className={`${`w-2/3  md:w-[35%] lg:w-[25%] xl:w-[20%] bg-white h-full  md:h-screen sm:block fixed md:static z-[20] md:start-0 transition-all ${toggleMenu ? 'start-0' : 'start-full'
					}`}`}
			>
				<Dashboard />
			</div>}

			<div className={`${!(userDetails?.role === "2" && fetchCenterKey.data?.centers?.length <= 0) && "md:w-[65%] lg:w-[75%] xl:w-[80%]"} w-full  flex flex-col  gap-5 px-8 py-10 md:bg-bg_mainLayout bg-HomePageBgImage bg-cover bg-center bg-no-repeat relative h-screen overflow-y-auto scrollbar-thin `}>
				<div className="flex justify-end items-center fixed end-5 md:hidden z-[19]">
					{!(userDetails?.role === "2" && fetchCenterKey.data?.centers?.length <= 0) && <DashboardBtn />}
				</div>
				<Outlet />
			</div>
			<ModifyModel />
			<ConfirmDeleteModel />
			<AddPayment />
			<CheckCard />
			{/* <Payment /> */}
			<BookCourse />
			<ExitPopUp />
			<AddFeedback />
			<AddAlert />
			{/* <CenterTimeTabke /> */}
			<ScanCard />
			<AddFeedbakToStudent />
			<CashePay />
			<ConfirmDeleteGroup />
			<AddGroup />
			<AddCourse />
			<ConfirmDeleteCourse />
			<ModifyGroup />
			<ConfirmDeletAssistant />
			<AddAssistant />
			<ChangePassword />
			<ModifyCourse />
			<TakeAttendance />
			<ConfirmDeleteBoockedCourse />
		</div>
	);
}
