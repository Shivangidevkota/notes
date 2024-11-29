
# Notes Application 📝

This is a simple **Notes Application** built with React (frontend) and Django (backend). It allows users to create, edit, delete, and pin notes. The application also supports user authentication and a toggle for light/dark mode.

---

## Features 🌟
- User authentication (Login/Logout/Register)
- Create, edit, and delete notes
- Pin notes to keep them at the top
- Light/Dark mode toggle
- Responsive design

---

## Prerequisites 🛠️
- **Python** (version 3.13.0 or above)
- **React.js** (version 14 or above)
- **Git**

---

## Setup Instructions 🚀

### Clone the repository:

git clone https://github.com/Shivangidevkota/notes.git
cd notes

Backend Setup (Django):
Navigate to the backend directory:
cd backend
Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows

Install dependencies:
pip install -r requirements.txt

Run migrations:
python manage.py migrate

Start the backend server:
python manage.py runserver

Frontend Setup (React):
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Start the development server:
npm start

Usage 🔧
Visit http://127.0.0.1:8000 for the Django backend.
Visit http://localhost:3000 for the React frontend.
Register a new user, log in, and start managing your notes.