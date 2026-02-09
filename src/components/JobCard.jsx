"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Briefcase, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ApplyForJob } from "@/redux/action/job";

const JobCard = ({ job }) => {
  const { user } = useSelector((state) => state.user);
  const { btnLoading, applications } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [applied, setApplied] = useState(false);

  const applyHandler = () => {
    dispatch(ApplyForJob(job._id));
  };

  useEffect(() => {
    if (applications && job._id) {
      applications.forEach((item) => item.job === job._id && setApplied(true));
    }
  }, [applications, job._id]);

  return (
    <Card className="w-[350px] hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {job.title}
            </CardTitle>
          </div>
          <Link href={`/company/${job.company}`}>
            <img
              src={job.comapnyLogo} 
              alt="company"
              className="rounded-full w-14 h-14 object-cover border border-gray-200"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4 mt-3 text-gray-600">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {job.experience === 0 ? "Fresher" : `${job.experience} Yrs`}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </div>
        </div>
        <p className="mt-2 text-gray-700 font-medium">$ {job.salary} P.A</p>
      </CardHeader>

      <CardContent className="text-gray-600 text-sm mt-2">
        {job.description.slice(0, 100)}...
      </CardContent>

      <CardFooter className="flex justify-between items-center mt-4">
        <Link href={`/jobs/${job._id}`}>
          <Button variant="outline" className="px-4 py-2">
            View Detail
          </Button>
        </Link>

        {user && user.role === "jobseeker" && (
          <>
            {applied ? (
              <span className="text-green-500 font-semibold">Already Applied</span>
            ) : job.status === "closed" ? null : (
              <Button
                onClick={applyHandler}
                disabled={btnLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
              >
                Easy Apply
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;