# **Explanation.md**

## **Problem Statement**

The task is to implement a proof-of-concept app called **“Cool Kids Network”**, which involves the following features:

### **System Architecture and Design Pattern**

### PHP(Laravel) - Backend

- I used service-repo pattern to ensure clear seperations of concern
- This also ensures testability of each layer
- This also ensures clean code and best practices that follows SOLID and KISS principles

### React- Frontend

- I follow a react hooks designs to promote resusability of logic accross components
- This also ensures testability of components

### **System Overview**

## **Features in the app **

- Admin Dashboard (only maintainers can see this, they can also assign roles)
- Users Dashboard
- Profile Page to update profile
- Users page to list users, only users with admins, cooler kid , or coolest kid role can see this link

## Tech Stack

Backend: Laravel
Frontend: React
Authentication: JWT (JSON Web Tokens)
API: RESTful API
Database: MySQL or SQLite
Character Generation: randomuser.me API

## Installation

Prerequisites
PHP >= 8.2
Composer
Node.js and npm
MySQL or SQLite
Laravel >= 9.x

1. Clone the repository:

   ```bash
   git clone https://github.com/arinzehills/cool-kids-network.git
   cd cool-kids-network
   ```

2. Backend - PHP(LARAVEL)

   ```bash
   cd backend
   composer install
   php artisan serve
   ```

   Setting up your env. variable

   ```bash
     cp .env.example .env
     php artisan key:generate
    php artisan jwt:secret
    php artisan migrate
   ```

   ```bash
   php artisan test
   ```

   To run Test

   ```bash
   php artisan test
   ```

## Frontend (React)

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```
