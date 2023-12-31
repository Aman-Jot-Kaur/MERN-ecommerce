const mongoose = require("mongoose");
const UserModel = require("../models/user");
const ProductModel = require("../models/products");
const AdminModel = require("../models/approvalproducts");
const CustomerModel = require("../models/customerproduct");
const OrderModel = require("../models/orders");
exports.sendforapproval = (req, res) => {
  const userobj = new AdminModel(req.body);
  console.log(":", req.body);
  userobj
    .save()
    .then((result) => {
      console.log("new request product data");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginfunction = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log("login through number", email);
  const user = await UserModel.findOne({ email: req.body.email });
  const num = await UserModel.findOne({ number: req.body.email });
  //,password: req.body.password
  if (user) {
    const pass = password == user.password ? "true" : "false";
    if (pass == "true") res.send(user);
    else {
      res.send("password not correct");
    }
  } else if (num) {
    const pass = password == num.password ? "true" : "false";
    if (pass == "true") res.send(num);
    else {
      res.send("password not correct");
    }
  } else {
    res.send("account not found");
  }
};

exports.loginfunctionwithgoogle = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    $or: [{ email: email }, { number: email }],
  });

  if (user) {
    res.send(user);
  } else {
    res.send("not found");
  }
};
exports.signupnumber = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ number: email });
    console.log(user);
    if (user) {
      console.log("user found");
      return res.send("already exist");
    } else {
      const user = new UserModel(req.body);
      await user.save();
      res.send("added");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.signup = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      return res.send("already exist");
    } else {
      const user = new UserModel(req.body);
      await user.save();
      res.send("added");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getavailableproducts = (req, res) => {
  const person = CustomerModel.find()
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.gettingallproducts = (req, res) => {
  const userobj = new ProductModel();
  const mail = req.query.q;

  const person = ProductModel.find({
    vendor: mail,
  })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.gettingorders = (req, res) => {
  const mail = req.query.q;
  const person = OrderModel.find({
    vendor: mail,
  })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.getvendors = (req, res) => {
  const main = req.body.mail;
  const person = UserModel.find({ role: "vendor" })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.getuser = (req, res) => {
  const mail = req.body.mail;
  console.log("testing", mail);
  const person = UserModel.findOne({
    $or: [{ email: mail }, { number: mail }],
  })
    .then(function (models) {
      console.log(models);
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.updateproduct = (req, res) => {
  const _id = req.body._id;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const discountedPrice = req.body.discounted;
  const images = req.body.images;
  const title = req.body.title;
  const person = ProductModel.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    { description, category, price, discountedPrice, images, title }
  )
    .then(function (models) {
      console.log("updated product");
      console.log(person);
    })
    .catch(function (err) {
      console.log(err);
    });
};

exports.getorderhistory = (req, res) => {
  const mail = req.query.q;
  const person = OrderModel.find({
    customer: mail,
  })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
//finish adding order through properties
exports.addorder = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const customer = req.body.email;
  const vendor = req.body.vendor;

  const quantity = req.body.quantity;
  console.log(req.body.email);

  const status = req.body.status;
  const body = {
    title,
    description,
    status,
    customer,
    category,
    price,
    vendor,
    status,
    customer,
    quantity,
  };

  const userobj = new OrderModel(req.body);

  userobj
    .save()
    .then((result) => {
      console.log("new order data");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateuser = (req, res) => {
  const email = req.body.email;
  const displayName = req.body.displayName;
  const address = req.body.address;
  const password = req.body.password;
  const number = req.body.number;
  const disable = req.body.disable;
  const profile = req.body.profile;
  const _id = req.body._id;
  const person = UserModel.findOneAndUpdate(
    {
      $or: [{ email: email }, { number: email }],
    },
    { email, displayName, address, password, number, disable, profile }
  )
    .then(function (models) {
      console.log("updated user");
      console.log(disable);
      res.send(models);
      console.log(models.email);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.updateuserdisable = (req, res) => {
  const email = req.body.email;
  const displayName = req.body.displayName;
  const address = req.body.address;
  const password = req.body.password;
  const number = req.body.number;
  const disable = req.body.disable;
  const profile = req.body.profile;
  const _id = req.body._id;

  UserModel.findByIdAndUpdate({ _id: _id }, { disable: "true" }).then(
    console.log("product marked out of stock in vendorlist")
  );
};
//removeorder
exports.removeorder = (req, res) => {
  const prod = req.body._id;
  const person = OrderModel.findOneAndUpdate(
    { _id: prod },
    { status: "cancelled" }
  )
    .then(function (models) {
      console.log("updated");
    })
    .catch(function (err) {
      console.log(err);
    });
};

//markoutofstock
exports.markoutofstock = (req, res) => {
  const product = req.body._id;
  //update both in vendor list and customer page
  ProductModel.findByIdAndUpdate({ _id: product }, { outofstock: "true" }).then(
    console.log("product marked out of stock in vendorlist")
  );
  CustomerModel.findByIdAndUpdate(
    { _id: product },
    { outofstock: "true" }
  ).then(console.log("product marked out of stock in customerlist"));

  res.send();
};
exports.approveproduct = (req, res) => {
  const userobj = new CustomerModel(req.body);
  userobj
    .save()
    .then((result) => {
      // console.log("new user data")
      // console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
  ProductModel.findByIdAndUpdate(req.body._id, { approved: true }).then(
    console.log("product approved and updated")
  );
  const person = AdminModel.findOneAndDelete(req.body)
    .then(function (models) {})
    .catch(function (err) {
      console.log(err);
    });
  res.send();
};
exports.getapproval = (req, res) => {
  const person = AdminModel.find()
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.addingproduct = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const discounted = req.body.discounted;
  const vendor = req.body.vendor;
  const images = req.body.images;
  const body = {
    title,
    description,
    category,
    price,
    discounted,
    vendor,
    images,
  };

  const userobj = new ProductModel(req.body);

  userobj
    .save()
    .then((result) => {
      console.log("new product data");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send();
};
//updatecart

exports.addingtocart = (req, res) => {
  const userobj = new UserModel();
  const prod = req.body.cart;
  const mail = req.body.email;

  const person = UserModel.updateOne(
    {
      $or: [{ email: mail }, { number: mail }],
    },
    { cart: prod }
  )
    .then(function (models) {
      console.log("updated");
    })
    .catch(function (err) {
      console.log(err);
    });

  //   person.rating = [...person.cart,{ prod}]
  // person.save();
};

exports.gettingcart = (req, res) => {
  const userobj = new UserModel();
  const mail = req.query.q;
  console.log(mail);
  const person = UserModel.findOne({
    $or: [{ email: mail }, { number: mail }],
  })
    .then(function (models) {
      //    console.log(models)
      res.send(models);
    })
    .catch(function (err) {
      console.log(err);
    });
};
