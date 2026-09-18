export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const userKey = url.searchParams.get("key");
  
  // Секретный персональный ключ (можно переопределить через переменную AUTH_KEY в Cloudflare)
  const VALID_KEY = env.AUTH_KEY || "akz2026";

  if (!userKey || userKey !== VALID_KEY) {
    return new Response("[-] 403 Forbidden: Access Denied. Invalid or missing secret key.\n", {
      status: 403,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }

  // Запрашиваем файл run.ps1 из активов Pages и отдаем его в виде сырого скрипта
  const assetUrl = new URL("/run.ps1", request.url);
  const asset = await env.ASSETS.fetch(assetUrl);
  
  return new Response(await asset.text(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-store, must-revalidate",
      "access-control-allow-origin": "*"
    }
  });
}
