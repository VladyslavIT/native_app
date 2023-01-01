import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";


const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { uid, displayName } = await auth.currentUser;

      dispatch(updateUserProfile({ userId: user.uid, nickname: displayName }));
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      console.log(email, password);
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  try {
    await onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          updateUserProfile({
            userId: currentUser.uid,
            nickname: currentUser.displayName,
          })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
