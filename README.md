# 🎓 College Management System

A full-stack **College Management System** developed using **Node.js, Express.js, MongoDB, and JavaScript**. The application provides a secure platform for managing students, departments, and courses with authentication, authorization, and a responsive user interface.

---

# 📌 Project Overview

The College Management System is designed to simplify the administration of academic information. It allows administrators to securely manage student records, departments, and courses through a centralized dashboard.

The project follows the **MVC (Model-View-Controller)** architecture and implements RESTful APIs for efficient communication between the frontend and backend.

---

# 🚀 Features

### Authentication & Security

* JWT Authentication
* Secure Login System
* Password Hashing using bcryptjs
* Protected Routes
* Role-based User Model
* Helmet Security Middleware
* CORS Enabled

---

### Student Management

* Add Student
* View Students
* Update Student
* Delete Student
* Search Students
* Assign Department
* Assign Course

---

### Department Management

* Add Department
* View Departments
* Edit Department
* Delete Department
* Search Departments

---

### Course Management

* Add Course
* View Courses
* Update Course
* Delete Course
* Search Courses
* Assign Courses to Departments

---

### Dashboard

* Total Students
* Total Departments
* Total Courses
* Recently Added Students

---

# 🛠️ Technologies Used

## Frontend

* HTML5
* CSS3
* JavaScript (ES6)

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose ODM

## Authentication

* JSON Web Token (JWT)
* bcryptjs

## Middleware

* Express JSON
* CORS
* Helmet
* Morgan

## Development Tools

* Nodemon
* Git
* GitHub
* Visual Studio Code / GitHub Codespaces

---

# 📁 Project Structure

```
college-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seedAdmin.js
│   └── .env
│
├── css/
├── js/
├── images/
│
├── index.html
├── login.html
├── dashboard.html
├── students.html
├── departments.html
├── courses.html
│
├── package.json
└── README.md
```

---

# 🗄️ Database Collections

* Users
* Students
* Departments
* Courses

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

---

## Students

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/students`     |
| GET    | `/api/students/:id` |
| POST   | `/api/students`     |
| PUT    | `/api/students/:id` |
| DELETE | `/api/students/:id` |

---

## Departments

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | `/api/departments`     |
| GET    | `/api/departments/:id` |
| POST   | `/api/departments`     |
| PUT    | `/api/departments/:id` |
| DELETE | `/api/departments/:id` |

---

## Courses

| Method | Endpoint                                |
| ------ | --------------------------------------- |
| GET    | `/api/courses`                          |
| GET    | `/api/courses/:id`                      |
| GET    | `/api/courses/department/:departmentId` |
| POST   | `/api/courses`                          |
| PUT    | `/api/courses/:id`                      |
| DELETE | `/api/courses/:id`                      |

---

## Dashboard

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/dashboard` |

---

# 🔒 Security Features

* JWT Authentication
* Password Encryption using bcryptjs
* Protected API Routes
* Input Validation
* Error Handling
* Helmet Security Headers
* CORS Configuration

---

# 📊 Database Relationships

```
Department
      │
      ├───────────────┐
      │               │
      ▼               ▼
 Course           Student
      ▲               ▲
      └───────────────┘
```

Each student belongs to:

* One Department
* One Course

Each course belongs to:

* One Department

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/nannapravalika/college-management-system-with-backend.git
```

---

## Navigate to Backend

```bash
cd backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Start Development Server

```bash
npm run dev
```

---

The server will run at:

```
http://localhost:5000
```

---

# 👤 Default Admin Login

The application automatically creates an administrator account using the `seedAdmin.js` script.

Use the credentials configured in your seed script to log in after the first server start.

---

# 📷 Screenshots

Add screenshots here before submitting:

* Home Page
* Login Page
* Dashboard
* Student Management
* Department Management
* Course Management

---

# 📈 Future Enhancements

* Faculty Management
* Library Management
* Attendance Management
* Student Profile Images
* Report Generation (PDF)
* Email Notifications
* Role-Based Access Control for Faculty
* Data Export to Excel

---

# 👨‍💻 Author

**Pravalika Nanna**

Bachelor of Technology (Computer Science & Engineering)

---

# 📄 License

This project is developed for academic and educational purposes.
