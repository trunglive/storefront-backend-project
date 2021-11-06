### API Requirements
> The company's stakeholders want to set up an online storefront to showcase their fantastic product ideas.
> Users should be able to navigate an index of all products, view specific product details, and add products to an order that can be viewed in a cart page.

### API Endpoints
`GET /` - homepage

`GET /products` - READ all products\
`GET /products/:productName` - READ specific product by product name\
`POST /products` - CREATE product\
`DELETE /products` - DELETE product by product id

`GET /users` - READ all users\
`GET /users/:username` - READ specific user by username\
`POST /users/register` - CREATE user\
`POST /users/login` - LOGIN user\
`DELETE /users` - DELETE specific user by username

`GET /orders` - READ all orders\
`GET /orders/:userId` - READ orders by user id\
`POST /orders` - CREATE order\
`DELETE /orders` - DELETE specific order by order id\
`POST /orders/products` - CREATE order with product quantity and product id\
`DELETE /orders/products` - DELETE order product by order product id

#### Products
- Index
- Show (args: product name)
- Create (args: product name, product price) [token required]
- Delete (args: product id) [token required]

#### Users
- Index [token required]
- Show (args: username) [token required]
- Create (args: first name, last name, username, password)
- Delete (args: username)

#### Orders
- Index
- Show (args: user id)
- Create order (args: status, user id) [token required]
- Delete (args: order id) [token required]
- Create order with product quantity and product id (args: quantity, order id, product id) [token required]
- Delete order product (args: order product id) [token required]

### Data Shapes
#### Products
-  id
- name
- price

#### Users
- id
- firstname
- lastname
- username
- password

#### Orders
- id
- status of order (`ordered` / `shipped` / `delivered`)
- user_id

#### Order Products
- id
- quantity of each product in the order
- id of each order that products belong to
- id of each product in the order
