// Register
function registerUser() {
  let username = document.getElementById("regUser").value;
  let password = document.getElementById("regPass").value;

  if (username === "" || password === "") {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  alert("Registered Successfully! Please Login");
  window.location.href = "login.html";
}

// Login
function loginUser() {
  let username = document.getElementById("loginUser").value;
  let password = document.getElementById("loginPass").value;

  let storedUser = localStorage.getItem("username");
  let storedPass = localStorage.getItem("password");

  if (username === storedUser && password === storedPass) {
    alert("Login Successfully!");
    window.location.href = "index.html";
  } else {
    alert("Invalid Credentials! Register First");
  }
}
