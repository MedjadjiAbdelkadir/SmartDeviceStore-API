# SmartDeviceStore Server
![Static Badge](https://img.shields.io/badge/19.4.0-Node.Js-green)
![Static Badge](https://img.shields.io/badge/4.18.2-Express.Js-blue)
![Static Badge](https://img.shields.io/badge/8.11.3-pg-blue)
![Static Badge](https://img.shields.io/badge/6.33.0-sequelize-blue)
![Static Badge](https://img.shields.io/badge/0.32.6-sharp-red)
![Static Badge](https://img.shields.io/badge/1.6.6-slugify-red)
![Static Badge](https://img.shields.io/badge/1.6.6-swagger--ui--express-red)
![Static Badge](https://img.shields.io/badge/9.0.1-uuid-red)
![Static Badge](https://img.shields.io/badge/3.10.0-winston-red)
![Static Badge](https://img.shields.io/badge/3.0.1-nodemon-red)
![Static Badge](https://img.shields.io/badge/2.8.5-cors-red)
![Static Badge](https://img.shields.io/badge/16.3.1-dotenv-red)
![Static Badge](https://img.shields.io/badge/7.0.1-express--validator-red)
![Static Badge](https://img.shields.io/badge/5.1.1-bcrypt-red)
![Static Badge](https://img.shields.io/badge/9.0.2-jsonwebtoken-red)
![Static Badge](https://img.shields.io/badge/6.9.6-nodemailer-red)
![Static Badge](https://img.shields.io/badge/1.4.5--lts.1-multer-red)

## Description
Smart Device Store RESTful API clone.

## Technologies Used in Server 
- NodeJS
- Express
- PostgreSQL 

## Feature
  - Authentication
  - User management
  - Category management
  - SubCategory management
  - Brand management
  - Product management
  - Review management
  - Coupon management
  - Order management

## Installation

To run this project, you need to have Node.js and PostgreSQL installed on your system.

1. Clone this repository: `git clone https://github.com/MedjadjiAbdelkadir/SmartDeviceStore-API.git`
2. Install the dependencies: `npm install`
3. Open the PostgreSQL and execute the following command :
```Bash
$ CREATE DATABASE SmartDeviceStore;
$ CREATE USER adminStore WITH ENCRYPTED PASSWORD 'password123456';
$ GRANT ALL PRIVILEGES ON DATABASE SmartDeviceStore TO adminStore;
```
1. Set up the environment variables on `.env` file:

```env
#APP_SETTINGS
MODE   : Development, Production or Test
PORT   : app listening port
HOST   : app host
BASE_URL: app baseurl

# Logs Error
PATH_LOG: path logs error

# Database 
DATABASE_URL= database url must be string
DATABASE_TYPE= database system 'postgres','mysql', 'sqlite', 'mssql'


# JWT  
JWT_SECRET_KEY  : should be at lest 32 character
JWT_EXPIRATION  : expiration token in min or h or days

# Hashing  
PASSWORD_SALT : should be between 10 and 12

# NODEMAILER
EMAIL_HOST : smtp.gmail.com
EMAIL_PORT : 587
EMAIL_USER : sender email password
EMAIL_PASSWORD : sender email password

```
5. Start the server: `npm run start`

## How To Use 
<b>Authentication</b>

| Feature          | Method | Route                       | Access       |
|------------------|:------:|:---------------------------:|:-------------|
| Register         | POST   | /api/auth/register          | Public       |
| Login            | POST   | /api/auth/login             | Public       |
| Forgot Password  | POST   | /api/auth/forgotPassword    | Public       |
| Verify ResetCode | POST   | /api/auth/verifyResetCode   | Public       |
| Reset Password   | POST   | /api/auth/resetPassword     | Public       |


<b>User</b>

| Feature          | Method | Route                       |     Role & Access    |
|------------------|:------:|:---------------------------:|:---------------------|
| Profile          | GET    | /api/user/profile           | Private User/Auth    |
| Update Profile   | PATCH  | /api/auth/profile           | Private User/Auth    |

<b>Category</b>

| Feature          | Method | Route                       |     Role & Access    |
|------------------|:------:|:---------------------------:|:---------------------|
| Get Categories   | GET    | /api/categories             | Private Admin/Auth   |
| Get Category     | GET    | /api/categories/:id         | Private Admin/Auth   |
| Create Category  | POST   | /api/categories             | Private Admin/Auth   |
| Update Category  | PATCH  | /api/categories/:id         | Private Admin/Auth   |
| Delete Category  | DELETE | /api/categories/:id         | Private Admin/Auth   |

<b>SubCategory</b>

| Feature             | Method | Route                          |     Role & Access    |
|------------------   |:------:|:------------------------------:|:---------------------|
| Get SubCategories   | GET    | /api/subcategories             | Private Admin/Auth   |
| Get SubCategory     | GET    | /api/subcategories/:id         | Private Admin/Auth   |
| Create SubCategory  | POST   | /api/subcategories             | Private Admin/Auth   |
| Update SubCategory  | PATCH  | /api/subcategories/:id         | Private Admin/Auth   |
| Delete SubCategory  | DELETE | /api/subcategories/:id         | Private Admin/Auth   |

<b>Brand</b>

| Feature        | Method | Route                   |     Role & Access    |
|----------------|--------|-------------------------| ---------------------|
| Get Brands     | GET    | /api/brands             | Private Admin/Auth   |
| Get Brands     | GET    | /api/brands/:id         | Private Admin/Auth   |
| Create Brands  | POST   | /api/brands             | Private Admin/Auth   |
| Update Brands  | PATCH  | /api/brands/:id         | Private Admin/Auth   |
| Delete Brands  | DELETE | /api/brands/:id         | Private Admin/Auth   |

