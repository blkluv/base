import { createThirdwebClient } from "thirdweb";

// The "NEXT_PUBLIC_" prefix allows this to be read by the browser
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  // This ensures you don't accidentally deploy without an ID
  throw new Error("Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID in .env or Vercel settings");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
