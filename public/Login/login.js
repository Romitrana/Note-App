document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      // Send POST request to the backend login route
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();

      // Store token and user information in localStorage
      localStorage.setItem("NoteBookUserName", data.user.name);
      localStorage.setItem("NoteBookUserToken", data.token);
      localStorage.setItem("NoteBookUserId", data.userId);

      // Redirect to dashboard
      window.location.href = "/Notebook";
    } catch (error) {
      alert("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  });
