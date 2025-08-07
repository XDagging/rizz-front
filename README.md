# rizz-front 🎯

TooManyHeys is the **SAT—but for dating**. It tests your "game" through a structured exam that mirrors the real SAT experience, but swaps algebra and vocab for charm and execution. The app looks just like Bluebook™ and includes:

- 🧠 **20 multiple choice questions** — assess your dating intuition
- 📱 **3 DM scenarios** — craft the perfect openers in realistic dating app chats
- 🗣️ **1 live oral section** — talk your way through a one-on-one voice prompt

This is the frontend repo for the project. The backend can be found here:  
👉 [`rizz-back`](https://github.com/XDagging/rizz-back)

Built with **Vite**, **React**, and **TypeScript**.

---

## 🧪 Live Site

[https://toomanyheys.com](https://toomanyheys.com)

---

## 🚀 Features

- Full SAT-style interface inspired by Bluebook
- Real-time scoring across two categories:  
  - **Charm** (attraction, charisma, personality)  
  - **Execution** (real-world application of charm)
- Seamless WebSocket connection to backend for voice interactions
- Chat simulations with sliding DMs
- Clean, fast UI with Vite + React

---

## 🧰 Tech Stack

- Frontend: Vite + React + TypeScript
- Backend: Express (TypeScript) — [`rizz-back`](https://github.com/XDagging/rizz-back)
- WebSockets for live voice interactions
- State managed with React Context + custom hooks

---

## 🛠️ Local Setup

### 1. Clone the repos

```bash
git clone https://github.com/XDagging/rizz-front.git
git clone https://github.com/XDagging/rizz-back.git
```

⚙️ Frontend Setup (rizz-front)
Prerequisites
Node.js (v18 or higher)

pnpm (or npm/yarn)

Install dependencies
```bash
cd rizz-front
pnpm install
```
Run the dev server
```bash
pnpm run dev
```
Environment Variables

Create a .env file in rizz-front:

```bash
VITE_BACKEND_URL=http://localhost:3000
```
🧩 Backend Setup (rizz-back)

 Here's a quickstart:

Prerequisites
Node.js (v18 or higher)

PostgreSQL or another DB (if used)

pnpm (or npm/yarn)

Install dependencies
```bash
cd rizz-back
pnpm install

```

Run dev server
```bash
pnpm run dev
```

Environment Variables
In the root of rizz-back, add a .env:

PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
# Add other backend secrets here

🧪 Testing
Both frontend and backend should be running locally.

Frontend: http://localhost:5173

Backend: http://localhost:3000

The frontend uses WebSocket or HTTP requests depending on the test section you're in.

🧠 Contributing
If you have ideas for new question types, improvements, or just want to help push dating science forward — PRs welcome!

📝 License
MIT — do whatever you want, just don’t ghost us.

💌 Contact
Built by @XDagging
Email: sniphomes@gmail.com