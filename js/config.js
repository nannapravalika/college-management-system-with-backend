/* ==========================================
   API Configuration
========================================== */

const BASE_URL = (() => {

    const hostname = window.location.hostname;

    // Running on Localhost
    if (
        hostname === "localhost" ||
        hostname === "127.0.0.1"
    ) {

        return "http://localhost:5000/api";

    }

    // Running inside GitHub Codespaces
    if (hostname.includes("github.dev")) {

        return `${window.location.origin}/api`;

    }

    // Fallback
    return "http://localhost:5000/api";

})();

console.log("API:", BASE_URL);