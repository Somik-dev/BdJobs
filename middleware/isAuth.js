import jwt from "jsonwebtoken";
import { User } from "../model/User";

async function CheckAuth(token) {
  const decodedData = jwt.verify(token, process.env.JWT_SEC);

  const user = await User.findById(decodedData.id);

  return user;
}

export default CheckAuth;