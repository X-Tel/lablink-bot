export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (req.headers["x-telegram-bot-api-secret-token"] !== process.env.WEBHOOK_SECRET) {
    return res.status(403).end();
  }
  res.status(200).end();
  try { await (await import("../lib/bot.js")).handleUpdate(req.body); } catch (_) {}
}
