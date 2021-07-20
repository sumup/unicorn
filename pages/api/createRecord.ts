import { verifyIdToken, getFirebaseAdmin } from "next-firebase-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "../../utils/types";

function writeRecord() {
  const db = getFirebaseAdmin().database();
  db.ref("lastCalled").set({
    timestamp: Date.now(),
  });
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  if (!(req.headers && req.headers.authorization)) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing Authorization header value" });
  }
  const token = req.headers.authorization;

  try {
    await verifyIdToken(token);
  } catch (e) {
    return res.status(403).json({ status: "error", message: "Unauthorized" });
  }

  try {
    writeRecord();
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: "error", message: "Can't write record" });
  }

  return res.status(200).json({ status: "success", message: "Record written" });
};

export default handler;
