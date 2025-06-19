# 🔐 Secure User Authentication System - PRODIGY_FS_02

This project is a full-stack **Secure User Authentication System** built with **MERN Stack** (MongoDB, Express.js, React, Node.js) and styled using **Tailwind CSS**. It provides secure login, registration, role-based access, and JWT-based session handling.

---

## 📌 Features

- 🧾 User registration and login
- 🔑 JWT-based authentication
- 🧂 Passwords hashed using bcrypt
- 🔐 Role-based access control (e.g., User/Admin)
- 🛡️ Protected routes with middleware
- 🎨 Responsive React frontend using Tailwind CSS
- ⚙️ RESTful APIs with Express.js

---

## 🖥️ Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt.js
- dotenv

### Frontend:
- React.js
- Tailwind CSS
- Axios (for API calls)
- React Router DOM



---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vira250/PRODIGY_FS_02.git
cd PRODIGY_FS_02
```
### Set Up Backend

```bash
cd server
npm install
```
Create a .env file in the server directory:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

### Set Up Frontend

```bash
cd fronend
npm install
```
Start the React frontend:

```bash
npm run dev
```

## 📬 API Endpoints (Backend)

| Method | Endpoint         | Description       | Access        |
| ------ | ---------------- | ----------------- | ------------- |
| POST   | `/api/register`  | Register new user | Public        |
| POST   | `/api/login`     | User login        | Public        |
| GET    | `/api/protected` | Protected route   | Authenticated |
| GET    | `/api/admin`     | Admin-only route  | Admin Only    |

## UI Screenshots

### Login Page
<img src= "screenshots/login.jpg" alt ="Login Page" width="300"/>

### Admin Dashboard 
<img src= "screenshots/adminDashboard.jpg" alt ="Admin Dashboard" width="300"/>

### Departments List
<img src= "screenshots/departments.jpg" alt ="Departments List" width="300"/>

### Employee List
<img src= "screenshots/employees.jpg" alt ="Employee List" width="300"/>

## 🔐 Security

Passwords hashed using bcrypt

JWT used for authentication

Protected routes (User/Admin)

Secure storage of environment variables

## ✨ Future Enhancements

🔁 Forgot Password & Reset Flow

📧 Email Verification

📊 Admin Dashboard

🌐 Deploy on Vercel + Render

## 🙋‍♂️ Author

Viraj Jadhav

## 📣 Contributions

Feel free to fork the project, raise issues, or submit pull requests. All contributions are welcome!

