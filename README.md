# Interactive Children's Storybook Platform

A full-stack interactive storybook platform for children with audio, video, quizzes, and progress tracking.

## Structure

```
├── Frontend/   # React + Vite + Redux Toolkit + Tailwind CSS
└── BackEnd/    # Spring Boot + MongoDB REST API
```

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `Frontend/.env` to point at your backend (default: `http://localhost:8080/api`).

## Backend Setup

```bash
cd BackEnd/backend
./mvnw spring-boot:run
```
