const contentEl = document.getElementById("receipt-content");
const printBtn = document.getElementById("print-btn");

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

function makeLine(label, value) {
  const row = document.createElement("div");
  row.className = "receipt-line";

  const lbl = document.createElement("span");
  lbl.className = "receipt-label";
  lbl.textContent = label;
  row.appendChild(lbl);

  const val = document.createElement("span");
  val.className = "receipt-value";

  if (value && value.includes("\n")) {
    value.split("\n").forEach((part, i) => {
      if (i > 0) val.appendChild(document.createElement("br"));
      val.appendChild(document.createTextNode(part));
    });
  } else {
    val.textContent = value || "\u2014";
  }

  row.appendChild(val);
  return row;
}

async function loadReceipt() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    window.location.href = "/receipt/dashboard.html";
    return;
  }

  try {
    const response = await fetch(`/api/receipt/receipts/${id}`);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      contentEl.textContent = "";
      const errLine = document.createElement("div");
      errLine.className = "receipt-line";
      const strong = document.createElement("strong");
      strong.textContent = data.error || "Receipt not found.";
      errLine.appendChild(strong);
      contentEl.appendChild(errLine);

      const hint = document.createElement("div");
      hint.className = "receipt-line";
      hint.textContent = "Please return to the dashboard and select a receipt.";
      contentEl.appendChild(hint);
      return;
    }

    const data = await response.json();
    const r = data.receipt;

    contentEl.textContent = "";

    const topRow = document.createElement("div");
    topRow.className = "receipt-top-row";
    const noLine = makeLine("No:", r.receipt_number);
    const dateLine = makeLine("Date:", formatDate(r.receipt_date));
    topRow.appendChild(noLine);
    topRow.appendChild(dateLine);
    contentEl.appendChild(topRow);

    contentEl.appendChild(makeLine("Received from:", r.received_from));
    contentEl.appendChild(makeLine("Email:", r.email_address));
    contentEl.appendChild(makeLine("Of:", r.company_rep));
    contentEl.appendChild(makeLine("The Sum of:", r.in_the_sum_of));
    contentEl.appendChild(makeLine("Being Payment for:", r.being_payment_for));
    const displayAmount = r.amount_involved && !/^[₦N]/.test(r.amount_involved)
      ? "\u20a6" + r.amount_involved
      : r.amount_involved;
    contentEl.appendChild(makeLine("Cheque No / Cash:", displayAmount));

    const sigBlock = document.createElement("div");
    sigBlock.className = "receipt-signature";
    const sigImg = document.createElement("img");
    sigImg.src = "/receiptApp/images/signs.jpg";
    sigImg.alt = "Authorized Signature";
    sigImg.height = 80;
    sigBlock.appendChild(sigImg);
    const sigLabel = document.createElement("span");
    sigLabel.className = "receipt-sig-label";
    sigLabel.textContent = "Authorized Signatory";
    sigBlock.appendChild(sigLabel);
    contentEl.appendChild(sigBlock);
  } catch {
    contentEl.textContent = "";
    const errLine = document.createElement("div");
    errLine.className = "receipt-line";
    errLine.textContent = "Unable to load receipt. Please check your connection.";
    contentEl.appendChild(errLine);
  }
}

printBtn.addEventListener("click", () => {
  window.print();
});

const deleteBtn = document.getElementById("delete-btn");

deleteBtn.addEventListener("click", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  if (!confirm("Delete this receipt? This cannot be undone.")) return;

  try {
    const response = await fetch(`/api/receipt/receipts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      alert(data.error || "Failed to delete receipt.");
      return;
    }
    window.location.href = "/receipt/dashboard.html";
  } catch {
    alert("Unable to connect. Please check your network and try again.");
  }
});

(async () => {
  try {
    await ensureAuth();
    await loadReceipt();
  } catch {
    /* auth redirect in progress */
  }
})();
