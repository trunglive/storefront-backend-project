#### Storefront Backend Project

#### Case Study
> The company's stakeholders have decided that they want to create an online store where their product ideas can be purchased – and they want me and a coworker to build it.
The stakeholders have compiled a list of prerequisites for this online store. My coworker will build the frontend, while I will `provide the backend`, and the requirements have been compiled into a requirements document.
I'll `build the database`, including tables and columns, to meet the data requirements, and then `write a RESTful API` to expose that information to the frontend developer.
In order to be ready for beta testing, my application needs to `have tests`, `secure user information`, and `provide user authentication tokens` that are ready to integrate with the frontend.

#### Stack

* [Node.js](https://github.com/nodejs/node)
* [Express](https://github.com/expressjs/express)
* [Typescript](https://github.com/microsoft/TypeScript)
* [Jasmine](https://github.com/jasmine/jasmine)
* [PostgreSQL](https://github.com/postgres/postgres)

#### Commands

Clone the project:

```shell
$ git clone git@github.com:trunglive/storefront-backend-project.git
```

Running locally:

```shell
$ cd storefront-backend-project
$ git switch develop
$ npm install
$ npm start
```

Testing:

```shell
#  compile to JS code & run test
npm run test
```

Linting:

```shell
# run ESLint
npm run lint

# run Prettier
yarn run prettier
```

#### API Endpoints

List of available routes:

`GET /` - homepage

`GET /products` - READ all products\
`GET /products/:id` - READ specific product\
`POST /products` - CREATE product\
`DELETE /products` - DELETE product

`GET /users` - READ all users\
`GET /users/:id` - READ specific user\
`POST /users` - CREATE user\
`DELETE /users` - DELETE user

#### Contributor

Trung Vo ([trunglive](https://github.com/trunglive))

#### License

This project is licensed under the MIT License. Please check the `LICENSE` file.
