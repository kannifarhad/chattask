# 💬 Real-Time Messaging Frontend

A performant and responsive real-time messaging frontend built with **React**, **TypeScript**, and **Material UI (MUI)**. This application connects to a socket server for live message updates, supports infinite scrolling with virtualized lists using `@tanstack/react-virtual`, and is powered by **Vite** for fast development and optimized builds.

---

## ✨ Features

- ✅ **Live message updates** via WebSocket
- 🔄 **Infinite scroll** for historical messages
- ⚡ **Virtualized list** for fast rendering of large message sets
- 🧠 **Auto-scroll** with "New Messages" indicator
- 🎨 **Material UI** components for consistent design
- 🚀 **Vite** for lightning-fast development and builds

---

## 🛠 Tech Stack

- **React** (with Hooks)
- **TypeScript**
- **Material UI (MUI)**
- **Vite** (development & build tool)
- **@tanstack/react-virtual** for efficient rendering
- **WebSocket** (real-time updates via context)
- **Axios** for backend API communication

---

## ⚙️ Functionality

- 🔐 **Login with username**
- 💬 **Live Chat**
  - Real-time messaging
  - Logout functionality
  - View list of online users
  - See who is currently typing
  - Optimized message list using virtualization
  - Load older messages on scroll (infinite loading)
  - Auto-scroll behavior with a **"New Messages"** button when scrolled up
  - Notifications when a user joins or leaves the chat

---

## 🧩 State Management

- The global state is currently managed using **React Context API**.
- For larger or production-grade applications, this can be replaced with **Zustand** or **Redux Toolkit (RTK)** for better scalability and debugging support.

---

## ✅ Testing

- 🧪 **End-to-End tests** are written using **Jest**.
- 📌 In future iterations, the following can be added:
  - **Storybook** for UI component development and testing
  - **Cypress** for full E2E testing with UI interaction

---

## 🚀 Usage

### 📦 Install dependencies

```bash
npm install
```

### 🧪 Run in development mode

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### 🔨 Build for production

```bash
npm run build
```

### 🔍 Preview production build locally

```bash
npm run preview
```

---
