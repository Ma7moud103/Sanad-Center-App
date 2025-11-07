import {
	createContext,
	useState,
	useEffect,
	useContext,
	useMemo,
} from 'react';

import Cookies from 'universal-cookie';
import axios from 'axios';
import { BASE_URL } from '../Soursre';
import { MainContext } from './MainContext';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useErrorBoundary } from 'react-error-boundary';
export const ApisContext = createContext();

export default function ApisContextProvider(preops) {
	const userDetails = new Cookies().get("userDetails")
	const { showBoundary } = useErrorBoundary()
	const { courseId, groupId, id, code } = useParams();
	// const cashedSelectedGrade = JSON.parse(
	// 	sessionStorage.getItem('selectedGrade')
	// );

	const cashedCenter = JSON.parse(sessionStorage.getItem('centerid'));
	const Day = (item) => {
		return moment(item).format('DD/MM/YYYY');
	};

	const Time = (item) => {
		return moment(item).format('h:mm a');
	};

	let period = null;

	const { ErorrMessage, Toggler, setToggler } = useContext(MainContext);
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const cookie = new Cookies();
	const Token = cookie.get('userToken');

	const headers = {
		'auth-token': Token,
	};

	const currentDay = new Date().getDay();

	function convertTo12HourFormat(time24) {
		const [hours, minutes] = time24.split(':');
		let hoursNum = parseInt(hours, 10);

		if (i18n.language === 'ar') {
			period = hoursNum >= 12 ? 'م' : 'ص';
		} else {
			period = hoursNum >= 12 ? 'PM' : 'AM';
		}
		hoursNum = hoursNum % 12 || 12;
		const minutesStr = minutes.padStart(2, '0');
		const time12 = `${hoursNum}:${minutesStr} ${period}`;
		return time12;
	}

	function getLastSevenItems(arr) {
		// If the array length is less than or equal to 7, return the entire array
		if (arr.length <= 7) {
			return arr;
		} else {
			// Otherwise, return the last 7 items using array slicing
			return arr.slice(arr.length - 7);
		}
	}

	const [MainLoading, setMainLoading] = useState({
		GroupsLoading: false,
		GradesLoading: false,
		PaymentLoading: false,
		addAlertLoading: false,
		selectedCourseOfTeacherLoading: false,
		TeacherTimeTableLoading: false,
		postPay: false,
		allCoursesLoading: false,
		deletCourseLoading: false,
		CoursesLoading: false,
		singleGroupLoading: false,
		teachersLoading: false,
		// assistantLoading: false,
		codesLoading: false,
		groupsForTutorLoading: false,
		spPayments: false,
		paymentsModel: false,
		desLoading: false,
		groupsOfTeacher: false,
		scanBtn: false,
		deletGroup: false,
		addGroupL: false,
		acceptCourse: false,
		refusesCourse: false,
		rejectCourse: false,
		// modifyGroupLoading: false,
		modifyCourseL: false,
	});

	const storedStudent = JSON?.parse(sessionStorage?.getItem('studentsDetails'));
	// let { refusesCourse } = MainLoading;

	const [qrData, setQrData] = useState('');
	const [selectedCenter, setselectedCenter] = useState(null);
	// const date = new Date();
	// const st = new Date().setHours(0, 0, 0, 0);
	// const en = new Date().setHours(23, 59, 59, 999);
	const tens = [2, 3, 4, 5, 6, 7, 8, 9, 10];


	const terms3 = [
		{ name: t('homeRev.first'), value: '1' },
		{ name: t('homeRev.second'), value: '2' },
		{ name: t('homeRev.third'), value: '3' },
	];

	const [terms, setterms] = useState(terms3);

	const [selectedTerm, setselectedTerm] = useState(terms[0]);



	const [startDate, setstartDate] = useState(dayjs().startOf('day'));
	const [endDate, setendDate] = useState(dayjs().endOf('day'));
	const [GroupsPage, setGroupsPage] = useState(1);

	const [deletGroupId, setdeletGroupId] = useState(null);
	const [Course, setCourse] = useState([]);
	const [Teacher, setTeacher] = useState([]);
	const [Groups, setGroups] = useState([]);
	const [Grades, setGrades] = useState([]);
	const [allCenters, setallCenters] = useState([]);
	// const [studentDetails, setstudentDetails] = useState([]);
	const [Paymnets, setPaymnets] = useState([]);
	const [allCourses, setallCourses] = useState([]);
	const [allAssistants, setallAssistants] = useState([]);
	const [selectedGradeSt, setselectedGradeSt] = useState([]);
	const [studentCourses, setstudentCourses] = useState([]);

	const [allStudents, setallStudents] = useState(false);
	const [TeachersOfCenter, setTeachersOfCenter] = useState({
		selectedTeacher: null,
		allTeachers: [],
	});
	const [CoursesOfCenter, setCoursesOfCenter] = useState({
		selectedCourse: null,
		allCourses: [],
	});

	const [selectedGrade, setselectedGrade] = useState([]);

	const [Group] = useState([]);

	const [GroupsForTotur, setGroupsForTotur] = useState([]);

	const startOfDay = new Date(new Date().setHours(0, 0, 0)).toISOString();
	const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

	const GetAllCenters = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}center-users/centers?limit=-1`,
				{ headers: headers }
			);
			if (response.status === 200 || response.data.status === 'success') {
				setallCenters(response.data.data);
				if (cashedCenter) {
					setselectedCenter(cashedCenter);
				} else {
					setselectedCenter(response.data.data[0]);
				}
				return response.data.data;
			}
		} catch (error) {
			showBoundary(error)
		}
	};


	const [handleBookCourse, sethandleBookCourse] = useState(false);

	const [handleDeletAssistant, sethandleDeletAssistant] = useState(false);
	const [handleAddAssistant, sethandleAddAssistant] = useState(false);
	const fetchAllCenters = useQuery({
		queryKey: ['GetAllCenters', `${handleAddAssistant}`, `${handleDeletAssistant}`, `${handleBookCourse}`, `${MainLoading.acceptCourse}`,],
		queryFn: () => GetAllCenters(),
		enabled: !!headers['auth-token'],
		// staleTime: 3000,
		// refetchOnMount: false,
		// refetchOnWindowFocus: true,
	});

	let _id = useMemo(
		() => (selectedCenter ? selectedCenter._id : null),
		[selectedCenter]
	);

	const [handleModifyCourse, sethandleModifyCourse] = useState(false)


	const [studentGrades, setstudentGrades] = useState([])
	const [studentData, setstudentData] = useState({})

	async function getCard(qrData) {
		if (qrData && selectedCenter) {
			try {
				// setLoading(true)
				setMainLoading({ ...MainLoading, scanBtn: true });

				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/cards/${qrData}`,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.message === 'success') {

					setstudentData(res.data.data[0])
					navigate(`/students/${res.data.data[0]?.code}`);
					ErorrMessage(t('Errors.successCard'), 'success');
					setToggler({ ...Toggler, scanCard: false });

					if (res.data.data[0]?.grade) {
						setselectedGradeSt(res.data.data[0]?.grade)
					}

					if (res.data.data[0]?.term === "0") {
						setselectedTerm({ name: t('homeRev.highSchool'), value: '0' })
					} else if (res.data.data[0]?.term === "1") {
						setselectedTerm({ name: t('homeRev.first'), value: '1' });

					} else if (res.data.data[0]?.term === "2") {
						setselectedTerm({ name: t('homeRev.second'), value: '2' });

					} else if (res.data.data[0]?.term === "3") {
						setselectedTerm({ name: t('homeRev.third'), value: '3' });

					}
				}
			} catch (error) {
				// showBoundary(error)
				if (error.response.data.message === "card not found") {
					ErorrMessage(t('Errors.cardNotFound'), 'error');

				} else {
					ErorrMessage(error.response.data.message, 'error');

				}


			} finally {
				setQrData('');
				setMainLoading({ ...MainLoading, scanBtn: false });
			}
		}
	}

	async function getSingleStudent() {
		if (selectedCenter) {
			try {

				setMainLoading({ ...MainLoading, GroupsLoading: true });

				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/cards/${code}`,
					{ headers: headers }
				);
				if (res.status === 200 || res.data.message === 'success') {

					setstudentData(res.data.data[0])



					if (res.data.data[0]?.grade) {
						setselectedGradeSt(res.data.data[0]?.grade)
					}

					if (res.data.data[0]?.term === "0") {
						setselectedTerm({ name: t('homeRev.highSchool'), value: '0' })
					} else if (res.data.data[0]?.term === "1") {
						setselectedTerm({ name: t('homeRev.first'), value: '1' });

					} else if (res.data.data[0]?.term === "2") {
						setselectedTerm({ name: t('homeRev.second'), value: '2' });

					} else if (res.data.data[0]?.term === "3") {
						setselectedTerm({ name: t('homeRev.third'), value: '3' });

					}

					return res.data.data[0]
				}
			} catch (error) {

				showBoundary(error)

			} finally {
				setMainLoading({ ...MainLoading, GroupsLoading: false });
			}
		}
	}

	const fetchSingleStudent = useQuery({
		queryKey: ["fetchSingleStudent", `${code}`, `${selectedCenter?._id}`, `${handleBookCourse}`],
		queryFn: () => getSingleStudent(),
		enabled: !!selectedCenter?._id && !!code

	})

	const getGrades = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}grades/?fields=nameEn,-_id,nameAr`,
				{ headers: headers }
			);

			if (response.status === 200 || response.data.status === 'success') {
				setGrades([{ nameEn: t("Notifications.showAll"), nameAr: t("Notifications.showAll"), _id: "" }, ...response.data.data]);
				setstudentGrades(response.data.data)
				setselectedGrade(response.data.data[0]);
				if (!studentData?.grade) {
					setselectedGradeSt(response.data.data[0]);
				}
				// setstudentGrade()

				// setselectedGradeOfCourse(response.data.data[0]);
				return response.data.data;
			}
		} catch (error) {
			showBoundary(error)

		}
	};

	const fetchGrades = useQuery({
		queryKey: ['getGrades', `${code}`],
		queryFn: () => getGrades(),
		enabled: !!headers['auth-token'],
	});


	// const studentData = JSON.parse(sessionStorage.getItem("studentsDetails"))

	const [handleDeleteBoockedCourse, sethandleDeleteBoockedCourse] = useState(false)
	const getStudentCourses = async () => {
		if (selectedCenter && code) {
			try {
				// setMainLoading({ ...MainLoading, studentCoursesLoadiing: true })

				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/cards/${code}/card-courses`,
					{ headers: headers }
				);

				if (res.status === 200 || res.data.status === 'success') {
					setstudentCourses(res.data.data);
					return res.data.data;
				}
			} catch (error) {
				showBoundary(error)

				// }
				// finally {
				//   setMainLoading({ ...MainLoading, studentCoursesLoadiing: false })
			}
		}
	};

	const [handleAddGroup, sethandleAddGroup] = useState(false);
	const [handleModifyGroup, sethandleModifyGroup] = useState(false);
	const [handleDeletGroup, sethandleDeletGroup] = useState(false);
	const fetchStudentCourses = useQuery({
		queryKey: [
			'getStudentCourses',
			`${selectedCenter?._id}`,
			`${storedStudent?.code}`,
			`${handleBookCourse}`,
			// `${handl}`,
			`${handleBookCourse}`,
			`${handleModifyCourse}`,
			`${handleAddGroup}`,
			`${handleDeletGroup}`,
			`${handleModifyGroup}`,
			`${handleDeleteBoockedCourse}`,
		],
		queryFn: () => getStudentCourses(),
		enabled: !!selectedCenter?._id && !!code,
	});

	// const initialPageData = [];
	// const [pageData, setPageData] = useState(initialPageData);
	// const [postPay, setpostPay] = useState(false);
	// const [currentPagePayments, setcurrentPagePayments] = useState(1);
	// const getPayments = async () => {
	// 	if (selectedCenter) {
	// 		const response = await axios.get(
	// 			`${BASE_URL}centers/${selectedCenter?._id}/payments?limit=5${currentPagePayments}&createdAt[lt]=${endOfDay}&createdAt[gt]=${startOfDay}`,
	// 			{ headers: headers }
	// 		);
	// 		if (response.status === 200 || response.data.status === 'success') {
	// 			setPaymnets(response?.data);
	// 			return response?.data;
	// 		}
	// 	}
	// };
	// const fetchPayment = useQuery({
	// 	queryKey: ['getPayments', `${_id}`, `${postPay}`, `${currentPagePayments}`],
	// 	queryFn: () => getPayments(),
	// 	enabled: !!selectedCenter?._id,
	// 	// refetchOnMount: true,
	// 	refetchOnWindowFocus: true,
	// 	placeholderData: true,
	// 	// refetchInterval: 60000,
	// });

	// const RevenuesTypes = [
	// 	{ name: t('Notifications.showAll'), value: 'attendance,registeration' },
	// 	{ name: t('Logs.attendTrue'), value: 'attendance' },
	// 	{ name: t('homepage.registration'), value: 'registeration' },
	// ];
	// const [selectedRev, setselectedRev] = useState(RevenuesTypes[0]);
	// const [pageRevs, setpageRevs] = useState(1);
	// const [isValidDate, setisValidDate] = useState(true);
	// const [isError, setisError] = useState(null);

	// const getrevs = async () => {
	// 	if (selectedCenter && isValidDate) {
	// 		const response = await axios.get(
	// 			`${BASE_URL}centers/${selectedCenter?._id}/payments?limit=5&page=${pageRevs}&type=${selectedRev.value}&createdAt[gte]=${startDate.toISOString()}&createdAt[lte]=${endDate.toISOString()}`,
	// 			{ headers: headers }
	// 		);

	// 		if (response.status === 200 || response.data.status === 'success') {
	// 			return response.data;
	// 		}
	// 	}
	// };
	// const { value } = selectedRev;

	// const fetchRev = useQuery({
	// 	queryKey: [
	// 		`${_id}`,
	// 		`${value}`,
	// 		`${postPay}`,
	// 		`${pageRevs}`,
	// 		`${startDate}`,
	// 		`${endDate}`,
	// 	],
	// 	queryFn: () => getrevs(),
	// 	enabled: !!selectedCenter && !!isValidDate,
	// 	placeholderData: true,
	// 	// refetchOnMount: true,
	// 	// refetchIntervalInBackground: true,
	// });

	// const spcializedPaymentsTypes = [
	// 	{ name: t('homepage.cards'), value: 'card' },
	// 	{ name: t('Notifications.showAll'), value: 'custom,card' },
	// 	{ name: t('homepage.custom'), value: 'custom' },
	// ];
	// const [selectedspcializedItem, setselectedspcializedItem] = useState(
	// 	spcializedPaymentsTypes[0]
	// );
	// const [spcializedPaymentsPage, setspcializedPaymentsPage] = useState(1);

	// const getSpcializedPayments = async () => {
	// 	const response = await axios.get(
	// 		`${BASE_URL}centers/${selectedCenter._id}/payments?limit=5&page=${spcializedPaymentsPage}&type=${selectedspcializedItem.value}&createdAt[gte]=${startDate.toISOString()}&createdAt[lte]=${endDate.toISOString()}`,
	// 		{ headers: headers }
	// 	);

	// 	return response.data;
	// };
	// const fetchSpcialedPaymet = useQuery({
	// 	queryKey: [
	// 		`${_id}`,
	// 		`${selectedspcializedItem.value}`,
	// 		`${postPay}`,
	// 		`${spcializedPaymentsPage}`,
	// 		`${startDate}`,
	// 		`${endDate}`,
	// 	],
	// 	queryFn: () => getSpcializedPayments(),
	// 	enabled: !!selectedCenter && !!isValidDate,
	// 	placeholderData: true,
	// 	// refetchOnMount: true,
	// 	// refetchIntervalInBackground: true,
	// });

	// const [codesPage, setcodesPage] = useState(1);

	// const getCodes = async () => {
	// 	if (selectedCenter) {
	// 		try {
	// 			const response = await axios.get(
	// 				`${BASE_URL}centers/${selectedCenter?._id}/payments?limit=5&page=${codesPage}&type=sessionAccess`,
	// 				{ headers: headers }
	// 			);
	// 			if (response.status === 200 || response.data.status === 'success') {
	// 				return response.data;
	// 			}
	// 		} catch (error) {
	// 			showBoundary(error)

	// 		}
	// 	}
	// };

	// const fetchCodes = useQuery({
	// 	queryKey: [`${_id}`, `${codesPage}`, `${startDate}`, `${endDate}`],
	// 	queryFn: () => getCodes(),
	// 	enabled: !!selectedCenter && !!isValidDate,
	// 	placeholderData: true,
	// 	// refetchOnMount: true,
	// 	// refetchIntervalInBackground: true,
	// });

	// // console.log(fetchCodes.data)

	// const [PagesModel, setPagesModel] = useState(1);
	// const [addModel, setaddModel] = useState(false);
	// const Types = [
	// 	{ name: t('homepage.custom'), value: 'custom' },
	// 	{ name: t('homepage.card'), value: 'card' },
	// ];
	// const [selectedType, setselectedType] = useState(Types[0]);

	// const getModelLog = async () => {
	// 	if (selectedCenter) {
	// 		try {
	// 			const response = await axios.get(
	// 				`${BASE_URL}centers/${selectedCenter._id}/payment-templates?type=${selectedType.value}&limit=5&page=${PagesModel}`,
	// 				{ headers: headers }
	// 			);

	// 			if (response.data.status === 'success' || response.status === 200) {
	// 				return response.data;
	// 			}
	// 		} catch (error) {
	// 			showBoundary(error)

	// 		}
	// 	}
	// };

	// const fetchModels = useQuery({
	// 	queryKey: [
	// 		`${_id}`,
	// 		`${selectedType.value}`,
	// 		`${postPay}`,
	// 		`${PagesModel}`,
	// 		`${addModel}`,
	// 	],
	// 	queryFn: () => getModelLog(),
	// 	enabled: !!selectedCenter,
	// 	placeholderData: true,
	// 	// refetchOnMount: true,
	// 	// refetchIntervalInBackground: true,
	// });

	// const [desPages, setdesPages] = useState(1);
	// const duseTypes = [
	// 	{ name: t('homepage.forcenter'), value: 'center' },
	// 	{ name: t('homepage.forstudent'), value: 'student' },
	// ];
	// const [selectedDesType, setselectedDesType] = useState(duseTypes[0]);

	// const getDes = async () => {
	// 	if (selectedCenter) {
	// 		try {
	// 			const response = await axios.get(
	// 				`${BASE_URL}centers/${selectedCenter?._id}/student-dues?limit=5&page=${desPages}&forWho=${selectedDesType.value}&createdAt[gte]=${startDate.toISOString()}&createdAt[lte]=${endDate.toISOString()}`,
	// 				{ headers: headers }
	// 			);
	// 			if (response.status === 200 || response.data.status === 'success') {
	// 				return response.data;
	// 			}
	// 		} catch (error) {
	// 			showBoundary(error)

	// 		}
	// 	}
	// };

	// const fetchDes = useQuery({
	// 	queryKey: [
	// 		`${_id}`,
	// 		`${selectedDesType.value}`,
	// 		`${postPay}`,
	// 		`${desPages}`,
	// 		`${startDate}`,
	// 		`${endDate}`,
	// 	],
	// 	queryFn: () => getDes(),
	// 	enabled: !!selectedCenter && !!isValidDate,
	// 	placeholderData: true,
	// 	// refetchOnMount: true,
	// 	// refetchIntervalInBackground: true,
	// });







	// this for displying tutor course groups 
	const [selectedTutor, setselectedTutor] = useState('');
	const [selectedTutorCourse, setselectedTutorCourse] = useState('');
	const [TeacherTimeTable] = useState([]);




	const [tutors, settutors] = useState([])
	const AllTutors = async () => {
		if (selectedCenter) {
			try {
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter._id}/tutors?limit=-1`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					settutors(response.data.data)
					return response.data.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};

	const fetchTutors = useQuery({
		queryKey: ['AllTutors', `${_id}`, `${MainLoading.acceptCourse}`],
		queryFn: () => AllTutors(),
		enabled: !!selectedCenter,
		refetchOnMount: true,
	});

	// fetch all tutor courses
	const GetAllCoursesCenter = async () => {
		if (selectedCenter && selectedTutor) {
			try {
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter._id}/tutors/${selectedTutor?._id}/center-courses?limit=-1`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					// console.log(response);
					setCoursesOfCenter({
						allCourses: response.data.data,
						selectedCourse: '',
					});
					return response.data.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};

	const fetchTutorsCourses = useQuery({
		queryKey: ['GetAllCoursesCenter', `${_id}`, `${selectedTutor?._id}`],
		queryFn: () => GetAllCoursesCenter(),
		enabled: !!selectedCenter && !!selectedTutor,
		refetchOnMount: true,
	});


	const getGroupForTutor = async () => {
		if (selectedCenter && selectedTutor && selectedTutorCourse) {
			try {
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/center-courses/${selectedTutorCourse?._id}/groups?forTutor=true?limit=-1`,
					{ headers: headers }
				);

				if (response.status === 200 || response.data.status === 'success') {
					setGroupsForTotur(response.data.data);
					return response.data.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};

	const fetchGroupsTable = useQuery({
		queryKey: [
			'getGroupForTutor',
			`${_id}`,
			`${selectedTutor?._id}`,
			`${selectedTutorCourse?._id}`,
			`${handleAddGroup}`,
			`${handleModifyGroup}`,
			`${handleDeletGroup}`,
		],
		queryFn: () => getGroupForTutor(),
		enabled: !!selectedCenter && !!selectedTutor && !!selectedTutorCourse?._id,
		// refetchOnMount: true,
		// refetchIntervalInBackground: true,
		// refetchOnWindowFocus: true,
	});



	// this for booking course
	const [selectedTutorBookCourse, setselectedTutorBookCourse] = useState("")
	const [selectedCourseINBookCourse, setselectedCourseINBookCourse] = useState("")
	const [selectedGroupsBookCourse, setselectedGroupsBookCourse] = useState([])

	const cachedStudentData = JSON.parse(sessionStorage.getItem("studentsDetails"))
	const studentDetails = studentData ? studentData : cachedStudentData !== null && cachedStudentData


	const getSpcificTutorCourses = async () => {
		if (selectedCenter && selectedTutorBookCourse && studentDetails) {
			try {
				// &openForRegistration=true
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter._id}/tutors/${selectedTutorBookCourse?._id}/center-courses?limit=-1&tutorCourse.courseData.grade.nameEn=${studentDetails?.grade?.nameEn}&tutorCourse.term=${studentDetails?.term}`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {

					return response.data.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};

	const fetchSpcificTutorCourses = useQuery({
		queryKey: [
			'getSpcificTutorCourses',
			`${_id}`,
			`${selectedTutorBookCourse?._id}`,
			`${studentDetails?.grade?.nameEn}`,
			`${studentDetails?.term}`,
		],
		queryFn: () => getSpcificTutorCourses(),
		enabled:
			!!selectedCenter &&
			!!selectedTutorBookCourse?._id &&
			!!studentDetails &&
			!!studentDetails?.grade?.nameEn &&
			!!studentDetails?.term,
		refetchOnMount: true,
	});

	// console.log(fetchSpcificTutorCourses.data)

	const GetTeacherTimeTable = async () => {
		if (selectedCenter && selectedTutorBookCourse && selectedCourseINBookCourse) {
			try {
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/center-courses/${selectedCourseINBookCourse?._id}/groups?fields=-center,-tutorCourse?limit=-1`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					// setselectedGroupsBookCourse(response.data.data);
					return response.data.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};

	const fetchTutorsGroups = useQuery({
		queryKey: [
			'fetchTutorsGroups',
			`${_id}`,
			`${selectedCourseINBookCourse?._id}`,
			`${selectedTutorBookCourse?._id}`,
			`${handleAddGroup}`,
			`${handleDeletGroup}`,
			`${handleModifyGroup}`,
			`${handleModifyCourse}`
		],
		queryFn: () => GetTeacherTimeTable(),
		enabled: !!selectedCenter && !!selectedTutorBookCourse && !!selectedCourseINBookCourse?._id,
		refetchOnMount: true,
	});



	const AddAlertAction = async (values) => {
		// & createdAt[gt]=date & createdAt[lt]=date
		if (selectedCenter) {
			setMainLoading({ ...MainLoading, addAlertLoading: true });
			try {
				const response = await axios.post(
					`${BASE_URL}centers/${selectedCenter?._id}/announcements`,
					values,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					ErorrMessage(t('homeRev.alertSuccess'), 'success');
					values.title = '';
					values.description = '';
					setToggler((prev) => {
						return { ...prev, addAlert: !prev.addAlert };
					});
					setMainLoading({ ...MainLoading, addAlertLoading: false });
				}
			} catch (error) {
				// showBoundary(error)

				ErorrMessage(t('Errors.main'), 'error');

				setMainLoading({ ...MainLoading, addAlertLoading: false });
			}
		}
	};




	// fetch all center courses\
	const cachedSelectedGradeOfCourse = JSON.parse(
		sessionStorage.getItem('selectedGradeOfCourse')
	);
	const [selectedGradeOfCourse, setSelectedGradeOfCourse] = useState(
		{ nameEn: t("Notifications.showAll"), nameAr: t("Notifications.showAll") } || cachedSelectedGradeOfCourse
	);

	const [coursePage, setcoursePage] = useState(1)
	const GetAllCourses = async () => {
		if (selectedCenter) {
			try {
				const query = selectedGradeOfCourse.nameAr === "عرض الكل" || selectedGradeOfCourse.nameAr === "Show all"
					? ''
					: `&tutorCourse.courseData.grade.nameEn=${selectedGradeOfCourse.nameEn}`



				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/center-courses?limit=5&page=${coursePage}${query}`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					setallCourses(response.data.data);
					return response.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};

	const fetchAllCourses = useQuery({
		queryKey: [
			'GetAllCourses',
			`${_id}`,
			// `${MainLoading.addGroupL}`,
			// `${MainLoading.deletGroup}`,
			`${selectedGradeOfCourse?.nameEn}`,
			`${handleAddGroup}`,
			`${handleDeletGroup}`,
			`${handleModifyCourse}`,
			`${handleBookCourse}`,
			`${coursePage}`,
			`${MainLoading.acceptCourse}`],
		queryFn: () => GetAllCourses(),
		enabled: !!_id && !!selectedGradeOfCourse,
		// refetchOnMount: true,
	});


	const AddPayment = async (values) => {
		if (selectedCenter) {
			setMainLoading({ ...MainLoading, postPay: true });
			try {
				const response = await axios.post(
					`${BASE_URL}centers/${selectedCenter._id}/payments?limit=-1`,
					values,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					ErorrMessage(t('homeRev.paySuccess'), 'success');
					// setPaymnets([...Paymnets, response.data.data])
					// console.log(response.data);
					values.title = '';
					values.price = '';
					setMainLoading({ ...MainLoading, postPay: false });
				}
			} catch (error) {
				// showBoundary(error)

				ErorrMessage(t('Errors.main'), 'error');
				setMainLoading({ ...MainLoading, postPay: false });
			}
		}
	};



	const [StudentsPage, setStudentsPage] = useState(1);

	const [studentGrade, setstudentGrade] = useState({ nameEn: t("Notifications.showAll"), nameAr: t("Notifications.showAll"), _id: "" })


	const GetAllStuents = async () => {
		if (selectedCenter) {
			try {
				const query = studentGrade?._id !== "" ? `&grade._id=${studentGrade?._id}` : ""
				// console.log(query)
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/students?limit=5&page=${StudentsPage}${query}`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					// console.log(`grade is: ${query}`, response);
					setallStudents(response.data.data);

					return response.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};
	const fetchStudents = useQuery({
		queryKey: ['GetAllStuents', `${_id}`, `${studentGrade?.nameAr}`, `${StudentsPage}`, `${handleBookCourse}`],
		queryFn: () => GetAllStuents(),
		enabled: !!_id,
		refetchIntervalInBackground: true,
		placeholderData: true,

	});


	const GetAllAssistants = async () => {
		if (selectedCenter && userDetails.role === "1") {
			try {
				const response = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/center-assistants?limit=-1`,
					{ headers: headers }
				);
				if (response.status === 200 || response.data.status === 'success') {
					setallAssistants(response.data.data);
					return response.data.data;
				}
			} catch (error) {
				showBoundary(error)

			}
		}
	};
	const fetchAllAssistants = useQuery({
		queryKey: [
			'getAllAssistants',
			`${selectedCenter?._id}`,
			`${handleDeletAssistant}`,
			`${handleAddAssistant}`,
		],
		queryFn: () => GetAllAssistants(),
		enabled: !!selectedCenter?._id && userDetails.role === "1",
	});


	// get current Groups
	const getCurrentGroups = async (selectedCenter) => {
		const res = await axios.get(
			`${BASE_URL}centers/${selectedCenter?._id}/groups?dayOfWeek=${currentDay}&sort=startTime&limit=-1`,
			{ headers: headers }
		);
		return res.data.data;
	};

	const fetchCurrentGroups = useQuery({
		queryKey: [
			'getCurrentGroups',
			`${selectedCenter?._id}`,
			`${currentDay}`,
			// `${MainLoading.deletGroup}`,
			// `${MainLoading.addGroupL}`,
			// `${MainLoading.modifyGroupLoading}`,
			`${handleAddGroup}`,
			`${handleModifyGroup}`,
			`${handleDeletGroup}`,
			`${handleBookCourse}`,
		],
		queryFn: () => getCurrentGroups(selectedCenter),
		enabled: !!selectedCenter,
		refetchOnMount: true,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});

	// notifications

	// const [currentPageOfNoticfications, setCurrentPageOfNoticfications] =
	// 	useState(1);
	// const mainTypes = [
	// 	{ name: t('homepage.pending'), status: 'pending' },
	// 	{ name: t('homepage.accepted'), status: 'accepted' },
	// 	{ name: t('homepage.rejected'), status: 'rejected' },
	// ];
	// const [selectedTypeN, setselectedTypeN] = useState(mainTypes[0]);
	// const getNotifications = async (
	// 	selectedCenter,
	// 	selectedTypeN,
	// 	currentPageOfNoticfications
	// ) => {
	// 	if (selectedCenter) {
	// 		try {
	// 			const res = await axios.get(
	// 				`${BASE_URL}centers/${selectedCenter?._id}/course-requests?limit=5&page=${currentPageOfNoticfications}&status=${selectedTypeN.status}`,
	// 				{ headers: headers }
	// 			);
	// 			if (res.status === 200 || res.data.status === 'success') {
	// 				return res.data;
	// 			}
	// 			// console.log(res);
	// 		} catch (error) {
	// 			showBoundary(error)

	// 		}
	// 	}
	// };

	// let { status } = selectedTypeN;


	// const fetchNotifications = useQuery({
	// 	queryKey: [
	// 		'getNotifications',
	// 		`${_id}`,
	// 		`${status}`,
	// 		`${currentPageOfNoticfications}`,
	// 		`${MainLoading.acceptCourse}`,
	// 		`${MainLoading.refusesCourse}`,
	// 		`${selectedTypeN}`,
	// 	],

	// 	queryFn: () =>
	// 		getNotifications(
	// 			selectedCenter,
	// 			selectedTypeN,
	// 			currentPageOfNoticfications
	// 		),
	// 	enabled: !!_id,
	// 	placeholderData: true,
	// });

	// const acceptRequest = async function (requestID) {
	// 	if (selectedCenter && requestID) {
	// 		try {
	// 			setMainLoading({ ...MainLoading, acceptCourse: true });
	// 			const res = await axios.post(
	// 				`${BASE_URL}centers/${selectedCenter?._id}/course-requests/${requestID}`,
	// 				{},
	// 				{ headers: headers }
	// 			);
	// 			if (res.data.status === 'sccuess' || res.status === 200) {
	// 				ErorrMessage(t('Errors.acceptedRequest'), 'success');
	// 			}
	// 		} catch (error) {
	// 			// showBoundary(error)

	// 		} finally {
	// 			setMainLoading({ ...MainLoading, acceptCourse: false });
	// 		}
	// 	}
	// };

	// const refusedRequest = async function (requestID) {
	// 	if (selectedCenter && requestID) {
	// 		try {
	// 			setMainLoading({ ...MainLoading, refusesCourse: true });
	// 			const res = await axios.delete(
	// 				`${BASE_URL}centers/${selectedCenter?._id}/course-requests/${requestID}`,
	// 				{ headers: headers }
	// 			);
	// 			if (res.data.status === 'sccuess' || res.status === 200) {
	// 				ErorrMessage(t('Errors.refusedRequest'), 'success');
	// 			}
	// 		} catch (error) {
	// 			showBoundary(error)

	// 		} finally {
	// 			setMainLoading({ ...MainLoading, refusesCourse: false });
	// 		}
	// 	}
	// };

	// get SingleGroup

	const cachedGroupId = sessionStorage.getItem("groupId")


	const getSingleGroup = async (selectedCenter, groupId) => {
		if (selectedCenter && groupId) {
			const res = await axios.get(
				`${BASE_URL}centers/${selectedCenter?._id}/groups/${groupId}`,
				{ headers: headers }
			);
			return res.data.message;
		}
	};

	const fetchSingleGroup = useQuery({
		queryKey: [
			'getSingleGroup',
			`${selectedCenter?._id}`,
			`${groupId}`,
			`${courseId}`,
			`${handleModifyGroup}`,
		],
		queryFn: () => getSingleGroup(selectedCenter, groupId),
		enabled: !!selectedCenter && !!groupId,
		refetchOnMount: true,
	});

	// get singleCourse
	const [courseDetails, setcourseDetails] = useState({});
	const getSingleCourse = async (selectedCenter, courseId) => {
		if (selectedCenter && courseId) {
			const res = await axios.get(
				`${BASE_URL}centers/${selectedCenter._id}/center-courses/${courseId}`,
				{ headers: headers }
			);
			if (res.status === 200 || res.data.status === 'success') {
				setcourseDetails(res.data.data[0]);
				return res.data.data;
			}
		}
	};
	const fetchSingleCourse = useQuery({
		queryKey: ['getSingleCourse', `${_id}`, `${courseId}`, `${handleModifyCourse}`, `${handleModifyGroup}`,],
		queryFn: () => getSingleCourse(selectedCenter, courseId),
		enabled: !!_id && !!courseId,
		refetchOnMount: true,
	});

	// get sessoins for group =>>>>>>used as a dropdown

	const [selectedSession, setselectedSession] = useState(null);
	const [sessions, setsessions] = useState([])

	const getCourseId = sessionStorage.getItem("courseId")
	const getGroupId = sessionStorage.getItem("groupId")
	const course = getCourseId !== null ? getCourseId : courseId
	const group = getGroupId !== null ? getGroupId : groupId
	// console.log(group, course, selectedCenter?._id)


	const getSessionsForGroup = async () => {




		if (selectedCenter && course && group) {
			try {
				const res = await axios.post(
					`${BASE_URL}attendance/center/${selectedCenter?._id}?isClosed=false`,
					{
						centerCourseId: course,
						groupId: group,
					},
					{ headers: headers }
				);
				if (res.status === 200 || res.data.status === 'success') {

					setsessions([
						{ name: t("Logs.selectAll"), value: "all" }, ...res.data.message
					])

					return res.data.message;
				}
			} catch (error) {
				showBoundary(error)
			}


		}
	};
	const fetchSessionsForGroup = useQuery({
		queryKey: ['getSessionsForGroup', `${_id}`, `${course}`, `${group}`],
		queryFn: () => getSessionsForGroup(),
		enabled: !!_id && !!course && !!group,
	});

	const GetSingleTeacher = async () => {
		if (selectedCenter && id) {
			try {
				const res = await axios.get(
					`${BASE_URL}centers/${selectedCenter?._id}/tutors/${id}`,
					{ headers: headers }
				);
				setTeacher(res.data.data[0]);
				return res.data.data[0];
			} catch (error) {
				showBoundary(error)

			}
		}
	};

	const fetchSingleTeacher = useQuery({
		queryKey: ['getSingleTeacher', `${selectedCenter}`, `${id}`],
		queryFn: () => GetSingleTeacher(),
		enabled: !!selectedCenter && !!id,
		refetchOnMount: true,
	});

	// const [TypesOfPayment, setTypesOfPayment] = useState([]);
	// const [selectedTypeOfPayment, setselectedTypeOfPayment] = useState('');

	// const getTypes = async () => {
	// 	if (selectedCenter) {
	// 		try {
	// 			const res = await axios.get(
	// 				`${BASE_URL}centers/${selectedCenter?._id}/payment-templates?type=custom&limit=-1`,
	// 				{ headers: headers }
	// 			);

	// 			if (res.status === 200 || res.data.status === 'success') {
	// setTypesOfPayment(res.data.data);
	// 				setselectedTypeOfPayment(res.data.data[0]);
	// 			}
	// 		} catch (error) {
	// 			showBoundary(error)

	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	if (selectedCenter && allCenters.length > 0) {
	// 		getTypes();
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [allCenters, selectedCenter, addModel]);

	// useEffect(() => {
	// 	GetAllCoursesCenter();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [selectedCenter, TeachersOfCenter.selectedTeacher]);

	// useEffect(() => {
	//   // GetTeacherTimeTable()
	//   getGroupForTutor()
	// }, [selectedCenter, TeachersOfCenter.selectedTeacher, CoursesOfCenter.selectedCourse])

	const [singleTeacherData, setsingleTeacherData] = useState(null);
	const [centerKey, setcenterKey] = useState(null)


	const getCenterKey = async () => {
		// if (userDetails.role === "2") {
		try {
			const res = await axios.get(`${BASE_URL}center-users/details`, { headers: headers })
			// console.log(res)
			if (res.status === 200 || res.data.status === "success") {
				setcenterKey(res.data.data)
				return res.data.data
			}
		} catch (error) {
			showBoundary(error)

			// }
		}
	}


	const fetchCenterKey = useQuery({
		queryKey: ["fetchCenterKey"],
		queryFn: () => getCenterKey(),
		// enabled: userDetails.role === "2"
	})


	const [alertPage, setalertPage] = useState(1)

	const GetAlert = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/centers/${selectedCenter?._id}/announcements?limit=6&page=${alertPage}`, { headers: headers })

			if (res.status === 200) {
				return res.data
			}
		} catch (error) {
			showBoundary(error)
		}
	}
	const [handleAddAlert, sethandleAddAlert] = useState(false)
	const fetchAlerts = useQuery({
		queryKey: ["getAlerts", `${selectedCenter?._id}`, `${alertPage}`, `${handleAddAlert}`],
		queryFn: () => GetAlert(),
		enabled: !!selectedCenter?._id
	})



	const [boockedCourseReq, setboockedCourseReq] = useState(
		{
			centerCourseId: "",
			cardCode: "",

			cardCourseId: "",
			fire: false,
			loading: false

		}
	)

	const handleDeletBoockedCourse = async () => {

		if (!(selectedCenter && boockedCourseReq.centerCourseId && boockedCourseReq.cardCode && boockedCourseReq.cardCourseId)) return null

		if (boockedCourseReq.fire) {
			try {

				setboockedCourseReq({
					...boockedCourseReq,
					loading: true

				})
				const res = await axios.delete(`${BASE_URL}centers/${selectedCenter?._id}/center-courses/${boockedCourseReq.centerCourseId}/cards/${boockedCourseReq.cardCode}/card-courses/${boockedCourseReq.cardCourseId}`, { headers: headers })

				if (res.status === 204) {
					ErorrMessage(t("homepage.courseDeleted"), "success")
					sethandleDeleteBoockedCourse(prev => !prev)
					setToggler({ ...Toggler, deleteCourse: false })
				}

				console.log(res)
			} catch (error) {
				showBoundary(error)

			} finally {
				setboockedCourseReq({
					...boockedCourseReq,
					loading: false

				})
			}
		}


	}

	return (
		<ApisContext.Provider
			value={{
				boockedCourseReq, setboockedCourseReq,
				handleDeletBoockedCourse,
				fetchCenterKey,
				selectedTutorBookCourse, setselectedTutorBookCourse, selectedCourseINBookCourse, setselectedCourseINBookCourse, selectedGroupsBookCourse, setselectedGroupsBookCourse, handleModifyCourse, sethandleModifyCourse, studentGrades, setstudentGrades, fetchAlerts, alertPage, setalertPage,
				selectedGradeOfCourse, setSelectedGradeOfCourse, sethandleAddAlert, studentData, setstudentData,
				coursePage, setcoursePage,
				handleAddGroup,
				centerKey, setcenterKey,
				sethandleAddGroup,
				handleModifyGroup,
				sethandleModifyGroup,
				handleDeletGroup,
				sethandleDeletGroup,
				singleTeacherData,
				setsingleTeacherData,
				fetchAllAssistants,
				allCenters,
				setallCenters,
				selectedCenter,
				setselectedCenter,
				MainLoading,
				setMainLoading,
				Groups,
				Grades,
				sethandleAddAssistant,
				setGrades,
				setGroups,
				selectedGrade,
				setselectedGrade,
				Paymnets,
				AddAlertAction,
				TeachersOfCenter,
				setTeachersOfCenter,
				CoursesOfCenter,
				setCoursesOfCenter,
				TeacherTimeTable,
				headers,
				AddPayment,
				// selectedRev,
				// setselectedRev,
				// RevenuesTypes,
				allCourses,
				deletGroupId,
				setdeletGroupId,
				Course,
				setCourse,
				courseDetails,
				// fetchRev,
				// isValidDate,
				// setisValidDate,
				// isError,
				// setisError,
				setallCourses,
				allStudents,
				setallStudents,
				fetchStudents,
				StudentsPage,
				setStudentsPage,
				Teacher,
				setTeacher,
				convertTo12HourFormat,
				allAssistants,
				studentCourses,
				setstudentCourses,
				// acceptRequest,
				// codesPage,
				// setcodesPage,
				// fetchCodes,
				fetchGrades,
				studentGrade, setstudentGrade,
				fetchSingleTeacher,
				startDate,
				setstartDate,
				endDate,
				setendDate,
				Group,
				getSessionsForGroup,
				sethandleDeletAssistant,
				getLastSevenItems,
				// studentDetails,
				// setstudentDetails,
				selectedGradeSt,
				setselectedGradeSt,
				GroupsForTotur,
				// getPayments,
				// getrevs,
				// pageRevs,
				// setpageRevs,
				// selectedType,
				// Types,
				// setselectedType,
				// pageData,
				// setPageData,
				// postPay,
				// setpostPay,
				Day,
				Time,
				// addModel,
				tutors, settutors,
				// setaddModel,
				// selectedDesType,
				// duseTypes,
				// setselectedDesType,
				getCard,
				qrData,
				setQrData,
				// fetchNotifications,
				// PagesModel,
				// setPagesModel,
				fetchSingleStudent,
				sessions, setsessions,
				sethandleBookCourse,
				// fetchModels,
				// currentPageOfNoticfications,
				fetchSpcificTutorCourses,
				// setCurrentPageOfNoticfications,
				// selectedTypeN,
				// setselectedTypeN,
				// mainTypes,
				fetchCurrentGroups,
				fetchSingleGroup,
				fetchSingleCourse,
				fetchSessionsForGroup,
				fetchAllCenters,
				// fetchPayment,
				// currentPagePayments,
				// setcurrentPagePayments,
				selectedSession,
				setselectedSession,
				// refusedRequest,
				fetchAllCourses,
				_id,
				// selectedspcializedItem,
				// TypesOfPayment,
				// selectedTypeOfPayment,
				selectedTerm,
				setselectedTerm,
				terms,
				setterms,
				terms3,
				// setselectedTypeOfPayment,
				tens,
				fetchTutors,
				fetchTutorsCourses,
				selectedTutor,
				setselectedTutor,
				selectedTutorCourse,
				setselectedTutorCourse,
				fetchTutorsGroups,
				fetchGroupsTable,
				fetchStudentCourses,
				// setselectedspcializedItem,
				// spcializedPaymentsPage,
				// setspcializedPaymentsPage,
				// fetchSpcialedPaymet,
				GroupsPage,
				setGroupsPage,
				// spcializedPaymentsTypes,
				// desPages,
				// setdesPages,
				// fetchDes,
			}}
		>
			{preops.children}
		</ApisContext.Provider>
	);
}