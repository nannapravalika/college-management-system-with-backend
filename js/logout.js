document.getElementById("logoutBtn").addEventListener("click", function (e) {

    e.preventDefault();

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "../index.html";

});