const productModel = require("../models/productModel");

class ProductService {
  static async getAllProducts() {
    return new Promise((resolve, reject) => {
      productModel.getAllProducts((err, products) => err ? reject(err) : resolve(products));
    });
  }

  static async getProductById(id) {
    return new Promise((resolve, reject) => {
      productModel.getProductById(id, (err, product) => err ? reject(err) : resolve(product));
    });
  }

  static async createProduct(name, price, stock) {
    return new Promise((resolve, reject) => {
      productModel.createProduct(name, price, stock, (err, result) => err ? reject(err) : resolve(result));
    });
  }

  static async updateProduct(id, name, price, stock) {
    return new Promise((resolve, reject) => {
      productModel.updateProduct(id, name, price, stock, (err) => err ? reject(err) : resolve());
    });
  }

  static async deleteProduct(id) {
    return new Promise((resolve, reject) => {
      productModel.deleteProduct(id, (err) => err ? reject(err) : resolve());
    });
  }
}

module.exports = ProductService;
