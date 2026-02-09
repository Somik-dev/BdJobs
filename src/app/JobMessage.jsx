"use client";
import { clearError, clearMessage } from "@/redux/reducer/jobReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


const JobMessage = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.job);

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

export default JobMessage;
