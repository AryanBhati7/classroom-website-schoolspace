import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./features/authSlice";
import { useCurrentUser } from "./hooks/auth.hook";
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

function App() {
  const dispatch = useDispatch();
  const { data: res, isFetching, error, isFetched } = useCurrentUser();
  const location = useLocation();
  console.log(res, "get current user app");
  const hideSidebarPaths = ["/sign-in", "/sign-up", "/"];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  useEffect(() => {
    if (res.user) {
      dispatch(setUser(res.user));
    } else {
      dispatch(setUser(null));
    }
  }, [res, isFetching]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      {/* Navbar */}
      <div className="w-full bg-white shadow-lg p-3 flex items-center justify-center">
        <Logo />
      </div>
      <div className="w-full flex">
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
              path="/timetable"
              element={
                <AuthLayout>
                  <TimeTable />
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
