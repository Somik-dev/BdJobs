import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userProfile: null,
  isAuth: true, 
  savedJobs: null,
  loading: false,
  btnLoading: false,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ----------------------------
    // Loading States
    // ----------------------------
    loadingStart: (state) => {
      state.loading = true;
    },
    btnLoadingStart: (state) => {
      state.btnLoading = true;
    },

    // ----------------------------
    // Register Success / Fail
    // ----------------------------
    registerSuccess: (state, action) => {
      state.loading = false;
      state.btnLoading = false;
      state.user = action.payload?.user || null;
      state.isAuth = true;
      state.message = action.payload?.message || null;
      state.error = null;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.btnLoading = false;
      state.user = null;
      state.isAuth = false;
      state.error = action.payload || "Registration failed.";
      state.message = null;
    },
    photoUpdateSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message || "Photo updated successfully";
    state.error = null;
    },
    photoUpdateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
      state.message = null;
    },
     updateSuccess: (state, action) => {
        state.btnLoading = false;
        state.message = action.payload.message;
        state.error = null;
      },
    updateFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
      state.message = null;
    },

     resumeUpdateSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    resumeUpdateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     skillAddSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    SkillAddFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },
      skillremoveSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    SkillremoveFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },


    // ----------------------------
    // Login Success / Fail
    // ----------------------------
    loginSuccess: (state, action) => {
    state.btnLoading = false;
    state.user = action.payload.user;
    state.isAuth = true;
    state.message = action.payload.message;
   },
    getUserSucces: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    getUserFail: (state) => {
      state.isAuth = false;
      state.loading = false;
    },
    loginFail: (state, action) => {
      state.btnLoading = false;
      state.user = null;
      state.isAuth = false;
      state.error = action.payload;
    },
    logoutSuccess:(state) => {
      state.user = null;
      state.isAuth = false;
      state.message = "Logged Out";
    },
    forgotSuccess:(state,action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    forgotFail: (state, action) => {
     state.btnLoading = false;
      state.error = action.payload;
      state.message = null;
    },
      resetSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload?.message || "Password reset successful.";
      state.error = null; 
      },


    getUserProfileSucces: (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    },
    getUserProfileFail: (state) => {
      state.loading = false;
    },

    resetFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload || "Failed to reset password.";
      state.message = null; 
    },
    // ----------------------------
    // Clear feedback
    // ----------------------------
   clearMessage: (state) => {
  state.message = null;
 },
    clearError: (state) => {
  state.error = null;
 },
  },
});

export const {
  loadingStart,
  btnLoadingStart,
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  getUserSucces,
  getUserFail,
  logoutSuccess,
  forgotSuccess,
  forgotFail,
  resetSuccess,
  resetFail,
  photoUpdateSuccess,
  photoUpdateFail,
  updateSuccess,
  updateFail,
  resumeUpdateSuccess,
  resumeUpdateFail,
  skillAddSuccess,
  SkillAddFail,
  skillremoveSuccess,
  SkillremoveFail,
  getUserProfileSucces,
  getUserProfileFail,
  clearMessage,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
