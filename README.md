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

## Technologies Used 
- NodeJS
- Express
- PostgreSQL 

## Feature
  - Authentication
  - User Management
  - Category Management
  - SubCategory Management
  - Brand Management
  - Product Management
  - Review Management
  - Coupon Management
  - Order Management

## Installation

To run this project, you need to have Node.js and PostgreSQL installed on your system.

1. Clone this repository: `git clone https://github.com/MedjadjiAbdelkadir/SmartDeviceStore-API.git`
2. Install the dependencies: `npm install`
3. Open the PostgreSQL and execute the following command :
```sql
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
DATABASE_TYPE= database system 'postgres'


# JWT  
JWT_SECRET_KEY  : should be at lest 32 character
JWT_EXPIRATION  : expiration token in min or h or day

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

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Register                | POST   | baseUrl/api/auth/register          | Public               |
| Login                   | POST   | baseUrl/api/auth/login             | Public               |
| Forgot Password         | POST   | baseUrl/api/auth/forgotPassword    | Public               |
| Verify ResetCode        | POST   | baseUrl/api/auth/verifyResetCode   | Public               |
| Reset Password          | POST   | baseUrl/api/auth/resetPassword     | Public               |


<b>User</b>

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Profile                 | GET    | baseUrl/api/user/profile           | Private User/Auth    |
| Update Profile          | PATCH  | baseUrl/api/auth/profile           | Private User/Auth    |

<b>Category</b>

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Get All Categories      | GET    | baseUrl/api/categories             | Public               |
| Get Single Category     | GET    | baseUrl/api/categories/:id         | Public               |
| Create Category         | POST   | baseUrl/api/categories             | Private Admin/Auth   |
| Update Category         | PATCH  | baseUrl/api/categories/:id         | Private Admin/Auth   |
| Delete Category         | DELETE | baseUrl/api/categories/:id         | Private Admin/Auth   |

<b>SubCategory</b>

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Get All SubCategories   | GET    | baseUrl/api/subcategories          | Public               |
| Get Single SubCategory  | GET    | baseUrl/api/subcategories/:id      | Public               |
| Create SubCategory      | POST   | baseUrl/api/subcategories          | Private Admin/Auth   |
| Update SubCategory      | PATCH  | baseUrl/api/subcategories/:id      | Private Admin/Auth   |
| Delete SubCategory      | DELETE | baseUrl/api/subcategories/:id      | Private Admin/Auth   |

<b>Brand</b>

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Get All Brands          | GET    | baseUrl/api/brands                 | Public               |
| Get Single Brand        | GET    | baseUrl/api/brands/:id             | Public               |
| Create Brands           | POST   | baseUrl/api/brands                 | Private Admin/Auth   |
| Update Brands           | PATCH  | baseUrl/api/brands/:id             | Private Admin/Auth   |
| Delete Brands           | DELETE | baseUrl/api/brands/:id             | Private Admin/Auth   |

<b>Product</b>

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Get All Products        | GET    | baseUrl/api/products               | Public               |
| Get Single Product      | GET    | baseUrl/api/products/:id           | Public               |
| Create Product          | POST   | baseUrl/api/products               | Private User/Auth    |
| Update Product          | PATCH  | baseUrl/api/products/:id           | Private User/Auth    |
| Delete Product          | DELETE | baseUrl/api/products/:id           | Private User/Auth    |

<b>Review</b>

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Get All Reviews         | GET    | baseUrl/api/reviews                | Public               |
| Get Single Review       | GET    | baseUrl/api/reviews/:id            | Public               |
| Create Review           | POST   | baseUrl/api/reviews                | Private User/Auth    |
| Update Review           | PATCH  | baseUrl/api/reviews/:id            | Private User/Auth    |
| Delete Review           | DELETE | baseUrl/api/reviews/:id            | Private User/Admin   |

<b>Coupon</b>

| Feature                 | Method |                Url                 |     Role & Access    |
|-------------------------|--------|------------------------------------|----------------------|
| Get All Coupons         | GET    | baseUrl/api/coupons                | Private Admin        |
| Get Single Coupon       | GET    | baseUrl/api/coupons/:id            | Private Admin        |
| Create Coupon           | POST   | baseUrl/api/coupons                | Private Admin        |
| Update Coupon           | PATCH  | baseUrl/api/coupons/:id            | Private Admin        |
| Delete Coupon           | DELETE | baseUrl/api/coupons/:id            | Private Admin        |

