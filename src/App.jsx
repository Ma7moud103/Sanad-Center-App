import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import "./index.css";
import Login from "./Layouts/Login/Login";
import ForgetPass from "./Layouts/ForgetPass/ForgetPass";
import ReEnterPass from "./Layouts/ReEnterPass/ReEnterPass";
import MainContextProvider from "./Context/MainContext";
import HomeLayout from "./Layouts/HomeLayout/HomeLayout";
import Home from "./pages/Home";
import { useTranslation } from "react-i18next";
// import Revenues from "./pages/Revenues";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Assistants from "./pages/Assistants";
import Courses from "./pages/Courses";
import SignUp from "./Layouts/Register/SignUp";
import VerificationCode from "./Layouts/VerificationCode/VerificationCode";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import UserRoute from "./Components/UserRoute";
import { ToastContainer } from "react-toastify";
import HomeCourses from "./Components/Courses/HomeCourses";
import SingleCourse from "./Components/Courses/SingleCourse/SingleCourse";
import SingleGroup from "./Components/Courses/SingleGroups/SingleGroup";
import HomeSingleCourse from "./Components/Courses/SingleCourse/HomeSingleCourse";
import HomeTeacher from "./Components/Teachers/HomeTeacher";
import SingleTeacher from "./Components/Teachers/SingleTeacher/SingleTeacher";
import SingleStudent from "./Components/Stuendt/SingleStudent";
// import CourseStatistics from "./pages/CourseStatistics";
import { Offline } from "react-detect-offline";
import ApisContextProvider from "./Context/ApisContext";
import SvgsContextProvidor from "./Context/SvgsConetxt";
// import Notifications from "./pages/Notifications";
import ProtectedStuents from "./Components/Stuendt/ProtectedStuents";
import Settings from "./pages/Settings";
import Test from "./pages/Test";
import SingleCourseGroup from "./Components/Teachers/SingleTeacher/SingleCourseGroup"
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorFallback";
import PreventWithoutKey from "./Components/PreventWithoutKey";
import Alerts from "./pages/Alerts";
import StudentsContainer from "./Components/Stuendt/StudentsContainer";


export default function App() {
  const [t] = useTranslation();

  const routes = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="login" element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
      <Route path="forget-password" element={<ProtectedRoutes><ForgetPass /></ProtectedRoutes>} />
      <Route path="forgot-password" element={<ProtectedRoutes><ReEnterPass /></ProtectedRoutes>} />
      <Route path="signup" element={<ProtectedRoutes><SignUp /></ProtectedRoutes>} />
      <Route path="verify" element={<ProtectedRoutes><VerificationCode /></ProtectedRoutes>} />

      <Route path="/" element={
        <UserRoute>
          <ErrorBoundary
            onError={() => console.log("error happen")}
            FallbackComponent={ErrorFallback}>

            <ApisContextProvider>
              <PreventWithoutKey>
                <HomeLayout />
              </PreventWithoutKey>

            </ApisContextProvider>
          </ErrorBoundary>
        </UserRoute>
      } errorElement={<ErrorFallback />}>
        <Route index element={<PreventWithoutKey><Home /></PreventWithoutKey>} />
        <Route path="student" element={<PreventWithoutKey><ProtectedStuents><SingleStudent /></ProtectedStuents></PreventWithoutKey>} />
        {/* <Route path="revenues" element={<PreventWithoutKey><Revenues /></PreventWithoutKey>} /> */}
        <Route path="courses" element={<PreventWithoutKey><Courses /></PreventWithoutKey>}>
          <Route index element={<PreventWithoutKey><HomeCourses /></PreventWithoutKey>} />
          <Route path=":courseId" element={<PreventWithoutKey><HomeSingleCourse /></PreventWithoutKey>}>
            <Route index element={<PreventWithoutKey><SingleCourse /></PreventWithoutKey>} />
            <Route path=":groupId" element={<PreventWithoutKey><SingleGroup /></PreventWithoutKey>} />
          </Route>
        </Route>
        <Route path="teachers" element={<PreventWithoutKey><Teachers /></PreventWithoutKey>}>
          <Route index element={<PreventWithoutKey><HomeTeacher /></PreventWithoutKey>} />
          <Route path="teacher/:id" element={<PreventWithoutKey><SingleTeacher /></PreventWithoutKey>} />
          <Route path="group/:courseGroupId" element={<PreventWithoutKey><SingleCourseGroup /></PreventWithoutKey>} />

        </Route>
        <Route path="students" element={<PreventWithoutKey><Students /></PreventWithoutKey>} >
          <Route index element={<PreventWithoutKey><StudentsContainer /></PreventWithoutKey>} />

          <Route path=":code" element={<PreventWithoutKey><SingleStudent /></PreventWithoutKey>} />
        </Route>
        {/* <Route path="statistics" element={<PreventWithoutKey><CourseStatistics /></PreventWithoutKey>} /> */}
        {/* <Route path="notifications" element={<PreventWithoutKey><Notifications /></PreventWithoutKey>} /> */}
        <Route path="assistants" element={<PreventWithoutKey><Assistants /></PreventWithoutKey>} />
        <Route path="settings" element={<Settings />} />
        <Route path="announcements" element={<Alerts />} />
        <Route path="test" element={<Test />} />
      </Route>
      <Route path="*" element={<ErrorFallback />} />

    </>
  ));


  return (
    <>
      <Offline>
        <span className="duration-700 fixed bottom-0 end-0 sm:bottom-10 sm:end-10 text-lg rounded-xl bg-err text-white p-2 capitalize text-center z-[60] w-full sm:w-auto text-nowrap">{t("Errors.network")}</span>
      </Offline>
      <MainContextProvider>
        <SvgsContextProvidor>
          <div className="App">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              limit={3}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <RouterProvider router={routes} />
          </div>
        </SvgsContextProvidor>
      </MainContextProvider>
    </>
  );
}
