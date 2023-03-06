require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Sequelize = require("sequelize");
const database = require("./services/database");
const path = require("path");
const bcrypt = require("bcrypt");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../ecom-frontend/public/images")));

const sequelize = new Sequelize("ecom", "postgres", "387456", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const user = sequelize.define("user", {
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
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Item.beforeCreate(async (item, options) => {
  const itemName = item.name.toLowerCase().replace(/ /g, "-");
  item.imageUrl = `http://localhost:3000/images/${itemName}.jpg`;
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

OrderItem.beforeCreate(async (orderItem, options) => {
  const item = await Item.findByPk(orderItem.itemId);
  orderItem.price = item.price;
});

user.hasMany(Order);
Order.belongsTo(user);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

sequelize
  .sync({ force: true })
  .then(() => {
    return Promise.all([
      user.create({
        email: "john.smith@example.com",
        password: "password1",
      }),
      user.create({
        email: "jane.doe@example.com",
        password: "password2",
      }),
      user.create({
        email: "bob.johnson@example.com",
        password: "password3",
      }),

      Item.create({
        name: "Perfume 1",
        description: "Smells nice of course!",
        price: 19.99,
        category: "mens",
      }),
      Item.create({
        name: "Perfume 2",
        description: "Smells nice of course!",
        price: 19.99,
        category: "womens",
      }),
      Item.create({
        name: "Perfume 3",
        description: "Smells nice of course!",
        price: 19.99,
        category: "mens",
      }),
      Item.create({
        name: "Perfume 4",
        description: "Smells nice of course!",
        price: 19.99,
        category: "womens",
      }),
      Item.create({
        name: "Perfume 5",
        description: "Smells nice of course!",
        price: 19.99,
        category: "mens",
      }),
      Item.create({
        name: "Perfume 6",
        description: "Smells nice of course!",
        price: 19.99,
        category: "womens",
      }),
      Item.create({
        name: "Perfume 7",
        description: "Smells nice of course!",
        price: 19.99,
        category: "mens",
      }),
      Item.create({
        name: "Perfume 8",
        description: "Smells nice of course!",
        price: 19.99,
        category: "womens",
      }),
      Item.create({
        name: "Perfume 9",
        description: "Smells nice of course!",
        price: 19.99,
        category: "mens",
      }),
      Order.create({
        userId: 1,
      }),
      Order.create({
        userId: 2,
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
    app.listen(PORT, () => {
      console.log("Server listening on port 3333");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

console.log(path.join(__dirname, "../ecom-frontend/public/images"));



app.get("/users", (req, res) => {
  user
    .findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving users");
    });
});

app.get("/users/:id", (req, res) => {
  user
    .findByPk(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("user not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving user");
    });
});

app.get('/products', (req, res) => {
  Item.findAll()
    .then(items => {
      res.json(items)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving products')
    })
})
