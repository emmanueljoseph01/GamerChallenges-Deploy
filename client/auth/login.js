export const login = loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorMsg = document.getElementById("loginError");
  errorMsg.textContent = "Connexion en cours...";

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erreur de connexion");
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    closeModalFunc(); // Ferme automatiquement
    updateNav(); // Met à jour le menu tout de suite
    alert("Ravi de vous revoir !");
  } catch (error) {
    errorMsg.textContent = error.message;
  }
});
