"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Save, SaveOff } from "lucide-react";

import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ApplyForJob,
  applicationofjob,
  getsingleJobs,
  saveJob,
  updateJob,
  updateStatus,
} from "@/redux/action/job";

const Jobpage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const updateRef = useRef(null);

  const { job, loading, btnLoading, applications, applicationOfJob } =
    useSelector((state) => state.job);

  const { user, isAuth } = useSelector((state) => state.user);

  /* ---------- AUTH ---------- */
  useEffect(() => {
    if (isAuth === false) router.replace("/login");
  }, [isAuth, router]);

  /* ---------- FETCH JOB ---------- */
  useEffect(() => {
    if (id) dispatch(getsingleJobs(id));
  }, [id, dispatch]);

  /* ---------- SAVE JOB ---------- */
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(user?.savedJobs?.includes(id));
  }, [user, id]);

  const saveJobHandler = () => {
    setSaved((prev) => !prev);
    dispatch(saveJob(id));
  };

  /* ---------- APPLY JOB ---------- */
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(
      applications?.some((a) => a.job?.toString() === id)
    );
  }, [applications, id]);

  const applyHandler = () => {
    dispatch(ApplyForJob(id));
  };

  /* ---------- UPDATE JOB ---------- */
  const [form, setForm] = useState({
    title: "",
    description: "",
    role: "",
    salary: "",
    experience: "",
    location: "",
    openings: "",
    status: "open",
  });

  const clickUpdate = () => {
    updateRef.current.click();
    setForm({ ...job });
  };

  const updateJobHandler = () => {
    dispatch(
      updateJob(
        id,
        form.title,
        form.description,
        form.role,
        form.salary,
        form.experience,
        form.location,
        form.openings,
        form.status,
        clickUpdate
      )
    );
  };

  /* ---------- APPLICATIONS ---------- */
  useEffect(() => {
    if (user?.role === "recruiter" && id) {
      dispatch(applicationofjob(id));
    }
  }, [id, user, dispatch]);

  const updateApplicationHandler = (appId, status) => {
    if (!status) return;
    dispatch(updateStatus(appId, id, status));
  };

  if (loading) return <Loading />;

  return (
    <main className="container mx-auto px-4 py-10">
      {job && (
        <article className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Job Content */}
          <section className="md:col-span-2">
            <header>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {job.title}
              </h1>

              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} /> {job.location}
              </p>
            </header>

            <div className="mt-6 space-y-2">
              <p><strong>Salary:</strong> ${job.salary}</p>
              <p><strong>Openings:</strong> {job.openings}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    job.status === "open"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {job.status}
                </span>
              </p>
            </div>

            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Job Description
              </h2>
              <p className="leading-relaxed">{job.description}</p>
            </section>
          </section>

          {/* Actions */}
          <aside className="md:sticky md:top-20 space-y-4">
            {user?._id?.toString() === job.recruiter?.toString() && (
              <Button onClick={clickUpdate} className="w-full">
                Update Job
              </Button>
            )}

            {user?.role === "jobseeker" && (
              <>
                <Button
                  onClick={saveJobHandler}
                  variant="outline"
                  className="w-full"
                >
                  {saved ? (
                    <>Unsave <SaveOff size={16} /></>
                  ) : (
                    <>Save <Save size={16} /></>
                  )}
                </Button>

                {applied ? (
                  <p className="text-green-500 text-center">
                    Already Applied
                  </p>
                ) : (
                  job.status === "open" && (
                    <Button
                      onClick={applyHandler}
                      disabled={btnLoading}
                      className="w-full"
                    >
                      Easy Apply
                    </Button>
                  )
                )}
              </>
            )}
          </aside>
        </article>
      )}

      {/* Applications (Recruiter) */}
      {user?._id?.toString() === job?.recruiter?.toString() && (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">
            Job Applications
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applicationOfJob?.map((app) => (
                <TableRow key={app._id}>
                  <TableCell>
                    {app.applicant?.name || "User deleted"}
                  </TableCell>

                  <TableCell>
                    {app.applicant?.resume ? (
                      <Link
                        href={app.applicant.resume}
                        target="_blank"
                        className="text-primary underline"
                      >
                        View Resume
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">
                        No resume
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <select
                      className="border rounded px-2 py-1"
                      onChange={(e) =>
                        updateApplicationHandler(
                          app._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="">Update</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {/* Update Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={updateRef} className="hidden" />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Job</DialogTitle>
          </DialogHeader>

          {Object.keys(form).map((key) => (
            <div
              key={key}
              className="grid grid-cols-4 gap-3 items-center"
            >
              <Label className="capitalize">{key}</Label>
              <Input
                className="col-span-3"
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            </div>
          ))}

          <DialogFooter>
            <Button onClick={updateJobHandler} disabled={btnLoading}>
              Update Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Jobpage;
