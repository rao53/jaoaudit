async function ensureAuth() {
  try {
    const response = await fetch("/api/receipt/me");
    if (!response.ok) {
      window.location.href = "/receipt/index.html";
      throw new Error("not authenticated");
    }
  } catch (err) {
    if (err.message !== "not authenticated") {
      window.location.href = "/receipt/index.html";
    }
    throw err;
  }
}
