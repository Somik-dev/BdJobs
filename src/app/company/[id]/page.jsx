"use client";

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSingleCompany } from '@/redux/action/company';
import { DeleteIcon, Eye, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddJob, deleteJob } from '@/redux/action/job';

const CampanyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { company, loading } = useSelector((state) => state.company);
  const { user, isAuth } = useSelector((state) => state.user);
 const { jobs, btnLoading } = useSelector((state) => state.job);

  let companyJobs;

  if (jobs) {
    companyJobs = jobs.filter((job) => job.company === id);
  }

  console.log(companyJobs);


  const [open, setOpen] = useState(false);

  /* -------------------- AUTH -------------------- */
    useEffect(() => {
      if (isAuth === false) router.push("/login");
    }, [isAuth, router]);

  useEffect(() => {
    if (id) dispatch(getSingleCompany(id));
  }, [id, dispatch]);

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [openings, setOpenings] = useState("");

const clearInput = () => {
    setTitle("");
    setDescription("");
    setRole("");
    setSalary("");
    setExperience("");
    setLocation("");
    setOpenings("");
  };

  const addJobHandler = () => {
    dispatch(
      AddJob(
        id,
        title,
        description,
        role,
        salary,
        experience,
        location,
        openings,
        clearInput
      )
    );
  };

   const deleteHandler = (id) => {
    if (confirm("are you sure you want to delete this job"))
      dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? <Loading /> : company && (
        <>
          {/* Company Info */}
          <div className="container px-5 pt-14 mx-auto flex flex-col text-center">
            <img
              src={company.logo}
              className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 mx-auto mb-10 rounded border"
              alt=""
            />
            <h1 className="text-xl font-medium">{company.name}</h1>
            <p className="lg:w-1/2 mx-auto">{company.description}</p>

            <Link href={company.website} target="_blank" className="mt-6">
              <Button>Visit Website</Button>
            </Link>
          </div>

          {/* Jobs Section */}
          <div className="md:w-2/3 mx-auto px-5 mt-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">All jobs</h1>

              {user?._id === company.recruiter && (
                <Button onClick={() => setOpen(true)}>
                  Add <Plus size={18} />
                </Button>
              )}
            </div>

            <Table className="mt-4">
              <TableCaption>All the jobs offered by this company</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Openings</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
               <TableBody>
                {companyJobs && companyJobs.map((job)=> (
                  <TableRow key={job._id}>
                           <TableCell className="font-medium">
                              <div className='flex items-center gap-2'>
                                 {job.title} {" "}
                                 <Link href={`/jobs/${job._id}`}>
                                  <Eye/>
                                 </Link>
                              </div>
                           </TableCell>
                           <TableCell>${job.salary}</TableCell>
                            <TableCell>{job.openings} openings</TableCell>
                             <TableCell className="text-green-500 flex items-center justify-center gap-3">
                              {job.status}{" "}
                              {user && user._id === company.recruiter && (
                               <Button
                                  onClick={() => deleteHandler(job._id)}
                                  variant="destructive"
                                  disabled={btnLoading}
                                >
                                  <DeleteIcon size={18} />
                                </Button>
                              )}
                            </TableCell>
                  </TableRow>
                ))}
               </TableBody>
            </Table>

            
          </div>

          {/* Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a Job</DialogTitle>
                <DialogDescription>
                  Please add a valid job. Fake jobs may result in action.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <Input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
                <Input type="number" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
                <Input type="number" placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} />
                <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
                <Input type="number" placeholder="Openings" value={openings} onChange={e => setOpenings(e.target.value)} />
              </div>

              <DialogFooter>
                <Button onClick={addJobHandler}>Add Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default CampanyPage;
