import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppliedJobs = ({ jobs }) => {
  return (
    <div className="container px-5 mt-3 mb-5 mx-auto flex flex-wrap flex-col">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-3xl">Your All Applied Jobs</h1>
      </div>

      <div className="jobs w-[90%] md:w-full">
        <Table>
          <TableCaption>Applied Jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs?.map((e) => (
              <TableRow key={e._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {e.job?.title || e.jobName || "Job removed"}

                    {e.job?._id && (
                      <Link
                        href={`/jobs/${e.job._id}`}
                        className="text-blue-600 hover:opacity-80"
                      >
                        <Eye size={18} />
                      </Link>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  ₹{e.job?.salary || e.jobSalary}
                </TableCell>

                <TableCell>
                  {e.status === "pending" && (
                    <p className="text-yellow-500">{e.status}</p>
                  )}
                  {e.status === "accepted" && (
                    <p className="text-green-500">{e.status}</p>
                  )}
                  {e.status === "rejected" && (
                    <p className="text-red-500">{e.status}</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobs;
