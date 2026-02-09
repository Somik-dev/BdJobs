import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import deleteFile from "../../../../../../middleware/deleteFile";
import uploadFile from "../../../../../../middleware/upload";
import { User } from "../../../../../../model/User";
import CheckAuth from "../../../../../../middleware/isAuth";

export async function POST(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json({ message: "Please Login" }, { status: 400 });
    }

    const loggedInUser = await User.findById(user._id);

    const formData = await req.formData();
    const resume = formData.get("resume");

    if (!resume) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // delete old resume
    if (loggedInUser.resume) {
      const oldUrl = loggedInUser.resume;
      const parts = oldUrl.split('/');
      const fileNameWithExt = parts[parts.length - 1];
      const fileNameWithoutExt = fileNameWithExt.split('.')[0];
      const publicId = `jobPortal/${fileNameWithoutExt}`;

      await deleteFile(publicId);
    }

    // upload new resume
    const uploaded = await uploadFile(resume);

    loggedInUser.resume = uploaded.secure_url;
    await loggedInUser.save();

    return NextResponse.json({ message: "Resume Updated", url: uploaded.secure_url });

  } catch (error) {
    console.error("Error in POST /updateResume:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
