import { extractDomainParts } from "@/data/domain-tlds";

export interface URLComponents {
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  origin?: string;
  tld?: string;
  subdomain?: string;
  domain?: string;
  queryParams?: Record<string, string>;
  isTldKnown?: boolean;
}

interface ParseURLResult {
  success: boolean;
  components: URLComponents;
  error?: string;
}

export const KNOWN_PROTOCOLS_REGEX =
  /^(https?|ftp|file|mailto|tel|irc|ircs|ssh|sftp|ldap|ldaps|news|nntp|rtsp|sip|sips|xmpp|ws|wss|git|svn|magnet|data):\/?\/?/i;

export function parseURL(inputUrl: string): ParseURLResult {
  try {
    if (!inputUrl.trim()) {
      return { success: true, components: {} };
    }

    let urlToParse = inputUrl.trim();

    if (!KNOWN_PROTOCOLS_REGEX.test(urlToParse)) {
      urlToParse = `https://${urlToParse}`;
    }

    const url = new URL(urlToParse);
    const { tld, domain, subdomain, isTldKnown } = extractDomainParts(
      url.hostname
    );

    const queryParams: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    const components: URLComponents = {
      protocol: url.protocol.slice(0, -1),
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: url.pathname,
      search: url.search || undefined,
      hash: url.hash || undefined,
      origin: url.origin,
      tld: tld || undefined,
      domain: domain || undefined,
      subdomain: subdomain || undefined,
      queryParams:
        Object.keys(queryParams).length > 0 ? queryParams : undefined,
      isTldKnown: tld ? isTldKnown : undefined,
    };

    const cleanComponents = Object.fromEntries(
      Object.entries(components).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    ) as URLComponents;

    return { success: true, components: cleanComponents };
  } catch {
    return { success: false, components: {}, error: "Invalid URL format" };
  }
}
