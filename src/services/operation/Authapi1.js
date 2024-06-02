import toast from "react-hot-toast";
import { ApiConnector } from "../Apiconnector";
import { endpoints } from "../api";
import { setToken } from "../../slice/authSlice";
import { setUser } from "../../slice/profileSlice";
import cartSlice from "../../slice/cartSlice";
const {
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  SIGNUP_API,
  SENDOTP_API,
  LOGIN_API,
} = endpoints;

export function signUp(
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
	accountType,
	otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    //   dispatch(setLoading(true))
    try {
      const response = await ApiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.sucess) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }

    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true))
    try {
      const response = await ApiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log( "response data",response.data)

      // console.log("LOGIN API RESPONSE............", response);
      // console.log(response.data.sucess,"response data sucess")
      // console.log("response data user exist",response.data.user.firstName)
      // console.log(response.userExist.firstName)
      if (!response.data.sucess) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log(error);
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    //   dispatch(setLoading(false))
    //   toast.dismiss(toastId)
  };
}

export function logout(navigate) {
	return (dispatch) => {
	  dispatch(setToken(null))
	  dispatch(setUser(null))
	  // dispatch(resetCart())
	  localStorage.removeItem("token")
	  localStorage.removeItem("user")
	  toast.success("Logged Out")
	  navigate("/")
	}
  }
export function getPasswordResetToken(email, setEmailsent) {
  return async (dispatch) => {
    try {
      const response = await ApiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      console.log("Reset Pssword Token" + response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset email sent");
      setEmailsent(true);
    } catch (error) {
      console.log(error);
      console.log("reset password token error");
      toast.error("Reset password Ttoken error");
    }
  };
}
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true))
    try {
      const response = await ApiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.sucess);

      if (!response.data.sucess) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR..", error);
      toast.error("Could Not Send OTP");
    }
    //   dispatch(setLoading(false))
    //   toast.dismiss(toastId)
  };
}
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    try {
      console.log("before response");
      console.log(token);
      console.log(password);
      const response = await ApiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log("after response");
      console.log("your response for reset password", response);
      if (!response.data.sucess) {
        throw new Error(response.data.message);
      }
      toast.success("password reset sucessfully");
    } catch (error) {
      toast.error("unable to reset password");
    }
  };
}
