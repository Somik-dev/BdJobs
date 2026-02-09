"use client";
import React from "react";
import { useSelector } from "react-redux";
import Info from "./(component)/Info";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";
import { motion, AnimatePresence } from "framer-motion";
import Skill from "./(component)/Skill";
import { useState, useEffect } from "react";
import Company from "./(component)/Company";
import SavedJob from "./(component)/SavedJob";
import AppliedJobs from "./(component)/AppliedJobs";
import { useRouter } from "next/navigation";

const Account = () => {

   const router = useRouter();
  const { isAuth, user, btnLoading, loading } = useSelector(
    (state) => state.user
  );
  
  const { jobs, applications } = useSelector((state) => state.job);

/* -------------------- AUTH -------------------- */
  useEffect(() => {
    if (isAuth === false) router.push("/login");
  }, [isAuth, router]);

  const [savedJobs, setsavedJobs] = useState([]);

  useEffect(() => {
    if (jobs && user && Array.isArray(jobs) && Array.isArray(user.savedJobs)) {
      const savedJobArray = jobs.filter((job) =>
        user.savedJobs.includes(job._id)
      );
      setsavedJobs(savedJobArray);
    }
  }, [jobs, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AnimatePresence mode="wait">
          {user && (
            <motion.div
              key="account-info"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-[90%] md:w-[60%] m-auto"
            >
              <Info user={user} btnLoading={btnLoading} />
              {user.role === "jobseeker" && (
                <Skill user={user} btnLoading={btnLoading}/>
              )}
              {user.role === "recruiter" && (
                  <Company />
              )}
              {user.role === "jobseeker" && <SavedJob savedJobs={savedJobs} />}
              {user.role === "jobseeker" && <AppliedJobs jobs={applications} />}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default Account;

