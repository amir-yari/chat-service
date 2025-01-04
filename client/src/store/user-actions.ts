import axios from "axios";
import { userActions } from "./user-slice";
import { AppDispatch } from "./store";
import { host } from "../../utils/apiRoutes";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const api = axios.create({
  baseURL: `${host}/api`,
});

const fetchUserFromBackend = async (
  token: string,
  firstname: string,
  lastname: string
) => {
  const response = await api.post(
    "/account",
    { firstname, lastname },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();

      const userData = await fetchUserFromBackend(token, "", "");

      dispatch(userActions.setUser({ ...userData, isLoggedin: true }));
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
};

export const signup = (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();

      const userData = await fetchUserFromBackend(token, firstname, lastname);

      dispatch(userActions.setUser({ ...userData, isLoggedin: true }));
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
};

export const googleLogin = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const token = await user.getIdToken();

      const displayName = user.displayName || "";
      const [firstname, ...lastnameParts] = displayName.split(" ");
      const lastname = lastnameParts.join(" ");

      const userData = await fetchUserFromBackend(token, firstname, lastname);

      dispatch(userActions.setUser({ ...userData, isLoggedin: true }));
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await signOut(auth);

      dispatch(userActions.logoutUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
};

export const fetchUserData = () => {
  return (dispatch: AppDispatch) => {
    api
      .get("")
      .then((res) => {
        dispatch(userActions.setUser(res.data));
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  };
};

// export const patchUserData = (user: User) => {
//   return (dispatch: AppDispatch) => {
//     return api
//       .patch("", {})
//       .then((res) => {
//         dispatch(userActions.setUserInfo(res.data));
//         return res;
//       })
//       .catch((error) => {
//         console.error("Failed to post user data:", error);
//       });
//   };
// };
