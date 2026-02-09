import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { User } from "../../../../../../model/User";
import CheckAuth from "../../../../../../middleware/isAuth";

export async function DELETE(req) {
  try {
    await connectDb();

    // ✅ Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const user = await CheckAuth(token);
    if (!user) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }

    // ✅ Read body data for DELETE method (since we aren't using query params)
    const { skill } = await req.json();
    if (!skill) {
      return NextResponse.json({ message: "Skill is required" }, { status: 400 });
    }

    const loggedInUser = await User.findById(user._id);
    if (!Array.isArray(loggedInUser.skills)) {
      return NextResponse.json({ message: "Invalid skill list" }, { status: 400 });
    }

    const index = loggedInUser.skills.indexOf(skill);
    if (index === -1) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    loggedInUser.skills.splice(index, 1);
    await loggedInUser.save();

    return NextResponse.json({ message: "Skill removed" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

