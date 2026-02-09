"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Delete, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AddSkill, removeSkill } from "@/redux/action/user";

const Skill = ({ user, btnLoading }) => {
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch();

  const addSkillHandler = () => {
    if (skill.trim() === "") {
      return toast.error("Please enter a skill");
    }
    dispatch(AddSkill(skill));
    setSkill("");
  };

  const removeSkillHandler = (skillToRemove) => {
    toast("Are you sure you want to remove this skill?", {
      description: skillToRemove,
      action: {
        label: "Delete",
        onClick: () => dispatch(removeSkill(skillToRemove)),
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  const itemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full shadow-sm mt-3 py-3 md:px-10 px-3 dark:bg-gray-800 dark:text-white">
        <div className="flex gap-8 flex-wrap items-center">
          <CardTitle>Skills</CardTitle>

          <Input
            type="text"
            placeholder="Add Skills"
            className="md:w-[30%]"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          <Button disabled={btnLoading} onClick={addSkillHandler}>
            Add <Plus size={18} className="ml-2" />
          </Button>
        </div>

        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <AnimatePresence>
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((item) => (
                  <motion.p
                    key={item}
                    layout
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="p-3 border border-gray-400 rounded-lg flex justify-center items-center gap-2"
                  >
                    {item}
                    <Button
                      disabled={btnLoading}
                      className="w-8 h-8 text-red-600"
                      onClick={() => removeSkillHandler(item)}
                    >
                      <Delete size={18} />
                    </Button>
                  </motion.p>
                ))
              ) : (
                <CardDescription>No skills yet</CardDescription>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skill;

