const { query } = require("./_db");
const { readJson, sendJson } = require("./_utils");
const { getSession } = require("./_auth");
const { sendReceiptEmail } = require("./_email");

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

  if (!process.env.RESEND_API_KEY) {
    sendJson(res, 500, { error: "Email service is not configured." });
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

    const receipt = result.rows[0];
    if (!receipt.email_address) {
      sendJson(res, 400, { error: "Receipt has no email address." });
      return;
    }

    await sendReceiptEmail(receipt);
    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 500, { error: "Failed to send email." });
  }
};
