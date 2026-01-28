const { sendJson } = require("./_utils");
const { getSession } = require("./_auth");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const session = getSession(req);
  if (!session) {
    sendJson(res, 401, { error: "Not authenticated." });
    return;
  }

  sendJson(res, 200, { ok: true, user: { username: session.username } });
};
