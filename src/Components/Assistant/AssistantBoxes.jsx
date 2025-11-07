import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../Context/MainContext';
import plus from '../../assets/sanadSVG/plusblue.svg';
import Post from '../Skeletons/Post';
import assistantsicon from '../../assets/sanadSVG/students.svg';
import { ApisContext } from '../../Context/ApisContext';
import { ReactSVG } from 'react-svg';
import Box from '../ui/Box';

function AssistantBoxes() {
	const [t] = useTranslation();
	const { Toggler, setToggler } = useContext(MainContext);
	const { selectedCenter, tens, fetchAllCenters } = useContext(ApisContext);

	// console.log(selectedCenter)

	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">


			<Box imageSrc={assistantsicon} isFetched={fetchAllCenters.isFetched} bg={"w-full xl:w-1/2 bg-white"}>
				<p className=" text-textGray text-lg  font-bold">
					{t('Logs.numberOfAssistants')}
				</p>

				<div className="flex items-center text-nowrap">
					<p className="text-mainColor text-lg  xl:text-base font-bold">
						{selectedCenter?.cAsCount > 0
							? tens.includes(selectedCenter?.cAsCount)
								? `${selectedCenter?.cAsCount
								} ${t('TeacherDetails.assistants')}`
								: `${selectedCenter?.cAsCount
								} ${t('TeacherDetails.assistant')}`
							: t('homepage.nothing')}
					</p>
				</div>
			</Box>

			<Box
				onClick={() => setToggler({ ...Toggler, addAssistant: true })}
				imageSrc={plus}
				isFetched={fetchAllCenters.isFetched}
				bg={" bg-gradient-to-bl from-secondMainColor to-blue_light  w-full xl:w-1/2"}>
				<p className=" text-white text-size__20 xl:text-lg 2xl:text-xl font-bold">
					{t('TeacherDetails.addStudents')}
				</p>
			</Box>


		</div>
	);
}

export default AssistantBoxes;
