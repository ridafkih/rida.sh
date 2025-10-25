import { OPENID_ISSUER_REL } from "./constants";
import { env } from "./env";

const { OIDC_FQDN, OIDC_SUBJECT_EMAIL, COMMA_DELIMITED_APPLICATION_SLUGS } =
  env;

const slugs = COMMA_DELIMITED_APPLICATION_SLUGS.split(",");

export const subject = `acct:${OIDC_SUBJECT_EMAIL}`;
export const issuers = slugs.map((slug) => {
  return {
    href: new URL(`/application/o/${slug}`, `https://${OIDC_FQDN}`).toString(),
    rel: OPENID_ISSUER_REL,
  };
});
