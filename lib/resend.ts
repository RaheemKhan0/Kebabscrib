import { Resend } from "resend";

let cached: Resend | null = null;

/* Lazy-initialized Resend client.
   Avoids throwing at module-load time during build / SSG when env vars
   may not be available. */
function getResend(): Resend {
  if (cached) return cached;
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing. Set it in .env.local or your deployment environment.",
    );
  }
  cached = new Resend(process.env.RESEND_API_KEY);
  return cached;
}

const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    const client = getResend() as unknown as Record<string | symbol, unknown>;
    const value = client[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export default resend;
