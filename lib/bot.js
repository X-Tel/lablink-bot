const OWNER = String(process.env.OWNER_ID || "");

export async function handleUpdate(u) {
  const m = u?.message;
  if (!m?.text || m.from?.id === undefined || String(m.from.id) !== OWNER) return;
  const chat = m.chat.id, t = m.text.trim().split(/\s+/);
  if (t[0] === "/start") return say(chat, "LabLink ready ⚡\n/link – lab URL\n/setlink <url>\n/status");
  if (t[0] === "/link") return say(chat, "Lab: " + (process.env.LAB_URL || "not set"));
  if (t[0] === "/status") return say(chat, "OK ✅ bot live · owner verified");
}

function say(chatId, text) {
  return fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
