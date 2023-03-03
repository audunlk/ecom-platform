require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Sequelize = require("sequelize");
const database = require("./services/database");
const path = require("path");
const bcrypt = require("bcrypt");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');


const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../ecom-frontend/public/images")));


const sequelize = new Sequelize("ecom", "postgres", "387456", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const User = sequelize.define("User", {
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

User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Item);
Item.belongsTo(Category);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

sequelize
  .sync({ force: true })
  .then(() => {
    
    return Promise.all([
      User.create({
        email: "john.smith@example.com",
        password: "password1",
      }),
      User.create({
        email: "jane.doe@example.com",
        password: "password2",
      }),
      User.create({
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
        UserId: 1,
      }),
      Order.create({
        UserId: 2,
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

// const authConfig = {
//   domain: 'dev-xgtapnha6ng8fvvj.us.auth0.com',
//   audience: 'https://dev-xgtapnha6ng8fvvj.us.auth0.com/api/v2/'
// };

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
//   }),
//   audience: authConfig.audience,
//   issuer: `https://${authConfig.domain}/`,
//   algorithms: ['RS256']
// });

// const authenticateUser = (req, res, next) => {
//   if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
//     return res.status(401).send('Unauthorized');
//   }

//   const token = req.headers.authorization.split(' ')[1];
//   jwt.verify(token, jwksRsa.koaJwtSecret({
//     jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
//   }), (err, decoded) => {
//     if (err) {
//       return res.status(401).send('Unauthorized');
//     }

//     req.user = decoded;
//     next();
//   });
// }


app.get('/Users', 
//checkJwt, 
(req, res) => {
  User.findAll()
    .then((Users) => {
      res.json(Users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving Users");
    }
  );
});

app.get('/Users/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then((User) => {
      if (User) {
        res.json(User);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving User");
    }
  );
});

