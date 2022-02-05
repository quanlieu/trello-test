# The UI utilizes React, Redux and Redux-saga to do the following actions:

1. **Repo List:** Show a list of all *repos*, allow creating a new *repo*, editing a *repo* name, or deleting a new *repo*.
2. **Repo Details:** Each time a new *repo* is created, Four static *lists* with the titles `Open`, `Confirmed`, `False Positive`, and `Fixed` are also created.
3. **Cards**: Allow creating, editing and deleting *Cards*. The cards can be moved from:
    - `Open` to either `Confirmed`, `False Positive`, and `Fixed`.
    - `Confirmed` to `Fixed`.
    - *Cards* in `False Positive` and `Fixed` lists are considered final and can't be moved to any other state.

## Available Scripts

In the project directory, you can run:

### `yarn start-server`

Runs the a simple server that supports CRUD operations on Repos, Lists, and Cards.\
Try GET [http://localhost:8080/api/repo/](http://localhost:8080/api/repo/) to see an example.\
This simple back end is modified from [Thinkful-Ed/trello-backend](https://github.com/Thinkful-Ed/trello-backend)
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.
### `yarn test:coverage`

To show test coverage. I covered all important function

# Foot note

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
