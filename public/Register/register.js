const Username = document.getElementById("name");
const email = document.getElementById("username");
const password = document.getElementById("password");
const formE1 = document.getElementById("form");

formE1.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    name: Username.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await axios.post("/api/v1/auth/register", formData);
    const { name, token } = response.data;
    localStorage.setItem("NoteBookUserToken", token);
    localStorage.setItem("NoteBookUserName", name);
    window.location.href = "/Notebook";
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert("Email already exists. Please use a different email.");
    } else if (error.response && error.response.status === 400) {
      alert("Validation error: " + error.response.data.error);
    } else {
      alert("An error occurred: " + error.message);
    }
  }
});


// try {
//   await axios.get("/Notebook", {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   }).then((response)=>{
//     console.log(response);

//   });
// } catch (error) {
//   console.log("error from dashboard fetch:", error);
// }
