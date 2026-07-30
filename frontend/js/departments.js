/* ==========================================
   Departments - MongoDB Version
========================================== */

const API = "http://localhost:5000/api/departments";

// GitHub Codespaces
// const API="https://YOUR-CODESPACE-5000.app.github.dev/api/departments";

const token = localStorage.getItem("token");

const container = document.getElementById("departmentContainer");

const searchBox = document.getElementById("departmentSearch");

// --------------------
// Load Departments
// --------------------

async function loadDepartments() {

    try {

        const response = await fetch(API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const departments = await response.json();

        displayDepartments(departments);

    }

    catch (err) {

        console.log(err);

    }

}

loadDepartments();

// --------------------
// Display
// --------------------

function displayDepartments(departments) {

    container.innerHTML = "";

    departments.forEach(department => {

        container.innerHTML += `

        <div class="department-box">

            <i class="fa-solid fa-building"></i>

            <h2>${department.departmentName}</h2>

            <p>

                <strong>HOD:</strong>

                ${department.hod}

            </p>

            <p>

                Department ID:

                ${department.departmentId}

            </p>

        </div>

        `;

    });

}

// --------------------
// Search
// --------------------

searchBox.addEventListener("keyup", async () => {

    const response = await fetch(API, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const departments = await response.json();

    const value = searchBox.value.toLowerCase();

    const filtered = departments.filter(department =>

        department.departmentName.toLowerCase().includes(value)

    );

    displayDepartments(filtered);

});