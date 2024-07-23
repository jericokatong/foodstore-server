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
| Get Me   | POST   |      | email            | https://fireme.vercel.app/api/login    |
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

<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
