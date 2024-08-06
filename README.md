# Daily Expenses Sharing Application -Backend

## Overview
A backend service for managing daily expenses and sharing them among users. Features include user management, adding expenses, splitting expenses equally/by exact amounts/by percentages, and generating balance sheets.

## Setup and Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/daily-expenses-app.git
   cd Daily_Expense_Sharing_Backend
2. **Installation**

    Install dependencies by running below command
    ```sh
    npm install
3. **Environment variables setup**

    PORT=5000
    DB_URI=your_mongodb_uri_here **replace <your_mongodb_uri_here> with your database URI**
    JWT_SECRET=your_jwt_secret_here **replace <your_jwt_secret_here> with your generated key**
4.  **JWT_SECRET**

    To generate JWT_SECRET_KEY, run `generateJWT.js` file as below,
    ```sh
    node generateJWT.js
5. **Run the application**

    And finally run the application with below prompt
    ```sh
    npm run dev