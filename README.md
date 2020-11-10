# Pizza shop

A service for ordering pizza.

## Architecture

The idea was to make a simple application that can be easility deployed on some free platform. Here is the list of main used technologies:

* React with global Context API for state management
* Node.js for serverless functions (in the `api` directory)
* TypeScript for code reliability
* Vercel for deploying the serverless application

Vercel, in this case, provides and amazing functionality for deployment. It sees the `api` directory and transforms every back-end route into serverless lambda funcitons. As a CLI tool, vercel has a command:

```bash
vercel dev
```

That recognizes Create React App application, collects all environmental variables and gives a hot reloading for the best developer experience.

## Features

In the pizza shop, you can:

* View the predefined set of pizzas
* Add pizzas to the cart, therefore saving them for future
* Change the amount of pizzas of each type you want to buy
* Change the payment currency
* Make an order
* Authorize and make orders that will be saved in your account for later 
