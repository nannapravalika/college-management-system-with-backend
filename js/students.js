const form = document.getElementById("studentForm");
const table = document.querySelector("#studentTable tbody");
const search = document.getElementById("searchStudent");

const API_URL = `${BASE_URL}/students`;
const token = localStorage.getItem("token");

// Redirect if not logged in
if (!token) {
    window.location.href = "login.html";
}

let editingId = null;

// =========================
// Load Students
// =========================

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

        alert("Unable to load students.");

    }

}

loadStudents();

// =========================
// Display Students
// =========================

function displayStudents(students) {

    table.innerHTML = "";

    if (students.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6">No Students Found</td>
        </tr>
        `;

        return;

    }

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

// =========================
// Add / Update Student
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {

        studentId: studentId.value.trim(),

        studentName: studentName.value.trim(),

        studentEmail: studentEmail.value.trim(),

        studentPhone: studentPhone.value.trim(),

        department: department.value

    };

    try {

        if (editingId) {

            // Update Student

            await fetch(`${API_URL}/${editingId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(student)

            });

            alert("Student Updated Successfully");

            editingId = null;

        }

        else {

            // Add Student

            await fetch(API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(student)

            });

            alert("Student Added Successfully");

        }

        form.reset();

        loadStudents();

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

});

// =========================
// Edit Student
// =========================

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

        editingId = id;

    }

    catch (error) {

        console.error(error);

        alert("Unable to load student.");

    }

}

// =========================
// Delete Student
// =========================

async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {

        return;

    }

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        alert("Student Deleted Successfully");

        loadStudents();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete student.");

    }

}

// =========================
// Search Students
// =========================

search.addEventListener("keyup", async () => {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const students = await response.json();

        const keyword = search.value.toLowerCase();

        const filtered = students.filter(student =>

            student.studentName.toLowerCase().includes(keyword) ||

            student.studentId.toLowerCase().includes(keyword) ||

            student.department.toLowerCase().includes(keyword)

        );

        displayStudents(filtered);

    }

    catch (error) {

        console.error(error);

    }

});