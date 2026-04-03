const { Resend } = require("resend");

function formatDate(raw) {
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

function buildReceiptHTML(r) {
  const rows = [
    ["Receipt No", r.receipt_number],
    ["Date", formatDate(r.receipt_date)],
    ["Received From", r.received_from],
    ["Email", r.email_address],
    ["Of", (r.company_rep || "").replace(/\n/g, "<br>")],
    ["The Sum Of", (r.in_the_sum_of || "").replace(/\n/g, "<br>")],
    ["Being Payment For", r.being_payment_for],
    ["Cheque No / Cash", r.amount_involved],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #e5e7eb;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${value || "&mdash;"}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Trebuchet MS,Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1d1d1f">
      <div style="border-bottom:3px solid #497e04;padding-bottom:16px;margin-bottom:24px">
        <h2 style="margin:0;color:#497e04">J.A. Olawin &amp; Co.</h2>
        <p style="margin:4px 0 0;color:#696969;font-style:italic">Chartered Accountants</p>
      </div>
      <h3 style="margin:0 0 16px;color:#b91c1c;letter-spacing:1px">RECEIPT</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${tableRows}
      </table>
      <div style="margin-top:24px;text-align:right">
        <img src="https://www.jaoaudit.com/receiptApp/images/signs.jpg" alt="Authorized Signature" height="80" style="display:inline-block" />
        <p style="margin:4px 0 0;font-size:13px;color:#696969;font-style:italic">Authorized Signatory</p>
      </div>
      <p style="margin-top:24px;font-size:13px;color:#696969;font-style:italic">
        This is an automated receipt from J.A. Olawin &amp; Co. Receipt Management System.
      </p>
    </div>
  `;
}

async function sendReceiptEmail(receipt) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set, skipping email");
    return;
  }
  if (!receipt.email_address) {
    console.log("[email] No email address on receipt, skipping");
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const resend = new Resend(apiKey);

  console.log(
    `[email] Sending receipt #${receipt.receipt_number} to ${receipt.email_address} from ${fromEmail}`
  );

  try {
    const result = await resend.emails.send({
      from: `J.A. Olawin & Co. <${fromEmail}>`,
      to: [receipt.email_address],
      subject: `Receipt #${receipt.receipt_number} \u2014 J.A. Olawin & Co.`,
      html: buildReceiptHTML(receipt),
    });
    console.log("[email] Sent successfully:", JSON.stringify(result));
  } catch (err) {
    console.error("[email] Failed to send:", err.message || err);
    throw err;
  }
}

module.exports = { sendReceiptEmail, buildReceiptHTML };
