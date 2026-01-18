# Taiyaki Website Project

This repository contains the full source code for the Taiyaki Website, a modern e-commerce platform for ordering Taiyaki. It is composed of a **React** frontend and a **Node.js/Express** backend.

## Project Structure

The project is organized into two main directories:

- `frontend/`: React application built with Vite.
- `backend/`: REST API server using Express and MongoDB.

---

## Backend

The backend handles menu management, cart operations, orders, and payment processing via Paymob.

### Tech Stack (Backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Payment Gateway**: Paymob
- **Utilities**: `dotenv` (Configuration), `cors` (Cross-Origin Resource Sharing), `axios` (HTTP Requests)

### Backend Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `backend` directory based on `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Config variables:
    - `PORT`: Server port (default 3000)
    - `DATABASE_URL`: MongoDB connection string
    - `VAT_PERCENT`: VAT percentage
    - `DELIVERY_FEE`: Delivery fee
    - Paymob credentials (if applicable)

### Running the Backend

- **Development Mode** (requires `nodemon`):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

---

## Frontend

The frontend provides a responsive and interactive user interface for customers to browse the menu, manage their cart, and place orders.

### Tech Stack (Frontend)
- **Framework**: React (v19)
- **Build Tool**: Vite
- **Styling**: TailwindCSS (v4)
- **Routing**: React Router DOM (v7)
- **State Management**: React Redux
- **Animations**: Framer Motion & AOS (Animate On Scroll)
- **Icons**: Lucide React

### Frontend Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `frontend` directory based on `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Config variables:
    - `VITE_API_URL`: URL of the backend API (e.g., `http://localhost:3000` for local dev)

### Running the Frontend

- **Development Server**:
  ```bash
  npm run dev
  ```
  Starts the local dev server (typically at `http://localhost:5173`).

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

---

## Getting Started (Full Stack)

To run the entire application locally:

1.  **Start MongoDB**: Ensure your MongoDB instance is running.
2.  **Start Backend**: Open a terminal, go to `backend/`, and run `npm run dev`.
3.  **Start Frontend**: Open a second terminal, go to `frontend/`, and run `npm run dev`.
4.  **Access App**: Open your browser to the frontend URL (usually `http://localhost:5173`).
