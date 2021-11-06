### Storefront Backend Project

#### Summary
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

#### Clone the project

```shell
$ git clone git@github.com:trunglive/storefront-backend-project.git
```

#### Run on local

```shell
$ cd storefront-backend-project
$ npm install
$ npm start
```

#### Initialize PostgreSQL and connect to database

```shell
# start PostgreSQL
$ psql -h localhost -U postgres

# create database for dev env
$ CREATE DATABASE storefront;

# list out all databases
$ \dt

# connect to database
$ \c storefront

# quit PostgreSQL
$ \q
```

#### Migration script for `test` database

```shell
$ npm run test
```

#### Migration script for `dev` database

```shell
$ npm run dev
```

#### Environment Variables

The environment variables are available in the `.env` file.

```shell
# port number
PORT=3000

# default env
ENV=dev

# PostgreSQL database for dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234

# database for testing
POSTGRES_TEST_DB=storefront_test

# password encryption
BCRYPT_SALT_ROUNDS=10
BCRYPT_PEPPER=5Ffja@9spfaA#

# JWT
JWT_TOKEN_SECRET=Sog@*Fos2*7
```

#### API Endpoints

Please check the `REQUIREMENTS.md` file.

#### Contributor

Trung Vo ([trunglive](https://github.com/trunglive))

#### License

This project is licensed under the MIT License. Please check the `LICENSE` file.
