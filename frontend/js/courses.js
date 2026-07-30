const form=document.getElementById("courseForm");

const table=document.querySelector("#courseTable tbody");

const search=document.getElementById("searchCourse");

let courses=JSON.parse(localStorage.getItem("courses")) || [];

function displayCourses(list){

table.innerHTML="";

list.forEach((course,index)=>{

table.innerHTML+=`

<tr>

<td>${course.code}</td>

<td>${course.name}</td>

<td>${course.faculty}</td>

<td>${course.credits}</td>

<td>

<button class="edit-btn" onclick="editCourse(${index})">

Edit

</button>

<button class="delete-btn" onclick="deleteCourse(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

displayCourses(courses);

form.addEventListener("submit",(e)=>{

e.preventDefault();

const course={

code:courseCode.value,

name:courseName.value,

faculty:courseFaculty.value,

credits:courseCredits.value

};

courses.push(course);

localStorage.setItem("courses",JSON.stringify(courses));

displayCourses(courses);

form.reset();

});

function deleteCourse(index){

if(confirm("Delete Course?")){

courses.splice(index,1);

localStorage.setItem("courses",JSON.stringify(courses));

displayCourses(courses);

}

}

function editCourse(index){

const c=courses[index];

courseCode.value=c.code;

courseName.value=c.name;

courseFaculty.value=c.faculty;

courseCredits.value=c.credits;

courses.splice(index,1);

localStorage.setItem("courses",JSON.stringify(courses));

displayCourses(courses);

}

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=courses.filter(course=>

course.name.toLowerCase().includes(value)

||

course.code.toLowerCase().includes(value)

);

displayCourses(filtered);

});