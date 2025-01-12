# Cryptocurrency Price Tracker API

This is a server-side application built with Node.js and MongoDB Atlas to fetch real-time cryptocurrency data and perform various analysis tasks. The project utilizes the CoinGecko API to get cryptocurrency data for Bitcoin, Matic, and Ethereum. The data is then stored in a MongoDB Atlas database and can be queried via custom API endpoints.

## Features
- Background Job: Fetches the current price, market cap, and 24-hour price change for Bitcoin, Matic, and Ethereum every 2 hours.
- /stats API: Retrieves the latest data for a specific cryptocurrency.
- /deviation API: Returns the standard deviation of the price of a cryptocurrency for the last 100 records stored in the database.

## Technologies Used
- Node.js: For building the server-side application.
- MongoDB Atlas: Cloud-hosted MongoDB service for storing cryptocurrency data.
- CoinGecko API: For fetching real-time cryptocurrency data.
- Express.js: For creating the API endpoints.
- Mongoose: For MongoDB object modeling.

## API Endpoints
1. GET /stats
  - Retrieves the latest data for the requested cryptocurrency.
  - Query Parameters:
    - coin: The name of the cryptocurrency (could be bitcoin, matic, or ethereum).

    - Sample Request:  GET /stats?coin=bitcoin
    - Sample Response:
    -  {
      "price": 40000,
      "marketCap": 800000000,
      "24hChange": 3.4
    }

2. GET /deviation
  - Calculates the standard deviation of the price for the requested cryptocurrency using the last 100 records stored in the database.
  - Query Parameters:

    - coin: The name of the cryptocurrency (could be bitcoin, matic, or ethereum).
    - Sample Request: GET /deviation?coin=bitcoin
    -  Sample Response:
    - { 
  "deviation": 4082.48
}

## Background Job
- A background job fetches data every 2 hours and stores it in the MongoDB Atlas database. The background job uses the CoinGecko API to fetch data for the following cryptocurrencies:
   - Bitcoin (bitcoin)
   - Matic (matic-network)
   - Ethereum (ethereum)
   
- The fetched data includes:
  - Current Price in USD
  - Market Cap in USD
  - 24-hour price change percentage

## MongoDB Schema
- The MongoDB Atlas database stores records with the following fields:
  -  coin: The name of the cryptocurrency (e.g., bitcoin, matic, ethereum).
  -  price: The current price in USD.
  -  marketCap: The market capitalization in USD.
  -  24hChange: The 24-hour price change percentage.
  -  timestamp: The timestamp when the data was fetched.

 ## Outputs

![1](https://github.com/user-attachments/assets/b0c76e5a-1723-45d5-bab5-b092b06a24e8)

![2](https://github.com/user-attachments/assets/85ca674a-2da3-435d-8868-564fd51b89df)
