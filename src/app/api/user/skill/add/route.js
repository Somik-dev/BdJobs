import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { User } from "../../../../../../model/User";
import CheckAuth from "../../../../../../middleware/isAuth";


export async function POST(req) {
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

    const loggedInUser = await User.findById(user._id);
    const { skill } = await req.json();

    if (
      loggedInUser.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
    ) {
      return NextResponse.json({ message: "Skill already added" }, { status: 400 });
    }

    loggedInUser.skills.push(skill);
    await loggedInUser.save();

    return NextResponse.json({ message: "Skill added" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
