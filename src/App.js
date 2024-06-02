import "./App.css";
import { ForgotPassword } from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { About } from "./pages/About";
import Open from "./components/core/auth/Open";
import { UpdatePassword } from "./pages/UpdatePassword";
import { Verifyemail } from "./pages/Verifyemail";

import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { Dashboard } from "../src/pages/Dashboard";
import { PrivateRoute } from "./components/core/auth/PrivateRoute";
import { Error } from "./pages/Error";
import { EnrolledCourses } from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utills/constant";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
function App() {
  const {user} =useSelector((state)=>state.profile)
  console.log(user)
  // console.log(user.ACCOUNT_TYPE)
  return (
    <div className="min-w-100vw min-h-100vh bg-richblack-600">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/forgot-password"
            element={
              <Open>
                <ForgotPassword />
              </Open>
            }
          />
          <Route
            path="/update-password/:id"
            element={
              <Open>
                <UpdatePassword />
              </Open>
            }
          />
          <Route
            path="/login"
            element={
              <Open>
                <Login />
              </Open>
            }
          />
          <Route
            path="/signup"
            element={
              <Open>
                <Signup />
              </Open>
            }
          />
          <Route
            path="/verify-email"
            element={
              <Open>
                <Verifyemail />
              </Open>
            }
          />
          <Route
            path="/about"
            element={
              <Open>
                <About />
              </Open>
            }
          />
          <Route
            element={
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            }
          >
            <Route  path="/dashboard/my-profile" element={<MyProfile />} />
      
          {
            user?.accountType===ACCOUNT_TYPE.STUDENT&&(
              <>
                <Route  path="/dashboard/cart" element={<Cart />} />
            <Route  path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              </>
            )
          }
                  {
            user?.accountType===ACCOUNT_TYPE.INSTRUCTOR&&(
              <>
                <Route  path="/dashboard/add-course" element={<AddCourse />} />
            
              </>
            )
          }
          
          </Route>

          <Route path="*" element={<Error></Error>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
