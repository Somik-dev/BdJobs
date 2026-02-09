"use client";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePhoto, updateProfiler, updateResume } from "@/redux/action/user";
import { Edit, Mail, NotepadText, Phone } from "lucide-react";

const Info = ({ user, btnLoading }) => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  const editRef = useRef();

  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const handleClick = () => inputRef.current?.click();

  const handleEditClick = () => {
    editRef.current?.click();
    setName(user.name);
    setPhone(user.phoneNumber);
    setBio(user.bio);
  };

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);
      dispatch(updatePhoto(formData));
    }
  };

  const updateProfile = (e) => {
    dispatch(updateProfiler(name,phoneNumber,bio));
  }

  const resumeRef = useRef();

  const resumeClick = () => {
    resumeRef.current?.click();
  }

  const changeResume = (e) => {
     const file = e.target.files[0];
     if(file){
      if(file.type !== "application/pdf"){
        alert('please uplaod pdf file')
        return;
      }
      const formdata = new FormData();
      formdata.append("resume",file);
      dispatch(updateResume(formdata));
     }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-6"
    >
      <Card className="w-full shadow-sm py-6 px-4 md:px-10 flex flex-col md:flex-row gap-8 items-center md:items-start dark:bg-gray-800 dark:text-white">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={user.profilePic}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />

          <motion.div whileHover={{ scale: 1.03 }}>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClick}
              className="gap-1 dark:bg-gray-700"
            >
              <Edit size={16} />
              Change Photo
            </Button>
          </motion.div>

          <Input
            type="file"
            className="hidden"
            accept="image/*"
            ref={inputRef}
            onChange={changeHandler}
          />
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 space-y-4"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <Button size="icon" variant="ghost" onClick={handleEditClick}>
              <Edit size={18} />
            </Button>
          </div>

          {user.role === "jobseeker" && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Bio:</strong> {user.bio}
            </p>
          )}

          <div>
            <h3 className="text-xl text-blue-600 dark:text-blue-400 font-medium">
              Contact Info
            </h3>
            <div className="mt-2 flex flex-col sm:flex-row gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>{user.phoneNumber}</span>
              </div>
            </div>
          </div>

          {user.role === "jobseeker" && user.resume && (
            <div className="mt-4">
              <p className="flex items-center gap-2">
                Resume -{" "}
                <Link
                  href={user.resume}
                  target="_blank"
                  className="text-blue-500 underline flex items-center gap-1"
                >
                  <NotepadText size={18} />
                  View Resume
                </Link>
                <Button 
                onClick={resumeClick}
                variant="link"
                ><Edit size={18}/>
                </Button>
                <Input
                 type="file"
                 ref={resumeRef}
                 className="hidden"
                 accept="application/pdf"
                 onChange={changeResume}
                />
              </p>
            </div>
          )}
        </motion.div>
      </Card>

      {/* Edit Dialog */}
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" ref={editRef} className="hidden">
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6"
            >
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button disabled={btnLoading} onClick={updateProfile} type="submit">Save changes</Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </form>
      </Dialog>
    </motion.div>
  );
};

export default Info;
