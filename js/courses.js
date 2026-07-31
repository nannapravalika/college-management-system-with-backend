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

// ==========================
// Load Departments
// ==========================

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

// ==========================
// Load Courses
// ==========================

async function loadCourses() {

    try {

        const response = await fetch(COURSE_API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const courses = await response.json();

        displayCourses(courses);

    }

    catch (error) {

        console.log(error);

    }

}

loadDepartments();

loadCourses();

// ==========================
// Display Courses
// ==========================

function displayCourses(courses) {

    table.innerHTML = "";

    if (courses.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="5">

                No Courses Found

            </td>

        </tr>

        `;

        return;

    }

    courses.forEach(course => {

        table.innerHTML += `

        <tr>

            <td>${course.courseCode}</td>

            <td>${course.courseName}</td>

            <td>${course.credits}</td>

            <td>${course.department.departmentName}</td>

            <td>

                <button

                    class="edit-btn"

                    onclick="editCourse('${course._id}')">

                    Edit

                </button>

                <button

                    class="delete-btn"

                    onclick="deleteCourse('${course._id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================
// Save Course
// ==========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const course = {

        courseCode: courseCode.value,

        courseName: courseName.value,

        credits: credits.value,

        department: department.value

    };

    try {

        if (editingId) {

            await fetch(`${COURSE_API}/${editingId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(course)

            });

            alert("Course Updated");

            editingId = null;

        }

        else {

            await fetch(COURSE_API, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(course)

            });

            alert("Course Added");

        }

        form.reset();

        loadCourses();

    }

    catch (error) {

        console.log(error);

    }

});

// ==========================
// Edit Course
// ==========================

async function editCourse(id) {

    try {

        const response = await fetch(`${COURSE_API}/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const course = await response.json();

        courseCode.value = course.courseCode;

        courseName.value = course.courseName;

        credits.value = course.credits;

        department.value = course.department._id;

        editingId = id;

    }

    catch (error) {

        console.log(error);

    }

}

// ==========================
// Delete Course
// ==========================

async function deleteCourse(id) {

    if (!confirm("Delete Course?")) {

        return;

    }

    try {

        await fetch(`${COURSE_API}/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        alert("Course Deleted");

        loadCourses();

    }

    catch (error) {

        console.log(error);

    }

}

// ==========================
// Search
// ==========================

search.addEventListener("keyup", async () => {

    const response = await fetch(COURSE_API, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const courses = await response.json();

    const keyword = search.value.toLowerCase();

    const filtered = courses.filter(course =>

        course.courseName.toLowerCase().includes(keyword)

        ||

        course.courseCode.toLowerCase().includes(keyword)

        ||

        course.department.departmentName.toLowerCase().includes(keyword)

    );

    displayCourses(filtered);

});