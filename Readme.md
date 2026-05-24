# Tenant Bill Management System

A full-stack tenant bill management system that helps owner to manage tenants, rent payments, electricity bills, and analytics dashboards.

---

## Features

- Admin Authentication
- Create / Read / Update / Delete functionality
- Dashboard Analytics
- Search & Filter
- Responsive UI
- API Integration
- Form Validation
- Error Handling
- Protected Routes
- Database Management

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- sadcn/ui
- React Router DOM
- TanStack Query
- Axios
- Recharts

### Backend
- Node.js / Express.js  

### Database
- MongoDB 

### Other Tools
- Git & GitHub
- Postman
- JWT Authentication
- Vite
- pnpm / npm

---

## 📂 Project Structure

```bash
project-root/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── configs/
│   ├── features/
│   ├── models/
│   ├── middleware/
│   ├── app.js
│   └── server.js
│
└── README.md
```

### To Run This Project
📌 Prerequisites

Make sure you have installed:

Node.js (v16+ recommended)
npm or pnpm
Git

Check Node version:

node -v

If Node is not installed, download it from:
https://nodejs.org

📥 1. Clone the Repository
git clone <your-repo-url>
cd project-name

⚙️ 2. Environment Variables Setup

You need .env files in both frontend and backend.

📌 Backend .env

Create:

backend/.env

👉 Check .env.example

📌 Frontend .env

Create:

frontend/.env

👉 Check .env.example

📦 3. Install Dependencies
Frontend
cd frontend
pnpm install

Backend
cd backend
npm install

▶️ 4. Run the Project
Start Backend
npm run dev

👉 On first run:

System checks if admin exists
If not, it automatically creates a default admin user.

Open a new terminal:

cd frontend
pnpm run dev