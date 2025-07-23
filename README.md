# Posti APP

#### I designed and developed a lightweight yet powerful Express.js API server that manages users and posts with a file-based JSON datastore for persistence — ensuring simplicity without compromising on functionality.

#### The system supports secure user authentication using JWT tokens, bcrypt-hashed passwords, making it future-ready for social logins. To enforce strong input integrity, I implemented reusable and dynamic validators using express-validator for body, header, and parameter checks.

#### For data operations, I created reusable utility components for reading, updating, appending, and deleting data from JSON files while ensuring data is always written sequentially for consistency. The solution includes functional components for token generation & verification, device-bound authentication (restricting login to one device), and custom response handlers for a clean, standardized API structure.

#### This project not only showcases secure, modular backend design but also emphasizes scalability with its component-based architecture, making it easy to extend for databases like MongoDB or PostgreSQL in the future.

#### This API provides endpoints for **user registration**, **authentication**, and **post management** (create, update, delete, fetch). It also supports **device-based identification** using `x-device-id`.

---

## 1. Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or later)  
  [Download & Install Node.js](https://nodejs.org/)  
  Verify installation:

  - node -v
  - npm -v

-----

## 2. Clone the Repository

Open your terminal and run:

- git clone [https://github.com/sandeepKumarMurmu/posti.git](https://github.com/sandeepKumarMurmu/posti.git)
- cd folder_name

----
## 3. Install Dependencies

In the **root directory** of the project, run:

- npm install

----
## 4. Start the Application

To start the application in normal mode, run:

- npm run start

---
## 5. Start using

Now the app is read to use, can be tested through api-endpoint, provided by below postman collection.
- [Postman Collection](https://drive.google.com/drive/folders/15mSsM0GoNngnhHjvmVo7bV8gfK0S2g3W?usp=sharing)
