const { query } = require("../_db");
const { sendJson } = require("../_utils");
const { getSession } = require("../_auth");

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

  const receiptId = Number(req.query.id);
  if (!receiptId) {
    sendJson(res, 400, { error: "Invalid receipt id." });
    return;
  }

  try {
    const result = await query(
      `
        SELECT
          receipt_id,
          receipt_date,
          received_from,
          company_rep,
          email_address,
          in_the_sum_of,
          being_payment_for,
          amount_involved,
          LPAD(receipt_id::text, 4, '0') AS receipt_number
        FROM receiptinfo
        WHERE receipt_id = $1
      `,
      [receiptId]
    );

    if (result.rows.length === 0) {
      sendJson(res, 404, { error: "Receipt not found." });
      return;
    }

    sendJson(res, 200, { ok: true, receipt: result.rows[0] });
  } catch (error) {
    sendJson(res, 500, { error: "Failed to load receipt." });
  }
};
