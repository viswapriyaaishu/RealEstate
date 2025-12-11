# Real Estate Application

A full-stack **Real Estate Web Application** with a modern frontend built in **React + Vite** and a backend powered by **Node.js + Express**. The app supports user authentication, property listings, and real-time 1-to-1 chat using **Socket.IO**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication** using JWT
- **Password Hashing** with bcrypt
- **Real-Time Chat** (1-to-1 messaging) using Socket.IO
- **Property Listings** with search and filters
- **Profile Management** (update info, profile picture)
- **Interactive Maps** for property locations
- **Notifications** using Zustand state management

---

## Tech Stack

**Frontend:**

- React 19 + Vite
- React Router v6
- Leaflet for interactive maps
- Framer Motion for animations
- Zustand for state management
- Sass for styling
- Socket.IO client for chat

**Backend:**

- Node.js + Express
- Prisma ORM
- JWT for authentication
- Bcrypt for password hashing
- Socket.IO for real-time communication
- CORS & Cookie Parser

---

## Project Structure

### Frontend
```text
frontend/
├─ public/
├─ src/
│  ├─ components/   # Card, Map, Navbar, Searchbar, Widget
│  ├─ context/      # AuthContext, SocketContext, NotificationStore
│  ├─ loaders/      # loader.jsx
│  ├─ routes/       # AddPost, Homepage, Layout, ListItem, ListPage, Profile, ProfileUpdate, SignIn, SignUp
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.scss
│  └─ App.scss
```


### Backend
```text
backend/
├─ prisma/        # Prisma schema & migrations
├─ routes/        # auth, chat, post, message, user
├─ middleware/    # Verify user/admin
├─ lib/           # Initialize Prisma client
├─ controller/    # auth, chat, post, message, user
├─ index.js       # Entry point with Express & Socket.IO setup
├─ package.json

```

### To run frontend locally
```bash
cd frontend
npm install
npm run dev

```

### To run backend locally
```bash
cd backend
npm install
# create .env with your environment variables
npm start
```

### Usage

```text
1.Register a new account or sign in.

2.Browse property listings on the homepage.

3.Add new properties if logged in.

4.Chat with other users in real-time via 1-to-1 messaging.

5.Update your profile, manage listings, and view notifications.
```


### Contributing

```text
Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature-name)

Create a Pull Request
```

### License

This project is licensed under the MIT License.
