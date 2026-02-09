 import { createSlice } from "@reduxjs/toolkit";
import { get } from "mongoose";


const initialState = {
  companies: null,
  company: null,
  loading: false,
  btnLoading: false,
  error: null,
  message: null,
 }

 const companySlice  = createSlice({ 
    name: "company",
    initialState,
    reducers: { 

    loadingStart: (state) => {
      state.loading = true;
    },
    btnLoadingStart: (state) => {
      state.btnLoading = true;
    },
    getAllCompanySuccess: (state, action) => {
      state.loading = false;
      state.companies = action.payload;
    },
    getAllCompanyFail: (state) => {
      state.loading = false;
      state.companies = null;
    },

    addCompanySuccess: (state, action) => {
      state.btnLoading = false;
      state.companies = [...state.companies, action.payload];
      state.message = "Company added successfully!";
    },
    addComapyFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },
    getSingleCompanySuccess: (state, action) => {
      state.loading = false;
      state.company = action.payload;
    },
    getSingleCompanyFail: (state) => {
      state.loading = false; 
      state.company = null;
     },
      deleteCompanySuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    deleteCompanyFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
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

    }
 });

 export const {
  clearError,
  clearMessage,
  btnLoadingStart,
  loadingStart,
  getAllCompanyFail,
  getAllCompanySuccess,
  addCompanySuccess,
  addComapyFail,
  getSingleCompanySuccess,
  getSingleCompanyFail,
  deleteCompanySuccess,
  deleteCompanyFail
} = companySlice.actions;


export default companySlice.reducer;