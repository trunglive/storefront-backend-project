### API Requirements
> The company's stakeholders want to set up an online storefront to showcase their fantastic product ideas.
> Users should be able to navigate an index of all products, view specific product details, and add products to an order that can be viewed in a cart page.

### API Endpoints
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
