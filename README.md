# media-player-mini-app

Notes on features, implementation, requirements and running the app 

## Task 1

### Function 1: (Create a ReactJS Website Wireframe)
Implemented:
- Sign-up (and auto login) saved to local data store
- Login to authenticate against local store
- Token and user session verification to persist login
- Central landing page and homepage components
- Form components with frontend and backend validation
- Top nav bar header component with username displayed
- Mongodb data store and REST api for account

Not Implemented:
- Dropdown from nav bar to logout (button included instead)
- Side bar navigation

### Function 2: (Create the Cat List Component)
Implemented:
- Cat list component containing 250 mock api items
- Welcome {username} with getUser from storage with token
- Non-used function found at "HomePage.js - createCatList()"

Not Implemented:
- Side bar navigation

## Task 2

### Function 3: (Populate the list screen by calling a REST API)
Implemented:
- API call to [www.thecatapi.com/api]
- Mapped each response from json to react list component item
- Each item complete with identifier, image, title and description

Not Implemented:
- None

### Function 4: (Create a details screen)
Implemented:
- Clicking list item loads an individual Cat Component
- Component complete with image, title and description
- Button functionality included that plays audio file

Not Implemented:
- None

## Task 3

### Function 4 & 5

Not implemented:

Stretch goal and not enough time. Admin and support functionality not deemed necessary for first iteration / POC of this app.

## MERN-boilerplate

This is MERN application which uses the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation

Basic boilerplate code from the following repo:

    https://github.com/keithweaver/MERN-boilerplate

## Requirements

- [Node.js](https://nodejs.org/en/) 6+
- [Mongodb](https://www.mongodb.com/en) 4+

```shell
npm install
```
Set config/Config.js 
    
    db_dev: 'mongodb://localhost:27017/home'

Set mongodb instance:

    mongod -dbpath [dir__name]\git-projects\media-player-mini-app\data

## Running

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```
Landing page:

    http://localhost:8080/
