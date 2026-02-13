console.log("Gate running");

const SECRET_CODE = "myPrivateCode123"; // change this

(function () {
  if (localStorage.getItem("authorized")) return;

  const userCode = prompt("Enter access code:");

  if (userCode === SECRET_CODE) {
    localStorage.setItem("authorized", "true");
  } else {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Access Denied</h2>";
  }
})();
