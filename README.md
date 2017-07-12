# Quantified Self

[Colleen Ward](https://github.com/caward12) and [Josh Thompson](https://github.com/josh-works) built a sweet calorie tracking application.

Front-end available live at

- https://caward12.github.io/quantified-self-frontend/


Backend available at:

- Heroku: https://quantified-self-backend.herokuapp.com/
- Github repo: https://github.com/caward12/quantified-self



## What's it do?

A single-page application that accepts food items, which can be stored in meal tables.

There's no page reload, and every change is persisted in our database hosted on Heroku.

## To install/run locally:

Clone front-end _and_ back-end down:

```shell
# clone front end
$ git clone git@github.com:caward12/quantified-self-frontend.git

# clone back-end
$ git clone git@github.com:caward12/quantified-self.git
```

Set up the repo, start `localhost`:

```shell
# set up backend app
$ cd quantified-self
$ npm install
$ knex migrate:latest
$ knex seed:run
$ npm start

# cd into front-end, install modules, start server
$ cd quantified-self-frontend
$ npm install
$ npm start
```

Open up on `localhost`:

```
http://localhost:8080/webpack-dev-server/
```
