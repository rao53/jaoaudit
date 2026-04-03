async function ensureAuth() {
  try {
    const response = await fetch("/api/receipt/me");
    if (!response.ok) {
      window.location.href = "/receipt/index.html";
    }
  } catch {
    window.location.href = "/receipt/index.html";
  }
}
