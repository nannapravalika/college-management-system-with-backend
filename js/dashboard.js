// const API = "http://localhost:5000/api/dashboard";

// GitHub Codespaces
const API = `${BASE_URL}/dashboard`;
const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "../index.html";

}

async function loadDashboard() {

    try {

        const response = await fetch(API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        document.getElementById("totalStudents").innerText =
            data.totalStudents;

        document.getElementById("totalCourses").innerText =
            data.totalCourses;

        document.getElementById("totalDepartments").innerText =
            data.totalDepartments;

        document.getElementById("totalFaculty").innerText =
            data.totalFaculty;

        const tbody = document.getElementById("recentStudents");

        tbody.innerHTML = "";

        data.recentStudents.forEach(student => {

            tbody.innerHTML += `
            <tr>

                <td>${student.studentId}</td>

                <td>${student.studentName}</td>

                <td>${student.department}</td>

                <td>-</td>

            </tr>
            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadDashboard();