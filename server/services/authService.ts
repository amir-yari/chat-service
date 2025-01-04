import { type RequestHandler } from "express";
import { admin } from "../server";
import UserModel from "../models/userModel";

const authenticateUser: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    console.log(decodedToken);

    let user = await UserModel.findOne({ firebaseUid: decodedToken.uid })
      .populate("contacts", "firstName lastName username email profileImage")
      .exec();

    if (!user) {
      user = await UserModel.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        firstName: firstname,
        lastName: lastname,
      });
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export default authenticateUser;
