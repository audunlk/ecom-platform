require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const database = require("./services/database");
const path = require("path");


const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../ecom-frontend/public/images")));

// Routes for an ecommerce website
//postgres://postgres:387456@localhost:5432/ecom
const sequelize = new Sequelize("ecom", "postgres", "387456", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

// Define the models
const Buyer = sequelize.define("buyer", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

const Category = sequelize.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

const Item = sequelize.define("item", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

const Order = sequelize.define("order", {
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

const OrderItem = sequelize.define("orderItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

// Define the relationships
Buyer.hasMany(Order);
Order.belongsTo(Buyer);

Category.hasMany(Item);
Item.belongsTo(Category);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

// Sync the models with the database
sequelize
  .sync({ force: true })
  .then(() => {
    // Populate the database with sample data
    return Promise.all([
      Buyer.create({
        name: "John Smith",
        email: "john.smith@example.com",
        password: "password1",
      }),
      Buyer.create({
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password2",
      }),
      Buyer.create({
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        password: "password3",
      }),
      Category.create({
        name: "Clothing",
      }),
      Category.create({
        name: "Electronics",
      }),
      Category.create({
        name: "Home & Garden",
      }),
      Item.create({
        name: "T-shirt",
        description: "A comfortable t-shirt for everyday wear",
        price: 19.99,
        categoryId: 1,
      }),
      Item.create({
        name: "Smartphone",
        description: "The latest smartphone with advanced features",
        price: 999.99,
        categoryId: 2,
      }),
      Item.create({
        name: "Sofa",
        description: "A cozy sofa for your living room",
        price: 499.99,
        categoryId: 3,
      }),
      Order.create({
        buyerId: 1,
      }),
      Order.create({
        buyerId: 2,
      }),
      OrderItem.create({
        orderId: 1,
        itemId: 1,
        quantity: 2,
        price: 19.99,
      }),
      OrderItem.create({
        orderId: 1,
        itemId: 2,
        quantity: 1,
        price: 999.99,
      }),
      OrderItem.create({
        orderId: 2,
        itemId: 3,
        quantity: 1,
        price: 499.99,
      }),
    ]);
  })
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log("Server listening on port 3333");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

console.log(path.join(__dirname, "../ecom-frontend/public/images"));
