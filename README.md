# 📢 Community-Hub - Curated Feed Aggregator App

Community-Hub is a full-stack web application that delivers curated social media content (from Twitter, LinkedIn, Reddit, etc.) in a clean, personalized feed. Users can save, share, and report content — with a built-in reward and premium access system.

Built using the **MERN Stack**: React.js + Node.js + Express + MongoDB.

---

## 🚀 Features

- 📰 Browse curated feeds from social platforms
- 🔒 Premium feeds lock/unlock logic
- 💾 Save feeds for later
- 📤 Share feeds and earn credits
- 🚨 Report inappropriate content
- 🔐 JWT-based authentication
- 📊 MongoDB tracks reports, saves, shares

---

## 🛠 Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT
- **Other**: dotenv, bcrypt, middleware, MVC pattern

---

## 🌐 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/feed/` | Get all feeds (locked/unlocked based on user) |
| `POST` | `/api/feed/save/:id` | Save a feed |
| `POST` | `/api/feed/share/:id` | Share a feed (adds credits) |
| `POST` | `/api/feed/report/:id` | Report a feed |
| `POST` | `/api/feed/create` | Add a new feed (admin use) |

> 🔐 All endpoints are secured and require `Authorization: Bearer <token>` header.

---

✨ Future Improvements
 Admin dashboard to manage reports and feeds

 Feed unlock using earned credits

 Push notifications / email alerts

 Feed filtering & sorting

 Mobile-first redesign

 ---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dhruvsaboo1805/Community_Hub.git

📄 License
This project is licensed under the MIT License.


