import { createContext, useState, useEffect } from "react";
import ourCites from "../cites.json";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
export const MainContext = createContext();

export default function MainContextProvider(preops) {
  // const { selectedCenter, headers } = useContext(ApisContext);
  const [toggleNotifications, settoggleNotifications] = useState(false);
  const [assistantId, setassistantId] = useState(null);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [Role, setRole] = useState(null);
  const [step, setstep] = useState(0);
  const storedEmail = JSON.parse(sessionStorage.getItem("ver-email"));
  const [email, setemail] = useState(() => {
    if (storedEmail !== null) {
      return storedEmail;
    } else {
      return "";
    }
  });

  // const [complateDate, setcomplateDate] = useState("")

  const [ExitModal, setExitModal] = useState(false);
  const [modelID, setmodelID] = useState(null);
  const [modelData, setmodelData] = useState(null);

  const [AuthLoading, setAuthLoading] = useState({
    login: false,
    verifyEmail: false,
    register: false,
    forget: false,
    reset: false
  });

  const [Deleted, setDeleted] = useState({
    deletedCourse: ""
  });

  const [Toggler, setToggler] = useState({
    checkCard: false,
    deletCourse: false,
    deletAll: false,
    addTeacher: false,
    modifyCourse: false,
    addCourse: false,
    addAlert: false,
    centerTimeTable: false,
    deletGroup: false,
    files: false,
    showAddGroup: false,
    addAssistant: false,
    changePass: false,
    scanCard: false,
    feedbackToggler: false,
    addFeedbackToStudent: false,
    cash: false,
    modifyGroup: false,
    deletTeacher: false,
    exit: false,
    bookCourse: false,
    studentPayments: false,
    addpayment: false,
    deleteCourse: false,
    deletModel: false,
    modifyModel: false,
    modifyBookedCourse: false,
    terms: false,
    takeAttend: false
  });

  // const [t, i18n] = useTranslation();
  const [position, setposition] = useState(null);

  const [selectedGover, setselectedGover] = useState(ourCites.data[0]);
  const [selectedCity, setselectedCity] = useState(ourCites.data[0].cities[16]);

  const [direction, setDirection] = useState(() => {
    const cachedDirection = localStorage.getItem("direction");
    return cachedDirection ? cachedDirection : "rtl"; // Default direction
  });

  const toggleDirection = () => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr"; // Toggle direction
    localStorage.setItem("direction", newDirection); // Cache new direction
    setDirection(newDirection); // Update direction state
  };

  // The sidemenu button (burger button)
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggleMenu() {
    setToggleMenu((open) => !open);
  }
  //   console.log(new Cookies().get("userDetails"));
  const dir = localStorage.getItem("direction");

  function ErorrMessage(text, type) {
    toast[type](text, {
      position: dir === "rtl" ? "top-right" : "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

      theme: "colored",
      style: { position: "relative", zIndex: 10000, fontSize: "14px" }
    });
  }

  useEffect(() => {
    setRole(parseInt(new Cookies().get("userDetails")?.role));
  }, []);

  const [toggleDropDown, setToggleDropDown] = useState(false);

  const cashedActiveClass = parseInt(sessionStorage.getItem("activeClass"));
  const [ActiveClass, setActiveClass] = useState(() => {
    if (cashedActiveClass) {
      return cashedActiveClass;
    } else {
      return 1;
    }
  });
  function handleActiveClass(index) {
    setActiveClass(index);
    if (index === 2) {
      setToggleDropDown((open) => !open);
    } else {
      setToggleDropDown((open) => !open);
    }
  }

  // feedback
  const [studentDetails, setstudentDetails] = useState(null);

  const handleUserName = (item, num) => {
    const itemLength = item?.split(" ")?.length;
    if (itemLength > num) {
      return `${item?.split(" ")?.slice(0, num)?.join(" ")}...`;
    } else {
      return item;
    }
  };

  const [cardCourseId, setcardCourseId] = useState(null);
  const [cardCode, setcardCode] = useState(null);
  const [attendHandller, setattendHandller] = useState(false);

  return (
    <MainContext.Provider
      value={{
        cardCode,
        attendHandller,
        setattendHandller,
        setcardCode,
        cardCourseId,
        setcardCourseId,
        handleUserName,
        studentDetails,
        setstudentDetails,
        toggleDropDown,
        setToggleDropDown,
        cashedActiveClass,
        ActiveClass,
        setActiveClass,
        handleActiveClass,
        selectedCity,
        AuthLoading,
        setAuthLoading,
        setselectedCity,
        selectedGover,
        setselectedGover,
        handleToggleMenu,
        setToggleMenu,
        toggleMenu,
        Toggler,
        setToggler,
        step,
        setstep,
        email,
        setemail,
        ErorrMessage,
        ExitModal,
        setExitModal,
        Role,
        setRole,
        direction,
        toggleDirection,
        position,
        setposition,
        Deleted,
        setDeleted,
        modelID,
        setmodelID,
        modelData,
        setmodelData,
        selectedGroup,
        setselectedGroup,
        toggleNotifications,
        settoggleNotifications,
        assistantId,
        setassistantId
      }}
    >
      {preops.children}
    </MainContext.Provider>
  );
}
