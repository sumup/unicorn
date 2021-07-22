import { verifyIdToken, getFirebaseAdmin } from 'next-firebase-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DataSnapshot } from '@firebase/database-types';

type GetMerchantRequest = Omit<NextApiRequest, 'query'> & {
  query: { id: string };
};

async function auth(req: GetMerchantRequest): Promise<{
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

async function getMerchant(req: GetMerchantRequest): Promise<DataSnapshot> {
  if (!req.query.id) {
    throw new Error('Missing merchant ID');
  }
  try {
    const merchantId = req.query.id;
    const db = getFirebaseAdmin().database();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const data = await db.ref('merchants').child(merchantId).get();
    if (!data.exists()) {
      throw new Error('Merchant ot found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data.val();
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

const handler = async (
  req: GetMerchantRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { status, message } = await auth(req);
  if (status !== 200) {
    return res.status(status).json({ message });
  }

  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Method not allowed' });
  }

  try {
    const data = await getMerchant(req);
    return res.status(200).json(data);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
