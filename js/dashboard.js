const API = `${BASE_URL}/dashboard`;

const token = localStorage.getItem("token");

// =======================================
// Authentication
// =======================================

if (!token) {

    window.location.href = "login.html";

}

// =======================================
// Handle Unauthorized
// =======================================

function handleUnauthorized(response) {

    if (response.status === 401) {

        localStorage.clear();

        alert("Session expired. Please login again.");

        window.location.href = "login.html";

        return true;

    }

    return false;

}

// =======================================
// Load Dashboard
// =======================================

async function loadDashboard() {

    try {

        const response = await fetch(API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        document.getElementById("studentCount").innerText =
            data.totalStudents || 0;

        document.getElementById("courseCount").innerText =
            data.totalCourses || 0;

        document.getElementById("departmentCount").innerText =
            data.totalDepartments || 0;

        const table = document.getElementById("recentStudents");

        table.innerHTML = "";

        if (!data.recentStudents || data.recentStudents.length === 0) {

            table.innerHTML = `

                <tr>

                    <td colspan="4" style="text-align:center;">

                        No Recent Students

                    </td>

                </tr>

            `;

            return;

        }

        data.recentStudents.forEach(student => {

            table.innerHTML += `

                <tr>

                    <td>${student.studentId}</td>

                    <td>${student.studentName}</td>

                    <td>${student.department?.departmentName || "-"}</td>

                    <td>${student.course?.courseName || "-"}</td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load dashboard.");

    }

}

// =======================================
// Auto Refresh Every 30 Seconds
// =======================================

loadDashboard();

setInterval(() => {

    if (document.visibilityState === "visible") {

        loadDashboard();

    }

}, 30000);

// =======================================
// Prevent Form Resubmission
// =======================================

window.history.replaceState(null, null, window.location.href);

// =======================================
// Console
// =======================================

console.log("=================================");
console.log("Dashboard Loaded");
console.log("Authentication : Enabled");
console.log("Statistics : Enabled");
console.log("Recent Students : Enabled");
console.log("Auto Refresh : Enabled");
console.log("=================================");