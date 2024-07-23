# FoodStore - Backend

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Setup `.env` file to `./` <br />
   **.env Example :**

   ```
   SERVICE_NAME=foodstore-service
   SECRET_KEY=example
   DB_HOST=localhost
   DB_PORT=27017
   DB_USER=example
   DB_PASS=example
   DB_NAME=foodstore
   ```

3. Start server
   ```
   npm start
   ```

## Tech Stack

- **Back-end**: Node.js, Express.js, Mongoose
- **Database**: MongoDB

## API Documentation

| Action   | Method | Auth | Body             | EndPoint                               |
| -------- | ------ | ---- | ---------------- | -------------------------------------- |
| Login    | POST   |      | email            | https://fireme.vercel.app/api/login    |
|          |        |      | password         |                                        |
|          |        |      |                  |                                        |
| Register | POST   |      | email            | https://fireme.vercel.app/api/register |
|          |        |      | name             |                                        |
|          |        |      | password         |                                        |
|          |        |      | confirm_password |                                        |
|          |        |      |                  |                                        |
| Token    | GET    |      |                  | https://fireme.vercel.app/api/token    |
|          |        |      |                  |                                        |
|          |        |      |                  |                                        |
| Logout   | DELETE |      |                  | https://fireme.vercel.app/api/logout   |
|          |        |      |                  |                                        |
