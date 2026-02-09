"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/action/user";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return null;
};

export default AuthLoader;


