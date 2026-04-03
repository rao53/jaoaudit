const receiptListEl = document.getElementById("receipt-list");
const listFooterEl = document.getElementById("receipt-list-footer");
const searchInput = document.getElementById("receipt-search");
const toastEl = document.getElementById("toast");
const errorEl = document.getElementById("receipt-error");
const form = document.getElementById("receipt-form");
const createBtn = document.getElementById("create-btn");
const logoutBtn = document.getElementById("logout-btn");

const PAGE_SIZE = 20;
let allReceipts = [];
let currentOffset = 0;
let totalReceipts = 0;

function todayISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDate(raw) {
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

function showToast(message, linkHref) {
  toastEl.textContent = "";
  const span = document.createElement("span");
  span.textContent = message;
  toastEl.appendChild(span);

  if (linkHref) {
    const a = document.createElement("a");
    a.href = linkHref;
    a.textContent = "View";
    toastEl.appendChild(a);
  }

  toastEl.classList.add("visible");
  setTimeout(() => toastEl.classList.remove("visible"), 5000);
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.add("visible");
}

function clearError() {
  errorEl.textContent = "";
  errorEl.classList.remove("visible");
}

function setLoading(loading) {
  createBtn.disabled = loading;
  createBtn.textContent = loading ? "Creating\u2026" : "Create Receipt";
}

function splitLines(value) {
  const trimmed = value.trim();
  if (!trimmed) return ["", ""];
  const parts = trimmed.split("\n").map((s) => s.trim());
  return [parts[0] || "", parts.slice(1).join("\n").trim()];
}

function validateForm() {
  let valid = true;
  const required = form.querySelectorAll("[required]");
  required.forEach((field) => {
    const group = field.closest(".form-group");
    if (!field.value.trim()) {
      field.classList.add("field-error");
      if (group && !group.querySelector(".field-hint")) {
        const hint = document.createElement("span");
        hint.className = "field-hint";
        hint.textContent = "This field is required";
        group.appendChild(hint);
      }
      valid = false;
    } else {
      field.classList.remove("field-error");
      const hint = group?.querySelector(".field-hint");
      if (hint) hint.remove();
    }
  });
  return valid;
}

form.addEventListener("input", (e) => {
  const field = e.target;
  if (field.classList.contains("field-error") && field.value.trim()) {
    field.classList.remove("field-error");
    const hint = field.closest(".form-group")?.querySelector(".field-hint");
    if (hint) hint.remove();
  }
});

function renderReceiptCard(receipt) {
  const card = document.createElement("div");
  card.className = "receipt-card";

  const info = document.createElement("div");
  info.className = "receipt-info";

  const header = document.createElement("div");
  header.className = "receipt-card-header";
  const h3 = document.createElement("h3");
  h3.textContent = `Receipt #${receipt.receipt_number}`;
  const dateSpan = document.createElement("span");
  dateSpan.className = "receipt-card-date";
  dateSpan.textContent = formatDate(receipt.receipt_date);
  header.appendChild(h3);
  header.appendChild(dateSpan);
  info.appendChild(header);

  const from = document.createElement("div");
  from.className = "receipt-card-detail";
  from.textContent = receipt.received_from;
  info.appendChild(from);

  const meta = document.createElement("div");
  meta.className = "receipt-card-meta";

  if (receipt.amount_involved) {
    const amt = document.createElement("span");
    amt.textContent = receipt.amount_involved;
    meta.appendChild(amt);
  }
  if (receipt.email_address) {
    const email = document.createElement("span");
    email.textContent = receipt.email_address;
    meta.appendChild(email);
  }
  info.appendChild(meta);

  if (receipt.being_payment_for) {
    const desc = document.createElement("div");
    desc.className = "receipt-card-desc";
    desc.textContent = receipt.being_payment_for;
    info.appendChild(desc);
  }

  const actions = document.createElement("div");
  actions.className = "receipt-actions";
  const link = document.createElement("a");
  link.href = `/receipt/receipt.html?id=${receipt.receipt_id}`;
  link.textContent = "View \u2192";
  actions.appendChild(link);

  card.appendChild(info);
  card.appendChild(actions);
  return card;
}

function renderSkeleton() {
  receiptListEl.textContent = "";
  for (let i = 0; i < 3; i++) {
    const skel = document.createElement("div");
    skel.className = "receipt-card skeleton";
    skel.innerHTML =
      '<div class="skel-line skel-wide"></div>' +
      '<div class="skel-line skel-medium"></div>' +
      '<div class="skel-line skel-narrow"></div>';
    receiptListEl.appendChild(skel);
  }
}

function renderEmpty() {
  receiptListEl.textContent = "";
  const empty = document.createElement("div");
  empty.className = "empty-state";
  const msg = document.createElement("p");
  msg.textContent = "No receipts yet";
  const sub = document.createElement("p");
  sub.className = "empty-sub";
  sub.textContent = "Create your first receipt using the form above.";
  empty.appendChild(msg);
  empty.appendChild(sub);
  receiptListEl.appendChild(empty);
}

function renderList(receipts) {
  receiptListEl.textContent = "";
  if (!receipts.length) {
    renderEmpty();
    return;
  }
  receipts.forEach((r) => receiptListEl.appendChild(renderReceiptCard(r)));
}

function renderFooter() {
  listFooterEl.textContent = "";
  const loaded = allReceipts.length;
  if (loaded >= totalReceipts) return;

  const btn = document.createElement("button");
  btn.className = "secondary load-more-btn";
  btn.textContent = `Load more (${loaded} of ${totalReceipts})`;
  btn.addEventListener("click", () => loadMore());
  listFooterEl.appendChild(btn);
}

async function loadReceipts() {
  renderSkeleton();
  listFooterEl.textContent = "";
  currentOffset = 0;
  allReceipts = [];

  try {
    const response = await fetch(
      `/api/receipt/receipts?limit=${PAGE_SIZE}&offset=0`
    );
    if (!response.ok) {
      receiptListEl.textContent = "Unable to load receipts.";
      return;
    }
    const data = await response.json();
    allReceipts = data.receipts;
    totalReceipts = data.total;
    currentOffset = allReceipts.length;
    renderList(allReceipts);
    renderFooter();
  } catch {
    receiptListEl.textContent = "Unable to load receipts.";
  }
}

async function loadMore() {
  try {
    const response = await fetch(
      `/api/receipt/receipts?limit=${PAGE_SIZE}&offset=${currentOffset}`
    );
    if (!response.ok) return;
    const data = await response.json();
    allReceipts = allReceipts.concat(data.receipts);
    currentOffset = allReceipts.length;
    applyFilter();
    renderFooter();
  } catch {
    /* silently skip */
  }
}

function applyFilter() {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) {
    renderList(allReceipts);
    return;
  }
  const filtered = allReceipts.filter((r) => {
    const haystack = [
      r.receipt_number,
      r.received_from,
      r.email_address,
      r.amount_involved,
      r.being_payment_for,
      r.receipt_date,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(term);
  });
  renderList(filtered);
}

searchInput.addEventListener("input", applyFilter);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  if (!validateForm()) return;

  const [companyRep, companyRep2] = splitLines(form.companyRep.value);
  const [sumOf, sumOf2] = splitLines(form.sumOf.value);

  const payload = {
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

  setLoading(true);

  try {
    const response = await fetch("/api/receipt/receipts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      showError(data.error || "Failed to create receipt.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    form.reset();
    form.receiptDate.value = todayISO();
    searchInput.value = "";
    showToast(
      `Receipt #${data.receipt.receipt_number} created.`,
      `/receipt/receipt.html?id=${data.receipt.receipt_id}`
    );
    await loadReceipts();
  } catch {
    showError("Unable to connect. Please check your network and try again.");
  }

  setLoading(false);
});

logoutBtn.addEventListener("click", async () => {
  await fetch("/api/receipt/logout", { method: "POST" });
  window.location.href = "/receipt/index.html";
});

(async () => {
  await ensureAuth();
  form.receiptDate.value = todayISO();
  await loadReceipts();
})();
