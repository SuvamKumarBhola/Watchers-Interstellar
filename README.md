# 🌌 Cosmic Watch  
### Real-Time Near-Earth Object (NEO) Monitoring & Risk Analysis Platform

---

## 📌 Overview

**Cosmic Watch** is a full-stack web platform designed to simplify and democratize access to **Near-Earth Object (NEO)** data.  
While space agencies like NASA publish highly accurate asteroid datasets, the data is often **too complex, raw, or inaccessible** for the general public, students, and independent researchers.

Cosmic Watch bridges this gap by converting raw orbital data into **actionable insights**, **risk scores**, and **visual alerts**, all within a secure and user-friendly dashboard.

---

## 🚀 Problem Statement

Thousands of asteroids pass close to Earth every day.  
Although agencies like NASA track them using advanced systems, **there is no localized, intuitive platform** that:

- Explains asteroid risks in simple terms  
- Allows users to track specific objects  
- Provides real-time alerts for close approaches  
- Visualizes data in a meaningful way  

This lack of accessibility limits **public awareness, scientific curiosity, and early-stage research exploration**.

---

## 💡 Our Solution

Cosmic Watch is a **scalable, containerized, full-stack web application** that:

- Fetches **live asteroid data** from NASA’s NeoWs API  
- Analyzes asteroid parameters to calculate **risk levels**  
- Allows users to **track and monitor specific asteroids**  
- Displays asteroid velocity, distance, size, and hazard status  
- Sends **dashboard alerts** for upcoming close approaches  

The platform focuses on **clarity, performance, and real-world usability**, not just raw data display.

---

## 🧠 Key Features

### 🔐 User Authentication
- Secure login & registration
- JWT-based authentication
- Users can save and manage a personal asteroid watchlist

### ☄️ Real-Time Asteroid Data
- Live integration with NASA NeoWs API
- Displays:
  - Asteroid name & ID  
  - Estimated diameter  
  - Relative velocity  
  - Miss distance from Earth  
  - Hazardous classification  

### ⚠️ Risk Analysis Engine
- Categorizes asteroids based on:
  - Diameter thresholds  
  - Miss distance  
  - Hazardous flag from NASA  
- Generates an easy-to-understand **risk score**
- Focuses on clarity over scientific overload

### 🔔 Alert & Notification System
- Automatically flags upcoming close-approach events
- Personalized alerts based on user watchlist
- Dashboard-based notification system

### 📊 Interactive Dashboard
- Clean, space-themed dark UI
- Responsive layout for all screen sizes
- Clear data visualization and filtering

### 🐳 Containerized Deployment
- Fully Dockerized setup
- `docker-compose.yml` orchestrates:
  - Frontend  
  - Backend  
  - Database  

---

## 🏗️ System Architecture


- Frontend and backend are **fully decoupled**
- RESTful API design
- Scalable and deployment-ready architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Responsive Dark UI (Space Theme)

### Backend
- Node.js
- Express.js
- JWT Authentication
- RESTful APIs

### Database
- MongoDB
- Mongoose ODM

### DevOps & Tools
- Docker & Docker Compose
- Git & GitHub
- Postman (API documentation & testing)

### External APIs
- **NASA NeoWs (Near Earth Object Web Service)**

---

## 📁 Project Structure

cosmic-watch/
│
├── frontend/
│ ├── src/
│ ├── components/
│ └── pages/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ └── models/
│
├── docker-compose.yml
├── README.md
└── AI-LOG.md


---

## 📬 API Documentation

A **fully documented Postman Collection** is included in the repository covering:

- Authentication routes
- Asteroid feed endpoints
- Watchlist management
- User profile endpoints

Environment variables and test cases are provided for easy testing.

---

## 🤖 AI Usage Disclosure

This project follows strict hackathon guidelines.

- AI tools were used **only for assistance**, not code replacement  
- All AI interactions are transparently documented in `AI-LOG.md`  
- Core logic, architecture, and implementation were done manually  

---

## 🎯 Hackathon Alignment

Cosmic Watch was built **entirely within the hackathon timeframe**, adhering to all rules:

- Original code only  
- Clear frontend/backend separation  
- Secure authentication practices  
- Dockerized deployment  
- Git-based version control with meaningful commits  

---

## 🔮 Future Enhancements

- 🌍 3D orbital visualization using Three.js  
- 💬 Real-time community chat using WebSockets  
- 📧 Email / push notifications  
- 📈 Advanced risk prediction models  
- 🌐 Multi-language support  

---

## 🏁 Conclusion

Cosmic Watch transforms complex astronomical datasets into **clear, usable intelligence**.  
It empowers users to explore space data responsibly while promoting **scientific awareness and planetary safety**.

This project demonstrates strong **full-stack engineering, API integration, system design, and deployment readiness** within real-world constraints.

---

### 👨‍🚀 Team: *[Your Team Name]*  
### 🏆 Hackathon Submission 2026
