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
// Common Unauthorized Handler
// =======================================

function handleUnauthorized(response) {

    if (response.status === 401) {

        localStorage.clear();

        alert("Session Expired. Please login again.");

        window.location.href = "login.html";

        return true;

    }

    return false;

}

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

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const departments = data.departments || data;

        departmentSelect.innerHTML =
            `<option value="">Select Department</option>`;

        departments.forEach(department => {

            departmentSelect.innerHTML += `

                <option value="${department._id}">
                    ${department.departmentName}
                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load departments.");

    }

}

// =======================================
// Load Courses
// =======================================

departmentSelect.addEventListener("change", loadCourses);

async function loadCourses() {

    const departmentId = departmentSelect.value;

    courseSelect.innerHTML =
        `<option value="">Select Course</option>`;

    if (!departmentId) return;

    try {

        const response = await fetch(

            `${COURSE_API}/department/${departmentId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const courses = data.courses || data;

        courses.forEach(course => {

            courseSelect.innerHTML += `

                <option value="${course._id}">
                    ${course.courseName}
                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load courses.");

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

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const students = data.students || data;

        displayStudents(students);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load students.");

    }

}

loadDepartments();

loadStudents();

// =======================================
// Display Students
// =======================================

function displayStudents(students) {

    table.innerHTML = "";

    if (!students || students.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
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

                <td>${student.department?.departmentName || "-"}</td>

                <td>${student.course?.courseName || "-"}</td>

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

        studentId: studentId.value.trim(),

        studentName: studentName.value.trim(),

        studentEmail: studentEmail.value.trim(),

        studentPhone: studentPhone.value.trim(),

        department: departmentSelect.value,

        course: courseSelect.value

    };

    if (

        !student.studentId ||

        !student.studentName ||

        !student.studentEmail ||

        !student.studentPhone ||

        !student.department ||

        !student.course

    ) {

        alert("Please fill all fields.");

        return;

    }

    const submitBtn = form.querySelector("button");

    submitBtn.disabled = true;

    submitBtn.innerText = editingId
        ? "Updating..."
        : "Saving...";

    try {

        let response;

        if (editingId) {

            response = await fetch(

                `${STUDENT_API}/${editingId}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(student)

                }

            );

        } else {

            response = await fetch(

                STUDENT_API,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(student)

                }

            );

        }

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        if (!response.ok || !data.success) {

            alert(data.message);

            return;

        }

        alert(data.message);

        editingId = null;

        form.reset();

        courseSelect.innerHTML =
            `<option value="">Select Course</option>`;

        loadStudents();

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

    finally {

        submitBtn.disabled = false;

        submitBtn.innerText = "Save";

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

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const student = data.student || data;

        editingId = student._id;

        studentId.value = student.studentId;
        studentName.value = student.studentName;
        studentEmail.value = student.studentEmail;
        studentPhone.value = student.studentPhone;

        departmentSelect.value = student.department?._id || "";

        await loadCourses();

        courseSelect.value = student.course?._id || "";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load student details.");

    }

}

// =======================================
// Delete Student
// =======================================

async function deleteStudent(id) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${STUDENT_API}/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        if (!response.ok || !data.success) {

            alert(data.message);

            return;

        }

        alert(data.message);

        loadStudents();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete student.");

    }

}

// =======================================
// Search Students
// =======================================

search.addEventListener("keyup", async () => {

    const keyword = search.value.trim();

    try {

        const response = await fetch(

            `${STUDENT_API}?search=${encodeURIComponent(keyword)}`,

            {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

        );

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const students = data.students || data;

        displayStudents(students);

    }

    catch (error) {

        console.error(error);

        alert("Search failed.");

    }

});
// =======================================
// Reset Form
// =======================================

function resetForm() {

    form.reset();

    editingId = null;

    departmentSelect.value = "";

    courseSelect.innerHTML = `
        <option value="">Select Course</option>
    `;

    studentId.focus();

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

let refreshInterval = setInterval(() => {

    if (document.visibilityState === "visible") {

        loadStudents();

    }

}, 30000);

// =======================================
// Logout Helper
// =======================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}

// =======================================
// Detect Expired Session
// =======================================

window.addEventListener("storage", (event) => {

    if (event.key === "token" && !event.newValue) {

        logout();

    }

});

// =======================================
// Prevent Form Resubmission
// =======================================

window.history.replaceState(null, null, window.location.href);

// =======================================
// Console
// =======================================

console.log("=================================");
console.log("Student Management Module Loaded");
console.log("Authentication : Enabled");
console.log("CRUD Operations : Enabled");
console.log("Search : Enabled");
console.log("Auto Refresh : Enabled");
console.log("=================================");