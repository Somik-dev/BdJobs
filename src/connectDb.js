import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.Mongo_url,{
            dbName:"JobPortal"
        });
        console.log("MongoDb Connected!")
    } catch (error) {
        console.log(error)
    }
}