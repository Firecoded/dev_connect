# DevHub

A full-stack social media platform for developers to connect, create profiles, share posts, and collaborate. Features GitHub integration, persistent auth, and responsive UI.

🔗 [Live Demo (Frontend on Vercel, Backend on Render)](https://dev-hub-plum.vercel.app)

⚠️ _Initial load may take ~30 seconds due to free-tier backend cold start._

---

## 🛠 Tech Stack

### Frontend

-   ReactJS
-   Redux
-   SASS
-   MaterializeCSS

### Backend

-   Node.js
-   Express
-   MongoDB (via Atlas)
-   Mongoose
-   JWT Auth
-   GitHub & Gravatar API integrations

### Deployment

-   **Frontend:** [Vercel](https://vercel.com)
-   **Backend:** [Render](https://render.com)
-   **Database:** MongoDB Atlas

---

## 🚀 Setup Instructions (Local)

### 1. Clone the repo

```bash
git clone https://github.com/Firecoded/dev_connect.git
cd dev_connect
```

### 2. Add `.env` in the root directory

```env
MONGO_URI=<your MongoDB Atlas URI>
JWT_SECRET=your_jwt_secret
GITHUB_TOKEN=your_github_token
```

### 3. Install backend dependencies

```bash
npm install
```

### 4. Install frontend dependencies

```bash
cd client
npm install
```

### 5. Run both servers in dev mode (from project root)

```bash
npm run dev
```

---

## 🧪 Local Production Build

### 1. Build frontend

```bash
cd client
npm run build
```

### 2. Serve with Node in production mode

```bash
cd ..
NODE_ENV=production node server.js
```

### 3. Visit

[http://localhost:5001](http://localhost:5001)

---

## 🌐 Deployment Notes

-   **Frontend is deployed on [Vercel](https://vercel.com)**

    -   Simply link the repo and configure `REACT_APP_API_URL` in Vercel project settings to point to your backend (e.g. `https://your-api.onrender.com`)

-   **Backend is deployed on [Render](https://render.com)**
    -   Add `MONGO_URI`, `JWT_SECRET`, and `GITHUB_TOKEN` as environment variables
    -   Ensure MongoDB Atlas IP whitelist allows traffic from Render
    -   Render's free tier may cause a cold-start delay on first request
