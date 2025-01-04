import { RequestHandler } from "express";

const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    // @ts-ignore
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
};

export { getCurrentUser };
