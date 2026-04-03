const bcrypt = require("bcryptjs");
const { query } = require("./_db");
const { readJson, sendJson, normalizeText } = require("./_utils");
const { signSession, sessionCookie } = require("./_auth");

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map();

function getClientIP(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now - record.start > WINDOW_MS) {
    return true;
  }
  return record.count < MAX_ATTEMPTS;
}

function recordFailure(ip) {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now - record.start > WINDOW_MS) {
    attempts.set(ip, { count: 1, start: now });
  } else {
    record.count++;
  }
}

function clearFailures(ip) {
  attempts.delete(ip);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const ip = getClientIP(req);
  if (!checkRateLimit(ip)) {
    sendJson(res, 429, {
      error: "Too many login attempts. Please try again in 15 minutes.",
    });
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
      recordFailure(ip);
      sendJson(res, 401, { error: "Invalid credentials." });
      return;
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      recordFailure(ip);
      sendJson(res, 401, { error: "Invalid credentials." });
      return;
    }

    clearFailures(ip);
    const token = signSession({ sub: user.id, username: user.username });
    res.setHeader("Set-Cookie", sessionCookie(token));
    sendJson(res, 200, { ok: true, user: { username: user.username } });
  } catch (error) {
    sendJson(res, 500, { error: "Login failed." });
  }
};
