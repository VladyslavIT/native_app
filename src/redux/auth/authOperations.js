import {auth} from '../../firebase/config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const authSignUpUser = ({login, email, password}) => async dispatch => {
    try {
        console.log(email, password);
        const user = await createUserWithEmailAndPassword(getAuth, email, password);
        console.log(user);
    } catch (error) {
        console.log("error", error.message);
    }
};

const authSignInUser = () => async (dispatch, getState) => {};

const authSignOutUser = () => async (dispatch, getState) => {};