import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middleware/isAuth";
import { User } from "../../../../../model/User";

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

    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized access. Please login." },
        { status: 401 }
      );
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    if (!loggedInUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(loggedInUser);
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

