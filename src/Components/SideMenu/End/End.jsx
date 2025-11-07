import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { MainContext } from '../../../Context/MainContext';
import checked from '../../../assets/sanadSVG/Active.svg';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';

const classSvg = 'w-5 h-5 sm:w-7 sm:h-7';
const blue = '#023E8A';
const gray = '#9CA3AF';

export default function End() {
	const {
		setExitModal,

		toggleDirection,
		setToggleMenu,

		Toggler,

		ActiveClass,

		handleActiveClass,
		setToggler,
	} = useContext(MainContext);
	let [t, i18n] = useTranslation();


	const { pathname } = useLocation()
	useEffect(() => {
		if (pathname.includes("/settings")) {
			handleActiveClass(8);
			sessionStorage.setItem("activeClass", 8);
		}


	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<>
			<ul className="list-none  flex flex-col gap-y-4  w-full px-3 ">
				<li className="flex relative  " onClick={() => setToggleMenu(false)}>
					<Link
						className={`transition  decoration-clone w-full ${ActiveClass === 8 ? 'text-mainColor' : 'text-textGray'
							} cursor-pointer flex items-center`}
						to={'/settings'}
						onClick={() => {
							handleActiveClass(8);
						}}
					>
						<svg
							className={`${classSvg}`}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
								stroke={ActiveClass === 8 ? blue : gray}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
								stroke={ActiveClass === 8 ? blue : gray}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<span className="flex ps-3  text-sm sm:text-lg   font-bold capitalize">
							{t('dashboard.settings')}
						</span>
					</Link>
					{ActiveClass === 8 && <ReactSVG src={checked} />}
				</li>

				<li className="flex justify-start items-center text-[#9CA3AFB2] font-bold capitalize">
					<svg
						className={`${classSvg}`}
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.657 6.76146 15.1936 5.5659 14.59 4.44C16.4141 5.068 17.9512 6.33172 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.58397 18.9354 6.04583 17.6708 5.08 16ZM8.03 8H5.08C6.04583 6.32918 7.58397 5.06457 9.41 4.44C8.80643 5.5659 8.34298 6.76146 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.9512 17.6683 16.4141 18.932 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z"
							fill="#9CA3AF"
						/>
					</svg>

					{i18n.language === 'en' && (
						<button
							className="leading-none flex ps-3 text-sm sm:text-lg    font-bold capitalize"
							onClick={() => {
								setToggleMenu(false);
								toggleDirection();
							}}
						>
							لغة الموقع : العربية
						</button>
					)}

					{i18n.language === 'ar' || i18n.language === 'ar-EG' ? (
						<button
							className="leading-none flex ps-3 text-sm sm:text-lg    font-bold capitalize"
							onClick={() => {
								setToggleMenu(false);
								toggleDirection();
							}}
						>

							Language : English
						</button>
					) : null}
				</li>

				<li className="flex justify-start items-center text-[#9CA3AFB2] font-bold capitalize">
					<button
						onClick={() => {
							setExitModal((x) => !x);
							setToggleMenu(false);
							setToggler({ ...Toggler, exit: true });
						}}
						className="flex text-sm sm:text-lg  justify-start items-center text-[#9CA3AFB2] font-bold gap-x-3  cursor-pointer capitalize"
					>
						<svg
							className={`${classSvg}`}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
								stroke="#9CA3AF"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<span className="">{t('dashboard.checkout')}</span>
					</button>
				</li>
			</ul>
		</>
	);
}
