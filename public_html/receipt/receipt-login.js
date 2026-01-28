const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorEl.textContent = "";

  const payload = {
    username: form.username.value.trim(),
    password: form.password.value.trim(),
  };

  try {
    const response = await fetch("/api/receipt/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      errorEl.textContent = data.error || "Login failed.";
      return;
    }

    window.location.href = "/receipt/dashboard.html";
  } catch (error) {
    errorEl.textContent = "Login failed.";
  }
});
