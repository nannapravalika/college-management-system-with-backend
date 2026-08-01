const STUDENT_API = `${BASE_URL}/students`;
const DEPARTMENT_API = `${BASE_URL}/departments`;
const COURSE_API = `${BASE_URL}/courses`;

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const form = document.getElementById("studentForm");
const table = document.querySelector("#studentTable tbody");
const search = document.getElementById("searchStudent");

const departmentSelect = document.getElementById("department");
const courseSelect = document.getElementById("course");

let editingId = null;

// =======================================
// Load Departments
// =======================================

async function loadDepartments() {

    try {

        const response = await fetch(DEPARTMENT_API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const departments = await response.json();

        departmentSelect.innerHTML = `

            <option value="">Select Department</option>

        `;

        departments.forEach(department => {

            departmentSelect.innerHTML += `

                <option value="${department._id}">

                    ${department.departmentName}

                </option>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// =======================================
// Load Courses Based On Department
// =======================================

departmentSelect.addEventListener("change", loadCourses);

async function loadCourses() {

    const departmentId = departmentSelect.value;

    courseSelect.innerHTML = `

        <option value="">

            Select Course

        </option>

    `;

    if (!departmentId) {

        return;

    }

    try {

        const response = await fetch(

            `${COURSE_API}/department/${departmentId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const courses = await response.json();

        courses.forEach(course => {

            courseSelect.innerHTML += `

                <option value="${course._id}">

                    ${course.courseName}

                </option>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// =======================================
// Load Students
// =======================================

async function loadStudents() {

    try {

        const response = await fetch(STUDENT_API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const students = await response.json();

        displayStudents(students);

    }

    catch (error) {

        console.log(error);

    }

}

loadDepartments();

loadStudents();

// =======================================
// Display Students
// =======================================

function displayStudents(students) {

    table.innerHTML = "";

    if (students.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="7">

                No Students Found

            </td>

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

            <td>${student.department.departmentName}</td>

            <td>${student.course.courseName}</td>

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
// =======================================
// Add / Update Student
// =======================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {

        studentId: studentId.value,

        studentName: studentName.value,

        studentEmail: studentEmail.value,

        studentPhone: studentPhone.value,

        department: departmentSelect.value,

        course: courseSelect.value

    };

    try {

        if (editingId) {

            const response = await fetch(`${STUDENT_API}/${editingId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(student)

            });

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                return;

            }

            alert("Student Updated Successfully");

            editingId = null;

        }

        else {

            const response = await fetch(STUDENT_API, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(student)

            });

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                return;

            }

            alert("Student Added Successfully");

        }

        form.reset();

        courseSelect.innerHTML = `

            <option value="">

                Select Course

            </option>

        `;

        loadStudents();

    }

    catch (error) {

        console.log(error);

        alert("Unable to connect to server.");

    }

});

// =======================================
// Edit Student
// =======================================

async function editStudent(id) {

    try {

        const response = await fetch(`${STUDENT_API}/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const student = await response.json();

        editingId = student._id;

        studentId.value = student.studentId;

        studentName.value = student.studentName;

        studentEmail.value = student.studentEmail;

        studentPhone.value = student.studentPhone;

        departmentSelect.value = student.department._id;

        await loadCourses();

        courseSelect.value = student.course._id;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.log(error);

    }

}

// =======================================
// Delete Student
// =======================================

async function deleteStudent(id) {

    const confirmDelete = confirm("Delete this student?");

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(`${STUDENT_API}/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Student Deleted Successfully");

        loadStudents();

    }

    catch (error) {

        console.log(error);

    }

}
// =======================================
// Search Students
// =======================================

search.addEventListener("keyup", async () => {

    try {

        const response = await fetch(STUDENT_API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const students = await response.json();

        const keyword = search.value.toLowerCase().trim();

        const filtered = students.filter(student =>

            student.studentName.toLowerCase().includes(keyword)

            ||

            student.studentId.toLowerCase().includes(keyword)

            ||

            student.studentEmail.toLowerCase().includes(keyword)

            ||

            student.department.departmentName.toLowerCase().includes(keyword)

            ||

            student.course.courseName.toLowerCase().includes(keyword)

        );

        displayStudents(filtered);

    }

    catch (error) {

        console.log(error);

    }

});

// =======================================
// Refresh Form
// =======================================

function resetForm() {

    form.reset();

    editingId = null;

    courseSelect.innerHTML = `

        <option value="">

            Select Course

        </option>

    `;

}

// =======================================
// Cancel Edit (ESC Key)
// =======================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        resetForm();

    }

});

// =======================================
// Auto Refresh Every 30 Seconds
// =======================================

setInterval(() => {

    loadStudents();

}, 30000);

// =======================================
// Console
// =======================================

console.log("Student Management Loaded Successfully");