const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");
const loginBtn = document.getElementById("login-btn");
const toggleBtn = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");
const eyeOpen = document.getElementById("eye-open");
const eyeClosed = document.getElementById("eye-closed");

toggleBtn.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  eyeOpen.style.display = showing ? "" : "none";
  eyeClosed.style.display = showing ? "none" : "";
  toggleBtn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
});

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.add("visible");
}

function clearError() {
  errorEl.textContent = "";
  errorEl.classList.remove("visible");
}

function setLoading(loading) {
  loginBtn.disabled = loading;
  loginBtn.textContent = loading ? "Logging in\u2026" : "Login";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  const username = form.username.value.trim();
  const password = form.password.value.trim();

  if (!username || !password) {
    showError("Please enter both username and password.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/receipt/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      showError(data.error || "Invalid username or password.");
      setLoading(false);
      return;
    }

    window.location.href = "/receipt/dashboard.html";
  } catch {
    showError("Unable to connect. Please check your network and try again.");
    setLoading(false);
  }
});
