const form=document.getElementById("studentForm");

const table=document.querySelector("#studentTable tbody");

const search=document.getElementById("searchStudent");

let students=JSON.parse(localStorage.getItem("students")) || [];

function displayStudents(list){

table.innerHTML="";

list.forEach((student,index)=>{

table.innerHTML+=`

<tr>

<td>${student.id}</td>

<td>${student.name}</td>

<td>${student.email}</td>

<td>${student.phone}</td>

<td>${student.department}</td>

<td>

<button class="edit-btn" onclick="editStudent(${index})">

Edit

</button>

<button class="delete-btn" onclick="deleteStudent(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

displayStudents(students);

form.addEventListener("submit",(e)=>{

e.preventDefault();

const student={

id:studentId.value,

name:studentName.value,

email:studentEmail.value,

phone:studentPhone.value,

department:department.value

};

students.push(student);

localStorage.setItem("students",JSON.stringify(students));

displayStudents(students);

form.reset();

});

function deleteStudent(index){

if(confirm("Delete Student?")){

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

displayStudents(students);

}

}

function editStudent(index){

const s=students[index];

studentId.value=s.id;

studentName.value=s.name;

studentEmail.value=s.email;

studentPhone.value=s.phone;

department.value=s.department;

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

displayStudents(students);

}

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=students.filter(student=>

student.name.toLowerCase().includes(value)

||

student.id.toLowerCase().includes(value)

);

displayStudents(filtered);

});