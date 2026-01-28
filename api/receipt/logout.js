const { sendJson } = require("./_utils");
const { clearSessionCookie } = require("./_auth");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  res.setHeader("Set-Cookie", clearSessionCookie());
  sendJson(res, 200, { ok: true });
};
