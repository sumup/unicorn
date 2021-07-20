import { NextApiRequest } from "utils/types";

const getAbsoluteURL = (url: string, req?: NextApiRequest) => {
  let host;
  if (req) {
    host = req.headers.host;
  } else {
    if (typeof window === "undefined") {
      throw new Error(
        'The "req" parameter must be provided if on the server side.'
      );
    }
    host = window.location.host;
  }
  const isLocalhost = host && host.indexOf("localhost") === 0;
  const protocol = isLocalhost ? "http" : "https";
  return `${protocol}://${host}${url}`;
};

export default getAbsoluteURL;
