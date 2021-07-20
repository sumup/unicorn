import { NextApiRequest, NextApiResponse } from "next";
import { unsetAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { ApiResponse } from "../../utils/types";

initAuth();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: "error", message: "Unexpected error" });
  }
  return res.status(200).json({ status: "success", message: "Logged out" });
};

export default handler;
