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

<table>
  <tr>
    <th>Action</th>
    <th>Method</th>
    <th>Auth</th>
    <th>Role</th>
    <th>Body</th>
    <th>Endpoint</th>
  </tr>
  <tr>
    <td>Check Session</td>
    <td>GET</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td></td>
    <td>/auth/me</td>
  </tr>
  <tr>
    <td>Register</td>
    <td>POST</td>
    <td></td>
    <td>All</td>
    <td>
     <ul>
        <li>full_name</li>
        <li>email</li>
        <li>password</li>
     </ul>
    </td>
    <td>/auth/register</td>
  </tr>

  <tr>
    <td>Login</td>
    <td>POST</td>
    <td></td>
    <td>All</td>
    <td>
     <ul>
        <li>email</li>
        <li>password</li>
     </ul>
    </td>
    <td>/auth/login</td>
  </tr>

  <tr>
    <td>Logout</td>
    <td>POST</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    </td>
    <td>/auth/logout</td>
  </tr>

  <tr>
    <td>Product</td>
    <td>GET</td>
    <td></td>
    <td>All</td>
    <td>
    </td>
    <td>/api/products?limit=&skip=&q=&tags[]=&category=</td>
  </tr>

<tr>
    <td>Create Product</td>
    <td>POST</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
        <ul>
        <li>name</li>
        <li>description</li>
        <li>price</li>
        <li>Image</li>
        </ul>
    </td>
    <td>/api/products</td>
</tr>

<tr>
    <td>Update Product</td>
    <td>PUT</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
        <ul>
        <li>name</li>
        <li>description</li>
        <li>price</li>
        <li>Image</li>
        </ul>
    </td>
    <td>/api/products/:id</td>
</tr>

<tr>
    <td>Delete Product</td>
    <td>DELETE</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
    </td>
    <td>/api/products/:id</td>
</tr>

<tr>
    <td>Create Category</td>
    <td>POST</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
        <ul>
        <li>name</li>
        </ul>
    </td>
    <td>/api/categories</td>
</tr>

<tr>
    <td>Update Category</td>
    <td>PUT</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
        <ul>
        <li>name</li>
        </ul>
    </td>
    <td>/api/categories/:id</td>
</tr>

<tr>
    <td>Delete Category</td>
    <td>DELETE</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
    </td>
    <td>/api/categories/:id</td>
</tr>

<tr>
    <td>Create Tag</td>
    <td>POST</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
        <ul>
        <li>name</li>
        </ul>
    </td>
    <td>/api/tags</td>
</tr>

<tr>
    <td>Update Tag</td>
    <td>PUT</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
        <ul>
        <li>name</li>
        </ul>
    </td>
    <td>/api/tags/:id</td>
</tr>

<tr>
    <td>Delete Tag</td>
    <td>DELETE</td>
    <td>Bearer Token</td>
    <td>Admin</td>
    <td>
    </td>
    <td>/api/tags/:id</td>
</tr>

<tr>
    <td>Get Provinsi</td>
    <td>GET</td>
    <td></td>
    <td>All</td>
    <td>
    </td>
    <td>/api/wilayah/provinsi</td>
</tr>

<tr>
    <td>Get Kabupaten</td>
    <td>GET</td>
    <td></td>
    <td>All</td>
    <td>
    </td>
    <td>/api/wilayah/kabupaten?kode_induk=</td>
</tr>

<tr>
    <td>Get Kecamatan</td>
    <td>GET</td>
    <td></td>
    <td>All</td>
    <td>
    </td>
    <td>/api/wilayah/kecamatan?kode_induk=</td>
</tr>

<tr>
    <td>Create Delivery Address</td>
    <td>POST</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    <ul>
        <li>nama</li>
        <li>provinsi</li>
        <li>kabupaten</li>
        <li>kecamatan</li>
        <li>kelurahan</li>
        <li>detail</li>
    </ul>
    </td>
    <td>/api/delivery-addresses</td>
</tr>

<tr>
    <td>Get Delivery Address</td>
    <td>GET</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    </td>
    <td>/api/delivery-addresses</td>
</tr>

<tr>
    <td>Update Delivery Address</td>
    <td>PUT</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    <ul>
        <li>nama</li>
        <li>provinsi</li>
        <li>kabupaten</li>
        <li>kecamatan</li>
        <li>kelurahan</li>
        <li>detail</li>
    </ul>
    </td>
    <td>/api/delivery-addresses/:id</td>
</tr>

<tr>
    <td>Delete Delivery Address</td>
    <td>DELETE</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    </td>
    <td>/api/delivery-addresses/:id</td>
</tr>

<tr>
    <td>Update Cart</td>
    <td>PUT</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    <ul>
        <li>items</li>
    </ul>
    </td>
    <td>/api/carts</td>
</tr>

<tr>
    <td>Get Cart</td>
    <td>GET</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    </td>
    <td>/api/carts</td>
</tr>

<tr>
    <td>Create Order</td>
    <td>POST</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    <ul>
        <li>delivery_fee</li>
        <li>delivery_address</li>
    </ul>
    </td>
    <td>/api/orders</td>
</tr>

<tr>
    <td>Get Order</td>
    <td>GET</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    </td>
    <td>/api/orders</td>
</tr>

<tr>
    <td>Get Invoice</td>
    <td>GET</td>
    <td>Bearer Token</td>
    <td>All</td>
    <td>
    </td>
    <td>/api/orders/:order_id</td>
</tr>

</table>
