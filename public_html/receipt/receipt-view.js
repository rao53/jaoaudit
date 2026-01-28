const contentEl = document.getElementById("receipt-content");
const printBtn = document.getElementById("print-btn");

function formatMultiLine(value) {
  if (!value) {
    return "";
  }
  return value.replace(/\n/g, "<br />");
}

async function ensureAuth() {
  const response = await fetch("/api/receipt/me");
  if (!response.ok) {
    window.location.href = "/receipt/index.html";
  }
}

async function loadReceipt() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    contentEl.textContent = "Missing receipt id.";
    return;
  }

  const response = await fetch(`/api/receipt/receipts/${id}`);
  if (!response.ok) {
    contentEl.textContent = "Unable to load receipt.";
    return;
  }

  const data = await response.json();
  const receipt = data.receipt;

  contentEl.innerHTML = `
    <div class="line"><strong>No:</strong> ${receipt.receipt_number}</div>
    <div class="line"><strong>Date:</strong> ${receipt.receipt_date}</div>
    <div class="line"><strong>Received from:</strong> ${receipt.received_from}</div>
    <div class="line"><strong>Of:</strong> ${formatMultiLine(receipt.company_rep)}</div>
    <div class="line"><strong>The Sum of:</strong> ${formatMultiLine(
      receipt.in_the_sum_of
    )}</div>
    <div class="line"><strong>Being Payment for:</strong> ${
      receipt.being_payment_for
    }</div>
    <div class="line"><strong>Cheque No/Cash:</strong> ${
      receipt.amount_involved
    }</div>
    <div class="line" style="margin-top: 24px;">
      <img src="../receiptApp/images/signs.jpg" alt="Signature" height="80" />
    </div>
  `;
}

printBtn.addEventListener("click", () => {
  window.print();
});

(async () => {
  await ensureAuth();
  await loadReceipt();
})();
