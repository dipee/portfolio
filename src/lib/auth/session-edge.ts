import { SESSION_MAX_AGE_SECONDS } from "@/lib/auth/constants";

function isTokenFresh(issuedAt: string): boolean {
  const issuedAtMs = Number.parseInt(issuedAt, 10);
  if (Number.isNaN(issuedAtMs)) {
    return false;
  }

  const ageSeconds = (Date.now() - issuedAtMs) / 1000;
  return ageSeconds >= 0 && ageSeconds <= SESSION_MAX_AGE_SECONDS;
}

function bytesToBase64Url(bytes: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Edge-compatible verification for middleware (Web Crypto). */
export async function verifySessionTokenEdge(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return false;
  }

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(issuedAt),
  );

  const expected = bytesToBase64Url(signatureBuffer);
  if (!timingSafeEqualStrings(signature, expected)) {
    return false;
  }

  return isTokenFresh(issuedAt);
}
