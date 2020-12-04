import { combineReducers } from "redux";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  profilePicture: "",
  courses: {},
  dms: {},
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        profilePicture: action.payload.profilePicture,
        courses: action.payload.courses,
        dms: action.payload.dms,
      };
    case "SIGN_OUT":
      return {
        INITIAL_STATE,
      }
    default:
      return state;
  }
};

export default combineReducers({
  account: accountReducer,
});
