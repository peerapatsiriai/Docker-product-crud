const Express = require("express");
const Router = Express.Router();

const CRUD = require("../Controllers/CRUD-Controller");

// CRUD
module.exports = (connection) => {
    Router.get("/product/:product_id", (req, res) => CRUD.GetOneProduct(req, res, connection));
    Router.get("/product", (req, res) => CRUD.GetAllProduct(req, res, connection));  
    Router.post("/product", (req, res) => CRUD.CreateNewProduct(req, res, connection))
    Router.put("/product", (req, res) => CRUD.UpdateProduct(req, res, connection))
    Router.delete("/product/:product_id", (req, res) => CRUD.DeleteProduct(req, res, connection))
    return Router;
  };