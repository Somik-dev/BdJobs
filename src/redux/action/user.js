import axios from "axios";
import Cookies from "js-cookie";
import { btnLoadingStart, forgotFail, forgotSuccess, getUserFail, getUserProfileFail, getUserProfileSucces, getUserSucces, loadingStart, loginFail, loginSuccess, photoUpdateFail, photoUpdateSuccess, registerFail, registerSuccess, resetFail, resetSuccess, resumeUpdateFail, resumeUpdateSuccess, SkillAddFail, skillAddSuccess, SkillremoveFail, skillremoveSuccess, updateFail, updateSuccess } from "../reducer/userReducer";
import { getAllCompany } from "./company";

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Set token cookie
    Cookies.set("token", data.token, {
      expires: 5,
      secure: true,
      path: "/",
    });

    dispatch(registerSuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    const message =
      error?.response?.data?.message || "Registration failed. Please try again.";
    dispatch(registerFail(message));

    // Optional: log to console or show toast
    console.error("Register Error:", message);
  }
};


export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/login", { email, password });

    // Make sure backend sends: { token, user, message }
    Cookies.set("token", data.token, {
      expires: 5,
      secure: true,
      path: "/",
    });

    dispatch(loginSuccess(data)); // contains message
    dispatch(getAllCompany());
  } catch (error) {
    const errorMsg =
      error?.response?.data?.message || "Login failed. Please try again.";
    dispatch(loginFail(errorMsg));
  }
}

export const getUser = () => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const { data } = await axios.get(
      "/api/user/myprofile?token=" + Cookies.get("token")
    );

    dispatch(getUserSucces(data));
  } catch (error) {
    dispatch(getUserFail(error.response.data.message));
  }
};


export const forgotPassword = (email,setemail) => async (dispatch) => {

  try {
     const {data} = await axios.post("/api/user/forgot", { email });
     dispatch(forgotSuccess(data));
     setemail("");
  } catch (error) {
     dispatch(forgotFail(error.response.data.message));
  }

};

export const resetPassword =
  (password, token, setPassword) => async (dispatch) => {
    try {
      dispatch(btnLoadingStart());

      const { data } = await axios.post("/api/user/reset?token=" + token, {
        password,
      });

      dispatch(resetSuccess(data));
      setPassword("");
    } catch (error) {
      dispatch(resetFail(error.response.data.message));
    }
  };


  export const updatePhoto = (formData) => async(dispatch) => {

    try {
        dispatch(btnLoadingStart());
        const {data} = await axios.post("/api/user/update/profilepic?token=" + Cookies.get("token"),
       formData);
       dispatch(photoUpdateSuccess(data));
       dispatch(getUser());
    } catch (error) {
      dispatch(photoUpdateFail(error.response.data.message));
    }

  }

  export const updateProfiler = (name, phoneNumber, bio) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/user/update/info?token=" + Cookies.get("token"),
      { name, phoneNumber, bio }
    );

    dispatch(updateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(updateFail(error.response.data.message));
  }
};

  export const updateResume = (formData) => async(dispatch) => {

    try {
        dispatch(btnLoadingStart());
        const {data} = await axios.post("/api/user/update/resume?token=" + Cookies.get("token"),
       formData);
       dispatch(resumeUpdateSuccess(data));
       dispatch(getUser());
    } catch (error) {
      dispatch(resumeUpdateFail(error.response.data.message));
    }

  }

 export const AddSkill = (skill) => async (dispatch) => {
  try {
    const token = Cookies.get("token");
    if (!token) return dispatch(SkillAddFail("Authentication token missing"));

    dispatch(btnLoadingStart());

    const response = await axios.post(
      "/api/user/skill/add",
      { skill },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(skillAddSuccess(response.data));
    dispatch(getUser());
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to add skill";
    dispatch(SkillAddFail(message));
  }
};

export const removeSkill = (skill) => async (dispatch) => {
  try {
    const token = Cookies.get("token");
    if (!token) return dispatch(SkillremoveFail("Authentication token missing"));

    dispatch(btnLoadingStart());

    const response = await axios.delete("/api/user/skill/remove", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        skill, 
      },
    });

    dispatch(skillremoveSuccess(response.data));
    dispatch(getUser());
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to remove skill";
    dispatch(SkillremoveFail(message));
  }
};


export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get(
      "/api/user/profile?token=" + Cookies.get("token") + "&id=" + id
    );

    dispatch(getUserProfileSucces(data));
  } catch (error) {
    dispatch(getUserProfileFail(error.response.data.message));
  }
};

