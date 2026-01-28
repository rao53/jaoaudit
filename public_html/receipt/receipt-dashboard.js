const receiptListEl = document.getElementById("receipt-list");
const messageEl = document.getElementById("receipt-message");
const errorEl = document.getElementById("receipt-error");
const form = document.getElementById("receipt-form");
const logoutBtn = document.getElementById("logout-btn");

function formatToday() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

async function ensureAuth() {
  const response = await fetch("/api/receipt/me");
  if (!response.ok) {
    window.location.href = "/receipt/index.html";
  }
}

function renderReceiptCard(receipt) {
  const card = document.createElement("div");
  card.className = "receipt-card";

  const info = document.createElement("div");
  info.innerHTML = `
    <h3>Receipt #${receipt.receipt_number}</h3>
    <div>${receipt.received_from}</div>
    <div>${receipt.receipt_date}</div>
  `;

  const actions = document.createElement("div");
  actions.className = "receipt-actions";
  actions.innerHTML = `<a href="/receipt/receipt.html?id=${receipt.receipt_id}">View</a>`;

  card.appendChild(info);
  card.appendChild(actions);
  return card;
}

async function loadReceipts() {
  receiptListEl.innerHTML = "Loading...";
  const response = await fetch("/api/receipt/receipts");
  if (!response.ok) {
    receiptListEl.innerHTML = "Unable to load receipts.";
    return;
  }
  const data = await response.json();
  receiptListEl.innerHTML = "";
  if (!data.receipts.length) {
    receiptListEl.textContent = "No receipts yet.";
    return;
  }
  data.receipts.forEach((receipt) => {
    receiptListEl.appendChild(renderReceiptCard(receipt));
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  messageEl.textContent = "";
  errorEl.textContent = "";

  const payload = {
    receiptDate: form.receiptDate.value.trim(),
    receivedFrom: form.receivedFrom.value.trim(),
    companyRep: form.companyRep.value.trim(),
    companyRep2: form.companyRep2.value.trim(),
    emailAddress: form.emailAddress.value.trim(),
    sumOf: form.sumOf.value.trim(),
    sumOf2: form.sumOf2.value.trim(),
    paymentFor: form.paymentFor.value.trim(),
    amountInvolved: form.amountInvolved.value.trim(),
  };

  const response = await fetch("/api/receipt/receipts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    errorEl.textContent = data.error || "Failed to create receipt.";
    return;
  }

  const data = await response.json();
  messageEl.textContent = `Receipt #${data.receipt.receipt_number} created.`;
  form.reset();
  form.receiptDate.value = formatToday();
  await loadReceipts();
});

logoutBtn.addEventListener("click", async () => {
  await fetch("/api/receipt/logout", { method: "POST" });
  window.location.href = "/receipt/index.html";
});

(async () => {
  await ensureAuth();
  form.receiptDate.value = formatToday();
  await loadReceipts();
})();
