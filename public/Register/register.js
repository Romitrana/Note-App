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
    const { user, token } = response.data;
    console.log("first try blocks user", user);
    console.log("first try blocks token", token);
    localStorage.setItem("token", token);
    debugger
    window.location.href = "/Notebook";

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
  } catch (error) {
    console.log("error from catch", error);
  }
});
