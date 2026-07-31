const API_URL = `${BASE_URL}/departments`;
const token = localStorage.getItem("token");

const form = document.getElementById("departmentForm");
const container = document.getElementById("departmentContainer");
const search = document.getElementById("departmentSearch");

let editingId = null;

// Redirect if not logged in
if (!token) {
    window.location.href = "login.html";
}

// ===========================
// Load Departments
// ===========================

async function loadDepartments() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const departments = await response.json();

        displayDepartments(departments);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load departments");

    }

}

loadDepartments();

// ===========================
// Display Departments
// ===========================

function displayDepartments(departments) {

    container.innerHTML = "";

    if (departments.length === 0) {

        container.innerHTML = "<h3>No Departments Found</h3>";

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

// ===========================
// Add / Update Department
// ===========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const department = {

        departmentName: departmentName.value.trim(),

        departmentCode: departmentCode.value.trim(),

        hod: hod.value.trim(),

        description: description.value.trim()

    };

    try {

        if (editingId) {

            await fetch(`${API_URL}/${editingId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(department)

            });

            alert("Department Updated Successfully");

            editingId = null;

        }

        else {

            await fetch(API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(department)

            });

            alert("Department Added Successfully");

        }

        form.reset();

        loadDepartments();

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong");

    }

});

// ===========================
// Edit Department
// ===========================

async function editDepartment(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const department = await response.json();

        departmentName.value = department.departmentName;

        departmentCode.value = department.departmentCode;

        hod.value = department.hod;

        description.value = department.description;

        editingId = id;

    }

    catch (error) {

        console.error(error);

    }

}

// ===========================
// Delete Department
// ===========================

async function deleteDepartment(id) {

    if (!confirm("Delete this department?")) {

        return;

    }

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        alert("Department Deleted");

        loadDepartments();

    }

    catch (error) {

        console.error(error);

    }

}

// ===========================
// Search
// ===========================

search.addEventListener("keyup", async () => {

    const response = await fetch(API_URL, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const departments = await response.json();

    const keyword = search.value.toLowerCase();

    const filtered = departments.filter(department =>

        department.departmentName.toLowerCase().includes(keyword) ||

        department.departmentCode.toLowerCase().includes(keyword) ||

        department.hod.toLowerCase().includes(keyword)

    );

    displayDepartments(filtered);

});