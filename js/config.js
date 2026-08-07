const hostname = window.location.hostname;

let BASE_URL;

if (
    hostname === "localhost" ||
    hostname === "127.0.0.1"
) {

    BASE_URL = "http://localhost:5000/api";

}
else {

    BASE_URL = `${window.location.origin}/api`;

}

console.log("API:", BASE_URL);