const form = document.getElementById("studentForm");
const table = document.querySelector("#studentTable tbody");
const search = document.getElementById("searchStudent");

// Change this to your Codespaces URL if needed
const API_URL = "http://localhost:5000/api/students";

const token = localStorage.getItem("token");

// Load students when page opens
loadStudents();

// ------------------------
// Get Students
// ------------------------

async function loadStudents() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const students = await response.json();

        displayStudents(students);

    }

    catch (error) {

        console.error(error);

    }

}

// ------------------------
// Display Students
// ------------------------

function displayStudents(students) {

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>${student.studentId}</td>

            <td>${student.studentName}</td>

            <td>${student.studentEmail}</td>

            <td>${student.studentPhone}</td>

            <td>${student.department}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent('${student._id}')">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent('${student._id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ------------------------
// Add Student
// ------------------------

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {

        studentId: studentId.value,

        studentName: studentName.value,

        studentEmail: studentEmail.value,

        studentPhone: studentPhone.value,

        department: department.value

    };

    try {

        await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(student)

        });

        form.reset();

        loadStudents();

    }

    catch (error) {

        console.error(error);

    }

});

// ------------------------
// Delete Student
// ------------------------

async function deleteStudent(id) {

    if (!confirm("Delete Student?")) return;

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        loadStudents();

    }

    catch (error) {

        console.error(error);

    }

}

// ------------------------
// Edit Student
// ------------------------

async function editStudent(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const student = await response.json();

        studentId.value = student.studentId;

        studentName.value = student.studentName;

        studentEmail.value = student.studentEmail;

        studentPhone.value = student.studentPhone;

        department.value = student.department;

        await deleteStudent(id);

    }

    catch (error) {

        console.error(error);

    }

}

// ------------------------
// Search Students
// ------------------------

search.addEventListener("keyup", async () => {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const students = await response.json();

        const value = search.value.toLowerCase();

        const filtered = students.filter(student =>

            student.studentName.toLowerCase().includes(value) ||

            student.studentId.toLowerCase().includes(value)

        );

        displayStudents(filtered);

    }

    catch (error) {

        console.error(error);

    }

});