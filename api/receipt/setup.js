const bcrypt = require("bcryptjs");
const { query } = require("./_db");
const { readJson, sendJson, normalizeText } = require("./_utils");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const setupToken = process.env.SETUP_TOKEN;
  if (!setupToken) {
    sendJson(res, 500, { error: "SETUP_TOKEN is not configured." });
    return;
  }

  try {
    const body = await readJson(req);
    const token = normalizeText(body.token);
    const username = normalizeText(body.username);
    const password = normalizeText(body.password);

    if (token !== setupToken) {
      sendJson(res, 401, { error: "Invalid setup token." });
      return;
    }

    if (!username || !password) {
      sendJson(res, 400, { error: "Username and password are required." });
      return;
    }

    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS receiptinfo (
        receipt_id SERIAL PRIMARY KEY,
        receipt_date DATE NOT NULL,
        received_from TEXT NOT NULL,
        company_rep TEXT NOT NULL,
        email_address TEXT NOT NULL,
        in_the_sum_of TEXT NOT NULL,
        being_payment_for TEXT NOT NULL,
        amount_involved TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const passwordHash = await bcrypt.hash(password, 10);
    await query(
      `
        INSERT INTO users (username, password_hash)
        VALUES ($1, $2)
        ON CONFLICT (username)
        DO UPDATE SET password_hash = EXCLUDED.password_hash
      `,
      [username, passwordHash]
    );

    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 500, { error: "Setup failed." });
  }
};
