import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middleware/isAuth";
import { Company } from "../../../../../model/Company";
import uploadFile from "../../../../../middleware/upload";

export async function POST(req){
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

    if(user.role !== "recruiter") {
        return NextResponse.json(
            {
                message: "You are not recruiter"
            },
            {
          status: 400,
          }
        )
    }
  
     const companies = await Company.find({recruiter:user._id});

     if(companies.length === 3) {
        return NextResponse.json(
            {
                message: "You have exceeded the limit of maximum company"
            },
            {
          status: 400,
          }
        )
    }

    const formdata = await req.formData()

    const name = formdata.get("name");
    const description = formdata.get("description");
    const location = formdata.get("location");
    const website = formdata.get("website");
    const logo = formdata.get("logo");
    
    let company = await Company.findOne({ name });

      if(company) {
        return NextResponse.json(
            {
                message: "Company with this name already exists"
            },
            {
          status: 400,
           }
        )
      }

      let companyLogo = "";

      if(logo) {
        companyLogo = await uploadFile(logo)
      }

      company = await Company.create({
        name,
        description,
        location,
        logo: companyLogo.url,
        website,
        recruiter: user._id
      });

      return NextResponse.json(
        { message: "Company created successfully", company },
        { status: 201 }
      );

  
    } catch (error) {
         console.error("GET /api/company/all error:", error);
            return NextResponse.json(
              { message: "Internal Server Error", error: error.message },
              { status: 500 }
            );
    }
}