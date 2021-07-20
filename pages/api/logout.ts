import { NextApiRequest, NextApiResponse } from "next";
import { unsetAuthCookies } from "next-firebase-auth";
import initAuth from "utils/initAuth";

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ message: "Unexpected error" });
  }
  return res.status(200).json({ message: "Logged out" });
};

export default handler;
