const API = `${BASE_URL}/dashboard`;

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

loadDashboard();

async function loadDashboard() {

    try {

        const response = await fetch(API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        document.getElementById("studentCount").innerText = data.totalStudents;

        document.getElementById("courseCount").innerText = data.totalCourses;

        document.getElementById("departmentCount").innerText = data.totalDepartments;

        const table = document.getElementById("recentStudents");

        table.innerHTML = "";

        data.recentStudents.forEach(student => {

            table.innerHTML += `

            <tr>

                <td>${student.studentId}</td>

                <td>${student.studentName}</td>

                <td>${student.department.departmentName}</td>

                <td>${student.course.courseName}</td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}