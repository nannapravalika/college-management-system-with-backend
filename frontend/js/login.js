//const API = "http://localhost:5000/api/auth/login";

// GitHub Codespaces
const API = "https://fluffy-train-q5pq6pp54rv2xr5p.github.dev/api/auth/login";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful");

        window.location.href = "dashboard.html";

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to server");

    }

});