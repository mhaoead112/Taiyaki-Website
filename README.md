# Taiyaki Website Backend

This repository contains the backend API for the Taiyaki Website, an e-commerce platform for ordering Taiyaki. It handles menu management, cart operations, orders, and payment processing via Paymob.

## Features

- **Menu Management**: Retrieve menu items and categories.
- **Cart System**: Manage guest carts and items.
- **Order Processing**: Create and manage orders.
- **Payment Integration**: Secure payment processing utilizing Paymob.
- **Branch Management**: List available store branches.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Payment Gateway**: Paymob
- **Utilities**: `dotenv` (Configuration), `cors` (Cross-Origin Resource Sharing), `axios` (HTTP Requests)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mhaoead112/Taiyaki-Website.git
    cd Taiyaki-Website
    ```

2.  **Install Dependencies:**
     Navigate to the backend directory (or root if running from there) and install packages.
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `backend` directory based on `.env.example`.
    
    ```bash
    cp backend/.env.example backend/.env
    ```

    Update the `.env` file with your configuration:
    ```env
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/Taiyaki-Website
    VAT_PERCENT=14
    DELIVERY_FEE=20
    # Add Paymob credentials if required by 'paymob' routes
    ```

## Running the Application

You can start the server using the npm scripts provided in the root `package.json`.

- **Development Mode** (requires `nodemon`):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

The server will typically start on `http://localhost:3000` (or the port specified in your `.env`).

## API Endpoints

The API is structured under `/api`:

- **Menu**: `/api/menu`
- **Branches**: `/api/branches`
- **Cart**: `/api/cart`
- **Guest**: `/api/guest`
- **Orders**: `/api/order`
- **Paymob Integration**: `/api/paymob`, `/api/paymob/checkout`
