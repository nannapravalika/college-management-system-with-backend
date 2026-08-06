const COURSE_API = `${BASE_URL}/courses`;
const DEPARTMENT_API = `${BASE_URL}/departments`;

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const form = document.getElementById("courseForm");
const table = document.querySelector("#courseTable tbody");
const search = document.getElementById("courseSearch");
const departmentSelect = document.getElementById("department");

let editingId = null;

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

async function loadCourses() {

    try {

        const response = await fetch(COURSE_API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const courses = data.courses || data;

        displayCourses(courses);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load courses.");

    }

}

loadDepartments();
loadCourses();
// =======================================
// Edit Course
// =======================================

async function editCourse(id) {

    try {

        const response = await fetch(`${COURSE_API}/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const course = data.course || data;

        editingId = course._id;

        courseCode.value = course.courseCode;
        courseName.value = course.courseName;
        credits.value = course.credits;
        departmentSelect.value = course.department?._id || "";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load course.");

    }

}

// =======================================
// Delete Course
// =======================================

async function deleteCourse(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${COURSE_API}/${id}`, {

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

        loadCourses();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete course.");

    }

}

// =======================================
// Search Courses
// =======================================

search.addEventListener("keyup", async () => {

    const keyword = search.value.trim();

    try {

        const response = await fetch(

            `${COURSE_API}?search=${encodeURIComponent(keyword)}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const courses = data.courses || data;

        displayCourses(courses);

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

    courseCode.focus();

}

// =======================================
// ESC Key Cancels Edit
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

    if (document.visibilityState === "visible") {

        loadCourses();

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
console.log("Course Management Loaded");
console.log("Authentication : Enabled");
console.log("CRUD Operations : Enabled");
console.log("Search : Enabled");
console.log("Auto Refresh : Enabled");
console.log("=================================");