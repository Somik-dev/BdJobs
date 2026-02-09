"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { clearError, clearMessage } from "@/redux/reducer/userReducer";
import { getUser } from "@/redux/action/user";
import { getAllCompany } from "@/redux/action/company";
import { getAllApplications, getAllJobs } from "@/redux/action/job";

const UserMessage = () => {
  const { error, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllCompany());
    dispatch(getAllJobs());
    dispatch(getAllApplications())
  }, [dispatch]);

  return null; // No need to render anything
};

export default UserMessage;
