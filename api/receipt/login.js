const bcrypt = require("bcryptjs");
const { query } = require("./_db");
const { readJson, sendJson, normalizeText } = require("./_utils");
const { signSession, sessionCookie } = require("./_auth");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const body = await readJson(req);
    const username = normalizeText(body.username);
    const password = normalizeText(body.password);

    if (!username || !password) {
      sendJson(res, 400, { error: "Username and password are required." });
      return;
    }

    const result = await query(
      "SELECT id, username, password_hash FROM users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];
    if (!user) {
      sendJson(res, 401, { error: "Invalid credentials." });
      return;
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      sendJson(res, 401, { error: "Invalid credentials." });
      return;
    }

    const token = signSession({ sub: user.id, username: user.username });
    res.setHeader("Set-Cookie", sessionCookie(token));
    sendJson(res, 200, { ok: true, user: { username: user.username } });
  } catch (error) {
    sendJson(res, 500, { error: "Login failed." });
  }
};
