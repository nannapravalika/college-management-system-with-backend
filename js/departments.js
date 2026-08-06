const API_URL = `${BASE_URL}/departments`;
const token = localStorage.getItem("token");

const form = document.getElementById("departmentForm");
const container = document.getElementById("departmentContainer");
const search = document.getElementById("departmentSearch");

let editingId = null;

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
// Load Departments
// =======================================

async function loadDepartments() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const departments = data.departments || data;

        displayDepartments(departments);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load departments.");

    }

}

loadDepartments();
// =======================================
// Display Departments
// =======================================

function displayDepartments(departments) {

    container.innerHTML = "";

    if (!departments || departments.length === 0) {

        container.innerHTML = `
            <h3 style="text-align:center;">
                No Departments Found
            </h3>
        `;

        return;

    }

    departments.forEach(department => {

        container.innerHTML += `

            <div class="department-box">

                <i class="fa-solid fa-building"></i>

                <h2>${department.departmentName}</h2>

                <p><strong>Code :</strong> ${department.departmentCode}</p>

                <p><strong>HOD :</strong> ${department.hod}</p>

                <p>${department.description}</p>

                <br>

                <button
                    class="edit-btn"
                    onclick="editDepartment('${department._id}')">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteDepartment('${department._id}')">

                    Delete

                </button>

            </div>

        `;

    });

}

// =======================================
// Add / Update Department
// =======================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const department = {

        departmentName: departmentName.value.trim(),

        departmentCode: departmentCode.value.trim(),

        hod: hod.value.trim(),

        description: description.value.trim()

    };

    if (

        !department.departmentName ||

        !department.departmentCode ||

        !department.hod ||

        !department.description

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

                `${API_URL}/${editingId}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(department)

                }

            );

        } else {

            response = await fetch(

                API_URL,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(department)

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

        loadDepartments();

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
// Edit Department
// =======================================

async function editDepartment(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const department = data.department || data;

        editingId = department._id;

        departmentName.value = department.departmentName;
        departmentCode.value = department.departmentCode;
        hod.value = department.hod;
        description.value = department.description;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load department.");

    }

}

// =======================================
// Delete Department
// =======================================

async function deleteDepartment(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${API_URL}/${id}`, {

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

        loadDepartments();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete department.");

    }

}

// =======================================
// Search Departments
// =======================================

search.addEventListener("keyup", async () => {

    const keyword = search.value.trim();

    try {

        const response = await fetch(

            `${API_URL}?search=${encodeURIComponent(keyword)}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        if (handleUnauthorized(response)) return;

        const data = await response.json();

        const departments = data.departments || data;

        displayDepartments(departments);

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

    departmentName.focus();

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
// Auto Refresh
// =======================================

setInterval(() => {

    if (document.visibilityState === "visible") {

        loadDepartments();

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
console.log("Department Management Loaded");
console.log("Authentication : Enabled");
console.log("CRUD Operations : Enabled");
console.log("Search : Enabled");
console.log("Auto Refresh : Enabled");
console.log("=================================");