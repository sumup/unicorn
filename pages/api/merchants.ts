import { verifyIdToken, getFirebaseAdmin } from "next-firebase-auth";
import type { NextApiRequest, NextApiResponse } from "next";

async function auth(req: NextApiRequest): Promise<{
  status: number;
  message: string;
}> {
  if (!(req.headers && req.headers.authorization)) {
    return { status: 400, message: "Missing auth header" };
  }
  const token = req.headers.authorization;
  try {
    await verifyIdToken(token);
  } catch (error) {
    return { status: 403, message: "Unauthorized" };
  }
  return { status: 200, message: "Authed" };
}

async function getMerchants(
  req: NextApiRequest
): Promise<{ status: number; data: any }> {
  try {
    const db = getFirebaseAdmin().database();
    const data = await db.ref("merchants").get();
    return { status: 201, data };
  } catch (error) {
    return { status: 500, data: { message: "Couldn't save the merchant" } };
  }
}

async function createMerchant(
  req: NextApiRequest
): Promise<{ status: number; message: string }> {
  // validate payload
  if (!req.body) {
    return { status: 400, message: "Invalid payload" };
  }
  // save in Firebase
  try {
    const db = getFirebaseAdmin().database();
    await db.ref("lastCalled").set({
      timestamp: Date.now(),
    });
    return { status: 201, message: "Merchant created" };
  } catch (error) {
    return { status: 500, message: "Couldn't save the merchant" };
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, message } = await auth(req);
  if (status !== 200) {
    return res.status(status).json({ message });
  }

  if (req.method === "GET") {
    const { status, data } = await getMerchants(req);
    if (status !== 200) {
      return res.status(status).json({ data });
    }
    return data;
  }

  if (req.method === "POST") {
    const { status, message } = await createMerchant(req);
    if (status !== 201) {
      return res.status(status).json({ message });
    }
    return res.status(status).end();
  }
};

export default handler;
