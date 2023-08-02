# MERN-ecommerce
Welcome to the MERN E-commerce Website! This platform allows three types of users: admin, vendor, and customer, each with specific roles and capabilities.

## Features

- Admin:
  - Approve products added by vendors.
  - Manage business orders and transactions.
  - view all vendors
  - disable vendor
  - Act as customer


- Vendor:
  - Send new products to admin for approval.
  - Edit existing products and save them as drafts.
  - Submit products for admin approval.
  - View business orders and transactions.
  - View order status for customers
  - View profit from all orders
  - View their own products 
  - Add images for products
  - Act as customer

- Customer:
  - Browse and view all products available.
  - View product details on a dedicated page.
  - Add products to the cart and proceed to checkout.
  - View and manage the cart.
  - View order history and status.
  - View order status
  - Cancel order within 24 hours

## Technologies Used

- MongoDB: Database for storing product and user information.
- Express.js: Backend framework for handling requests and APIs.
- React.js: Frontend library for building user interfaces.
- Node.js: Runtime environment for server-side JavaScript.
- Redux: State management for React applications.
- Authentication & Authorization: Implement user roles and permissions.

## Installation

1. Clone the repository: `git clone https://github.com/Amanjot-Kaur-Narang/MERN-ecommerce.git`
2. Navigate to the project directory: `cd MERN-ecommerce`
3. Install server dependencies: `npm install`
4. Navigate to the client directory: `cd client`
5. Install client dependencies: `npm install`
6. Return to the project directory: `cd ..`

## Configuration

1. Create a `.env` file in the project root.
2. Add necessary environment variable:
PORT and MONGO_URL and firebase configuration for login through google, image url generation
