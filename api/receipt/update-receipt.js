const { query } = require("./_db");
const {
  readJson,
  sendJson,
  normalizeText,
  parseDateInput,
  checkFieldLengths,
} = require("./_utils");
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

  try {
    const body = await readJson(req);
    const receiptId = Number(body.receiptId);
    if (!receiptId) {
      sendJson(res, 400, { error: "Invalid receipt id." });
      return;
    }

    const lengthError = checkFieldLengths(body);
    if (lengthError) {
      sendJson(res, 400, { error: lengthError });
      return;
    }

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
        UPDATE receiptinfo SET
          receipt_date = $1,
          received_from = $2,
          company_rep = $3,
          email_address = $4,
          in_the_sum_of = $5,
          being_payment_for = $6,
          amount_involved = $7
        WHERE receipt_id = $8
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
        receiptId,
      ]
    );

    if (result.rows.length === 0) {
      sendJson(res, 404, { error: "Receipt not found." });
      return;
    }

    const updated = result.rows[0];

    try {
      await sendReceiptEmail(updated, { updated: true });
    } catch (err) {
      console.error("[email] Send failed:", err.message || err);
    }

    sendJson(res, 200, { ok: true, receipt: updated });
  } catch (err) {
    console.error("[update] Failed to update receipt:", err.message || err);
    sendJson(res, 500, { error: "Failed to update receipt." });
  }
};
