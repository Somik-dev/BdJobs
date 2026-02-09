"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { clearError, clearMessage } from "@/redux/reducer/companyReducer";

const CompanyMessage = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.company);

  useEffect(() => {
    const handleNotifications = () => {
      if (error) {
        toast.error(error);
        dispatch(clearError());
      }

      if (message) {
        toast.success(message);
        dispatch(clearMessage());
      }
    };

    handleNotifications();
  }, [error, message]);

  return null; // No UI to render
};

export default CompanyMessage;

