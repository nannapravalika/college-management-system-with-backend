/* ==========================================
   Departments Page JavaScript
   Vertex Institute of Technology
========================================== */

// Highlight department cards on click

const departmentCards = document.querySelectorAll(".department-box");

departmentCards.forEach(card => {

    card.addEventListener("click", () => {

        departmentCards.forEach(item => {

            item.classList.remove("selected");

        });

        card.classList.add("selected");

    });

});

// Simple Search (Optional)

const searchBox = document.getElementById("departmentSearch");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        departmentCards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

console.log("Departments Page Loaded Successfully");