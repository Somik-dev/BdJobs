"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; 
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCompany, deleteCompany } from "@/redux/action/company";
import { DeleteIcon, Eye, Plus } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Company = () => {
  const { companies, btnLoading, loading } = useSelector(
    (state) => state.company
  );

  const addRef = useRef();

  const openDialog = () => {
    addRef.current.click();
  };

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [website, setwebsite] = useState("");
  const [location, setlocation] = useState("");
  const [logo, setlogo] = useState("");

  const dispatch = useDispatch();

  const clearData = () => {
    setname("");
    setdescription("");
    setwebsite("");
    setlocation("");
    setlogo("");
  };

  const addCompanyHander = () => {
   if (!name || !description || !location || !website || !logo) {
  toast.error("Please provide all company details.");
  return;
}

    const fromdata = new FormData();

    fromdata.append("name", name);
    fromdata.append("description", description);
    fromdata.append("website", website);
    fromdata.append("location", location);
    fromdata.append("logo", logo);

    dispatch(addCompany(fromdata, clearData));
  };

  const deleteHandler = (id) => {
  toast("Are you sure you want to delete this company?", {
    action: {
      label: "Yes, Delete",
      onClick: () => {
        dispatch(deleteCompany(id)); 
        toast.success("Company deleted");
      },
    },
    cancel: {
      label: "Cancel",
    },
  });

  


};

  return (
    <div>
  {loading ? (
    <Loading />
  ) : (
    <div>
      <Card className="w-full shadow-sm mt-3 py-3 md:px-10 px-3">
        <div className="flex justify-between gap-8 flex-wrap items-center">
          <CardTitle>Company</CardTitle>

          {companies && companies.length === 3 ? null : (
            <Button onClick={openDialog}>
              Add Company <Plus size={18} />
            </Button>
          )}

          <div className="w-full overflow-x-auto mt-4">
            <table className="min-w-full text-left table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Logo</th>
                  <th className="px-4 py-2 border">View</th>
                  <th className="px-4 py-2 border">Delete</th>
                </tr>
              </thead>

              <tbody>
                {companies && companies.length > 0 ? (
                  companies.map((e) => (
                    <tr key={e._id}>
                      <td className="px-4 py-2 border">{e.name}</td>
                      <td className="px-4 py-2 border">
                        <img src={e.logo} alt="" className="w-10 rounded-full" />
                      </td>
                      <td className="px-4 py-2 border">
                        <Link href={`/company/${e._id}`}>
                          <Button variant="secondary">
                            <Eye />
                          </Button>
                        </Link>
                      </td>
                      <td className="px-4 py-2 border">
                        <Button
                          onClick={() => deleteHandler(e._id)}
                          variant="destructive"
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 text-center border">
                      <CardDescription>NO Companies Yet</CardDescription>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Dialog for Adding Company */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={addRef} className="hidden" />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Company</DialogTitle>
            <DialogDescription>Fill in the details below:</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Name</Label>
              <Input
                type="text"
                className="col-span-3"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Description</Label>
              <Input
                type="text"
                className="col-span-3"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>

            {/* Website */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Website</Label>
              <Input
                type="text"
                className="col-span-3"
                value={website}
                onChange={(e) => setwebsite(e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Location</Label>
              <Input
                type="text"
                className="col-span-3"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>

            {/* Logo */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                className="col-span-3"
                onChange={(e) => setlogo(e.target.files[0])}
              />
            </div>
          </div>

          <DialogFooter>
            <Button disabled={btnLoading} onClick={addCompanyHander}>
              Add Company
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )}
</div>
  );
};

export default Company;