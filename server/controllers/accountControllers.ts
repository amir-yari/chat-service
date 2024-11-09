// import { RequestHandler } from "express";
// import UserModel from "../models/userModel";

// const getCurrentUser: RequestHandler = async (req, res, next) => {
//   try {
//     const user = await UserModel.findById(req.user)
//       .populate("contacts", "firstName lastName username email profileImage")
//       .exec();

//     return user;
//   } catch (error) {}
// };

// export { getCurrentUser };
