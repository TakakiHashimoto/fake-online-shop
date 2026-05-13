# MERN Online Shop App Spec

## 1. Project Overview

This project is a MERN stack online shop application built as a full-stack class project.

The app uses a fictional dark-web parody / fake shady shop theme. The theme should feel humorous, mysterious, and playful, but it must stay clearly fictional and safe.

The app must not include real illegal marketplace behavior, real drug names, real drug imagery, real dosage information, real delivery instructions, or anything that could make the app look like a real illegal marketplace.

Instead, all products should be fantasy/parody items such as:

- Moon Dust Candy
- Goblin Energy Syrup
- Dragon Sleep Powder
- Cyber Mushroom Gummies
- Wizard Focus Crystals
- Suspicious Magic Vitamins
- Forbidden Jelly Beans
- Neon Goblin Snacks

The goal is not just to build a working class project. The goal is to practice production-minded full-stack architecture, including authentication, authorization, ownership-based access, validation, API contracts, error handling, and clean separation of concerns.

---

## 2. Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- TypeScript if possible, JavaScript acceptable if class constraints require it
- Axios or Fetch for API requests
- Context API for auth and cart state

### Backend

- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt for password hashing
- cookie-parser for httpOnly cookie auth
- CORS configured for frontend origin

### Database

- MongoDB Atlas
- Mongoose models
- Recommended database name: `shadow_cart`, `parody_market`, `fake_shop`, `goblin_shop`, or another safe fictional name
- Database user should have only `readWrite` permissions for the app database

---

## 3. Core Goals

The app must support two user roles:

1. Customer
2. Seller

The app must enforce role-based access and ownership-based access.

Role-based access answers:

> Is this user allowed to access this category of feature?

Ownership-based access answers:

> Is this specific resource owned by this specific user?

This means a seller can manage seller features, but a seller must only be able to update or delete products that belong to that seller.

A seller must not be able to edit, delete, or deactivate another seller’s products.

---

## 4. User Roles and Permissions

## 4.1 Customer

A customer can:

- Register
- Login
- Logout
- Browse public products
- View product details
- Add products to cart
- Checkout
- View their own orders

A customer cannot:

- Access seller dashboard
- Create products
- Edit products
- Delete products
- View another customer’s orders

---

## 4.2 Seller

A seller can:

- Register or be created as a seller depending on app design
- Login
- Logout
- View seller dashboard
- Create products
- View their own products
- Edit their own products
- Delete or deactivate their own products

A seller cannot:

- Edit another seller’s products
- Delete another seller’s products
- View another seller’s private product management data
- Manage orders that do not belong to their product flow unless explicitly implemented later

---

## 5. Theme and Content Safety Rules

The app theme is fictional dark-web parody.

Allowed tone:

- Funny
- Mysterious
- Cartoonish
- Fantasy
- Cyberpunk parody
- Fake underground marketplace aesthetic

Allowed product examples:

- Moon Dust Candy
- Goblin Energy Syrup
- Dragon Sleep Powder
- Cyber Mushroom Gummies
- Wizard Focus Crystals
- Suspicious Magic Vitamins
- Forbidden Jelly Beans
- Neon Goblin Snacks

Not allowed:

- Real drug names
- Real drug images
- Real dosage information
- Real consumption instructions
- Real delivery instructions for illegal goods
- Realistic illegal marketplace copy
- Anything that could be mistaken as a real illegal product listing

Safe product copy example:

> Goblin Energy Syrup — A chaotic fantasy syrup allegedly brewed by tiny goblins. Side effects may include dancing badly and speaking in riddles. Clearly fake. Do not consume actual goblin liquids.

---

## 6. High-Level App Flow

## 6.1 Public Visitor Flow

A visitor can:

1. Visit home page
2. Browse product listings
3. View product details
4. Register or login

If the visitor tries to checkout, they should be redirected to login.

---

## 6.2 Customer Flow

A customer can:

1. Login
2. Browse products
3. Add products to cart
4. Review cart
5. Checkout
6. Create an order
7. View their own orders

---

## 6.3 Seller Flow

A seller can:

