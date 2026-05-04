require('dotenv').config({ path: '.env.local' });

async function test() {
  let config = null;
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    config = { url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN };
  } else if (process.env.REDIS_URL) {
    try {
      const parsed = new URL(process.env.REDIS_URL);
      const token = parsed.password;
      const host = parsed.hostname;
      config = { url: `https://${host}`, token };
    } catch (e) {
      console.error("Failed to parse REDIS_URL", e);
    }
  }

  if (!config) {
    console.log("No config found.");
    return;
  }

  console.log("Config:", { url: config.url, tokenLength: config.token?.length });

  const url = `${config.url}/get/test`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${config.token}` }
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data:", data);
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

test();
