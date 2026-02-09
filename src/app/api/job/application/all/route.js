import { connectDb } from "@/connectDb";
import CheckAuth from "../../../../../../middleware/isAuth";
import { NextResponse } from "next/server";
import { Application } from "../../../../../../model/Application";

export async function GET(req) {
  try {
    await connectDb(); // 

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token missing" },
        { status: 401 }
      );
    }

    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json(
        { message: "Please login" },
        { status: 401 }
      );
    }

    const applications = await Application.find({
      applicant: user._id,
    })
      .populate("applicant", "name resume")
      .populate("job", "title salary location")
      .sort({ createdAt: -1 });

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("GET applications error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
