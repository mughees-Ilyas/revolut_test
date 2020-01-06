# React_test

steps to run the project

1) clone the project

2) execute 'npm install' to install dependencieis.

3) execute 'npm run start' to start the project.

## Project Explanation

### Home page 
Home page has the rate list for all the countries. Initially the base is set to EUR but User can chose a different base.

We update the rate list every 10 second.

### Account page 
Account page has your current accounts. You can Add funds and exchange funds between them.

Once the exchange modal is opened, we get the rate between two currencies after every 10 sec so if the rate gets updated in the middle of transcation the modal will reflect the changes.



## Directory Structure

Styled folder has all the resuable style components.

Components folder have a generic table component and addFund and ConverFund modals.

Core folder has a navigation component and redux folder which contain store management.

pages folder has the viewable pages components.

Theme folder stores the color scheme that is used through out the project.

Enviorment file stores the common end point for store.


## tech stack and libraries.

Redux and Redux-saga is used as default store to get data.

Fetch is used in Redux-saga to do REST calls.

React-hooks are used to maintain state through out the project.

Styled-components are used as default style provider instead of css/sass.

Bootstrap is used for modal and dropdown.

