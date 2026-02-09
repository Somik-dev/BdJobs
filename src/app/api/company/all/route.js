import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import checkAuth from "../../../../../middleware/isAuth";
import { Company } from "../../../../../model/Company";

export async function GET(req) {
  try {
    // 1️ Connect to Database
    await connectDb();

    //  Extract token from query params
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token || token === "undefined") {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    // Authenticate user
    let user;
    try {
      user = await checkAuth(token);
    } catch (err) {
      console.error("❌ checkAuth error:", err.message);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }


    //Fetch recruiter’s companies
    const companies = await Company.find({ recruiter: user._id });

    return NextResponse.json(companies, { status: 200 });

  } catch (error) {
    //Global error handler
    console.error("💥 GET /api/company/all error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
