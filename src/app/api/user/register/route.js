import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { User } from "../../../../../model/User";
import uploadFile from "../../../../../middleware/upload";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDb();

    const formdata = await request.formData();
    const email = formdata.get("email");
    const name = formdata.get("name");
    const password = formdata.get("password");
    const bio = formdata.get("bio");
    const resume = formdata.get("resume");
    const phoneNumber = formdata.get("phoneNumber");
    const role = formdata.get("role");
    const profilePic = formdata.get("profilePic");

    // Basic validation
    if (!email || !name || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Upload files if provided
    const uploadedPic = profilePic ? await uploadFile(profilePic) : null;
    const uploadedResume = resume ? await uploadFile(resume) : null;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      bio,
      resume: uploadedResume?.url || "",
      profilePic: uploadedPic?.url || "",
    });

    // Sign JWT
    if (!process.env.JWT_SEC) {
      throw new Error("JWT_SEC environment variable is not set.");
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SEC, {
      expiresIn: "8d",
    });

    return NextResponse.json(
      {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          role: newUser.role,
          profilePic: newUser.profilePic,
        },
        message: "User registered successfully",
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /register:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
