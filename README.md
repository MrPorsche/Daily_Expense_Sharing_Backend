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

6.  **Test Unit**
    
    Use POSTMAN for testing!

    once you get the server running, fire up POSTMAN and run below tests..,

    1.  **Create User**

        * Create a new request,
        * Set method as `POST`,
        * Use below URL:
            `http://localhost:5000/api/users`,
        * Below in `Body` tab, select `raw` and then    select `JSON` and use data in below format..,
            {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "password": "yourpassword",
                "mobile": "1234567890"
            }, you can change the details as you like.
        * Lastly, click `Send` to see the result.

    2. **Get User Detail**

        * Again, create a new request,
        * Set method as `GET` (which is also a default),
        * Use below URL:
            `http://localhost:5000/api/users/<user_id>`
            and replace `<user_id>` with an actual ID generated while running Test 1.
        * And click `Send` to see the result.
    
    3. **Add Expense**

        * New Request,
        * Method `POST`,
        * URL:
            `http://localhost:5000/api/expenses`,
        * Below in `Body` tab, select `raw` and then    select `JSON` and use data in below format..,
            {
                "description": "Dinner",
                "amount": 100,
                "splitMethod": "equal",
                "participants": [
                    { "userId": "<user_id1>" },
                    { "userId": "<user_id2>" }
                ]
            }, make sure to create one more user.
        * And `Send`.
    
    4. **Get User Expense**

        * New Request,
        * Method `GET`,
        * URL:
            `http://localhost:5000/api/expenses/user/<user_id>`
            make sure to replace `<user_id>` with an actual ID.
        * `SEND`

    5. **Get All Expenses**

        * New Request,
        * Method `GET`,
        * URL:
            `http://localhost:5000/api/expenses`
        * `SEND`
    
    6. **Generate Balance Sheet**

        * New Request,
        * Method `GET`,
        * URL:
            `http://localhost:5000/api/expenses/balance-sheet/:userId`
            remember to replace :userId with actual user ID.
        * `SEND`