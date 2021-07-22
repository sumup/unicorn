import { verifyIdToken, getFirebaseAdmin } from 'next-firebase-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSnapshot } from '@firebase/database-types';

async function auth(req: NextApiRequest): Promise<{
  status: number;
  message: string;
}> {
  if (!(req.headers && req.headers.authorization)) {
    return { status: 400, message: 'Missing auth header' };
  }
  const token = req.headers.authorization;
  try {
    await verifyIdToken(token);
  } catch (error) {
    return { status: 403, message: 'Unauthorized' };
  }
  return { status: 200, message: 'Authed' };
}

async function getClaps(): Promise<{
  status: number;
  data: DataSnapshot | { message: string };
}> {
  try {
    const db = getFirebaseAdmin().database();
    const data = await db.ref('interactions').get();
    return { status: 201, data };
  } catch (error) {
    return { status: 500, data: { message: "Couldn't save the merchant" } };
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  const { status, message } = await auth(req);
  if (status !== 200) {
    return res.status(status).json({ message });
  }

  if (req.method === 'GET') {
    const getMerchantResponse = await getClaps();
    if (getMerchantResponse.status !== 200) {
      return res
        .status(getMerchantResponse.status)
        .json({ data: getMerchantResponse.data });
    }
    return getMerchantResponse.data;
  }

  return res.end();
};

export default handler;
