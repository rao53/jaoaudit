const contentEl = document.getElementById("receipt-content");
const actionsEl = document.querySelector(".actions");
const printBtn = document.getElementById("print-btn");
const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");

let currentReceipt = null;

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

function toISODate(raw) {
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
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

function renderReceipt(r) {
  contentEl.textContent = "";

  const topRow = document.createElement("div");
  topRow.className = "receipt-top-row";
  topRow.appendChild(makeLine("No:", r.receipt_number));
  topRow.appendChild(makeLine("Date:", formatDate(r.receipt_date)));
  contentEl.appendChild(topRow);

  contentEl.appendChild(makeLine("Received from:", r.received_from));
  contentEl.appendChild(makeLine("Email:", r.email_address));
  contentEl.appendChild(makeLine("Of:", r.company_rep));
  contentEl.appendChild(makeLine("The Sum of:", r.in_the_sum_of));
  contentEl.appendChild(makeLine("Being Payment for:", r.being_payment_for));
  const displayAmount =
    r.amount_involved && !/^[\u20a6N]/.test(r.amount_involved)
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
}

function makeField(label, name, value, type, opts = {}) {
  const group = document.createElement("div");
  group.className = "form-group";
  const lbl = document.createElement("label");
  lbl.textContent = label;
  lbl.setAttribute("for", "edit-" + name);
  group.appendChild(lbl);

  if (type === "textarea") {
    const ta = document.createElement("textarea");
    ta.id = "edit-" + name;
    ta.name = name;
    ta.rows = opts.rows || 2;
    ta.value = value || "";
    if (opts.required) ta.required = true;
    group.appendChild(ta);
  } else if (name === "amountInvolved") {
    const wrap = document.createElement("div");
    wrap.className = "input-group";
    const prefix = document.createElement("span");
    prefix.className = "input-prefix";
    prefix.textContent = "\u20a6";
    wrap.appendChild(prefix);
    const inp = document.createElement("input");
    inp.id = "edit-" + name;
    inp.name = name;
    inp.type = "text";
    inp.value = (value || "").replace(/^[\u20a6N]\s*/, "");
    if (opts.required) inp.required = true;
    wrap.appendChild(inp);
    group.appendChild(wrap);
  } else {
    const inp = document.createElement("input");
    inp.id = "edit-" + name;
    inp.name = name;
    inp.type = type || "text";
    inp.value = value || "";
    if (opts.required) inp.required = true;
    group.appendChild(inp);
  }
  return group;
}

function enterEditMode() {
  if (!currentReceipt) return;
  const r = currentReceipt;

  contentEl.textContent = "";
  actionsEl.style.display = "none";

  const form = document.createElement("form");
  form.id = "edit-form";
  form.noValidate = true;
  form.className = "edit-form";

  form.appendChild(makeField("Date", "receiptDate", toISODate(r.receipt_date), "date", { required: true }));
  form.appendChild(makeField("Email", "emailAddress", r.email_address, "email", { required: true }));
  form.appendChild(makeField("Received From", "receivedFrom", r.received_from, "text", { required: true }));
  form.appendChild(makeField("Designated Address", "companyRep", r.company_rep, "textarea", { required: true }));
  form.appendChild(makeField("In The Sum Of", "sumOf", r.in_the_sum_of, "textarea", { required: true }));
  form.appendChild(makeField("Being Payment For", "paymentFor", r.being_payment_for, "textarea", { required: true, rows: 2 }));
  form.appendChild(makeField("Cheque No / Amount", "amountInvolved", r.amount_involved, "text", { required: true }));

  const btnRow = document.createElement("div");
  btnRow.className = "edit-actions";

  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "Save Changes";
  btnRow.appendChild(saveBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "secondary";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", exitEditMode);
  btnRow.appendChild(cancelBtn);

  form.appendChild(btnRow);

  const msgEl = document.createElement("div");
  msgEl.id = "edit-message";
  form.appendChild(msgEl);

  form.addEventListener("submit", handleSave);
  contentEl.appendChild(form);
}

function exitEditMode() {
  if (currentReceipt) {
    renderReceipt(currentReceipt);
    actionsEl.style.display = "";
  }
}

async function handleSave(e) {
  e.preventDefault();
  const form = e.target;
  const msgEl = document.getElementById("edit-message");
  msgEl.textContent = "";
  msgEl.className = "";

  const saveBtn = form.querySelector('button[type="submit"]');
  saveBtn.disabled = true;
  saveBtn.textContent = "Saving\u2026";

  const [companyRep, companyRep2] = splitLines(form.companyRep.value);
  const [sumOf, sumOf2] = splitLines(form.sumOf.value);

  const payload = {
    receiptId: currentReceipt.receipt_id,
    receiptDate: form.receiptDate.value.trim(),
    receivedFrom: form.receivedFrom.value.trim(),
    companyRep,
    companyRep2,
    emailAddress: form.emailAddress.value.trim(),
    sumOf,
    sumOf2,
    paymentFor: form.paymentFor.value.trim(),
    amountInvolved: form.amountInvolved.value.trim(),
  };

  try {
    const response = await fetch("/api/receipt/update-receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      msgEl.textContent = data.error || "Failed to update receipt.";
      msgEl.className = "alert-error visible";
      saveBtn.disabled = false;
      saveBtn.textContent = "Save Changes";
      return;
    }

    const data = await response.json();
    currentReceipt = data.receipt;
    renderReceipt(currentReceipt);
    actionsEl.style.display = "";

    const toast = document.getElementById("edit-toast");
    const email = payload.emailAddress;
    toast.textContent = email
      ? `Receipt updated. Emailed to ${email}.`
      : "Receipt updated.";
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 5000);
  } catch {
    msgEl.textContent = "Unable to connect. Please check your network.";
    msgEl.className = "alert-error visible";
    saveBtn.disabled = false;
    saveBtn.textContent = "Save Changes";
  }
}

function splitLines(value) {
  const trimmed = value.trim();
  if (!trimmed) return ["", ""];
  const parts = trimmed.split("\n").map((s) => s.trim());
  return [parts[0] || "", parts.slice(1).join("\n").trim()];
}

async function loadReceipt() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    window.location.href = "/receipt/dashboard.html";
    return;
  }

  try {
    const response = await fetch(`/api/receipt/receipts?id=${id}`);
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
      hint.textContent =
        "Please return to the dashboard and select a receipt.";
      contentEl.appendChild(hint);
      return;
    }

    const data = await response.json();
    currentReceipt = data.receipt;
    renderReceipt(currentReceipt);
  } catch {
    contentEl.textContent = "";
    const errLine = document.createElement("div");
    errLine.className = "receipt-line";
    errLine.textContent =
      "Unable to load receipt. Please check your connection.";
    contentEl.appendChild(errLine);
  }
}

printBtn.addEventListener("click", () => window.print());

editBtn.addEventListener("click", enterEditMode);

deleteBtn.addEventListener("click", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  if (!confirm("Delete this receipt? This cannot be undone.")) return;

  try {
    const response = await fetch("/api/receipt/delete-receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiptId: Number(id) }),
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
