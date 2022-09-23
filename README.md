## CRUD operations for a system of posts.
### Simple rest api, with swagger, jest and mongodb.

### How to run: 
 * First of all, you will need clone this repo in your local machine
 * Run `npm install --legacy-peer-deps`
 * Go to [Jwt.io](https://jwt.io/) and generate your credentials and secret
 * Create *.env* file and set the environment variables according *.env.example*
 * To open a development server, run `npm run dev`
 * To run tests: `npm test`
 * To go to Swagger Documentation, run develepment server, open browser and access `http://localhost:3333/api-docs` or click here: [Swagger doc](http://localhost:3333/api-docs)

### Considerations: 
* This app use MongoDB to persist data, so you must install it in your machine and run local server.

* All routes are protected with JWT, so if you wanna try to use some http client like Postman or Insomnia to test, it will necessary to add the token in all request headers.
Token key is '**authorization-token**' and value are placed in AUTH_TOKEN env var, inside .env file. 

* All tests are prepared for authenticated routes, you just need **run test command**.
