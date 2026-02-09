import axios from "axios";
import Cookies from "js-cookie";
import {
  addComapyFail,
  addCompanySuccess,
  btnLoadingStart,
  deleteCompanyFail,
  deleteCompanySuccess,
  getAllCompanyFail,
  getAllCompanySuccess,
  getSingleCompanyFail,
  getSingleCompanySuccess,
  loadingStart,
} from "../reducer/companyReducer";

/**
 * ✅ Get All Companies
 */
export const getAllCompany = () => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const token = Cookies.get("token");
    if (!token) {
      console.warn("❌ No token found, skipping getAllCompany API call");
      dispatch(getAllCompanyFail());
      return;
    }

    const { data } = await axios.get(`/api/company/all?token=${token}`);
    dispatch(getAllCompanySuccess(data));
  } catch (error) {
    console.error("❌ Error fetching companies:", error.response?.data || error.message);
    dispatch(getAllCompanyFail());
  }
};

/**
 * ✅ Add New Company
 */
export const addCompany = (formData, clearData) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const token = Cookies.get("token");
    if (!token) {
      console.warn("❌ No token found, skipping addCompany API call");
      dispatch(addComapyFail("Authentication token missing"));
      return;
    }

    const { data } = await axios.post(`/api/company/new?token=${token}`, formData);

    dispatch(addCompanySuccess(data));
    dispatch(getAllCompany()); // refresh company list
    clearData?.(); // safe call in case clearData not passed
  } catch (error) {
    console.error("❌ Error adding company:", error.response?.data || error.message);
    dispatch(addComapyFail(error.response?.data?.message || "Failed to add company"));
  }
};

/**
 * ✅ Get Single Company by ID
 */
export const getSingleCompany = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const token = Cookies.get("token");
    if (!token) {
      console.warn("❌ No token found, skipping getSingleCompany API call");
      dispatch(getSingleCompanyFail());
      return;
    }

    const { data } = await axios.get(`/api/company/single?token=${token}&id=${id}`);
    dispatch(getSingleCompanySuccess(data));
  } catch (error) {
    console.error("❌ Error fetching single company:", error.response?.data || error.message);
    dispatch(getSingleCompanyFail());
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.delete(
      "/api/company/delete?token=" + Cookies.get("token") + "&id=" + id
    );

    dispatch(deleteCompanySuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(deleteCompanyFail(error.response.data.message));
  }
};
