import { IncomingMessage } from 'http';

import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

// we need to use this custom NextApiRequest type to match next-firebase-auth
export type NextApiRequest = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export type Comment = {
  id: string;
  dateAdded: number;
  comment: string;
  user: {
    displayName: string;
    id: string;
    photoUrl: string;
  };
};

export type Merchant = {
  address: {
    place_name: string;
  };
  category: string;
  description: string;
  imageUrl?: string;
  name: string;
  phone?: string;
  links?: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
  comments?: Record<string, Comment>;
};

export type Clap = {
  userId: string;
  merchantId: string;
  type: 'clap';
};
