# 💬 Full-Stack Real-Time Chat Application

This is a **full-stack real-time chat application** built with **NestJS (backend)** and **React (frontend)**. It supports live messaging via WebSockets, infinite scroll, virtualized message rendering, and modern architecture practices.

---

## 🧱 Project Structure

```
/
├── backend/      → NestJS server (WebSocket + REST API + Prisma)
├── frontend/     → React app (MUI + WebSocket + virtualized list)
└── README.md     → You're here!
```

---

## 🚀 Tech Stack

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)


---

## 📦 Setup

### 🔧 Requirements
- Node.js `>=20`
- Docker (optional)

---

## 🛠 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/kannifarhad/chattask.git
cd realtime-chat
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run start:dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```


This will start:
- NestJS API at `http://localhost:9000`
- React app at `http://localhost:3000`

