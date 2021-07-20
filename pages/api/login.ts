import { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { ApiResponse } from "../../utils/types";

initAuth();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: "error", message: "Unexpected error" });
  }
  return res.status(200).json({ status: "success", message: "Logged in" });
};

export default handler;
