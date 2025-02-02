import { SORT_ORDER } from '../constants/index.js';
import { ProductModel } from '../db/models/Product.js';

export const getAllProducts = async ({
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  return await ProductModel.find().sort({ [sortBy]: sortOrder });
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

export const deleteProduct = async (productId) => {
  const product = await ProductModel.findOneAndDelete({ _id: productId });
  return product;
};