1. Login
2. Access seller dashboard
3. View their own product list
4. Create a product
5. Edit their own product
6. Delete or deactivate their own product

Seller product routes must require:

1. Authenticated user
2. User role is `seller`
3. Product belongs to the logged-in seller for update/delete operations

---

## 7. Backend Folder Structure

Recommended structure:

```txt
server/
  src/
    app.ts
    server.ts
    config/
      env.ts
      db.ts
    models/
      User.model.ts
      Product.model.ts
      Order.model.ts
    routes/
      auth.routes.ts
      product.routes.ts
      sellerProduct.routes.ts
      order.routes.ts
    controllers/
      auth.controller.ts
      product.controller.ts
      sellerProduct.controller.ts
      order.controller.ts
    services/
      auth.service.ts
      product.service.ts
      sellerProduct.service.ts
      order.service.ts
    middleware/
      requireAuth.ts
      requireRole.ts
      errorHandler.ts
    utils/
      AppError.ts
      asyncHandler.ts
```

---

## 8. Backend Architecture Rules

## 8.1 `app.ts`

`app.ts` should create and configure the Express app.

Responsibilities:

- Create Express app
- Register global middleware
- Register routes
- Register 404 fallback
- Register global error handler
- Export app

Example responsibilities:

```txt
express.json()
cors()
cookieParser()
/api/health
/api/auth
/api/products
/api/seller/products
/api/orders
404 middleware
error handler
export app
```

Important rule:

Routes must be registered before the 404 middleware.

---

## 8.2 `server.ts`

`server.ts` is the application entry point.

Responsibilities:

- Load validated env config
- Connect to MongoDB Atlas
- Start Express server only after DB connection succeeds

Startup order:

```txt
1. Load env
2. Validate env
3. Connect MongoDB Atlas
4. Start Express server
```

Important production rule:

If the database is required, do not accept requests before the database connection succeeds.

---

## 8.3 `config/env.ts`

`env.ts` validates required environment variables.

Required env variables:

```env
BACKEND_PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET_KEY=some-secret
MONGO_URI=your-mongodb-atlas-uri
```

Rules:

- Never expose real secrets in chat
- Never commit `.env` to GitHub
- `.env` must be listed in `.gitignore`
- App should crash early if required env values are missing

---

## 8.4 `config/db.ts`

`db.ts` owns MongoDB connection logic.

Responsibilities:

- Import mongoose
- Import env
- Export `connectDB()`
- Connect using `mongoose.connect(env.MONGO_URI)`
- Log success
- On failure, log error and exit process

---

## 9. Data Models

## 9.1 User Model

Purpose:

Represents an authenticated user.

Fields:

```ts
type UserRole = "customer" | "seller";

User {
  username: string;
  email: string;
  hashedPassword: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
```

Rules:

- `email` must be unique
- `email` should be lowercase and trimmed
- `username` should be trimmed
- `hashedPassword` stores bcrypt hash, never raw password
- `role` must be either `customer` or `seller`
- Default role should usually be `customer`
- Use timestamps

Important naming rule:

Use `role`, not `roll`.

Correct enum:

```ts
enum: ["customer", "seller"]
```

Incorrect enum:

```ts
enum: ["seller, customer"]
```

The incorrect version creates one string value instead of two allowed values.

---

## 9.2 Product Model

Purpose:

Represents a product listed in the shop.

Fields:

