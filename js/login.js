const API = `${BASE_URL}/auth/login`;

const loginForm = document.getElementById("loginForm");
const togglePassword = document.getElementById("togglePassword");

// ==========================
// Show / Hide Password
// ==========================

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const password = document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";

            togglePassword.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            password.type = "password";

            togglePassword.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

}

// ==========================
// Login
// ==========================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {

        alert("Please enter Email and Password");

        return;

    }

    const loginBtn = loginForm.querySelector("button");

    loginBtn.disabled = true;
    loginBtn.innerText = "Logging in...";

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

        if (!response.ok || !data.success) {

            alert(data.message || "Invalid Email or Password");

            loginBtn.disabled = false;
            loginBtn.innerText = "Login";

            return;

        }

        // Save Login Details
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert(data.message || "Login Successful");

        // Redirect
        window.location.href = "dashboard.html";

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

    finally {

        loginBtn.disabled = false;
        loginBtn.innerText = "Login";

    }

});