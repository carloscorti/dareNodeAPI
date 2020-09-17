# Project

dareNodeAPI, is a middleware API that conects with INSURANCE API REST to get clients and policies data, following this swagger https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/static/index.html to describe endpoints

# Features

- Node API with 3 layers design (routes with middlewares, controller, services) modular, to easy to maintein, debug, test and scale
- Authentication with jason web tokens (jwt)
- API with pagination and filter by query
- Node with ES6 features (uses import statements)
- Test suite with Jest + Supertes for unit, integration and end-to-end tests
- eslint custom config
- Uses pm2 for production start, forks one app instance for each core avaiable in deployment server
- Builds node version directly on depployment server
- Documented following JSdoc standard

## API design

This API is designed with a 3 layer scheme with middlewares, the goal is to delegate only one responsability to each component and have a modular app.

- Middlewares are modules to set up on each route and add a given data or functionality like authentication
- Routers handle endpoints config.
- Controllers handle routers bussines logic.
- Services are called by controllers to chek params, format data, filter data etc.

That way the project is easy to maintain, debug, and scale. Beasides you can easily unit test each component by isolation

## Pagination

/api/v1/clients and /api/v1/policies endpoints have pagination feature, default limit=10 default page=1.
You can set limit and page query strings this way,

```
https://dare-insurance-assessment.herokuapp.com/api/v1/clients?page=3&limit=50
```

Will set results to 50 and show page 3, this is the expected respose

```
{
   "total": {
       "pages": 4
   },
   "next": {
       "page": 4,
       "limit": 50
   },
      "previous": {
       "page": 2,
       "limit": 50
  },
   "results": [...results limited to 50]
}
```

## Filter by Query

/api/v1/clients endpoint has filter by query feature.
You can filter clients by name with query strings this way,

```
https://dare-insurance-assessment.herokuapp.com/api/v1/clients?name=britney
```

Will filter on clients list by name, no case sensitive, this is the expected respose

```
{
    "total": {
        "pages": 1
    },
    "results": [
        {
            "id": "id",
            "name": "Britney",
            "email": "email",
            "role": "admin",
            "policies": [
                {
                    "id": "xxx-xxx-xxx-xx",
                    "amountInsured": "$$$.$$",
                    "inceptionDate": "date"
                }
            ]
        },
        {
            "id": "id",
            "name": "Mcbride",
            "email": "email",
            "role": "admin",
            "policies": []
        },
        {
            "id": "id",
            "name": "Debra",
            "email": "email",
            "role": "admin",
            "policies": []
        }
    ]
}
```

## Getting Started

### Installing

To download the project use git clone

```
git clone https://github.com/carloscorti/dareNodeAPI.git
```

On projects root folder, install dependencies

```
npm i
```

### Development

Run

```
npm run dev
```

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.

### Production (follow the order below)

First

```
npm run build-node
```

Builds the node server with ES6 features. It builds server aplication on ./build folder

Then

```
npm start
```

Starts app for production (uses pm2 for core load optimization)

## Running the tests

Testing framework Jest, to run test suit on watch mode for develompment use

```
npm run watch-test
```

For test coverage

```
npm run verify-tests
```

To run tests once

```
npm test
```

## Deployment

Production version deployed at https://dare-insurance-assessment.herokuapp.com/

## Built With

- Dependency Manager: npm
- Server: Node + Express
- Bundler: babel
- Test framework: Jest + Supertest

## Author

- **Carlos Corti**
