import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import checkAuth from "../../../../../middleware/isAuth";
import { Job } from "../../../../../model/Job";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const user = await checkAuth(token);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    
    const id = searchParams.get("id");
    const job = await Job.findById(id);

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("GET /api/job/single error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}