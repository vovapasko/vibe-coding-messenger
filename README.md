# 📨 Real-Time Collaboration App (MVP)

## 🧠 Overview

This project is a real-time messaging platform built with **React (frontend)** and **Kotlin (backend)**. It allows authenticated users to send and receive messages instantly. The goal is to create a clean, interactive MVP that can be expanded later with advanced security and messaging features.

---

## 🚀 Tech Stack

- **Frontend**: React (TypeScript)
- **Backend**: Kotlin (Ktor preferred, Spring Boot optional)
- **Communication**: WebSocket (real-time messaging)
- **Optional**: Docker, Material UI or Tailwind for styling

---

## 🎯 Core Goals (v1.0)

- Real-time, bidirectional messaging
- Basic user authentication
- Message history
- Clean and responsive web UI
- MVP-ready for real-world use and further extension

---

## ✅ Features

### Frontend (React)
- [ ] Login form (username + password)
- [ ] Registration form
- [ ] Chat interface:
  - [ ] Real-time message display
  - [ ] Message input & send button
  - [ ] Timestamps and sender tags
  - [ ] Auto-scroll to latest message
- [ ] User online status (basic)
- [ ] Responsive and clean design

### Backend (Kotlin)
- [ ] REST API for user registration and login
- [ ] JWT or session-based authentication
- [ ] WebSocket endpoint for real-time chat
  - [ ] Accepts authenticated clients
  - [ ] Broadcasts messages to all users
  - [ ] Tracks connected users
- [ ] Endpoint to fetch latest 50 messages
- [ ] Basic in-memory message store or lightweight DB

---

## 🔒 Security (v2.0 — Planned)

Security features to be implemented post-MVP:

- [ ] Password hashing (bcrypt or similar)
- [ ] JWT with expiration & refresh logic
- [ ] Secure WebSocket (WSS) support
- [ ] Rate limiting and anti-spam checks
- [ ] Role-based access (admin, user)
- [ ] Input sanitization (prevent XSS)
- [ ] Optional message encryption (E2E or at-rest)

---

## 💡 Stretch Features (Future Roadmap)

- [ ] 1-on-1 private chats
- [ ] Group/channel support
- [ ] Typing indicators
- [ ] Message editing/deletion
- [ ] Push notifications
- [ ] File/image sharing

---

## 📦 Deliverables

- [ ] GitHub repo with full code (frontend + backend)
- [ ] Setup instructions in README
- [ ] Optional Docker support
- [ ] Light test coverage

---

## 📅 Suggested Timeline

| Week | Focus |
|------|-------|
| 1 | Auth + WebSocket setup |
| 2 | Frontend chat UI + message integration |
| 3 | Online users + performance tweaks |
| 4 | Refactoring, cleanup, prep for v2.0 |

---

## 📝 License

This project is currently under development. Licensing will be added upon public release.
