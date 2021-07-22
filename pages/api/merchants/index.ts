import { verifyIdToken, getFirebaseAdmin } from 'next-firebase-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSnapshot } from '@firebase/database-types';
import { Merchant } from 'utils/types';

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

async function getMerchants(): Promise<{
  status: number;
  data: DataSnapshot | { message: string };
}> {
  try {
    const db = getFirebaseAdmin().database();
    const data = await db.ref('merchants').get();
    return { status: 201, data };
  } catch (error) {
    return { status: 500, data: { message: "Couldn't save the merchant" } };
  }
}

async function createMerchant(
  req: NextApiRequest,
): Promise<{ status: number; message: string }> {
  // validate payload
  if (!req.body) {
    return { status: 400, message: 'Invalid payload' };
  }
  // save in Firebase
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const merchant: Merchant = JSON.parse(req.body);
    const db = getFirebaseAdmin().database();
    await db.ref('merchants').push().set(merchant);
    return { status: 201, message: 'Merchant created' };
  } catch (error) {
    return { status: 500, message: "Couldn't save the merchant" };
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
    const getMerchantResponse = await getMerchants();
    if (getMerchantResponse.status !== 200) {
      return res
        .status(getMerchantResponse.status)
        .json({ data: getMerchantResponse.data });
    }
    return getMerchantResponse.data;
  }

  if (req.method === 'POST') {
    const createMerchantResponse = await createMerchant(req);
    if (createMerchantResponse.status !== 201) {
      return res
        .status(createMerchantResponse.status)
        .json({ message: createMerchantResponse.message });
    }
    return res.status(createMerchantResponse.status).end();
  }

  return res.end();
};

export default handler;
