# 📘 College Management System - API Documentation

## Base URL

```text
http://localhost:5000/api
```

---

# Authentication

## Register User

**Endpoint**

```http
POST /auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

**Status Code:** `201 Created`

```json
{
  "success": true,
  "message": "Registration Successful"
}
```

---

## Login User

**Endpoint**

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

### Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "66xxxxxxxxxxxx",
    "name": "Administrator",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

---

# Student API

> **Authorization Required**

```
Bearer Token
```

---

## Get All Students

```http
GET /students
```

### Success Response

```json
[
  {
    "_id": "...",
    "studentId": "S001",
    "studentName": "Rahul",
    "studentEmail": "rahul@gmail.com",
    "studentPhone": "9876543210",
    "department": {
      "_id": "...",
      "departmentName": "Computer Science"
    },
    "course": {
      "_id": "...",
      "courseName": "B.Tech CSE"
    }
  }
]
```

---

## Get Single Student

```http
GET /students/:id
```

---

## Add Student

```http
POST /students
```

### Request Body

```json
{
  "studentId": "S101",
  "studentName": "Rahul",
  "studentEmail": "rahul@gmail.com",
  "studentPhone": "9876543210",
  "department": "departmentObjectId",
  "course": "courseObjectId"
}
```

---

## Update Student

```http
PUT /students/:id
```

### Request Body

```json
{
  "studentName": "Rahul Sharma",
  "studentPhone": "9876543211"
}
```

---

## Delete Student

```http
DELETE /students/:id
```

### Success Response

```json
{
  "message": "Student deleted successfully"
}
```

---

# Department API

> **Authorization Required**

```
Bearer Token
```

---

## Get All Departments

```http
GET /departments
```

---

## Get Department

```http
GET /departments/:id
```

---

## Create Department

```http
POST /departments
```

### Request Body

```json
{
  "departmentName": "Computer Science",
  "departmentCode": "CSE",
  "hod": "Dr. Smith",
  "description": "Computer Science Department"
}
```

---

## Update Department

```http
PUT /departments/:id
```

---

## Delete Department

```http
DELETE /departments/:id
```

---

# Course API

> **Authorization Required**

```
Bearer Token
```

---

## Get All Courses

```http
GET /courses
```

---

## Get Course

```http
GET /courses/:id
```

---

## Get Courses by Department

```http
GET /courses/department/:departmentId
```

---

## Create Course

```http
POST /courses
```

### Request Body

```json
{
  "courseCode": "CS101",
  "courseName": "Data Structures",
  "credits": 4,
  "department": "departmentObjectId"
}
```

---

## Update Course

```http
PUT /courses/:id
```

---

## Delete Course

```http
DELETE /courses/:id
```

---

# Dashboard API

> **Authorization Required**

```
Bearer Token
```

---

## Get Dashboard Statistics

```http
GET /dashboard
```

### Success Response

```json
{
  "success": true,
  "totalStudents": 25,
  "totalDepartments": 5,
  "totalCourses": 12,
  "recentStudents": [
    {
      "studentId": "S001",
      "studentName": "Rahul",
      "department": {
        "departmentName": "Computer Science"
      },
      "course": {
        "courseName": "Data Structures"
      }
    }
  ]
}
```

---

# Authentication Header

All protected endpoints require the following HTTP header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# HTTP Status Codes

| Status Code | Description                   |
| ----------- | ----------------------------- |
| 200         | Request Successful            |
| 201         | Resource Created Successfully |
| 400         | Bad Request                   |
| 401         | Unauthorized                  |
| 404         | Resource Not Found            |
| 500         | Internal Server Error         |

---

# Project Architecture

```
Client (HTML/CSS/JavaScript)
            │
            ▼
Express.js REST API
            │
            ▼
Controllers
            │
            ▼
Mongoose Models
            │
            ▼
MongoDB Atlas
```

---

# Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Helmet
* Morgan
* CORS

---

# Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Request Validation
* Error Handling
* Helmet Security Headers
* CORS Configuration

 