# Secure Money Transfer App (MERN Stack) - EZpay


graph LR
A[User]-- localhost/3000 --> B((/api/v1))
B --> C(Auth)
C --> D(/signin)
C --> E(/signup)
D --> F{/dashboard}
E --> F
F --> /sendMoney



## Introduction

This project is a secure money transfer application developed using the MERN stack (MongoDB, Express.js, React, and Node.js). It simulates a basic Paytm wallet, allowing users to transfer money, manage their balance, and search/filter users for easy management. The application ensures secure and consistent financial operations by utilizing MongoDB transactions for atomic balance updates.

## Features

- **User Authentication:** Secure user authentication using JWT.
- **User Management:** Search and filter users for easy management.
- **Balance Management:** View current balance, add money to the wallet, and transfer money to other users.
- **Transaction History:** View detailed transaction history.
- **MongoDB Transactions:** Ensure atomic balance updates to maintain consistency and security.

## Technology Stack

- **MongoDB**
- **Express.js**
- **React**
- **Node.js**
