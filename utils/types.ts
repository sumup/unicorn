import { IncomingMessage } from 'http';

import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

// we need to use this custom NextApiRequest type to match next-firebase-auth
export type NextApiRequest = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export type Merchant = {
  address: string;
  category: string;
  description: string;
  imageUrl?: string;
  name: string;
  links?: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
};
