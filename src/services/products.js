import { ProductModel } from '../db/models/Product.js';

export const getAllProducts = async () => {
  return await ProductModel.find();
};
export const getProductById = async (productId) => {
  return await ProductModel.findById(productId);
};

export const addProduct = async (payload) => {
  return await ProductModel.create(payload);
};

export const updateProduct = async (productId, body) => {
  return await ProductModel.findOneAndUpdate({ _id: productId }, body, {
    new: true,
  });
};
