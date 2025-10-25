import { RequestHandler } from "types/handler";
import { issuers, subject } from "config";

export default (async () => {
  return {
    links: issuers,
    subject,
  };
}) satisfies RequestHandler;
