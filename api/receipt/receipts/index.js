const { query } = require("../_db");
const {
  readJson,
  sendJson,
  normalizeText,
  parseDateInput,
} = require("../_utils");
const { getSession } = require("../_auth");
const { sendReceiptEmail } = require("../_email");

function requireSession(req, res) {
  const session = getSession(req);
  if (!session) {
    sendJson(res, 401, { error: "Not authenticated." });
    return null;
  }
  return session;
}

module.exports = async function handler(req, res) {
  const session = requireSession(req, res);
  if (!session) {
    return;
  }

  if (req.method === "GET") {
    const singleId = Number(req.query.id);
    if (singleId) {
      try {
        const result = await query(
          `
            SELECT
              receipt_id, receipt_date, received_from, company_rep,
              email_address, in_the_sum_of, being_payment_for, amount_involved,
              LPAD(receipt_id::text, 4, '0') AS receipt_number
            FROM receiptinfo WHERE receipt_id = $1
          `,
          [singleId]
        );
        if (result.rows.length === 0) {
          sendJson(res, 404, { error: "Receipt not found." });
          return;
        }
        sendJson(res, 200, { ok: true, receipt: result.rows[0] });
      } catch (err) {
        console.error("[receipt] Failed to load receipt:", err.message || err);
        sendJson(res, 500, { error: "Failed to load receipt." });
      }
      return;
    }

    try {
      const limit = Math.min(Number(req.query.limit || 20) || 20, 200);
      const offset = Math.max(Number(req.query.offset || 0) || 0, 0);
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
          ORDER BY receipt_id DESC
          LIMIT $1 OFFSET $2
        `,
        [limit, offset]
      );

      const countResult = await query(
        "SELECT COUNT(*)::int AS total FROM receiptinfo"
      );
      const total = countResult.rows[0].total;

      sendJson(res, 200, {
        ok: true,
        receipts: result.rows,
        total,
        limit,
        offset,
      });
    } catch {
      sendJson(res, 500, { error: "Failed to load receipts." });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const body = await readJson(req);
      const receivedFrom = normalizeText(body.receivedFrom);
      const companyRep = normalizeText(body.companyRep);
      const companyRep2 = normalizeText(body.companyRep2);
      const emailAddress = normalizeText(body.emailAddress);
      const sumOf = normalizeText(body.sumOf);
      const sumOf2 = normalizeText(body.sumOf2);
      const paymentFor = normalizeText(body.paymentFor);
      const amountInvolved = normalizeText(body.amountInvolved);

      if (
        !receivedFrom ||
        !companyRep ||
        !emailAddress ||
        !sumOf ||
        !paymentFor ||
        !amountInvolved
      ) {
        sendJson(res, 400, { error: "All required fields must be filled." });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
        sendJson(res, 400, { error: "Please provide a valid email address." });
        return;
      }

      const receiptDate = parseDateInput(body.receiptDate);
      const formattedDate = receiptDate.toISOString().slice(0, 10);
      const combinedCompany = [companyRep, companyRep2]
        .filter(Boolean)
        .join("\n");
      const combinedSumOf = [sumOf, sumOf2].filter(Boolean).join("\n");

      const result = await query(
        `
          INSERT INTO receiptinfo (
            receipt_date,
            received_from,
            company_rep,
            email_address,
            in_the_sum_of,
            being_payment_for,
            amount_involved
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING
            receipt_id,
            receipt_date,
            received_from,
            company_rep,
            email_address,
            in_the_sum_of,
            being_payment_for,
            amount_involved,
            LPAD(receipt_id::text, 4, '0') AS receipt_number
        `,
        [
          formattedDate,
          receivedFrom,
          combinedCompany,
          emailAddress,
          combinedSumOf,
          paymentFor,
          amountInvolved,
        ]
      );

      const created = result.rows[0];
      sendJson(res, 201, { ok: true, receipt: created });
      process.nextTick(() => sendReceiptEmail(created).catch(() => {}));
    } catch (error) {
      sendJson(res, 500, { error: "Failed to create receipt." });
    }
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
};
