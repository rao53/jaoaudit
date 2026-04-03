const { query } = require("./_db");
const { readJson, sendJson } = require("./_utils");
const { getSession } = require("./_auth");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const session = getSession(req);
  if (!session) {
    sendJson(res, 401, { error: "Not authenticated." });
    return;
  }

  try {
    const body = await readJson(req);
    const receiptId = Number(body.receiptId);
    if (!receiptId) {
      sendJson(res, 400, { error: "Invalid receipt id." });
      return;
    }

    const result = await query(
      "DELETE FROM receiptinfo WHERE receipt_id = $1 RETURNING receipt_id",
      [receiptId]
    );

    if (result.rows.length === 0) {
      sendJson(res, 404, { error: "Receipt not found." });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error("[delete] Failed to delete receipt:", err.message || err);
    sendJson(res, 500, { error: "Failed to delete receipt." });
  }
};
