export const register = registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorMsg = document.getElementById("registerError");
  errorMsg.textContent = "Inscription en cours...";

  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erreur lors de l'inscription");
    }

    // SUCCÈS
    alert("Compte créé avec succès ! Connectez-vous maintenant.");

    switchToLogin.click(); // On switch automatiquement vers le formulaire de connexion
  } catch (error) {
    errorMsg.textContent = error.message;
  }
});
