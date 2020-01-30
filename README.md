# React App for Revolut Test

steps to run the project

1) clone the project

2) execute 'npm install' to install dependencieis.

3) execute 'npm run start' to start the project

## Problem Statement.

Get currency conversation rate table from any exchange rate provider.
create currency pockets where you can store different currencies.
provide exchange between pockets on the fly and show currency exchange rate between them.

## Project Explanation

As there is no backend, the changes are persistant only on frontend and will be lost if you refresh. React hooks are used to maintain persistance behavior on frontned


### Home page 
Home page has the rate list for all the countries. Initially the base is set to EUR but User can chose a different base.

We update the rate list every 10 second.

### Account page 
Account page has your current accounts. You can Add funds and exchange funds between them.

You can Also add new pockets from the dropDown list. at the start EUR, GBP, USD are by default present with some funds.

New Pockets will be created with zero balance.

Once the exchange modal is opened, we get the rate between two currencies after every 10 sec so if the rate gets updated in the middle of transcation the modal will reflect the changes.

### Exchange Widget
By clicking on exchange button on any currency. An exchange widget will appear. you can switch currencies within the widget using the dropdown. it supports run time rate conversion and run time currency switch.


### Account Page constraints.
You cannot add balance less than 10 in any currency.

Max balance you can add in one go is 5000.

Balance after Conversion should be atleast 0.1

Cannot convert amount more than your current balance.

zero is not a valid choice for either box.


### Directory Structure

Styled folder has all the resuable style components.

Components folder have a generic table component and addFund and ConverFund modals.

Core folder has a navigation component and redux folder which contain store management.

pages folder has the viewable pages components.

Theme folder stores the color scheme that is used through out the project.

Enviorment file stores the common end point for store.


### tech stack and libraries.

Redux and Redux-saga is used as default store to get data.

Fetch is used in Redux-saga to do REST calls.

React-hooks are used to maintain state through out the project.

Styled-components are used as default style provider instead of css/sass.

Bootstrap is used for modal and dropdown.

### API

Using "https://exchangeratesapi.io/" to get rates for the currencies.


## RETROSPECTIVE 
I have tried to make everything as generic as possible and if we provide a real backend this project will need to do quite less to adopt to it.

initialzing of pockets should have been done in useEffect call if the pockets were comming from rest API like exchange rate but as I am creating them on frontend so I just initilized them within the useState hook.

The currency Signs are missing. could have included the pound, dollar and euro sign but As I was going more for generic solution that can support any number of pockets and exchanges, I didnt have all the signs. I tried to find a place to get them all but didnt work out.

Wanted to include Flags as well to show with currency sign but the flag libraries mostly use ALPHA-CODE-3 scheme or ALPHA-CODE-2 scheme and the API i was using was giving me currency name codes. I had planned to make a currency to flag mapper but ultimatly ran out of time for it.


