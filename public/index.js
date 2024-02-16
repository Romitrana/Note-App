const HeaderE1 = document.getElementsByTagName("header")[0];
const AsideE1 = document.getElementsByTagName("aside")[0];
const AsideE2 = document.getElementsByTagName("aside")[1];
const Theme1 = document.getElementById("theme1");
const Theme2 = document.getElementById("theme2");
const Theme3 = document.getElementById("theme3");
const Theme4 = document.getElementById("theme4");
const addBtn = document.getElementById("addbtn");
Theme1.addEventListener("click", () => changeTheme("theme1"));
Theme2.addEventListener("click", () => changeTheme("theme2"));
Theme3.addEventListener("click", () => changeTheme("theme3"));
Theme4.addEventListener("click", () => changeTheme("theme4"));

function changeTheme(theme) {
  HeaderE1.classList.remove(...HeaderE1.classList);
  AsideE1.classList.remove(...AsideE1.classList);
  AsideE2.classList.remove(...AsideE2.classList);
  HeaderE1.classList.add(theme);
  AsideE1.classList.add(theme);
  AsideE2.classList.add(theme);
}

// API Works-----
