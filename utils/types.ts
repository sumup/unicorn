import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

// we need to use this custom NextApiRequest type to match next-firebase-auth
export type NextApiRequest = IncomingMessage & {
  cookies: NextApiRequestCookies;
};
