import { verifyIdToken, getFirebaseAdmin } from 'next-firebase-auth';
import type { NextApiRequest, NextApiResponse } from 'next';

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

async function clap(
  req: NextApiRequest,
): Promise<{ status: number; message: string }> {
  // save in Firebase
  try {
    if (!(req.headers && req.headers.authorization)) {
      return { status: 400, message: 'Missing auth header' };
    }
    const token = req.headers.authorization;
    const user = await verifyIdToken(token);
    const merchantId = req.query.id;
    const db = getFirebaseAdmin().database();
    await db.ref('interactions').push().set({
      userId: user.id,
      merchantId,
      type: 'clap',
    });
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

  if (req.method === 'POST') {
    const { status: clapStatus, message: clapMessage } = await clap(req);
    if (clapStatus !== 201) {
      return res.status(clapStatus).json({ message: clapMessage });
    }
    return res.status(clapStatus).end();
  }

  return res.end();
};

export default handler;
