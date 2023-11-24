
## How To Use 
<b>Authentication</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Register                | POST   | baseUrl/v1/api/auth/register          | Public               |
| Login                   | POST   | baseUrl/v1/api/auth/login             | Public               |
| Forgot Password         | POST   | baseUrl/v1/api/auth/forgotPassword    | Public               |
| Verify ResetCode        | POST   | baseUrl/v1/api/auth/verifyResetCode   | Public               |
| Reset Password          | POST   | baseUrl/v1/api/auth/resetPassword     | Public               |


<b>User</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Profile                 | GET    | baseUrl/v1/api/profile                | Private User/Auth    |
| Update Profile          | PATCH  | baseUrl/v1/api/profile                | Private User/Auth    |
| Update Profile Avatar   | PATCH  | baseUrl/v1/api/profile/avatar         | Private User/Auth    |
| Delete Account          | DELETE | baseUrl/v1/api/profile                | Private User/Auth    |
| Restore Account         | PATCH | baseUrl/v1/api/profile/restore         | Private User/Auth    |

<b>Category</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Get All Categories      | GET    | baseUrl/v1/api/categories             | Public               |
| Get Single Category     | GET    | baseUrl/v1/api/categories/:id         | Public               |
| Create Category         | POST   | baseUrl/v1/api/categories             | Private Admin/Auth   |
| Update Category         | PATCH  | baseUrl/v1/api/categories/:id         | Private Admin/Auth   |
| Delete Category         | DELETE | baseUrl/v1/api/categories/:id         | Private Admin/Auth   |

<b>SubCategory</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Get All SubCategories   | GET    | baseUrl/v1/api/subcategories          | Public               |
| Get Single SubCategory  | GET    | baseUrl/v1/api/subcategories/:id      | Public               |
| Create SubCategory      | POST   | baseUrl/v1/api/subcategories          | Private Admin/Auth   |
| Update SubCategory      | PATCH  | baseUrl/v1/api/subcategories/:id      | Private Admin/Auth   |
| Delete SubCategory      | DELETE | baseUrl/v1/api/subcategories/:id      | Private Admin/Auth   |

<b>Brand</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Get All Brands          | GET    | baseUrl/v1/api/brands                 | Public               |
| Get Single Brand        | GET    | baseUrl/v1/api/brands/:id             | Public               |
| Create Brands           | POST   | baseUrl/v1/api/brands                 | Private Admin/Auth   |
| Update Brands           | PATCH  | baseUrl/v1/api/brands/:id             | Private Admin/Auth   |
| Delete Brands           | DELETE | baseUrl/v1/api/brands/:id             | Private Admin/Auth   |

<b>Product</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Get All Products        | GET    | baseUrl/v1/api/products               | Public               |
| Get Single Product      | GET    | baseUrl/v1/api/products/:id           | Public               |
| Create Product          | POST   | baseUrl/v1/api/products               | Private User/Auth    |
| Update Product          | PATCH  | baseUrl/v1/api/products/:id           | Private User/Auth    |
| Delete Product          | DELETE | baseUrl/v1/api/products/:id           | Private User/Auth    |

<b>Review</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Get All Reviews         | GET    | baseUrl/v1/api/reviews                | Public               |
| Get Single Review       | GET    | baseUrl/v1/api/reviews/:id            | Public               |
| Create Review           | POST   | baseUrl/v1/api/reviews                | Private User/Auth    |
| Update Review           | PATCH  | baseUrl/v1/api/reviews/:id            | Private User/Auth    |
| Delete Review           | DELETE | baseUrl/v1/api/reviews/:id            | Private User/Admin   |

<b>Coupon</b>

| Feature                 | Method |                Url                    |     Role & Access    |
|-------------------------|--------|---------------------------------------|----------------------|
| Get All Coupons         | GET    | baseUrl/v1/api/coupons                | Private Admin        |
| Get Single Coupon       | GET    | baseUrl/v1/api/coupons/:id            | Private Admin        |
| Create Coupon           | POST   | baseUrl/v1/api/coupons                | Private Admin        |
| Update Coupon           | PATCH  | baseUrl/v1/api/coupons/:id            | Private Admin        |
| Delete Coupon           | DELETE | baseUrl/v1/api/coupons/:id            | Private Admin        |

