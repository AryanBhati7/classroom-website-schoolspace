import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./features/authSlice";
import { setTeachers, setClassrooms } from "./features/dataSlice";
import { useCurrentUser } from "./hooks/auth.hook";
import { Link } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  Classrooms,
  Students,
  Teachers,
  TimeTable,
} from "./pages";
import {
  LandingPage,
  Sidebar,
  LoadingSpinner,
  AuthLayout,
  Logo,
} from "./components";
import { useTeachersAndClassrooms } from "./hooks/dashboard.hook";

function App() {
  const dispatch = useDispatch();
  const { data: res, isFetching } = useCurrentUser();
  const location = useLocation();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: teachersAndClassrooms } = useTeachersAndClassrooms(shouldFetch);

  const hideSidebarPaths = ["/sign-in", "/sign-up", "/"];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  useEffect(() => {
    if (res && res.user) {
      dispatch(setUser(res.user));

      if (res.user.role === "PRINCIPAL" || res.user.role === "TEACHER") {
        setShouldFetch(true);
      }
    } else {
      dispatch(setUser(null));
      setShouldFetch(false);
    }
  }, [res]);

  useEffect(() => {
    if (teachersAndClassrooms) {
      if (teachersAndClassrooms.teachers) {
        dispatch(setTeachers(teachersAndClassrooms.teachers));
      }
      if (teachersAndClassrooms.classrooms) {
        dispatch(setClassrooms(teachersAndClassrooms.classrooms));
      }
    }
  }, [teachersAndClassrooms]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      {/* Navbar */}
      <div className="w-full bg-white shadow-lg p-3 flex items-center justify-center">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="w-full  min-h-[90vh]  flex">
        {!shouldHideSidebar && <Sidebar />}
        <div className={`content ${shouldHideSidebar ? "w-full" : "flex-1"}`}>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/classrooms"
              element={
                <AuthLayout>
                  <Classrooms />
                </AuthLayout>
              }
            />
            <Route
              path="/students"
              element={
                <AuthLayout>
                  <Students />
                </AuthLayout>
              }
            />
            <Route
              path="/teachers"
              element={
                <AuthLayout>
                  <Teachers />
                </AuthLayout>
              }
            />

            <Route
              path="/"
              element={
                <AuthLayout>
                  <Home />
                </AuthLayout>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
