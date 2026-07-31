/* ==========================================
   API Configuration
========================================== */

const hostname = window.location.hostname;

let BASE_URL;

if (
    hostname === "localhost" ||
    hostname === "127.0.0.1"
) {

    BASE_URL = "http://localhost:5000/api";

}
else if (hostname.includes("github.dev")) {

    // Replace with YOUR backend forwarded URL
    BASE_URL = "https://fluffy-train-q5pq6pp54rv2xr5p-5000.app.github.dev/api";

}
else {

    BASE_URL = "http://localhost:5000/api";

}

console.log("API:", BASE_URL);