const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suniveralogisticsltd.com";

const canonicalUrl = new URL(configuredUrl);

if (canonicalUrl.hostname === "suniveralogisticsltd.com") {
  canonicalUrl.hostname = "www.suniveralogisticsltd.com";
}

export const siteUrl = canonicalUrl.toString().replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  new URL(path, `${siteUrl}/`).toString();

export const companyName = "Sunivera Logistics Limited";