```ts
Product {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock: number;
  sellerId: ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

Rules:

- `sellerId` references the user who created the product
- Only sellers can create products
- Sellers can only update/delete products where `product.sellerId === loggedInUser.id`
- `price` must be non-negative
- `stock` must be non-negative
- Public product listing should only show active products
- Delete can be hard delete or soft delete

Recommended for production-minded class project:

Use soft delete/deactivation first:

```ts
isActive: false;
```

Instead of permanently deleting the product.

---

## 9.3 Order Model

Purpose:

Represents a customer checkout.

Fields:

```ts
Order {
  customerId: ObjectId;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

OrderItem {
  productId: ObjectId;
  name: string;
  price: number;
  quantity: number;
  sellerId: ObjectId;
}
```

Important order design rule:

Copy product name and price into the order item at checkout time.

Reason:

If a seller changes the product price later, old orders should still preserve what the customer actually bought at that time.

---

## 10. API Design

## 10.1 Health Route

```txt
GET /api/health
```

Success response:

```json
{ "ok": true, "message": "Health check confirmed" }
```

---

## 10.2 Auth Routes

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### POST `/api/auth/register`

Purpose:

Create a new user account.

Request body:

```json
{
  "username": "takaki",
  "email": "takaki@example.com",
  "password": "password123",
  "role": "customer"
}
```

Possible design:

- Allow only customer self-registration at first
- Add seller registration separately if needed
- Or allow role selection for class demo purposes

Service responsibilities:

- Validate input
- Check duplicate email
- Hash password with bcrypt
- Create user
- Return safe user data
- Optionally create JWT cookie immediately

Response:

```json
{
  "ok": true,
  "data": {
    "user": {
      "id": "userId",
      "username": "takaki",
      "email": "takaki@example.com",
      "role": "customer"
    }
  }
}
```

Never return:

```json
{ "hashedPassword": "..." }
```

---

### POST `/api/auth/login`

Purpose:

Authenticate existing user.

Request body:

```json
{ "email": "takaki@example.com", "password": "password123" }
```

Service responsibilities:

- Find user by email
- Compare password with bcrypt
- Create JWT
- Store JWT in httpOnly cookie
- Return safe user data

---

### POST `/api/auth/logout`

Purpose:

Clear auth cookie.

Response:

```json
{ "ok": true, "message": "Logged out successfully" }
```

---

### GET `/api/auth/me`

Purpose:

Restore auth state on page refresh.

Requires auth cookie.

Response if logged in:

```json
{
  "ok": true,
  "data": {
    "user": {
      "id": "userId",
      "username": "takaki",
      "email": "takaki@example.com",
      "role": "seller"
    }
  }
}
```

Response if not logged in:

```json
{
  "ok": false,
  "error": { "message": "Not authenticated", "code": "NOT_AUTHENTICATED" }
}
```

---

## 10.3 Public Product Routes

```txt
GET /api/products
GET /api/products/:productId
```

### GET `/api/products`

Purpose:

Get all active products for public browsing.

Rules:

- Does not require login
- Should only return active products
- Should not expose private seller management fields unnecessarily

Possible query params later:

```txt
?search=moon
?category=candy
?page=1
?limit=12
```

---

### GET `/api/products/:productId`

Purpose:

Get one active product by id.

Rules:

- Does not require login
- Should return 404 if product does not exist or is inactive

---

## 10.4 Seller Product Routes

```txt
GET    /api/seller/products
POST   /api/seller/products
PATCH  /api/seller/products/:productId
DELETE /api/seller/products/:productId
```

All seller product routes require:

```txt
requireAuth
requireRole("seller")
```

---

### GET `/api/seller/products`

Purpose:

Get products owned by the logged-in seller.

Rules:

- Requires login
- Requires seller role
- Query products by `sellerId: req.user.id`

---

### POST `/api/seller/products`

Purpose:

Create a new product owned by logged-in seller.

Rules:

- Requires login
- Requires seller role
- Backend sets `sellerId` from `req.user.id`
- Do not trust `sellerId` from request body

Request body:

```json
{
  "name": "Moon Dust Candy",
  "description": "A fake cosmic candy for suspicious astronauts.",
  "price": 12.99,
  "stock": 20,
  "category": "Candy",
  "imageUrl": "https://example.com/image.png"
}
```

Backend-created data:

```ts
sellerId: req.user.id;
isActive: true;
```

---

### PATCH `/api/seller/products/:productId`

Purpose:

Update a seller-owned product.

Rules:

- Requires login
- Requires seller role
- Must check product ownership
- Seller can only update products where `product.sellerId === req.user.id`

Important query pattern:

```ts
Product.findOne({ _id: productId, sellerId: req.user.id });
```

This combines resource lookup and ownership check.

If not found, return 404 or 403 depending on design.

Recommended class-project response:

```json
{
  "ok": false,
  "error": {
    "message": "Product not found or you do not have permission to edit it",
    "code": "PRODUCT_NOT_FOUND_OR_FORBIDDEN"
  }
}
```

---

### DELETE `/api/seller/products/:productId`

Purpose:

Delete or deactivate a seller-owned product.

Rules:

- Requires login
- Requires seller role
- Must check product ownership
- Prefer soft delete for production-minded design

Soft delete behavior:

```ts
isActive: false;
```

---

## 10.5 Order Routes

```txt
POST /api/orders
GET  /api/orders/my-orders
GET  /api/orders/:orderId
```

All order routes require authentication.

---

### POST `/api/orders`

Purpose:

Create order from customer cart.

Rules:

- Requires login
- Usually requires customer role
- Backend must fetch product prices from database
- Do not trust prices sent from frontend
- Backend calculates total amount
- Backend copies product name, price, and sellerId into order items

Bad design:

```json
{ "productId": "abc", "quantity": 2, "price": 1 }
```

Reason this is bad:

A malicious user can change price in the browser.

Better request body:

```json
{ "items": [{ "productId": "productId", "quantity": 2 }] }
```

Backend then calculates price from database.

---

### GET `/api/orders/my-orders`

Purpose:

Get orders for the logged-in customer.

Rules:

- Requires login
- Query by `customerId: req.user.id`
- User must not be able to see another customer’s orders

---

### GET `/api/orders/:orderId`

Purpose:

Get one order.

Rules:

- Requires login
- Must check ownership
- Customer can only view their own order

Recommended query:

```ts
Order.findOne({ _id: orderId, customerId: req.user.id });
```

---

## 11. Auth and Authorization Design

## 11.1 Authentication

Authentication answers:

> Who is this user?

Recommended approach:

- User logs in with email/password
- Backend verifies password with bcrypt
- Backend creates JWT
- JWT is stored in httpOnly cookie
- Frontend calls `/api/auth/me` to restore session

JWT payload should include minimal data:

```ts
{
  userId: string;
  role: "customer" | "seller";
}
```

Do not store sensitive data in JWT.

---

## 11.2 Authorization

Authorization answers:

> Is this user allowed to do this action?

There are two levels:

1. Role-based authorization
2. Ownership-based authorization

### Role-based authorization

Example:

```txt
Only sellers can access /api/seller/products
```

Middleware:

```txt
requireAuth
requireRole("seller")
```

### Ownership-based authorization

Example:

```txt
A seller can edit only their own products
```

Service logic:

```ts
Product.findOne({ _id: productId, sellerId: req.user.id });
```

Important rule:

Do not rely only on frontend route protection.

Frontend protection improves UX.
Backend protection provides real security.

---

## 12. Middleware Design

## 12.1 `requireAuth`

Purpose:

- Read JWT from cookie
- Verify JWT
- Attach user info to request
- Reject unauthenticated users

Adds:

```ts
req.user = {
  id: string;
  role: "customer" | "seller";
}
```

---

## 12.2 `requireRole(role)`

Purpose:

- Check whether authenticated user has required role

Example:

```ts
requireRole("seller");
```

Rejects if:

```ts
req.user.role !== "seller";
```

---

## 12.3 `errorHandler`

Purpose:

- Centralize error responses
- Avoid repeating try/catch response logic in every controller
- Convert thrown errors into consistent JSON

Recommended error shape:

```json
{
  "ok": false,
  "error": {
    "message": "Something went wrong",
    "code": "INTERNAL_SERVER_ERROR"
  }
}
```

---

## 13. Controller-Service Separation

## 13.1 Controller Responsibility

Controllers handle HTTP details:

- Read `req.body`
- Read `req.params`
- Read `req.user`
- Call service
- Send JSON response

Controllers should not contain heavy business logic.

---

## 13.2 Service Responsibility

Services handle business rules:

- Validate ownership
- Check duplicate email
- Hash password
- Compare password
- Create database records
- Calculate order total
- Enforce rules

---

## 13.3 Model Responsibility

Models define database shape and basic schema constraints.

Models should not know about HTTP requests.

---

## 14. Frontend Folder Structure

Recommended structure:

```txt
client/
  src/
    main.tsx
    App.tsx
    routes/
      router.tsx
    pages/
      HomePage.tsx
      ProductsPage.tsx
      ProductDetailPage.tsx
      CartPage.tsx
      CheckoutPage.tsx
      LoginPage.tsx
      RegisterPage.tsx
      seller/
        SellerDashboardPage.tsx
        SellerProductsPage.tsx
        SellerProductCreatePage.tsx
        SellerProductEditPage.tsx
    components/
      layout/
        ShopLayout.tsx
        SellerLayout.tsx
        Navbar.tsx
      products/
        ProductCard.tsx
        ProductGrid.tsx
      cart/
        CartItem.tsx
        CartSummary.tsx
      ui/
        Button.tsx
        Input.tsx
        ErrorMessage.tsx
        LoadingSpinner.tsx
    features/
      auth/
        AuthContext.tsx
        authApi.ts
        authTypes.ts
      products/
        productApi.ts
        productTypes.ts
      cart/
        CartContext.tsx
        cartReducer.ts
        cartTypes.ts
      seller/
        sellerProductApi.ts
        sellerProductTypes.ts
    lib/
      axios.ts
      formatCurrency.ts
```

---

## 15. Frontend Pages

## 15.1 Home Page

Purpose:

- Introduce the fictional shop
- Show parody branding
- Link to product browsing

---

## 15.2 Products Page

Purpose:

- Fetch and display public active products

States to handle:

- Loading
- Error
- Empty
- Success

---

## 15.3 Product Detail Page

Purpose:

- Show one product
- Let customer add item to cart

States to handle:

- Loading
- Error
- Product not found
- Success

---

## 15.4 Cart Page

Purpose:

- Show selected cart items
- Change quantity
- Remove item
- Show total
- Link to checkout

Cart state can live in Context API.

---

## 15.5 Checkout Page

Purpose:

- Confirm cart
- Submit order

Rules:

- Must require login
- Must not send frontend-calculated prices as trusted data
- Backend calculates real total

---

## 15.6 Login Page

Purpose:

- Authenticate user
- Store auth state in AuthContext
- Redirect based on role if needed

---

## 15.7 Register Page

Purpose:

- Create user account
- Optionally allow role selection for class demo
- Otherwise default new users to customer

---

## 15.8 Seller Dashboard Page

Purpose:

- Seller landing page
- Show quick stats later
- Link to product management

Requires:

- Logged in
- Role is seller

---

## 15.9 Seller Products Page

Purpose:

- Show logged-in seller’s own products
- Link to create/edit product
- Delete/deactivate products

States to handle:

- Loading
- Error
- Empty
- Success

---

## 15.10 Seller Product Create Page

Purpose:

- Form for creating product

Rules:

- Frontend should not send sellerId
- Backend attaches sellerId from logged-in user

---

## 15.11 Seller Product Edit Page

Purpose:

- Form for editing seller-owned product

Rules:

- Backend must verify ownership
- If product does not belong to seller, show error or redirect

---

## 16. Frontend Auth Design

Use `AuthContext` for global auth state.

Auth state shape:

```ts
type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: "customer" | "seller";
};

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
};
```

AuthContext responsibilities:

- Call `/api/auth/me` on app load
- Store current user
- Provide login function
- Provide logout function
- Provide register function if desired

Important UX rule:

The app should not immediately assume the user is logged out before `/api/auth/me` finishes.

Use loading state during auth restoration.

---

## 17. Frontend Route Protection

Frontend route protection improves UX, but backend authorization is still required.

Protected route examples:

- Checkout page requires logged-in user
- My orders page requires logged-in user
- Seller dashboard requires seller role
- Seller product management requires seller role

Example concepts:

```txt
RequireAuth
RequireRole("seller")
```

Frontend protection should:

- Show loading while auth is being restored
- Redirect unauthenticated users to login
- Show forbidden page or redirect if role is wrong

---

## 18. Cart Design

Cart can live in frontend state using Context API and reducer.

Cart item shape:

```ts
CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
```

Important security rule:

Cart price is only for display.

Backend must recalculate final prices during checkout.

Cart actions:

```txt
ADD_ITEM
REMOVE_ITEM
INCREASE_QUANTITY
DECREASE_QUANTITY
CLEAR_CART
```

---

## 19. API Response Contract

Use consistent API responses.

Success response:

```json
{ "ok": true, "data": {} }
```

Error response:

```json
{
  "ok": false,
  "error": {
    "message": "Human-readable message",
    "code": "MACHINE_READABLE_CODE"
  }
}
```

Why this matters:

- Frontend can reliably show errors
- Debugging is easier
- API behavior is predictable
- Later scaling is easier

---

## 20. Error Codes

Recommended error codes:

```txt
VALIDATION_ERROR
NOT_AUTHENTICATED
FORBIDDEN
SELLER_ONLY
CUSTOMER_ONLY
EMAIL_ALREADY_EXISTS
INVALID_CREDENTIALS
PRODUCT_NOT_FOUND
PRODUCT_NOT_FOUND_OR_FORBIDDEN
ORDER_NOT_FOUND
ROUTE_NOT_FOUND
INTERNAL_SERVER_ERROR
```

---

## 21. Loading, Error, Empty, Success States

Every data-fetching page should think in four states:

1. Loading
2. Error
3. Empty
4. Success

Example: Products page

Loading:

```txt
Show spinner or skeleton cards
```

Error:

```txt
Show message and retry button
```

Empty:

```txt
No suspicious fantasy products found yet
```

Success:

```txt
Show product grid
```

---

## 22. Validation Rules

## 22.1 User Validation

Register:

- username required
- email required
- email format should be valid enough for class project
- password required
- password should have minimum length
- role must be `customer` or `seller` if role selection is allowed

Login:

- email required
- password required

---

## 22.2 Product Validation

Product create/update:

- name required
- description required
- price required
- price must be >= 0
- stock required
- stock must be >= 0
- category optional
- imageUrl optional
- product content must stay fictional and safe

---

## 22.3 Order Validation

Order create:

- items must not be empty
- each item must include productId
- quantity must be positive
- product must exist
- product must be active
- product must have enough stock if stock handling is implemented

---

## 23. Security Rules

Important security rules:

1. Never store raw passwords
2. Use bcrypt for password hashing
3. Use httpOnly cookie for JWT if possible
4. Do not expose JWT to localStorage if avoiding XSS risk
5. Do not trust frontend role
6. Do not trust frontend sellerId
7. Do not trust frontend price during checkout
8. Check ownership on seller product update/delete
9. Check ownership on customer order viewing
10. Keep `.env` out of GitHub
11. Use least-privilege MongoDB Atlas user permissions
12. Use CORS only for your frontend origin during development

---

## 24. MongoDB Atlas Setup Rules

Use MongoDB Atlas, not local MongoDB.

Recommended database user permission:

```txt
readWrite @ shadow_cart
```

Collection can be blank, meaning all collections in that database.

Do not use `dbAdmin` for normal app runtime.

Reason:

The backend app only needs to read and write application data. It does not need database administration privileges.

This follows the principle of least privilege.

---

## 25. Development Milestones

## Milestone 1: Backend Foundation

- Express app works
- `app.ts` and `server.ts` separated
- Env validation works
- MongoDB Atlas connects
- `/api/health` works
- 404 response works

---

## Milestone 2: User Model and Auth

- User schema created
- Register endpoint works
- Password is hashed
- Duplicate email handled
- Login endpoint works
- JWT cookie created
- Logout clears cookie
- `/api/auth/me` restores user

---

## Milestone 3: Public Products

- Product schema created
- Seed or manually create fake products
- Public product list works
- Product detail works
- Only active products are public

---

## Milestone 4: Seller Product Management

- Seller routes created
- `requireAuth` works
- `requireRole("seller")` works
- Seller can create product
- Seller can view own products
- Seller can edit own products
- Seller can delete/deactivate own products
- Seller cannot modify another seller’s products

---

## Milestone 5: Cart

- CartContext created
- Add to cart works
- Remove from cart works
- Quantity update works
- Cart summary works
- Cart persists if desired using localStorage

---

## Milestone 6: Checkout and Orders

- Order schema created
- Customer can checkout
- Backend calculates total
- Order stores copied product info
- Customer can view own orders
- Customer cannot view another user’s orders

---

## Milestone 7: Frontend Polish

- Layout completed
- Navbar changes based on auth state
- Seller layout completed
- Loading states added
- Error states added
- Empty states added
- Theme polished
- Safe fictional content verified

---

## 26. Testing Checklist

## 26.1 Auth Tests

- Can register customer
- Can register seller if allowed
- Cannot register duplicate email
- Can login with correct password
- Cannot login with wrong password
- Can logout
- `/api/auth/me` returns user when logged in
- `/api/auth/me` rejects when logged out

---

## 26.2 Seller Authorization Tests

- Customer cannot access seller routes
- Logged-out user cannot access seller routes
- Seller can create product
- Seller can update own product
- Seller can delete/deactivate own product
- Seller cannot update another seller’s product
- Seller cannot delete another seller’s product

---

## 26.3 Product Tests

- Public user can view active products
- Public user can view product detail
- Inactive product does not appear publicly
- Invalid product id returns clean error

---

## 26.4 Order Tests

- Logged-out user cannot checkout
- Customer can checkout
- Backend calculates total from database
- Customer can view own orders
- Customer cannot view another customer’s order

---

## 27. Production-Minded Principles for This App

For every feature, ask:

1. What problem are we solving?
2. What data does it need?
3. Who is allowed to do it?
4. Where should the logic live?
5. What can go wrong?
6. How do we handle loading, error, empty, and success states?
7. How would this scale later?

Do not think only in terms of “does it work?”

Think in terms of:

- Is it secure?
- Is it maintainable?
- Is it understandable?
- Is it easy to debug?
- Is it hard to misuse?
- Does the backend enforce the real rules?
- Does the frontend provide good UX?

---

## 28. Current Checkpoint

Current completed progress:

- Backend server created
- Express app works
- `app.ts`, `server.ts`, and `env.ts` separation started
- MongoDB Atlas selected
- Atlas permission model discussed
- Database connection setup is the next backend foundation checkpoint
- User schema has been started

Current User schema correction needed:

- Rename `roll` to `role`
- Use `role: "customer" | "seller"`
- Fix enum from `["seller, customer"]` to `["seller", "customer"]`
- Add `default: "customer"`
- Add `timestamps: true`
- Normalize email with `lowercase: true` and `trim: true`

---

## 29. Recommended Next Step

Continue in this order:

```txt
1. Fix User model
2. Confirm MongoDB connection works
3. Create AppError and asyncHandler utilities
4. Create auth routes/controller/service
5. Implement register
6. Implement login
7. Implement requireAuth
8. Implement requireRole
9. Implement /api/auth/me
10. Move to Product model and public product routes
```

Do not rush into frontend before backend auth and product ownership rules are solid.

The strongest learning path is:

```txt
Data model → API contract → service rule → controller → route → frontend integration
```

---

## 30. Definition of Done

This project is considered complete when:

- Users can register/login/logout
- Auth persists on refresh using `/api/auth/me`
- Customers can browse products
- Customers can add to cart
- Customers can checkout
- Customers can view their own orders
- Sellers can access seller dashboard
- Sellers can create products
- Sellers can manage only their own products
- Ownership checks are enforced on the backend
- API errors are consistent
- Frontend handles loading/error/empty/success states
- Theme is polished but clearly fictional and safe
- Secrets are not committed
- MongoDB permissions follow least privilege

---

## 31. North Star

The purpose of this project is not just to finish a MERN app.

The purpose is to become better at thinking like a production-ready full-stack engineer.

That means understanding:

- Why files are separated
- Why services exist
- Why controllers should stay thin
- Why backend authorization matters
- Why ownership checks are separate from role checks
- Why API contracts matter
- Why validation matters
- Why error shape matters
- Why frontend state must handle loading and failure
- Why security cannot be left to the frontend

Build this app one checkpoint at a time.
