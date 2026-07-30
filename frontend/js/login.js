// Login Form

const form = document.getElementById("loginForm");

const username = document.getElementById("username");

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

// Show Password

togglePassword.addEventListener("click", () => {

    if(password.type==="password"){

        password.type="text";

        togglePassword.classList.replace("fa-eye","fa-eye-slash");

    }else{

        password.type="password";

        togglePassword.classList.replace("fa-eye-slash","fa-eye");

    }

});

// Login Validation

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(

        username.value==="admin"

        &&

        password.value==="admin123"

    ){

        alert("Login Successful!");

        window.location.href="dashboard.html";

    }

    else{

        alert("Invalid Username or Password");

    }

});