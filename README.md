# NASA Explorer — Full Project

This is a full React + Node/Express starter project that proxies NASA Open APIs and provides visualizations.

## Quick start (VS Code)

1. Open two terminal panels in VS Code.
2. Backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
   Create a `.env` file in /backend with:
   ```
   NASA_API_KEY=YOUR_NASA_API_KEY
   PORT=4000
   ```

3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   If using the backend locally, the frontend `.env` file can include:
   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. Visit the frontend dev server (Vite) URL shown in the terminal (usually http://localhost:5173).

--- 
This project is intended as a template — edit styles and components as you like.
